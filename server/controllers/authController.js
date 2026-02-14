// controllers/authController.js
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const emailService = require('../services/emailService');

exports.syncClerkUser = catchAsync(async (req, res, next) => {
  const { id, email_addresses, first_name, last_name, image_url } = req.body.data;

  try {
    // Check if user already exists
    let user = await User.findOne({ clerkId: id });

    if (!user) {
      // Create new user from Clerk data
      user = await User.create({
        clerkId: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`.trim() || 'User',
        profilePicture: image_url || 'default-avatar.png',
        role: 'user',
        emailVerified: true, // Clerk handles verification
        isActive: true,
      });

      // Send welcome email
      await emailService.sendWelcomeEmail(user.email, user.name);
    }

    res.status(201).json({
      success: true,
      message: 'User synced successfully',
      user,
    });
  } catch (error) {
    next(new AppError('Failed to sync user with Clerk', 500));
  }
});

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  const { name, profilePicture } = req.body;

  const updateData = {};
  if (name) updateData.name = name.trim();
  if (profilePicture) updateData.profilePicture = profilePicture;

  const user = await User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user,
  });
});

exports.deactivateAccount = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { isActive: false },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: 'Account deactivated successfully',
  });
});

module.exports = exports;
