const mongoose = require("mongoose");

const ExaminerSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "title can not be empty"]
        },
    },
    {
        timestamps: true
    }
);

const Examiner = mongoose.model("Examiner", ExaminerSchema);

module.exports = Examiner;