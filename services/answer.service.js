const Answer = require("../models/Answer.model");
const Question = require("../models/Question.model");

const createAnswer = async (answerData) => {
  const questionExists = await Question.exists({ _id: answerData.question });
  if (!questionExists) {
    throw new Error('Question not found');
  }

  const answer = await Answer.create(answerData);

  await Question.findByIdAndUpdate(
    answerData.question,
    { $push: { answers: answer._id } },
    { new: true }
  );

  return answer;
};

const getAnswersByQuestion = async (questionId) => {
   const question = await Question.findById(questionId)
     .populate('askedBy', 'name email')
     .lean();

   if (!question) {
     throw new Error('Question not found');
   }

   const answers = await Answer.find({ question: questionId })
     .populate('answeredBy', 'name email')
     .lean();

   return {
     ...question,
     answers
   };
};

const getAnswerById = async (answerId) => {
  return await Answer.findById(answerId).populate("answeredBy", "name email");
};

const updateAnswer = async (answerId, updateData) => {
  return await Answer.findByIdAndUpdate(answerId, updateData, {
    new: true,
    runValidators: true
  });
};

const likeAnswer = async (userId, answerId) => {
  const existingLike = await Like.findOne({ user: userId, answer: answerId });
  if (existingLike) {
      throw new Error("You already liked this answer");
  }
  const like = await Like.create({ user: userId, answer: answerId });
  await Answer.findByIdAndUpdate(answerId, { $push: { likes: like._id } });
  return like;
};

const commentOnAnswer = async (userId, answerId, text) => {
  const comment = await Comment.create({ user: userId, answer: answerId, text });
  await Answer.findByIdAndUpdate(answerId, { $push: { comments: comment._id } });
  return comment;
};

const deleteAnswer = async (answerId) => {
   await Like.deleteMany({ answer: answerId });
  await Comment.deleteMany({ answer: answerId });
  return await Answer.findByIdAndDelete(answerId);
};

module.exports = {
  createAnswer,
  likeAnswer,
  commentOnAnswer,
  getAnswersByQuestion,
  getAnswerById,
  updateAnswer,
  deleteAnswer
};