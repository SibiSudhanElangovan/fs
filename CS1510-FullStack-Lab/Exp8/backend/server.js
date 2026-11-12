'use strict';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const leaveRoutes = require('./routes/leaveRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/leaveDB';
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/leaves', leaveRoutes);
app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ message: 'Server error. Please try again.' }); });
mongoose.connect(MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Leave Management API: http://localhost:${PORT}`)))
  .catch((error) => { console.error('MongoDB connection failed:', error.message); process.exit(1); });
