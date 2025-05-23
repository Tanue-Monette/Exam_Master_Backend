const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    answeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: [true, "Question ID is required"],
    },
      likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
      }],
      comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }],
      shareCount: {
        type: Number,
        default: 0
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
});

const Answer = mongoose.model("Answer", AnswerSchema);
module.exports = Answer;