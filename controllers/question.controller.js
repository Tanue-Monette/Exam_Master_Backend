const questionService = require("../services/question.service");

const createQuestion = async (req, res) => {
    try {
        const questions = await questionService.getAllQuestionsWithAnswers();

        res.status(200).json({
          success: true,
          count: questions.length,
          questions
        });

      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
};

const getAllQuestions = async (req, res) => {
    try {
        const questions = await questionService.getAllQuestions();
        res.status(200).json({ questions });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getQuestionDetails = async (req, res) => {
  try {
    const question = await questionService.getQuestionWithAnswers(req.params.questionId);
    res.json(question);
  } catch (error) {
    res.status(error.message === 'Question not found' ? 404 : 500)
       .json({ error: error.message });
  }
};


const updateQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;
        const updateData = req.body;


        const question = await questionService.getQuestionById(questionId);

        if (question.askedBy._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, error: "Unauthorized" });
        }

        const updatedQuestion = await questionService.updateQuestion(questionId, updateData);
        res.status(200).json({ success: true, data: updatedQuestion });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


const deleteQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;


        const question = await questionService.getQuestionById(questionId);
        if (question.askedBy._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, error: "Unauthorized" });
        }

        await questionService.deleteQuestion(questionId);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionDetails,
    updateQuestion,
    deleteQuestion,
};