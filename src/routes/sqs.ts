import { Router } from "express";
import { getSQSQueues } from "../utils/sqsUtils";
import { sqsClient } from "../clients/sqsClient";

const router = Router();

router.get("/list", async (req, res) => {
  const sqsQueues = await getSQSQueues(sqsClient);

  req.statusCode = 200;
  res.json({ data: sqsQueues, message: "Successful" });
});

export default router;
