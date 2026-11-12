'use strict';
const mongoose = require('mongoose');
const leaveSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, trim: true, index: true },
  type: { type: String, required: true, enum: ['Casual', 'Medical'] },
  days: { type: Number, required: true, min: 1, max: 30 },
  appliedDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Leave', leaveSchema);
