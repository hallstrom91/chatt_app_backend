const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false, unique: false },
    invite: { type: String, required: false, unique: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
