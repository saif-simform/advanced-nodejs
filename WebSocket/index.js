const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const fs = require("fs");

//Initiate connection
const app = express();
const port = 3001;

const server = http.createServer(app);

//Socket server
const io = new Server(server);

app.use(express.static(path.resolve("./client")));
app.use(express.static(path.resolve("./upload")));

app.get("/", (req, res) => {
  console.log("hello");
  return res.sendFile("/client/index.html");
});

//Socket connection
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // Reading client message
  socket.on("user-message", (message) => {
    //send client message to other client
    io.emit("server-message", message);
  });

  socket.on("upload", (data, fileName, callback) => {
    const uploadDir = path.join(__dirname, "Upload-dir");

    // Create the "Upload-dir" directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const filePath = path.join(uploadDir, fileName);

    fs.writeFile(filePath, Buffer.from(data), (err) => {
      // console.log("file", file);
      if (err) {
        console.error("Error writing file:", err);
        callback({ message: "failure" });
      } else {
        console.log(`File ${fileName} uploaded successfully`);
        callback({ message: "success" });
      }
    });
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// We cannot use this approach to create a server b'coz we have to attach websocket server with existing one
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
