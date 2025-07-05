const express = require("express");
const cors = require("cors");
const { readLogs, writeLog } = require("./utils/fileHandler");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/logs", (req, res) => {
  const {
    level, message, resourceId, timestamp,
    traceId, spanId, commit, metadata,
  } = req.body;

  if (!level || !message || !resourceId || !timestamp || !traceId || !spanId || !commit || !metadata) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  writeLog(req.body);
  return res.status(201).json(req.body);
});

app.get("/logs", (req, res) => {
  let logs = readLogs();
  const { level, message, resourceId, timestamp_start, timestamp_end } = req.query;

  if (level) logs = logs.filter(log => log.level === level);
  if (message) logs = logs.filter(log => log.message.toLowerCase().includes(message.toLowerCase()));
  if (resourceId) logs = logs.filter(log => log.resourceId === resourceId);
  if (timestamp_start) logs = logs.filter(log => new Date(log.timestamp) >= new Date(timestamp_start));
  if (timestamp_end) logs = logs.filter(log => new Date(log.timestamp) <= new Date(timestamp_end));

  logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  return res.status(200).json(logs);
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));