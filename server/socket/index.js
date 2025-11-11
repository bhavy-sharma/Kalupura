// socket/index.js
import { Server } from 'socket.io';

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket.IO connected:", socket.id);

    socket.on("join_room", (data) => {
      socket.join(data.room);
      console.log(`${data.user} has joined the room: ${data.room}`);
      // socket.to(data.room).emit("recivedmsg", {
      //   room: data.room,
      //   username: "Member",
      //   message: `${data.user} has joined the chat`,
      //   time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      // });
    });

    socket.on("sendmsg", (data) => {
      console.log("msg:",data)
      io.to(data.room).emit("recivedmsg", data);
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO disconnected:", socket.id);
    });
  });

  return io;
}

export { setupSocket };