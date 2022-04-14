const process = require('process');

if (process.env.NODE_ENV !== 'production')
{
  require('dotenv').config({ path: '.env' });
}

const express = require('express');
const start = require('./routes/AllRoutes');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

start(app);

let server;
mongoose.connection.once('open', () =>
{
  console.log('MongoDB is Connected to compose Database');
  server = app.listen(PORT, () =>
  {
    console.log(`Server is Running on Port ${PORT} at
      http://localhost:${server.address().port}`);
  });
});

process.on('unhandledRejection', (err) =>
{
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
