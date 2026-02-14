const express = require('express');
const adminController = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Dashboard routes
router.get('/dashboard/stats', protect, isAdmin, adminController.getDashboardStats);
router.get('/dashboard/charts', protect, isAdmin, adminController.getDashboardCharts);

// User management
router.get('/users', protect, isAdmin, adminController.getAllUsers);
router.put('/users/:id/toggle-status', protect, isAdmin, adminController.toggleUserStatus);
router.get('/users/:id', protect, isAdmin, adminController.getUserById);

// Registration management
router.get('/registrations/all', protect, isAdmin, adminController.getAllRegistrations);
router.get('/registrations/pending', protect, isAdmin, adminController.getPendingRegistrations);

// Competition stats
router.get('/competitions/stats', protect, isAdmin, adminController.getCompetitionStats);

// Notifications
router.post('/notifications/broadcast', protect, isAdmin, adminController.broadcastNotification);

// Support
router.post('/chats/:chatId/message', protect, isAdmin, adminController.sendSupportMessage);

module.exports = router;
