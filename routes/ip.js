import express from "express";
import { getPrivateIP } from "../utils/getPrivateIP.js";
import { getPublicIP } from "../utils/getPublicIP.js";

const router = express.Router();

// Route: Get Server IPs
router.get("/myip", async (req, res) => {
  try {
    const privateIP = getPrivateIP();
    const publicIP = await getPublicIP();

    res.json({
      privateIP, // Private IP address inside the local network (LAN)
      publicIP, // Public IP address visible on the internet
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to retrieve IPs", details: err.message });
  }
});

// Route: Get Client IP
router.get("/client", (req, res) => {
  // Detect the IP address of the client that sent this request
  const clientIP =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown";

  res.json({
    clientIP,
    message: "Client IP address connected to the server",
  });
});

export default router;
