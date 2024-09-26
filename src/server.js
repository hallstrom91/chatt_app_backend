require("./utils/instrument.js");
require("dotenv").config({ path: [".env.development.local", ".env"] });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { connectDB } = require("./utils/mongoDB");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const inviteRoutes = require("./routes/inviteRoutes");
const Sentry = require("@sentry/node");

//socketio test
const { socketIoSetup } = require("./utils/socketIo");
const http = require("node:http");

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);

connectDB().catch((err) => console.error("DB connection error", err));

const corsOptions = {
  credentials: true,

  origin: ["http://localhost:3000", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Baggage", "Sentry-trace"],
};

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'"],
      imgSrc: ["'self'", "data:"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      workerSrc: ["'self'"],
    },
  })
);

app.use(cors(corsOptions));
app.use(express.json());

// routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", messageRoutes);
app.use("/", inviteRoutes);

//use socket
socketIoSetup(server);

Sentry.setupExpressErrorHandler(app);

server.listen(PORT, () => {
  console.log(`Server is live on port: ${PORT}`);
});
