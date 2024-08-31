const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config({ path: [".env.development.local", ".env"] });

const PORT = process.env.PORT;
const app = express();

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

app.listen(PORT, () => {
  console.log(`Server is live on port: ${PORT}`);
});
