const express = require('express');
const authController = require('../controllers/authController');
const fileController = require('../controllers/fileController');

const router = express.Router();

router.post(
  '/upload',
  authController.protect,
  fileController.upload.single('file'),
  fileController.uploadFile
);

router.get('/download/:id', fileController.downloadFile);

module.exports = router;
