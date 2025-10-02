// server.js
const path = require('path');
const express = require('express');
const app = express();

// Load environment variables (PORT, MONGO_URI, etc.)
require('dotenv').config({ path: path.join(__dirname, 'config', 'config.env') });

// Call connectDB() from server.js:
const connectDB = require('./config/db');
connectDB();

// Parse JSON request bodies
app.use(express.json());

const User = require('./models/User');

// CREATE one user
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// FIND users (optionally by query, e.g., /users?name=Bob)
app.get('/users', async (req, res) => {
  try {
    const filter = req.query || {};
    const users = await User.find(filter);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE ONE user by id
app.patch('/users/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE MANY users by filter (e.g., /users?name=Temp)
app.delete('/users', async (req, res) => {
  try {
    const filter = req.query || {};
    const result = await User.deleteMany(filter);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// A simple route to test the server
app.get('/', (req, res) => {
  res.send('Hello from express');
});

// Use 11000 by default (as per lab)
const PORT = process.env.PORT || 11000;

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});