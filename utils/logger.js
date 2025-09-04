import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, "..", "ip-logs.txt");

export function writeLog(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;

  try {
    fs.appendFileSync(logFilePath, logEntry);
  } catch (err) {
    console.error("Failed to write log:", err);
  }
}

export function readLogs() {
  return fs.readFileSync(logFilePath, "utf-8");
}
