const mongoose = require('mongoose');

const ShareSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
    required: true
  },
  platform: {
    type: String,
    enum: ['twitter', 'facebook', 'linkedin', 'whatsapp', 'direct'],
    required: true
  },
  sharedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Share', ShareSchema);