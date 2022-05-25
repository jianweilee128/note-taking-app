const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Please enter your task'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Task must have a user'],
  },
  file: {
    type: mongoose.Schema.ObjectId,
    ref: 'File',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  fileAttached: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
});

taskSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
