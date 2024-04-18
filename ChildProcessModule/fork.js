const express = require("express");
const { fork } = require("child_process");

const app = express();

app.get("/sync", (req, res) => {
  const sum = longComputation();

  res.send({ result: sum });
});

app.get("/async", async (req, res) => {
  const sum = await longComputationPromise();
  res.send({ result: sum });
});

app.get("/fork", (req, res) => {
  // Pass data to child
  //   const names = ["San", "Rakesh", "Bob", "Jonson"];
  //   const child = fork("./longtask.js", names);

  const child = fork("./longtask.js");

  //To send message to child process
//   child.send({ name: "San", age: "21" });
  child.send("start");

  //Reading message from child process
  child.on("message", (sum) => {
    res.send({ result: sum });
  });

  //Reading message from child process
  //   child.on("message", (data) => {
  //     console.log(`parent received ${data}`);
  //   });

  child.on("exit", () => {
    console.log(`Child terminated`);
  });
});

const longComputation = () => {
  let sum = 0;
  for (let i = 0; i < 1e10; i++) {
    sum += i;
  }

  return sum;
};

const longComputationPromise = async () => {
  let sum = 0;
  for (let i = 0; i < 1e10; i++) {
    sum += i;
  }

  return sum;
};

app.listen("3001", () => {
  console.log("Server is running on port: 3001");
});
