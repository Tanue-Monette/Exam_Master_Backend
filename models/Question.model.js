const mongoose = require("mongoose");
const {TimeStamp} = require("mongoose");

const QuestionSchema = mongoose.Schema(
    {
        title:{
            type: String,
            require:[true, "please enter question title"]
        },
        description:{
            type: String,
            require:[true, "please enter question title"]
        },
        year:{
            type:String,
            required:[true, "exam session year is required"]
        },
        exam_type:{
            type:String,
            enum:["First semester", "Second semester", "CA", "Resit"]
        },
        examiner:{
            type: String,
            required:[true, "Examiner id is required"]
        },
        study_field:{
            type: String,
            required: [true, "field of study is required"]
        },
        image:{
            type:String,
            required: false
        },
        askedBy: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User",
             required: [true, "User ID is required"],
        },
    }
);

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;