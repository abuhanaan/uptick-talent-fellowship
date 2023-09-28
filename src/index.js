const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");

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

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    // Checks For Foul Language in Message
    if (filter.isProfane(message)) {
      return callback("Foul Language Not Allowed");
    }
    // Send message to all connected client
    io.emit("msgAllClient", message);
    callback(); // callback called without argument to indicate no error
  });

  socket.on("shareLocation", (location, callback) => {
    socket.broadcast.emit(
      "welcome",
      `https://google.com/maps?q=${location.latitude},${location.longitude}`
    );

    // acknowledge event
    callback();
  });

  // for disconnected user
  socket.on("disconnect", () => {
    io.emit("welcome", "A user has left");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
