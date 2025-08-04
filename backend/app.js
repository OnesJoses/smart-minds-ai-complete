// This file is now CommonJS for Node compatibility
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const openaiRoutes = require('./routes/openai');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/openai', openaiRoutes);

mongoose.connect('mongodb://localhost:27017/smartminds');
app.listen(5000, () => console.log('Server running on port 5000'));
