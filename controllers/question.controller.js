const questionService = require("../services/question.service");

const createQuestion = async (req, res) => {
    try {
    const   {
        title,
        askedBy,
        description,
        exam_type,
        examiner,
        study_field,
        year,
        course,
    } = req.body;

        const file = req.file ? req.file.path : null;
        const questionData = {
            title,
            askedBy,
            description,
            exam_type,
            examiner,
            study_field,
            year,
            course,
            file
        };
        const questions = await questionService.createQuestion(questionData);

        res.status(200).json({
          success: true,
          count: questions.length,
          questions
        });

      } catch (error) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'File size too large. Maximum 5MB allowed.'
            });
        }
        if (error.message.includes('Invalid file type')) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }

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
        const userId = req.user._id;
        const userRole = req.user.role;

        const question = await questionService.getQuestionById(questionId);

        if (
            question.askedBy._id.toString() !== userId.toString() &&
            userRole !== 'admin'
        ) {
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