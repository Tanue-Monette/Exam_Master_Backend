const interactionService = require('../services/answerInteractions.service');

exports.likeAnswer = async (req, res) => {
  try {
    const like = await interactionService.likeAnswer(req.user._id, req.params.answerId);
    res.status(201).json(like);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.unlikeAnswer = async (req, res) => {
  try {
    await interactionService.unlikeAnswer(req.user._id, req.params.answerId);
    res.json({ message: 'Unliked successfully' });
  } catch (error) {
    res.status(error.message === 'Like not found' ? 404 : 400).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const comment = await interactionService.addComment(
      req.user._id,
      req.params.answerId,
      req.body.content
    );
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.shareAnswer = async (req, res) => {
  try {
    const share = await interactionService.shareAnswer(
      req.user._id,
      req.params.answerId,
      req.body.platform
    );
    res.status(201).json(share);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAnswerInteractions = async (req, res) => {
  try {
    const answer = await interactionService.getAnswerInteractions(req.params.answerId);
    console.log("comments: ", answer)
    res.json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};