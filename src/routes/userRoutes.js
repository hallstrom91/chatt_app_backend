const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const { validateJwtToken } = require("../utils/jwtUtils");

// express router
const router = express.Router();

/*
=====================================
JWT REQUIRED USER ROUTES
=====================================
*/

router.get("/users", validateJwtToken, getAllUsers);
router.get("/users/:userId", validateJwtToken, getUserById);
router.put("/user", validateJwtToken, updateUser);
router.delete("/users/:userId", validateJwtToken, deleteUser);

module.exports = router;
