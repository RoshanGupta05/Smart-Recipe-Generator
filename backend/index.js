const express = require('express');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
  res.send("Smart Recipe Generator Backend is Running!");
});

// Routes
app.use('/api/recipes', recipeRoutes);

module.exports = app;
