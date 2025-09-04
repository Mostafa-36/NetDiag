import express from "express";
import ping from "ping";

const router = express.Router();

// Route: Perform a ping test to check network connectivity with a given host
router.get("/:host", async (req, res) => {
  const host = req.params.host;

  try {
    // Execute ICMP ping
    const result = await ping.promise.probe(host);

    if (result?.alive === false) throw new Error(result?.output);

    res.json({
      host: result.host,
      alive: result.alive,
      time: result.time + " ms",
      output: result.output,
    });
  } catch (err) {
    res.status(500).json({ error: "Ping failed", details: err.message });
  }
});

export default router;
