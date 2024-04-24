const fs = require("fs");
const zlib = require("zlib");  // ex: transform stream package
const { Duplex, PassThrough, Transform } = require("stream");
const express = require("express");
const status = require("express-status-monitor");

//Initiate the app
const app = express();

app.use(status());

// 1. Common way of reading data from file

// app.get("/", (req, res) => {
//   fs.readFile("StreamModule/sample.txt", (err, data) => {
//     if (err) return console.error(err);
//     res.end(data.toString());
//   });
// });

/* 2. Reading data as Stream
   Creating readable stream
   Handling stream events : data,end and error 
*/

app.get("/", (req, res) => {
  const rstream = fs.createReadStream("StreamModule/sample.txt", "utf-8");

  // data event to read data from stream
  rstream.on("data", (chunkdata) => {
    res.write(chunkdata);
  });

  // end events fire once no more data is available
  rstream.on("end", () => {
    res.end();
  });

  // error event to handle error while reading file

  rstream.on("error", (err) => {
    console.log(err);
    res.end("File not found");
  });

  // Reading data using stream.pipe(destinaion)

  // rstream.pipe(res);
});

// Writting data as stream

app.get("/write-stream", (req, res) => {
  const data = "Nodejs write stream example";

  const wstream = fs.createWriteStream("StreamModule/output.txt");

  wstream.write(data, "utf-8");
  wstream.end();

  wstream.on("finish", () => {
    console.log("Data written successfully.");
    res.end("Successfully written data.");
  });

  wstream.on("error", (err) => {
    console.log(err.stack);
    res.end(err.stack);
  });
});

// Read data from file and convert to zip using stream.pipe()

app.get("/create-zip", (req, res) => {
  const rstream = fs.createReadStream("StreamModule/sample.txt");
  const wstream = fs.createWriteStream("StreamModule/sample.zip");

  rstream.pipe(zlib.createGzip().pipe(wstream)).on("error", console.error);

  res.end("File created successfully");
});

// Duplex stream : Stream which can be used for both read and write operation.
// Duplex stream can be piped between readable and writable stream

/*
-> In a Duplex stream, throttling can be implemented by controlling the rate at which data is written to or read from the stream. 
Throttling in a Duplex stream can be useful for various reasons, such as:
1. Rate Limiting: Throttling can limit the rate at which data is sent or received over the stream, 
   which can be helpful to prevent overwhelming the system or to adhere to API usage limits.

2.Resource Management: Throttling can also be used to manage system resources. For example, 
  if you're dealing with network streams, throttling can prevent excessive bandwidth consumption.

3.Backpressure Management: Throttling can help manage backpressure within the stream. 
  Backpressure occurs when the writable side of the stream is unable to handle data as fast as it's being provided by the readable side. 
*/

app.get("/duplex", (req, res) => {
  const rstream = fs.createReadStream("StreamModule/sample.txt");
  const wstream = fs.createWriteStream("StreamModule/new_sample.zip");

  class Throttle extends Duplex {
    constructor(ms) {
      super();
      this.delay = ms;
    }

    _read() {}

    _write(chunk, encoding, callback) {
      this.push(chunk);
      setTimeout(callback, this.delay);
    }

    _final() {
      this.push(null);
    }
  }

  const report = new PassThrough();
  const throttle = new Throttle(100);

  let total = 0;
  report.on("data", (chunk) => {
    total += chunk.length;
    console.log("Byte", total);
  });

  rstream.pipe(throttle).pipe(report).pipe(wstream);
});

// Transform Stream : A type of duplex stream where the output is computed based on input.

app.get("/transform", (req, res) => {
  class ReplaceText extends Transform {
    constructor(char) {
      super();
      this.replaceChar = char;
    }

    _transform(chunk, encoding, callback) {
      const transformChunk = chunk
        .toString()
        .replace(/[a-z]|[A-Z]|[0-9]/g, this.replaceChar);

        this.push(transformChunk)
      callback();
    }

    _flush(callback) {
      this.push("more stuff is being passed through ...");
      callback();
    }
  }

  const xstream = new ReplaceText("x");

  process.stdin.pipe(xstream).pipe(process.stdout)
});

//Start the server
const PORT = "3001";

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
