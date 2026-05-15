import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.static("public"));
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("clientMessage", (msg) => {
    console.log("received", msg);
    socket.emit("message", `msg received ${msg}`);
  });
  socket.emit("message", "welcome!!!");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("listening on port 3000");
});
