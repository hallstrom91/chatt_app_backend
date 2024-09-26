const User = require("../models/userModel");
const connectDB = require("../utils/mongoDB");
const { hashPassword, verifyPassword } = require("../utils/bcryptUtils");
const { generateToken } = require("../utils/jwtUtils");
const { validatePassword, validateEmail } = require("../utils/regexUtils");
/*
=====================================
CREATE NEW USER 
=====================================
*/

async function createUser(req, res) {
  const { username, password, email, avatar } = req.body;

  try {
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: "Invalid password format" });
    }
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
    const users = await User.find({}).select("-password").lean();
    const data = users.map((user) => ({
      userId: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    }));

    res.status(200).json(data);
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
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const data = {
      userId: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      invite: user.invite, // remove invite
    };

    res.status(200).json(data);
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
    if (userId !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

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
  const userId = req.params.userId || req.user.userId;
  try {
    if (!userId !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

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
