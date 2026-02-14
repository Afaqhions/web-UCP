const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Webhook for Clerk user sync
router.post('/sync-clerk-user', authLimiter, authController.syncClerkUser);

// Get current user
router.get('/me', protect, authController.getCurrentUser);

// Update profile
router.put('/profile', protect, authController.updateProfile);

// Deactivate account
router.post('/deactivate', protect, authController.deactivateAccount);

module.exports = router;
