// controllers/userController.js
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find({ isActive: true }), req.query)
    .filter()
    .search(['name', 'email'])
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;
  const total = await User.countDocuments({ isActive: true });

  res.status(200).json({
    success: true,
    results: users.length,
    total,
    page: features.page,
    pageSize: features.limit,
    data: users,
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.getUserStats = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  const Registration = require('../models/Registration');

  const registrations = await Registration.countDocuments({
    user: userId,
    status: { $in: ['confirmed', 'attended'] },
  });

  const pendingRegistrations = await Registration.countDocuments({
    user: userId,
    status: 'pending',
  });

  const attendedCompetitions = await Registration.countDocuments({
    user: userId,
    status: 'attended',
  });

  res.status(200).json({
    success: true,
    stats: {
      totalRegistrations: registrations,
      pendingRegistrations,
      attendedCompetitions,
    },
  });
});

exports.searchUsers = catchAsync(async (req, res, next) => {
  const { query } = req.query;

  if (!query || query.trim().length === 0) {
    return next(new AppError('Search query is required', 400));
  }

  const users = await User.find({
    isActive: true,
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } },
    ],
  }).limit(10);

  res.status(200).json({
    success: true,
    results: users.length,
    data: users,
  });
});

module.exports = exports;
