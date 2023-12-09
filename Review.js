const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
    {
        rating: { type: Number, required: true },
        comment: { type: String, required: true }   
    }
);


const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;