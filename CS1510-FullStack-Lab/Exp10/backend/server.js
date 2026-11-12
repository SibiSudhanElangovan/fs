'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Question = require('./models/Question');
const ResponseModel = require('./models/Response');
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/surveyapp';
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000' }));
app.use(express.json({ limit: '100kb' }));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/api/questions/random', async (req, res, next) => {
  try { const requested = Number.parseInt(req.query.count || '5', 10); if (!Number.isInteger(requested) || requested < 1 || requested > 20) return res.status(400).json({ message: 'count must be between 1 and 20.' }); const questions = await Question.aggregate([{ $sample: { size: requested } }]); res.json(questions); }
  catch (error) { next(error); }
});
app.post('/api/responses', async (req, res, next) => {
  try {
    const { userId = null, answers } = req.body;
    if (!Array.isArray(answers) || answers.length === 0 || answers.length > 20) return res.status(400).json({ ok: false, error: 'Submit between 1 and 20 answers.' });
    for (const item of answers) { if (!mongoose.isValidObjectId(item.questionId)) return res.status(400).json({ ok: false, error: 'An answer contains an invalid question ID.' }); if (typeof item.answer !== 'string' || !item.answer.trim()) return res.status(400).json({ ok: false, error: 'Please answer every question.' }); }
    const knownIds = await Question.countDocuments({ _id: { $in: answers.map((item) => item.questionId) } });
    if (knownIds !== answers.length) return res.status(400).json({ ok: false, error: 'One or more questions no longer exist.' });
    const saved = await ResponseModel.create({ userId, answers: answers.map((item) => ({ questionId: item.questionId, answer: item.answer.trim() })) });
    res.status(201).json({ ok: true, id: saved._id, message: 'Responses saved successfully.' });
  } catch (error) { next(error); }
});
app.get('/api/responses', async (_req, res, next) => { try { const responses = await ResponseModel.find().populate('answers.questionId', 'text type').sort({ createdAt: -1 }).limit(100); res.json(responses); } catch (error) { next(error); } });
app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ message: 'Server error.' }); });
mongoose.connect(MONGO_URI).then(() => app.listen(PORT, () => console.log(`Survey API running at http://localhost:${PORT}`))).catch((error) => { console.error('MongoDB connection failed:', error.message); process.exit(1); });
