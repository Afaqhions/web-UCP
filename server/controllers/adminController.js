// controllers/adminController.js
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const Competition = require('../models/Competition');
const Registration = require('../models/Registration');
const Category = require('../models/Category');
const Chat = require('../models/Chat');
const Notification = require('../models/Notification');
const emailService = require('../services/emailService');

exports.getDashboardStats = catchAsync(async (req, res, next) => {
  const totalUsers = await User.countDocuments({ isActive: true });
  const totalCompetitions = await Competition.countDocuments({ status: 'published' });
  const totalRegistrations = await Registration.countDocuments();
  const totalCategories = await Category.countDocuments({ isActive: true });
  const totalChats = await Chat.countDocuments({ isActive: true });
  const pendingRegistrations = await Registration.countDocuments({ status: 'pending' });
  const activeUsers = await User.countDocuments({
    isActive: true,
    lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  });

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalCompetitions,
      totalRegistrations,
      totalCategories,
      totalChats,
      pendingRegistrations,
      activeUsers,
    },
  });
});

exports.getDashboardCharts = catchAsync(async (req, res, next) => {
  // Registrations trend (last 30 days)
  const registrationsTrend = await Registration.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Competitions by category
  const competitionsByCategory = await Competition.aggregate([
    { $match: { status: 'published' } },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'categoryData',
      },
    },
    { $unwind: '$categoryData' },
    {
      $group: {
        _id: '$categoryData.name',
        count: { $sum: 1 },
      },
    },
  ]);

  // Registration status distribution
  const registrationsByStatus = await Registration.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: {
      registrationsTrend,
      competitionsByCategory,
      registrationsByStatus,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ isActive: true })
    .select('-password')
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    results: users.length,
    data: users,
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.toggleUserStatus = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  user.isActive = !user.isActive;
  await user.save();

  res.status(200).json({
    success: true,
    message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
    data: user,
  });
});

exports.getAllRegistrations = catchAsync(async (req, res, next) => {
  const registrations = await Registration.find()
    .populate('user', 'name email')
    .populate('competition', 'title')
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    results: registrations.length,
    data: registrations,
  });
});

exports.getPendingRegistrations = catchAsync(async (req, res, next) => {
  const registrations = await Registration.find({ status: 'pending' })
    .populate('user', 'name email')
    .populate('competition', 'title')
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    results: registrations.length,
    data: registrations,
  });
});

exports.getCompetitionStats = catchAsync(async (req, res, next) => {
  const stats = await Competition.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalViews: { $sum: '$views' },
        totalRegistrations: { $sum: '$currentRegistrations' },
      },
    },
  ]);

  // Most popular competitions
  const topCompetitions = await Competition.find({ status: 'published' })
    .sort({ currentRegistrations: -1 })
    .limit(10)
    .select('title currentRegistrations views maxRegistrations');

  res.status(200).json({
    success: true,
    data: {
      stats,
      topCompetitions,
    },
  });
});

exports.broadcastNotification = catchAsync(async (req, res, next) => {
  const { title, message, type = 'admin_announcement' } = req.body;

  // Get all active users
  const users = await User.find({ isActive: true }).select('_id');

  if (users.length === 0) {
    return next(new AppError('No users to notify', 400));
  }

  // Create notifications for all users
  const notifications = users.map((user) => ({
    user: user._id,
    type,
    title,
    message,
    read: false,
  }));

  await Notification.insertMany(notifications);

  res.status(201).json({
    success: true,
    message: `Notification sent to ${notifications.length} users`,
    sentTo: notifications.length,
  });
});

exports.sendSupportMessage = catchAsync(async (req, res, next) => {
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
      admin: req.user._id,
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

module.exports = exports;
