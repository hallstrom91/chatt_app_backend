const express = require("express");
const {
  sendUserInvite,
  respondToInvite,
  fetchSentInvites,
  fetchReceivedInvites,
  deleteInvite,
} = require("../controllers/inviteControllers");
const { validateJwtToken } = require("../utils/jwtUtils");

const router = express.Router();

/*
=====================================
Invite Handler Routes
=====================================
*/

router.post("/invite/send", validateJwtToken, sendUserInvite); // send invite
router.put("/invite/respond/:inviteId", validateJwtToken, respondToInvite); // response 2 invite
router.get("/invite/sent", validateJwtToken, fetchSentInvites); // show sent invites
router.get("/invite/received", validateJwtToken, fetchReceivedInvites); // show recevied invites
router.delete("/invite/delete/:inviteId", validateJwtToken, deleteInvite); // delete sent invite

module.exports = router;
