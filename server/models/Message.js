const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  persona: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Persona',
  },
  content: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const MessageModel = mongoose.model('Message', MessageSchema);
module.exports = MessageModel;
