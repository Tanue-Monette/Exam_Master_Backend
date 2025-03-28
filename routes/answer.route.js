const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answer.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/:questionId", answerController.getQuestionAnswers);
router.get("/:id", answerController.getAnswer);

router.post("/", authMiddleware, answerController.createAnswer);
router.put("/:id", authMiddleware, answerController.updateAnswer);
router.delete("/:id", authMiddleware, answerController.deleteAnswer);
router.post("/:answerId/like", authMiddleware, answerController.likeAnswer);
router.post("/:answerId/comment", authMiddleware, answerController.commentOnAnswer);

module.exports = router;