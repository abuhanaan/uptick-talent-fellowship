const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessageData,
  generateLocationData,
} = require("./utils/messageData");
const {
  getUser,
  removeUser,
  addUser,
  getUsersInRoom,
} = require("./utils/users");

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

  // socket.emit("message", generateMessageData(welcomeMessage));
  // socket.broadcast.emit(
  //   "message",
  //   generateMessageData("A new user has joined!")
  // );

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });
    if (error) {
      return callback(error);
    }

    socket.join(user.room); // Enables a user to join a particular room
    socket.emit("message", generateMessageData(welcomeMessage));
    // Sends message to all connected user in a particular room
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessageData(`${user.username} has joined!`));

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    // Checks For Foul Language in Message
    if (filter.isProfane(message)) {
      return callback("Foul Language Not Allowed");
    }
    // Send message to all connected client
    // io.emit("msgAllClient", message);
    io.emit("message", generateMessageData(message));
    callback(); // callback called without argument to indicate no error
  });

  socket.on("shareLocation", (location, callback) => {
    io.emit(
      "locationMessage",
      generateLocationData(
        `https://google.com/maps?q=${location.latitude},${location.longitude}`
      )
    );

    // acknowledge event
    callback();
  });

  // for disconnected user
  socket.on("disconnect", () => {
    const leavingUser = removeUser(socket.id);
    if (leavingUser) {
      io.to(leavingUser.room).emit(
        "message",
        generateMessageData(`${leavingUser.username} has left`)
      );
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
