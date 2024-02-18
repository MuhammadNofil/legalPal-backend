const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
});

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
