const express = require('express');
const chatController = require('../controllers/chatController');
const { protect, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Admin routes - specific routes first
router.get('/admin/all', protect, isAdmin, chatController.getAllChats);

// User routes
router.post('/initiate', protect, chatController.initializeChat);
router.get('/my-chat', protect, chatController.getUserChat);
router.post('/:chatId/messages', protect, chatController.sendMessage);
router.get('/:chatId/messages', protect, chatController.getMessages);
router.put('/:chatId/mark-read', protect, chatController.markAsRead);
router.put('/:chatId/close', protect, chatController.closeChat);
router.put('/:chatId/assign', protect, isAdmin, chatController.assignChatToAdmin);
router.put('/:chatId/reopen', protect, isAdmin, chatController.reopenChat);

module.exports = router;
