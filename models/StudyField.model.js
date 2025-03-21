const mongoose = require("mongoose");

const StudyFieldSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:[true, "name is required"]
        }
    },
    {
        timestamps: true
    }
)

const StudyField = mongoose.model("StudyField", StudyFieldSchema);

module.exports = StudyField