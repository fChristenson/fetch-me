import { app } from "./src/app";
import socketio, { Socket } from "socket.io";
import { Emails } from "./src/lib/services/ScrapeService/Email";

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  // tslint:disable
  console.log("Started on port", port);
  console.log("--------------------------");
});

const io = socketio(server);

io.on("connect", (socket: Socket) => {
  setInterval(() => {
    socket.emit("email", Emails(["foo@bar.se", "foo@bar.se", "foo@bar.se", "foo@bar.se", "foo@bar.se", "foo@bar.se", "foo@bar.se"], "localhost:3000"));
  }, 1000)
});
