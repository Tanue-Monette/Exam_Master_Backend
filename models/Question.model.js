const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter question title"]
    },
    description: {
      type: String,
      required: [true, "Please enter question description"]
    },
    year: {
      type: String,
      required: [true, "Exam session year is required"]
    },
    exam_type: {
      type: String,
      enum: ["First semester", "Second semester", "CA", "Resit"],
      required: true
    },
      examiner: {
          type: String,
          required: [true, "Examiner is required"]
      },
      course: {
          type: String,
          required: [true, "Course is required"]
      },
    study_field: {
      type: String,
      required: [true, "Field of study is required"]
    },
    file: {
      type: String,
      required: false
    },
    askedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"]
    },
  },
  {
    timestamps: true
  }
);

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;