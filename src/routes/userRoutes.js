const express = require("express");
const {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { validateCSRFToken, generateCSRFToken } = require("../utils/csrfUtils");
const { validateJwtToken } = require("../utils/jwtUtils");

// express router
const router = express.Router();

/*
=====================================
CSRF PATCH & CSRF REQUIRED ROUTES
=====================================
*/
router.patch("/csrf", generateCSRFToken);
router.post("/auth/register", validateCSRFToken, createUser);
router.post("/auth/token", validateCSRFToken, loginUser);

/*
=====================================
JWT REQUIRED USER ROUTES
=====================================
*/
router.post("/invite/:userId", validateJwtToken);
router.get("/users", validateJwtToken, getAllUsers);
router.get("/users/:userId", validateJwtToken, getUserById);
router.put("/user", validateJwtToken, updateUser);
router.delete("/users/:userId", validateJwtToken, deleteUser);

module.exports = router;
