const Question = require("../models/Question.model");
const Answer = require("../models/Answer.model");

const createQuestion = async (questionData) => {
    const question = new Question(questionData);
    return await question.save();
};

const getAllQuestions = async () => {
     const allAnswers = await Answer.find()
         .populate('answeredBy', 'username name')
         .populate({
           path: 'comments',
           populate: {
             path: 'user',
             select: 'username'
           }
         })
         .sort({ createdAt: -1 });

       // Group answers by question ID
       const answersByQuestion = allAnswers.reduce((acc, answer) => {
         const questionId = answer.question.toString();
         if (!acc[questionId]) {
           acc[questionId] = [];
         }
         acc[questionId].push(answer);
         return acc;
       }, {});

       // Get all questions and attach their answers
       const questions = await Question.find()
         .populate('askedBy', 'username name email')
         .sort({ createdAt: -1 });

       return questions.map(question => ({
         ...question.toObject(),
         answers: answersByQuestion[question._id.toString()] || []
       }));
};

const getQuestionWithAnswers = async (questionId) => {
 const question = await Question.findById(questionId)
     .populate('askedBy', 'name')
     .populate({
       path: 'answers',
       populate: [
         {
           path: 'answeredBy',
           select: 'name'
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