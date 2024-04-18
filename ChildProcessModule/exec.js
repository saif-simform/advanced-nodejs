const { exec } = require("child_process");

// exec("command", callback function)

// list out file in current directory
exec("ls -lh", (error, stdout, stderr) => {
  // It will handle error if command is not exist
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  //It handle error after command is executed
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
