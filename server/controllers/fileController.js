const Task = require('../models/taskModel');
const File = require('../models/fileModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const path = require('path');

exports.downloadFile = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const file = await File.findOne({ _id: id });
  if (!file) {
    return new AppError('No file found', 400);
  }
  res.set({
    'Content-Type': file.file_mimetype,
    Title: file.title,
  });
  res.sendFile(path.join(__dirname, '..', file.file_path));
});

exports.uploadFile = catchAsync(async (req, res, next) => {
  const { title, taskId } = req.body;
  const { path, mimetype } = req.file;
  const file = new File({
    title,
    file_path: path,
    file_mimetype: mimetype,
  });
  await file.save();
  await Task.findByIdAndUpdate(taskId, {
    file,
    fileAttached: true,
  });
  const tasks = await Task.find({ user: req.user });
  res.status(200).json({
    status: 'success',
    tasks,
  });
  next();
});

exports.upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new AppError(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.',
          400
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
});
