const express = require("express");
const { Worker, isMainThread, setEnvironmentData } = require("worker_threads");
const path = require("path");

// Initiate the app
const app = express();

console.log("isMainThread", isMainThread);

// Handling request without cluster
app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Home Page");
});

app.get("/slow-page", (req, res) => {
  const workerScriptPath = "./worker-thread.js";

  // Resolve the absolute path to the worker script
  const resolvedWorkerScriptPath = path.resolve(__dirname, workerScriptPath);

  // To pass data from parent to worker thread
  setEnvironmentData("msg", "hello from main-thread");

  const worker = new Worker(resolvedWorkerScriptPath);

  worker.on("message", (j) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Slow Page ${j}`);
  });
});

// Start the server
const PORT = "3001";
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handling request with cluster
