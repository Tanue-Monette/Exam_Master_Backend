const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    answer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
        required: true,
    },
}, { timestamps: true });

const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;