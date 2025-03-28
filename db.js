const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://tanuemonet895:EMrQjC5vtgo0cf4F@backend.h4ulp.mongodb.net/examMaster?retryWrites=true&w=majority&appName=Backend");
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
};

module.exports = connectDB;