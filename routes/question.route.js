const express = require("express");
const router = express.Router();
const questionController = require("../controllers/question.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, questionController.createQuestion);

router.get("/", questionController.getAllQuestions);

router.get("/:id", questionController.getQuestion);

router.put("/:id", authMiddleware, questionController.updateQuestion);

router.delete("/:id", authMiddleware, questionController.deleteQuestion);

module.exports = router;