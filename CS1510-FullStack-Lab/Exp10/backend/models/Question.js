'use strict';
const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true },
  type: { type: String, enum: ['text', 'choice'], default: 'text', required: true },
  choices: { type: [String], default: [], validate: { validator(value) { return this.type !== 'choice' || value.length >= 2; }, message: 'Choice questions require at least two choices.' } }
}, { timestamps: true });
module.exports = mongoose.model('Question', questionSchema);
