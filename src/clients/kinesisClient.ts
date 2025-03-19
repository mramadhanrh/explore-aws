import { Kinesis } from "@aws-sdk/client-kinesis";
import { appConfig } from "../constants/appConfig";

export const kinesisClient = new Kinesis({
  credentials: {
    accessKeyId: appConfig.aws.credentials.accessKeyId,
    secretAccessKey: appConfig.aws.credentials.secretAccessKey,
  },
  region: appConfig.aws.region,
});
