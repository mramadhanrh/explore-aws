import { Router } from "express";
import { getKinesisRecords, putKinesisRecord } from "../utils/kinesisUtils";
import { kinesisClient } from "../clients/kinesisClient";

const router = Router();

router.post("/send", async (req, res) => {
  const kinesisRes = await putKinesisRecord({
    client: kinesisClient,
    message: req.body.message || "No message from API",
  });

  res.json({ data: kinesisRes });
});

router.get("/records", async (req, res) => {
  const kinesisRecords = await getKinesisRecords({
    client: kinesisClient,
  });

  res.json({ data: kinesisRecords });
});

export default router;
