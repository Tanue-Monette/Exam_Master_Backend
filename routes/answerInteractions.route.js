const express = require('express');
const router = express.Router();
const controller = require('../controllers/answerInteractions.controller');
const auth = require('../middlewares/authMiddleware');

router.post('/:answerId/like', auth, controller.likeAnswer);

router.delete('/:answerId/like', auth, controller.unlikeAnswer);

router.post('/:answerId/comments', auth, controller.addComment);

router.post('/:answerId/share', auth, controller.shareAnswer);

router.get('/:answerId/interactions', controller.getAnswerInteractions);

module.exports = router;