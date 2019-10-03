const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MessagesSchema = new Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  messages: {
    type: Array,
    required: true,
    default: [],
    of: {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      message_content: String
    }
  },
  last_sender:  { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  last_update: {
    type: Date,
    required: true,
    default: Date.now()
  },
  seen: Boolean
});

var Messages = mongoose.model("messages", MessagesSchema);

module.exports = Messages;
