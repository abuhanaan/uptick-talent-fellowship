const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

let count = 0;

let welcomeMessage = "Welcome here!!!";

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.emit("welcome", welcomeMessage);
  socket.broadcast.emit("welcome", "A new user has joined!");

  socket.on("sendMessage", (message) => {
    // Send message to all conected client
    io.emit("msgAllClient", message);
  });

  // for disconnected user
  socket.on("disconnect", () => {
    io.emit("welcome", "A user has left");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
