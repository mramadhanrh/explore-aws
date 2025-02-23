import { SQSClient } from "@aws-sdk/client-sqs";
import { getSQSQueues } from "../utils/sqsUtils";

export const sqsClient = new SQSClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  region: process.env.AWS_SQS_REGION || "ap-southeast-2",
});

export const sqsQueues = (async () => await getSQSQueues(sqsClient))();
