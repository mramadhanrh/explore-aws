import { Express } from "express";
import sqsRouter from "./sqs";
import snsRouter from "./sns";
import kinesisRouter from "./kinesis";

export const setRoutes = (app: Express) => {
  app.use("/sqs", sqsRouter);
  app.use("/sns", snsRouter);
  app.use("/kinesis", kinesisRouter);
};
