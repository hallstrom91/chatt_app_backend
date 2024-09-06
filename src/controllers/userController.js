const User = require("../models/userModel");
const connectDB = require("../utils/mongoDB");

/*
================================
Register - createUser
================================
*/
async function createUser(req, res) {
  const { username, password, email, avatar, invite } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      password,
      avatar,
      invite,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
}

/*
================================
Get all users - getAllUser
================================
*/

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(200).json({ message: "Error fetching all users", error });
  }
}

/*
================================
Get user by Id - getUserById
================================
*/

async function getUserById(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
}

module.exports = { createUser, getAllUsers, getUserById };
