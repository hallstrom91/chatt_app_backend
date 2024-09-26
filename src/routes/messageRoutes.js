const express = require("express");
const {
  createMessage,
  getMessagesByUserId,
  getMessagesByConversationId,
  deleteMessageById,
} = require("../controllers/messageControllers");
const { validateJwtToken } = require("../utils/jwtUtils");

// express router
const router = express.Router();

/*
=====================================
JWT REQUIRED MESSAGE ROUTES 
=====================================
*/

router.post("/messages", validateJwtToken, createMessage);
router.get("/messages", validateJwtToken, getMessagesByUserId);
router.get(
  "/conversation/:conId",
  validateJwtToken,
  getMessagesByConversationId
);
router.delete("/messages/:msgId", validateJwtToken, deleteMessageById);

module.exports = router;
