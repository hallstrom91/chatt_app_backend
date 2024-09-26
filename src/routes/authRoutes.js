const express = require("express");
const { createUser, loginUser } = require("../controllers/userControllers");
const { validateCSRFToken, generateCSRFToken } = require("../utils/csrfUtils");

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

module.exports = router;
