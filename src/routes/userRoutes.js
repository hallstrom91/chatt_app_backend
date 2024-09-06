const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);

module.exports = router;
