import express from "express";

import { readLogs } from "../utils/logger.js";

const router = express.Router();

// Route: Get Logs
router.get("/", (req, res) => {
  const data = readLogs();
  res.type("text").send(data);
});

export default router;
