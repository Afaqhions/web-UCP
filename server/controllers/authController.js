// controllers/authController.js
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const emailService = require('../services/emailService');

exports.syncClerkUser = catchAsync(async (req, res, next) => {
  console.log('🔄 syncClerkUser called with body keys:', Object.keys(req.body));
  const data = req.body.data || req.body;
  const { id } = data;

  console.log('🆔 Syncing user with Clerk ID:', id);

  // Extract fields whether they come from Clerk webhook or direct Clerk User object
  const email = data.email_addresses ? data.email_addresses[0].email_address : (data.primaryEmailAddress ? data.primaryEmailAddress.emailAddress : (data.emailAddress || data.email));
  const firstName = data.first_name || data.firstName || '';
  const lastName = data.last_name || data.lastName || '';
  const imageUrl = data.image_url || data.imageUrl || data.profilePicture;

  console.log('📧 Extracted email:', email);

  try {
    // Check if user already exists (Prioritize clerkId, fallback to email)
    let user = await User.findOne({
      $or: [
        { clerkId: id },
        { email: email }
      ]
    });

    if (!user) {
      console.log('🆕 User not found in DB, creating new user...');

      // Auto-assign admin role for specific emails
      const isAdminEmail = email === 'm.afaqpak@gmail.com';

      // Create new user from Clerk data
      user = await User.create({
        clerkId: id,
        email: email,
        name: `${firstName} ${lastName}`.trim() || 'User',
        profilePicture: imageUrl || 'default-avatar.png',
        role: isAdminEmail ? 'admin' : 'user',
        emailVerified: true,
        isActive: true,
      });
      console.log('✅ User created successfully in MongoDB:', user._id);

      try {
        await emailService.sendWelcomeEmail(user.email, user.name);
      } catch (err) {
        console.error('Welcome email failed:', err);
      }
    } else {
      console.log('✨ User already exists in DB:', user._id);
      // Promote existing user if they are in the whitelist
      if (email === 'm.afaqpak@gmail.com' && user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
        console.log('👷 Existing user promoted to Admin');
      }
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
