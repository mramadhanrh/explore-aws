import {
  paginateListQueues,
  SendMessageCommand,
  GetQueueAttributesCommand,
  SQSClient,
} from "@aws-sdk/client-sqs";

export const getSQSQueues = async (client: SQSClient) => {
  const paginatedQueues = paginateListQueues({ client }, {});
  const queueUrls = [];

  for await (const page of paginatedQueues) {
    if (page.QueueUrls?.length) {
      const queueUrlsPromise = page.QueueUrls.map(async (queueUrl) => {
        const queueAttributes = await client.send(
          new GetQueueAttributesCommand({
            QueueUrl: queueUrl,
            AttributeNames: ["QueueArn"],
          })
        );

        return [queueUrl, queueAttributes.Attributes];
      });

      queueUrls.push(...(await Promise.all(queueUrlsPromise)));
    }
  }

  return Object.fromEntries(queueUrls);
};

export const sendSQSMessage = () => {
  // const command = new SendMessageCommand({});
};
