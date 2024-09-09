const express = require("express");
const {
  createMessage,
  getMessagesByUserId,
  getMessagesByConversationId,
} = require("../controllers/messageController");
const { validateJwtToken } = require("../utils/jwtUtils");

// express router
const router = express.Router();

/*
=====================================
JWT REQUIRED MESSAGE ROUTES 
=====================================
*/

router.post("/messages", validateJwtToken, createMessage);
router.get("/messages/:userId", validateJwtToken, getMessagesByUserId);
router.get(
  "/conversation/:conId",
  validateJwtToken,
  getMessagesByConversationId
);
router.delete("/messages/:msgId", validateJwtToken);

module.exports = router;
