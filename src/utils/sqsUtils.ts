import {
  paginateListQueues,
  GetQueueAttributesCommand,
  SQSClient,
  QueueAttributeName,
  Message,
  DeleteMessageCommand,
} from "@aws-sdk/client-sqs";
import { Consumer } from "sqs-consumer";

interface SetSQSConsumerParams {
  client: SQSClient;
  queueUrl: string;
  onReceiveMessage?(): void;
  onReceiveMessageBatch?(): void;
  onError?(error: Error): void;
  onProcessingError?(error: Error): void;
}

interface DeleteSQSMessagesParams {
  client: SQSClient;
  queueUrl: string;
  messages: Message[];
}

export const getSQSQueues = async (client: SQSClient) => {
  const paginatedQueues = paginateListQueues({ client }, {});
  const queueUrls: Record<
    string,
    Partial<Record<QueueAttributeName, string>>
  > = {};

  for await (const page of paginatedQueues) {
    if (page.QueueUrls?.length) {
      for (const queueUrl of page.QueueUrls) {
        const queueAttributes = await client.send(
          new GetQueueAttributesCommand({
            QueueUrl: queueUrl,
            AttributeNames: ["QueueArn"],
          })
        );

        if (queueAttributes?.Attributes)
          queueUrls[queueUrl] = queueAttributes.Attributes;
      }
    }
  }

  return queueUrls;
};

export const deleteSQSMessages = async ({
  client,
  queueUrl,
  messages,
}: DeleteSQSMessagesParams) => {
  messages.forEach(async (msg) => {
    const deleteMessage = new DeleteMessageCommand({
      QueueUrl: queueUrl,
      ReceiptHandle: msg.ReceiptHandle,
    });

    await client.send(deleteMessage);
    console.log("Successfully deleted message", msg.MessageId, msg.Body);
  });
};

export const setSQSConsumer = ({
  client,
  queueUrl,
  onReceiveMessage,
  onReceiveMessageBatch,
  onError,
  onProcessingError,
}: SetSQSConsumerParams) => {
  const consumer = Consumer.create({
    queueUrl: queueUrl,
    handleMessage: async (message) => {
      console.log("Received message", message);

      onReceiveMessage?.();
      await deleteSQSMessages({ client, queueUrl, messages: [message] });
    },
    handleMessageBatch: async (messages) => {
      console.log("Received batch messages", messages);

      onReceiveMessageBatch?.();
      await deleteSQSMessages({ client, queueUrl, messages });
    },
  });

  consumer.on("error", (error) => {
    onError?.(error);
  });

  consumer.on("processing_error", (error) => {
    onProcessingError?.(error);
  });

  console.log("Consumer started!");
  consumer.start();
};
