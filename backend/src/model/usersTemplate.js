const mongoose = require("mongoose");
const CONFIG = require("../config");

mongoose
  .connect(CONFIG.DB_ADRESS, { useNewUrlParser: true })
  .then(res => console.log("Connection to DB established"))
  .catch(err => console.log(err));

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  friends: {
    type: Array,
    required: true,
    default: [],
    of: {
      friend: { type: Schema.Types.ObjectId, ref: "user" },
      conversation: { type: Schema.Types.ObjectId, ref: "messages" }
    }
  },
  requests_to_confirm: {
    type: Array,
    required: true,
    default: [],
    of: {
      type: { type: Schema.Types.ObjectId, ref: "user" },
      unique: true,
      require: true
    }
  },
  waiting_for_confirmation: {
    type: Array,
    required: true,
    default: [],
    of: {
      type: { type: Schema.Types.ObjectId, ref: "user" },
      unique: true,
      require: true
    }
  },
  last_activity: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

var User = mongoose.model("users", UserSchema);

module.exports = User;
