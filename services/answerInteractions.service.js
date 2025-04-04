const Answer = require('../models/Answer.model');
const Like = require('../models/Like.model');
const Comment = require('../models/Comment.model');
const Share = require('../models/Share.model');

exports.likeAnswer = async (userId, answerId) => {
  const existingLike = await Like.findOne({ user: userId, answer: answerId });
  if (existingLike) throw new Error('Already liked this answer');

  const like = await Like.create({ user: userId, answer: answerId });
  await Answer.findByIdAndUpdate(answerId, { $push: { likes: like._id } });
  return like;
};

exports.unlikeAnswer = async (userId, answerId) => {
  const like = await Like.findOneAndDelete({ user: userId, answer: answerId });
  if (!like) throw new Error('Like not found');

  await Answer.findByIdAndUpdate(answerId, { $pull: { likes: like._id } });
  return like;
};

exports.addComment = async (userId, answerId, content) => {
  const comment = await Comment.create({ author: userId, answer: answerId, content });
  await Answer.findByIdAndUpdate(answerId, { $push: { comments: comment._id } });
  return comment;
};

exports.shareAnswer = async (userId, answerId, platform) => {
  const share = await Share.create({ user: userId, answer: answerId, platform });
  await Answer.findByIdAndUpdate(answerId, { $inc: { shareCount: 1 } });
  return share;
};

exports.getAnswerInteractions = async (answerId) => {
  return await Answer.findById(answerId)
    .populate('likes', 'user createdAt')
    .populate({
      path: 'comments',
      populate: { path: 'author', select: 'username avatar' }
    });
};