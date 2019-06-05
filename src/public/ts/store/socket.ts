import socketio from "socket.io-client";

export const socket = socketio();

socket.on("connect", () => {
  console.log("FOOO");
});
