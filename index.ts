import express, { Request, Response } from "express";
import { setRoutes } from "./src/routes";
import { setSQSConsumer } from "./src/utils/sqsUtils";
import { sqsClient } from "./src/clients/sqsClient";
import { appConfig } from "./src/constants/appConfig";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());
const port = 3000;

setRoutes(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  setSQSConsumer({
    client: sqsClient,
    queueUrl: appConfig.aws.sqs.transaction,
  });
});
