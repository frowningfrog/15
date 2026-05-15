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
    socket.emit("message", { text: msg, timestamp: new Date() });
    socket.broadcast.emit("message", { text: msg, timestamp: new Date() });
  });
  socket.emit("message", { text: "welcome!!!", timestamp: new Date() });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("listening on port 3000");
});
