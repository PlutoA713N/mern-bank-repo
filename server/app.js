const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const beneficiaryRoutes = require('./routes/beneficiaryRoutes');
const createTables = require('./db/db_operations/createTable');

const app = express();

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build'))); // Correct path

// Routes
app.use(beneficiaryRoutes);

// Serve React App
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html')); // Correct path
});

createTables();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});