const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: {
        type: String,
    },
    rating: {
        type: Number,
    },
});
const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;