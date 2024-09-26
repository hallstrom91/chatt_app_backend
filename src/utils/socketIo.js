const { Server } = require("socket.io");

function socketIoSetup(server) {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:5173"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("user connected", socket);

    socket.on("message", (data) => {
      console.log("Message recived", data);
      io.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected.");
    });
  });
}

module.exports = { socketIoSetup };
