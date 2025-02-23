import { Router } from "express";
import { sqsQueues } from "../clients/sqsClient";

const router = Router();

router.get("/list", async (req, res) => {
  req.statusCode = 200;
  res.json({ data: sqsQueues, message: "Successful" });
});

export default router;
