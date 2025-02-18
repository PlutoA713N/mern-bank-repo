const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const beneficiaryRoutes = require('./routes/beneficiaryRoutes');
const createTables = require('./db/db_operations/createTable');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes
app.use(beneficiaryRoutes);

// Serve React App
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});

createTables();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
