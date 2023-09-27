const socket = io();

socket.on("countUpdated", (count) => {
  console.log("The count has been updated!", count);
});

document.querySelector("#increment").addEventListener("click", () => {
  console.log("Clicked");
  //   Sends message to the server and activates the increment callback
  socket.emit("increment");
});
