const Question = require("../models/Question.model");

const createQuestion = async (questionData) => {
    const question = new Question(questionData);
    return await question.save();
};

const getAllQuestions = async () => {
    return await Question.find().populate("askedBy", "username email");
};

const getQuestionById = async (questionId) => {
    return await Question.findById(questionId).populate("askedBy", "username email");
};

const updateQuestion = async (questionId, updateData) => {
    return await Question.findByIdAndUpdate(questionId, updateData, { new: true });
};

const deleteQuestion = async (questionId) => {
    return await Question.findByIdAndDelete(questionId);
};

module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
};