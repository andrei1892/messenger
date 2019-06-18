const mongoose = require("mongoose");
const CONFIG = require("../config");

// mongoose
//   .connect(CONFIG.DB_ADRESS, { useNewUrlParser: true })
//   .then(res => console.log("Connection to DB established"))
//   .catch(err => console.log(err));

var Schema = mongoose.Schema;

var MessagesSchema = new Schema({
  participants: { type: Array, required: true, default: [], of: {
      type: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
  }},
  messages: {
    type: Array,
    required: true,
    default: [],
    of: {
       sender: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
       msg_content: String
    }
  },
  last_update: {
    type: Date,
    required: true,
    default: Date.now()
  },
  seen: Boolean
});

var Messages = mongoose.model("messages", MessagesSchema);

module.exports = Messages;
