import { SQSClient } from "@aws-sdk/client-sqs";
import { appConfig } from "../constants/appConfig";

export const sqsClient = new SQSClient({
  credentials: {
    accessKeyId: appConfig.aws.credentials.accessKeyId,
    secretAccessKey: appConfig.aws.credentials.secretAccessKey,
  },
  region: appConfig.aws.region,
});
