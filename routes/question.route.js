const express = require("express");
const router = express.Router();
const questionController = require("../controllers/question.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerConfig");

router.post("/", authMiddleware, upload.single('file'), questionController.createQuestion);

router.get("/", questionController.getAllQuestions);

router.get("/:questionId", questionController.getQuestionDetails);

router.put("/:id", authMiddleware, questionController.updateQuestion);

router.delete("/:id", authMiddleware, questionController.deleteQuestion);

module.exports = router;