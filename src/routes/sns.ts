import { Router } from "express";
import { getSNSTopics } from "../utils/snsUtils";
import { snsClient } from "../clients/snsClient";

const router = Router();

router.get("/list", async (req, res) => {
  const snsQueues = await getSNSTopics(snsClient);

  res.json({ data: snsQueues, message: "Successful" });
});

export default router;
