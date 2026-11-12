'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/surveyapp';
const sampleQuestions = [
  { text: 'How satisfied are you with our product?', type: 'choice', choices: ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very dissatisfied'] },
  { text: 'How likely are you to recommend us to a friend?', type: 'choice', choices: ['Very likely', 'Likely', 'Maybe', 'Unlikely', 'Very unlikely'] },
  { text: 'What feature would you like to see next?', type: 'text' },
  { text: 'How easy was it to sign up?', type: 'choice', choices: ['Very easy', 'Easy', 'Okay', 'Hard', 'Very hard'] },
  { text: 'Any other feedback?', type: 'text' },
  { text: 'Rate our customer support.', type: 'choice', choices: ['5', '4', '3', '2', '1'] },
  { text: 'Which platform do you use most?', type: 'choice', choices: ['Web', 'iOS', 'Android', 'Other'] },
  { text: 'How often do you use the product?', type: 'choice', choices: ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never'] }
];
async function seed() {
  try { await mongoose.connect(MONGO_URI); await Question.deleteMany({}); await Question.insertMany(sampleQuestions); console.log(`Seeded ${sampleQuestions.length} survey questions.`); }
  catch (error) { console.error('Seeding failed:', error); process.exitCode = 1; }
  finally { await mongoose.disconnect(); }
}
seed();
