require("dotenv").config({ path: [".env.development.local", ".env"] });
const mongoose = require("mongoose");

const uri = process.env.MONGO_DB_URI;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB thru Mongoose!");
  } catch (error) {
    console.error("Failed to establish connection:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
