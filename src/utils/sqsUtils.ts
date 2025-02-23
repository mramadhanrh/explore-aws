import {
  paginateListQueues,
  GetQueueAttributesCommand,
  SQSClient,
  QueueAttributeName,
} from "@aws-sdk/client-sqs";

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

export const sendSQSMessage = () => {
  // const command = new SendMessageCommand({});
};
