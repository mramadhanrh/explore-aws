import { Express } from "express";
import sqsRouter from "./sqs";

export const setRoutes = (app: Express) => {
  app.use("/sqs", sqsRouter);
};
