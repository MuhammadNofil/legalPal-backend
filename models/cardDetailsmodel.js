const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({

    cardNumber: {
        type: String,
        required: true,
    },
    cvc: {
        type: String,
        required: true,
    },
    expiry: {
        type: String,
        required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Card = mongoose.model("Card", CardSchema);
module.exports = Card;