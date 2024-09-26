const Invite = require("../models/inviteModel");

/*
=====================================
SEND INVITE
=====================================
*/
async function sendUserInvite(req, res) {
  const { receiverId, inviteId } = req.body;
  const senderId = req.user.userId;
  try {
    const invite = new Invite({
      sender: senderId,
      receiver: receiverId,
      invite: inviteId,
    });
    await invite.save();
    res.status(201).json({ message: "Invite sent", invite });
  } catch (error) {
    res.status(500).json({ message: "Failed to send invite" });
  }
}

/*
=====================================
RESPONSE TO INVITE
=====================================
*/

async function respondToInvite(req, res) {
  const { inviteId } = req.params;
  const { response } = req.body;

  try {
    const invite = await Invite.findById(inviteId);

    if (!invite) {
      return res.status(404).json({ message: "Invite not found." });
    }

    if (invite.receiver !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    invite.status = response;
    await invite.save();
    res.status(200).json({ message: `Invite ${response}`, invite });
  } catch (error) {
    res.status(500).json({ message: "Error responding to invite" });
  }
}

/*
=====================================
GET SENT INVITES
=====================================
*/
async function fetchSentInvites(req, res) {
  const senderId = req.user.userId;
  try {
    const invites = await Invite.find({ sender: senderId });
    if (!invites) {
      return res.status(404).json({ message: "No invites found." });
    }

    res.status(200).json({ message: "Invites sent:", invites });
  } catch (error) {
    res.status(500).json({ message: "Error fetching sent invites" });
  }
}

/*
=====================================
GET RECIVED INVITES
=====================================
*/

async function fetchReceivedInvites(req, res) {
  const receiverId = req.user.userId;
  try {
    const invites = await Invite.find({ receiver: receiverId });
    if (!invites) {
      return res.status(404).json({ message: "No invites found." });
    }
    /* if (invites.receiver !== receiverId) {
      return res.status(403).json({ message: "Unauthorized" });
    } */

    res.status(200).json({ message: "Invites recived:", invites });
  } catch (error) {
    res.status(500).json({ message: "Error fetching recived invites." });
  }
}

/*
=====================================
DELETE SENT INVITE - ONLY FOR SENDER
=====================================
*/

async function deleteInvite(req, res) {
  const { inviteId } = req.params;
  const senderId = req.user.userId;
  try {
    const invite = await Invite.findById(inviteId);

    if (!invite) {
      return res.status(404).json({ message: "Invite not found." });
    }

    if (invite.sender !== senderId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (invite.status === "declined" || invite.status === "pending") {
      await invite.deleteOne();
      return res.status(200).json({ message: "Invite has been deleted" });
    } else if (invite.status === "accepted") {
      return res
        .status(400)
        .json({ message: "Accepted invites can not be deleted" });
    } else {
      return res
        .status(400)
        .json({ message: "Unknown invite status. Cant deal with this sorry" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting invite" });
  }
}

module.exports = {
  sendUserInvite,
  respondToInvite,
  fetchSentInvites,
  fetchReceivedInvites,
  deleteInvite,
};
