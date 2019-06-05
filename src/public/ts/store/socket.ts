import socketio from "socket.io-client";

export const socket = socketio({autoConnect: false});
