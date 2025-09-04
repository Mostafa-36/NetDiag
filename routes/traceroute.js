import express from "express";
import Traceroute from "nodejs-traceroute";

const router = express.Router();

// Route: Run traceroute to a given host
router.get("/:host", (req, res) => {
  const host = req.params.host;
  const hops = [];

  try {
    const tracer = new Traceroute();

    tracer
      .on("hop", (hop) => {
        hops.push(hop);
      })
      .on("close", (code) => {
        res.json({
          host,
          hops,
          message: "Traceroute completed",
        });
      });

    tracer.trace(host);
  } catch (err) {
    res.status(500).json({ error: "Traceroute failed", details: err.message });
  }
});

export default router;
