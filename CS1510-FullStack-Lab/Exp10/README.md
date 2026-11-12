# Experiment 10 — Online Survey

1. Start MongoDB locally.
2. Backend terminal: `cd Exp10/backend`, `npm install`, `npm run seed`, `npm start`.
3. Frontend terminal: `cd Exp10/frontend`, `npm install`, `npm start`.
4. Open `http://localhost:3000`. The React UI fetches five random questions from MongoDB and submits answers to the API.

The database is `surveyapp`. To inspect saved answers, request `GET http://localhost:5000/api/responses`.
