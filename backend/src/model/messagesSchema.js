const mongoose = require("mongoose");
const CONFIG = require("../config");

// mongoose
//   .connect(CONFIG.DB_ADRESS, { useNewUrlParser: true })
//   .then(res => console.log("Connection to DB established"))
//   .catch(err => console.log(err));

var Schema = mongoose.Schema;

var MessagesSchema = new Schema({
  participants: { type: Array, required: true, default: [] },
  messages: {
    type: array,
    required: true,
    default: [],
    of: {
        type: Object
    }
  }
});

var Messages = mongoose.model("messages", MessagesSchema);

module.exports = Messages;
