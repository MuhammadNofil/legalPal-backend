const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reciever: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: {
    type: String,
  },
  flag: {
    type: String,
  },
  payload: {
    type: {
        appointment : { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    }
  },
}); 
const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;