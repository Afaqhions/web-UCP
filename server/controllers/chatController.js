// controllers/chatController.js
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Chat = require('../models/Chat');
const Notification = require('../models/Notification');
const User = require('../models/User');
const APIFeatures = require('../utils/apiFeatures');

exports.initializeChat = catchAsync(async (req, res, next) => {
  // Check if user already has a chat
  let chat = await Chat.findOne({ user: req.user._id });

  if (!chat) {
    chat = await Chat.create({
      user: req.user._id,
      messages: [],
      isActive: true,
    });
  }

  res.status(201).json({
    success: true,
    message: 'Chat initialized',
    data: chat,
  });
});

exports.getUserChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findOne({ user: req.user._id })
    .populate('user', 'name email profilePicture')
    .populate('admin', 'name profilePicture')
    .populate('messages.sender', 'name profilePicture');

  if (!chat) {
    return next(new AppError('Chat not found', 404));
  }

  res.status(200).json({
    success: true,
    data: chat,
  });
});

exports.sendMessage = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;
  const { content, attachments } = req.body;

  if (!content || content.trim().length === 0) {
    return next(new AppError('Message cannot be empty', 400));
  }

  const chat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: {
        messages: {
          sender: req.user._id,
          content: content.trim(),
          attachments: attachments || [],
          timestamp: new Date(),
          read: false,
          delivered: true,
        },
      },
      lastMessageAt: new Date(),
    },
    { new: true }
  );

  if (!chat) {
    return next(new AppError('Chat not found', 404));
  }

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: chat,
  });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;
  const { page = 1, limit = 50 } = req.query;

  const skip = (page - 1) * limit;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new AppError('Chat not found', 404));
  }

  const messages = chat.messages.slice(-skip - limit, -skip || undefined).reverse();

  res.status(200).json({
    success: true,
    total: chat.messages.length,
    results: messages.length,
    page,
    pageSize: limit,
    data: messages,
  });
});

exports.markAsRead = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;
  const { messageIds } = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new AppError('Chat not found', 404));
  }

  chat.messages.forEach((message) => {
    if (messageIds.includes(message._id.toString())) {
      message.read = true;
    }
  });

  chat.unreadCount = 0;
  await chat.save();

  res.status(200).json({
    success: true,
    message: 'Messages marked as read',
  });
});

exports.closeChat = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;

  const chat = await Chat.findByIdAndUpdate(
    chatId,
    { isActive: false },
    { new: true }
  );

  if (!chat) {
    return next(new AppError('Chat not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Chat closed successfully',
  });
});

exports.reopenChat = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;

  const chat = await Chat.findByIdAndUpdate(
    chatId,
    { isActive: true },
    { new: true }
  );

  if (!chat) {
    return next(new AppError('Chat not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Chat reopened successfully',
  });
});

exports.getAllChats = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Chat.find({ isActive: true })
      .populate('user', 'name email profilePicture')
      .populate('admin', 'name profilePicture'),
    req.query
  )
    .filter()
    .sort()
    .paginate();

  const chats = await features.query;
  const total = await Chat.countDocuments({ isActive: true });

  res.status(200).json({
    success: true,
    results: chats.length,
    total,
    page: features.page,
    pageSize: features.limit,
    data: chats,
  });
});

exports.assignChatToAdmin = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;
  const { adminId } = req.body;

  // Verify admin exists and is actually an admin
  const admin = await User.findOne({ _id: adminId, role: 'admin' });
  if (!admin) {
    return next(new AppError('Admin not found', 404));
  }

  const chat = await Chat.findByIdAndUpdate(
    chatId,
    { admin: adminId, isEscalated: false },
    { new: true }
  );

  if (!chat) {
    return next(new AppError('Chat not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Chat assigned to admin successfully',
    data: chat,
  });
});

module.exports = exports;
