const express = require("express");
const cluster = require("cluster");
const os = require("os");

// Initiate the app
const app = express();

// To find how many cores is available
const totalCPUs = os.cpus().length;

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);

//   // Fork workers.
//  Create number of workers as number or CPU cores
//   for (let i = 0; i < totalCPUs; i++) {
//     cluster.fork();
//   }
// } else {
//   app.get("/", (req, res) => {
//     return res.json({ message: `Hello from express server ${process.pid}` });
//   });

//   // Start the server
//   const PORT = "3001";
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  // It will create two workers
  cluster.fork();
  cluster.fork();

  //  We can create as many workers as many CPU cores we have
  //   for (let i = 0; i < totalCPUs; i++) {
  //     cluster.fork();
  //   }
} else {
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
}
