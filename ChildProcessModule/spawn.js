const { spawn } = require("child_process");

// spawn(command,[argument])

//list out file in current directory
const child = spawn("ls", ["-lh"]);

//list out all the file in the current directory
// const child = spawn("find", ["/"]);

//handling standard output
child.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

//handling standard error
child.stderr.on('data', (data)=>{
  console.log(`stderr: ${data}`);
})

//handling error
child.on('error',(error)=>{
  console.log(`error: ${error.message}`);
})

//handling process exit
child.on('exit',(code,signal) =>{
  if(code) console.log(`Process exit with code: ${code}`);
  if(signal) console.log(`Process killed with signal: ${signal}`);

  console.log(`Done`)
})
