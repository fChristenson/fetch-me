import { app } from "./src/app";

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  // tslint:disable
  console.log("Started on port", port);
  console.log("--------------------------");
});

import socketio from "socket.io";

const io = socketio(server);

io.on("connect", (socket) => {
  socket.emit("connect");
});
