const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Specific routes first
router.get('/search', userController.searchUsers);

// Get all users
router.get('/', userController.getAllUsers);

// Get user stats
router.get('/:id/stats', userController.getUserStats);

// Get user by ID
router.get('/:id', userController.getUserById);

module.exports = router;
