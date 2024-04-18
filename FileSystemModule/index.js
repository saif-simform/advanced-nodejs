const fs = require("fs");

/*
-> Creating new file Sync.... Blocking...
-> If file is not present then will create and if exist then overwrite the file data
*/

// fs.writeFileSync("FileSystemModule/read.txt", "Hello from filesystem");

/*
-> Creating new file Asyn.....Non-Blocking..
-> It will create file in non-blocking manner and we can also pass a call back function
*/

// fs.writeFile("FileSystemModule/read.txt", "Hello from filesystem", (err) => {});

/*
-> Reading file synchronously
-> Synchronous file system return the result which we can store into a variable

-> Node.js includes an additional data type called Buffer (not available in browser's javascript)
-> Buffer is mainly used to store binary data.
-> While reading from a file or receiving packets over the network.
-> We can encode buffer data using encoding as well: fs.readFileSync("FileSystemModule/append.txt", "utf-8");
*/

// const buf_data = fs.readFileSync("FileSystemModule/append.txt");

// To convert buffer data into string toString()
// const data = buf_data.toString();
// console.log(data);

/*
-> Reading file Asynchronously
-> Asynchonous file system will not return result instead it require a callback which will handle the error and result
*/

// fs.readFile("FileSystemModule/append.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result);
//   }
// });

/*
-> To append new data on existing file
-> It is useful for monitoring purpose like creating user logs,server logs etc.
*/

// fs.appendFileSync("FileSystemModule/append.txt", " How are you");

/* 
-> To Rename existing file
*/

// fs.renameSync('FileSystemModule/read.txt','FileSystemModule/readwrite.txt')

/*
-> To create a copy of a file
*/

// fs.cpSync(
//   "FileSystemModule/readwrite.txt",
//   "FileSystemModule/copy-readwrite.txt"
// );

/*
-> To delete a file
*/

// fs.unlinkSync("FileSystemModule/copy-readwrite.txt")

/*
-> To check status a file
*/

// const fileStatus= fs.statSync("FileSystemModule/readwrite.txt")
// console.log(fileStatus)

/*
-> To check whether it's file or directory
*/

// const fileStatus= fs.statSync("FileSystemModule/readwrite.txt").isFile()
// console.log(fileStatus)

/*
-> To create a directory
-> To create recursive directory we can pass option as : fs.mkdirSync('FileSystemModule/Test-Dir/A/B',{recursive:true})
*/

// fs.mkdirSync('FileSystemModule/Test-Dir')

/*
-> To delete directory
*/

// fs.rmdirSync('FileSystemModule/Test-Dir')

