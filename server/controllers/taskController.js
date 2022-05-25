const Task = require('../models/taskModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.addTask = catchAsync(async (req, res, next) => {
  const newTask = await Task.create({
    task: req.body.task,
    user: req.user._id,
  });
  res.status(200).json({
    status: 'success',
    task: newTask,
  });
  next();
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.updateOne(
    { _id: req.body.id },
    {
      completed: req.body.completed,
    }
  );
  if (!task) {
    return next(new AppError('Selected task not found', 400));
  }

  res.status(200).json({
    status: 'success',
  });
  next();
});

exports.getTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({ user: req.user });

  res.status(200).json({
    status: 'success',
    tasks,
  });
  next();
});
