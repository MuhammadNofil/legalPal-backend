const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: null
  },
  about: {
    type: String,
    default: null
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  lawyerType: {
    type: String,
    default: 'none'
  },
  contactNo: {
    type: String,
  },
  accountDetails: {
    type: Boolean,
    default: false
  },
  Otp: {
    type: Number,
    default: null
  },
  socketid: {
    type: [String],
    default: []
  },
  password: {
    type: String,
    // required : true
  },
  experience: {
    type: String,
    // required : true
  },
  cus: {
    type: String,
    // required : true
  },
  isCard: {
    type: Boolean,
    // required : true
  },
  isPaid: {
    type: Boolean,
    default: false
    // required : true
  },
  pId: {
    type: Boolean,
    // required : true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;