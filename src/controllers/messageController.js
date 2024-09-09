const Message = require("../models/messageModel");

/*
=====================================
CREATE NEW MESSAGE
=====================================
*/

async function createMessage(req, res) {
  try {
    const { text, conversationId, userId } = req.body;
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
  const { userId } = req.params;
  try {
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
  const { conversationId } = req.params;
  try {
    const conversation = await Message.find({ conversationId });
    if (conversation.length === 0) {
      return res.status(204).send();
    }
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversation" });
  }
}

module.exports = {
  getMessagesByUserId,
  getMessagesByConversationId,
  createMessage,
};
