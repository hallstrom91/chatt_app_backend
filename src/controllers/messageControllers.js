const Message = require("../models/messageModel");

/*
=====================================
CREATE NEW MESSAGE
=====================================
*/

async function createMessage(req, res) {
  try {
    const { text, conversationId } = req.body;
    console.log("req-body", req.body);
    const userId = req.body.userId || req.user.userId; // get value from body or jwt
    if (!text && !conversationId) {
      return res
        .status(400)
        .json({ message: "Text and conversationId is required" });
    }
    if (!userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const newMessage = new Message({ text, conversationId, userId });
    await newMessage.save();
    res
      .status(201)
      .json({ message: "Message created successfully", newMessage });
  } catch (error) {
    res.status(500).json({ message: "Error creating message" });
  }
}

/*
=====================================
FETCH MESSAGES FOR USER 
=====================================
*/

async function getMessagesByUserId(req, res) {
  const userId = req.user.userId;

  /*   const limit = parseInt(req.query.limit) || 100;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit; */

  try {
    //add limit and skip to Message.find
    const messages = await Message.find({ userId }).sort({ createdAt: -1 });
    if (messages.length === 0) {
      return res.status(204).send();
    }
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages for user by ID" });
  }
}

/*
=====================================
FETCH MESSAGES BY CON-ID 
=====================================
*/

async function getMessagesByConversationId(req, res) {
  const { conId } = req.params;
  const userId = req.user.userId;
  try {
    const conversation = await Message.find({ conversationId: conId });
    if (conversation.length === 0) {
      return res.status(204).send();
    }
    const hasAccess = conversation.some((message) => message.userId === userId);

    if (!hasAccess) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversation" });
  }
}

/*
=====================================
DELETE MESSAGES BY ID
=====================================
*/

async function deleteMessageById(req, res) {
  const { msgId } = req.params;
  console.log("msgId", msgId);
  const userId = req.user.userId;
  try {
    const message = await Message.findById(msgId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (message.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Message.findByIdAndDelete(msgId);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message" });
  }
}

module.exports = {
  getMessagesByUserId,
  getMessagesByConversationId,
  createMessage,
  deleteMessageById,
};
