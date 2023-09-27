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

document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Your Browser Version Des Not Support Location");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    };

    // Sends Location to the server
    socket.emit("shareLocation", location);
  });
});
