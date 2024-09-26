const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    invite: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "declined", "accepted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Invite = mongoose.model("Invite", inviteSchema, "invites");

module.exports = Invite;
