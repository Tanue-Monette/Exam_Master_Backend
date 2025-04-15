const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:[true, "please enter user name"]
        },
        email:{
            type: String,
            required: [true, "please enter email"],
            unique: true
        },
        password:{
            type: String,
            required: [true, "please enter password"]
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            required: true
        },
        image:{
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;