const Question = require("../models/Question.model");

const createQuestion = async (questionData) => {
    const question = new Question(questionData);
    return await question.save();
};

const getAllQuestions = async () => {
    return await Question.find().populate("askedBy", "username email");
};

const getQuestionWithAnswers = async (questionId) => {
 const question = await Question.findById(questionId)
     .populate('askedBy', 'username')
     .populate({
       path: 'answers',
       populate: [
         {
           path: 'answeredBy',
           select: 'username'
         },
         {
           path: 'comments',
           populate: {
             path: 'user',
             select: 'name'
           }
         },
         {
           path: 'likes',
           populate: {
             path: 'user',
             select: 'name'
           }
         }
       ]
     });

   if (!question) {
     throw new Error('Question not found');
   }

   return question;
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
    getQuestionWithAnswers,
    updateQuestion,
    deleteQuestion,
};