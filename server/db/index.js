require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DB_CONNECTION_STRING,
});

client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Connection error', err.stack);
  });

module.exports = client;
