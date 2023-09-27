const socket = io();

socket.on("welcome", (myMessage) => {
  console.log(myMessage);
});

document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message); // sends message to the server
});

socket.on("msgAllClient", (message) => {
  console.log(message);
});
