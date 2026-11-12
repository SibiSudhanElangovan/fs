'use strict';
const mongoose = require('mongoose');
const responseSchema = new mongoose.Schema({
  userId: { type: String, default: null, trim: true },
  answers: [{ questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }, answer: { type: mongoose.Schema.Types.Mixed, default: null } }],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Response', responseSchema);
