const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../logs.json");

function readLogs() {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([]));
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeLog(log) {
  const logs = readLogs();
  logs.push(log);
  fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
}

module.exports = { readLogs, writeLog };