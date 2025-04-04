const answerService = require("../services/answer.service");

exports.createAnswer = async (req, res) => {
  try {
    const { title, questionId } = req.body;
    const answeredBy = req.user._id;

    if (!questionId) {
      return res.status(400).json({
        success: false,
        error: 'Question ID is required'
      });
    }

    const answer = await answerService.createAnswer({
      title,
      answeredBy,
      question: questionId
    });

    res.status(201).json({
      success: true,
      data: answer
    });
  } catch (error) {
    const statusCode = error.message === 'Question not found' ? 404 : 400;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

exports.getQuestionAnswers = async (req, res) => {
  try {
    const result = await answerService.getAnswersByQuestion(req.params.questionId);
    res.json(result);
  } catch (error) {
    res.status(error.message === 'Question not found' ? 404 : 500)
       .json({ error: error.message });
  }
};

exports.getAnswer = async (req, res) => {
  try {
    const answer = await answerService.getAnswerById(req.params.id);
    if (!answer) {
      return res.status(404).json({ success: false, error: "Answer not found" });
    }
    res.status(200).json({ success: true, data: answer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const answer = await answerService.getAnswerById(req.params.id);
    if (!answer) {
      return res.status(404).json({ success: false, error: "Answer not found" });
    }

    if (answer.answeredBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: "Not authorized" });
    }

    const updatedAnswer = await answerService.updateAnswer(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedAnswer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await answerService.getAnswerById(req.params.id);
    if (!answer) {
      return res.status(404).json({ success: false, error: "Answer not found" });
    }

    if (answer.answeredBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: "Not authorized" });
    }

    await answerService.deleteAnswer(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.likeAnswer = async (req, res) => {
    try {
        const like = await answerService.likeAnswer(req.user._id, req.params.answerId);
        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.commentOnAnswer = async (req, res) => {
    try {
        const comment = await answerService.commentOnAnswer(req.user._id, req.params.answerId, req.body.text);
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};