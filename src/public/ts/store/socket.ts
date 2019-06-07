import socketio from "socket.io-client";

export const contactEvent = "contact";
export const endEvent = "end";

export const socket = socketio();

