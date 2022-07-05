import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { messSocket } from "./mess.controller";

/**
 * It creates a new socket.io server, and when a client connects to it, it logs the connection, and
 * then calls the messSocket function
 * @param {HttpServer} httpServer - The HTTP server instance that the Socket.IO server will attach to.
 */
export default function initSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {});
  io.on("connection", (socket) => {
    console.log("Connecting to socket: " + socket.id);

    socket.on("disconnect", function () {
      console.log("disConnecting to socket: " + socket.id);
    });
    // ...
    messSocket(socket);
    socket.on("upload", (file, callback) => {
      console.log(file); // <Buffer 25 50 44 ...>

      // save the content to the disk, for example
      //  writeFile("/tmp/upload", file, (err) => {
      //    callback({ message: err ? "failure" : "success" });
      //  });
    });
    socket.eventNames().forEach((eventName) => {
      console.log(eventName);
    });

    console.log("a user connected");
  });
}
