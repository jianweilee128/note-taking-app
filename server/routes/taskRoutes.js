const express = require('express');
const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/addTask', authController.protect, taskController.addTask);
router.post('/updateTask', authController.protect, taskController.updateTask);
router.get('/getTasks', authController.protect, taskController.getTasks);

module.exports = router;
