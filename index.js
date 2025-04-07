const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/user.route.js');
const questionRoutes = require("./routes/question.route");
const answerRoutes = require("./routes/answer.route");
const interactionRoutes = require("./routes/answerInteractions.route");
const authMiddleware = require("./middlewares/authMiddleware");
const connectDB = require("./db");
const path = require('path');

const app = express();

connectDB();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const corsOption = {
    origin: "*",
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
      credentials: true,
}
app.use(cors(corsOption));

require("dotenv").config();

app.listen(3000, () =>{
    console.log("serving app");
})


app.use(express.json());

app.use('/api/answers', interactionRoutes);
app.use("/api/answers", answerRoutes);
app.use('/api/users', userRoute);
app.use("/api/questions", questionRoutes);
app.get('/', (req, res) => {
res.send("running my app on the browser")});


