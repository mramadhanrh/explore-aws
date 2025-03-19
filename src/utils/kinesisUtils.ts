import {
  CreateStreamCommand,
  GetRecordsCommand,
  GetShardIteratorCommand,
  KinesisClient,
  PutRecordCommand,
  ShardIteratorType,
} from "@aws-sdk/client-kinesis";
import { appConfig } from "../constants/appConfig";

interface PutKinesisRecordParams {
  client: KinesisClient;
  message?: string;
}

interface CreateKinesisStreamParams {
  client: KinesisClient;
}

interface GetKinesisRecodsParam {
  client: KinesisClient;
}

export const putKinesisRecord = async ({
  client,
  message,
}: PutKinesisRecordParams) => {
  try {
    const command = new PutRecordCommand({
      StreamARN: appConfig.aws.kinesis.testStream,
      Data: new TextEncoder().encode(
        JSON.stringify({
          message,
          timestamp: Date.now(),
        })
      ),
      PartitionKey: Date.now().toString(),
    });

    const data = await client.send(command);
    console.log("Record added: ", data);

    return data;
  } catch (error) {
    console.error("Error adding record: ", error);
  }
};

export const createKinesisStream = async ({
  client,
}: CreateKinesisStreamParams) => {
  try {
    const command = new CreateStreamCommand({
      StreamName: "NodeJsStream",
      ShardCount: 1,
    });

    const data = await client.send(command);
    console.log("Stream created: ", data);
  } catch (error) {
    console.error("Error creating stream: ", error);
  }
};

export const getKinesisRecords = async ({ client }: GetKinesisRecodsParam) => {
  try {
    const shardIteratorCommand = new GetShardIteratorCommand({
      StreamARN: appConfig.aws.kinesis.testStream,
      ShardId: "shardId-000000000003",
      ShardIteratorType: ShardIteratorType.TRIM_HORIZON,
    });

    const shardIteratorData = await client.send(shardIteratorCommand);

    const getRecordsCommand = new GetRecordsCommand({
      ShardIterator: shardIteratorData.ShardIterator,
    });

    const recordsData = await client.send(getRecordsCommand);

    return recordsData;
  } catch (error) {
    console.error("Error fetching records: ", error);
  }
};
