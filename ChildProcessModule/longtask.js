const longComputation = () => {
  let sum = 0;
  for (let i = 0; i < 1e10; i++) {
    sum += i;
  }

  return sum;
};

//Compute the result and send back to parent
process.on("message", (message) => {
//   console.log("UserData:", message);
  if (message === "start") {
    const sum = longComputation();
    process.send(sum);
  }
});

// const data = process.argv.slice(2);

// function sayHello(names) {
//   names.forEach((name) => {
//     process.send(`Greeting ${name}`);
//   });
// }

// sayHello(data);
