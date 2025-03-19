import {
  ListSubscriptionsByTopicCommand,
  paginateListTopics,
  PublishCommand,
  SNSClient,
  Subscription,
} from "@aws-sdk/client-sns";
import { appConfig } from "../constants/appConfig";

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

export const sendSNSMessage = async (client: SNSClient, message: string) => {
  const response = await client.send(
    new PublishCommand({
      Message: message,
      TopicArn: appConfig.aws.sns.transaction,
    })
  );

  return response;
};
