require("dotenv").config({ path: [".env.development.local", ".env"] });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { connectDB } = require("./utils/mongoDB");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { generateCSRFToken } = require("./utils/csrfUtils");

const PORT = process.env.PORT;
const app = express();

connectDB().catch((err) => console.error("DB connection error", err));

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
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
app.use("/", userRoutes);
app.use("/", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is live on port: ${PORT}`);
});
