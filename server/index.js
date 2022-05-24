const express = require('express');
const cors = require('cors');
const connectDB = require('./connectDB');

// Establish connection to MongoDB
connectDB();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(() => {
  console.log(`Server is running on port ${PORT}`);
});
