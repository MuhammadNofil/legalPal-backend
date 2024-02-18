const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  users : {
    type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  lastMessage : {
    type : String
  },
  status : {
    type : String
  },
  activeDate : {
    type : Date
  },
  seen : {
    type : Boolean
  }
});
const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;