const {
  parentPort,
  isMainThread,
  getEnvironmentData,
} = require("worker_threads");

let j = 0;
for (let i = 0; i < 600000; i++) {
  j++;
} //Simulate CPU work

// To read data from parent thread
const msg = getEnvironmentData("msg");

console.log("msg", msg);

parentPort.postMessage(j);
