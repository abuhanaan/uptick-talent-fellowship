const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $shareLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;

socket.on("message", (myMessage) => {
  console.log(myMessage);
  const html = Mustache.render(messageTemplate, {
    message: myMessage,
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Disabling the submit button until message gets delivered
  $messageFormButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message, (error) => {
    // Re-enbling the send button after message gets delivered
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();

    if (error) {
      console.log(error);
    } else {
      console.log("This message was delivered!");
    }
  }); // sends message to the server
});

socket.on("message", (message) => {
  console.log(message);
});

$shareLocationButton.addEventListener("click", () => {
  // Disabling the submit button until message gets delivered
  $shareLocationButton.setAttribute("disabled", "disabled");

  if (!navigator.geolocation) {
    return alert("Your Browser Version Des Not Support Location");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    };

    // Sends Location to the server
    socket.emit("shareLocation", location, () => {
      // Enabling the submit button after message gets delivered
      $shareLocationButton.removeAttribute("disabled");
      console.log("Location shared with other users!");
    });
  });
});
