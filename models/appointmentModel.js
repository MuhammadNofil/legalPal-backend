const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({

    medium: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lawyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;