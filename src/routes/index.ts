import { Express } from "express";
import sqsRouter from "./sqs";
import snsRouter from "./sns";

export const setRoutes = (app: Express) => {
  app.use("/sqs", sqsRouter);
  app.use("/sns", snsRouter);
};
