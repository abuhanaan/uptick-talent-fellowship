# CHAT APPLICATION

## Instruction

Create a simple distributed chat application using WebSocket technology. Users can join chat rooms and exchange messages in real-time.

### Live URL: [https://chat-app-pdtt.onrender.com/](https://chat-app-pdtt.onrender.com/)

---

## Getting Started:

The steps below are to be followed to run this project locally:

- Clone the project.
- Navigate into the project directory i.e "02-chat-app"
- Run the haproxy config by running the command below\
  `haproxy -f src/haproxy.cfg`
- Run the command below to run this application on port 3000\
  `npm run dev -p 3000`
- Open a new terminal and run the command below to run another instance of this application on a different port\
  `npm run dev -p 3001`
- Access the UI of this app by loading `localhost:8000` on your browser and the HAProxy load balancer route requests to the running two instances via ports 3000 and 3001
