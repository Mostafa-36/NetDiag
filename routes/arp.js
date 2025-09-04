import express from "express";
import arp from "node-arp";

const router = express.Router();

// Route: ARP Lookup
router.get("/:ip", (req, res) => {
  const ip = req.params.ip;

  arp.getMAC(ip, (err, mac) => {
    if (err || !mac) {
      res.status(500).json({ error: "ARP lookup failed", details: err });
    } else {
      res.status(200).json({ ip, mac });
    }
  });
});

export default router;
