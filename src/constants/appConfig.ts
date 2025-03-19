export const appConfig = {
  aws: {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    region: process.env.AWS_REGION || "ap-southeast-2",
    sqs: {
      transaction: process.env.AWS_SQS_TRANSACTION as string,
    },
    sns: {
      transaction: process.env.AWS_SNS_TOPIC_TRANSACTION as string,
    },
    kinesis: {
      testStream: process.env.AWS_KINESIS_STREAM_ARN_TESTSTREAM as string,
    },
  },
};
