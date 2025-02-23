import {
  ListSubscriptionsByTopicCommand,
  ListSubscriptionsByTopicCommandOutput,
  paginateListTopics,
  SNSClient,
  Subscription,
} from "@aws-sdk/client-sns";

export const getSNSTopics = async (client: SNSClient) => {
  const paginatedTopics = paginateListTopics({ client }, {});
  const topicSubs: Record<string, Subscription[]> = {};

  for await (const page of paginatedTopics) {
    if (page.Topics?.length) {
      for (const topic of page.Topics) {
        if (!topic?.TopicArn) continue;

        const subscribers = await client.send(
          new ListSubscriptionsByTopicCommand({ TopicArn: topic.TopicArn })
        );

        if (subscribers?.Subscriptions)
          topicSubs[topic.TopicArn] = subscribers.Subscriptions;
      }
    }
  }

  return topicSubs;
};
