const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectDB = require('./connectDB');
const ErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const filesRouter = require('./routes/fileRoutes');

// Establish connection to MongoDB
connectDB();

const PORT = process.env.PORT || 8000;

const app = express();

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// // Express API routes
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/files', filesRouter);

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
