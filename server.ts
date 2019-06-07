import { app } from "./src/app";
import socketio, { Socket } from "socket.io";
import { contactEvent, endEvent } from "./src/public/ts/store/socket";
import { scrapeService } from "./src/lib/services";

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  // tslint:disable
  console.log("Started on port", port);
  console.log("--------------------------");
});

//TODO: remove socket, add retry button
const io = socketio(server);

io.on("connect", async (socket: Socket) => {
  socket.on(contactEvent, async (url: string) => {
    const result = await scrapeService.getContactInformation(url);
    socket.emit(contactEvent, result);
    socket.emit(endEvent);
  });
});
