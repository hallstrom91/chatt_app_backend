const User = require("../models/userModel");
const connectDB = require("../utils/mongoDB");
const { hashPassword, verifyPassword } = require("../utils/bcryptUtils");
const { generateToken } = require("../utils/jwtUtils");
/*
=====================================
CREATE NEW USER 
=====================================
*/

async function createUser(req, res) {
  const { username, password, email, avatar } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
}

/*
=====================================
LOGIN USER
=====================================
*/

async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/*
=====================================
FETCH ALL USERS 
=====================================
*/

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(200).json({ message: "Error fetching all users" });
  }
}

/*
=====================================
FETCH USER BY ID 
=====================================
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
    res.status(500).json({ message: "Error fetching user" });
  }
}

/*
=====================================
UPDATE USER BY ID 
=====================================
*/

async function updateUser(req, res) {
  const { userId, updatedData } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
}

/*
=====================================
DELETE USER BY ID 
=====================================
*/

async function deleteUser(req, res) {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
}

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
