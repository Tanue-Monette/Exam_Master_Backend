const questionService = require("../services/question.service");

const createQuestion = async (req, res) => {
    try {
        const { title, year, exam_type, examiner, study_field, image } = req.body;
        const askedBy = req.user._id;

        const questionData = { title, year, exam_type, examiner, study_field, image, askedBy };
        const question = await questionService.createQuestion(questionData);

        res.status(201).json({ success: true, data: question });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
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

const getQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;
        const question = await questionService.getQuestionById(questionId);

        if (!question) {
            return res.status(404).json({ success: false, error: "Question not found" });
        }

        res.status(200).json({ success: true, data: question });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
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
    getQuestion,
    updateQuestion,
    deleteQuestion,
};