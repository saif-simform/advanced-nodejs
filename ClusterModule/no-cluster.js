const express = require("express");

// Initiate the app
const app = express();

// Handling request without cluster
app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Home Page");
});

app.get("/slow-page", (req, res) => {
  for (let i = 0; i < 600000; i++) {
    console.log(i);
  } //Simulate CPU work
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Slow Page");
});

// Start the server
const PORT = "3001";
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handling request with cluster
