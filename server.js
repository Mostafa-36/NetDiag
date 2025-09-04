import express from "express";

import { writeLog } from "./utils/logger.js";

import ipRoutes from "./routes/ip.js";
import ipPing from "./routes/ping.js";
import tracerouteRoutes from "./routes/traceroute.js";
import arpRoutes from "./routes/arp.js";
import logRoutes from "./routes/log.js";

const app = express();

app.use((req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const log = `[${new Date().toISOString()}] IP: ${ip}\n`;
  writeLog(log);
  next();
});

app.use("/ip", ipRoutes);
app.use("/ping", ipPing);
app.use("/traceroute", tracerouteRoutes);
app.use("/arp", arpRoutes);
app.use("/log", logRoutes);

const PORT = 4001;

// Listening on all network interfaces (accessible from any device, local or external)
// app.listen(PORT, "0.0.0.0", () => {
//   console.log("Listening to server...");
// });

// Listening only on a specific LAN IP (accessible only to devices in the same subnet)
// app.listen(PORT, "192.168.1.7", () => {
//   console.log("Listening to server...");
// });

// Listening only on localhost (accessible only from the same machine)
app.listen(PORT, "127.0.0.1", () => {
  console.log("Listening to server...");
});
