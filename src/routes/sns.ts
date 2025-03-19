import { Router } from "express";
import { getSNSTopics, sendSNSMessage } from "../utils/snsUtils";
import { snsClient } from "../clients/snsClient";

const router = Router();

router.get("/list", async (req, res) => {
  const snsQueues = await getSNSTopics(snsClient);

  res.json({ data: snsQueues, message: "Successful" });
});

router.post("/send", async (req, res) => {
  const { message } = req.body;
  const snsResponse = await sendSNSMessage(snsClient, message);

  res.json({ message: snsResponse });
});

export default router;
