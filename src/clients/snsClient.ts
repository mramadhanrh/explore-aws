import { SNSClient } from "@aws-sdk/client-sns";
import { appConfig } from "../constants/appConfig";

export const snsClient = new SNSClient({
  credentials: {
    accessKeyId: appConfig.aws.credentials.accessKeyId,
    secretAccessKey: appConfig.aws.credentials.secretAccessKey,
  },
  region: appConfig.aws.region,
});
