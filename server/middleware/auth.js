// middleware/auth.js
const { verifyToken } = require('@clerk/express');
const AppError = require('../utils/AppError');
const User = require('../models/User');

// Protect routes with Clerk authentication
const protect = async (req, res, next) => {
  try {
    // For testing in Postman: accept X-User-Id header in development
    if (process.env.NODE_ENV === 'development' && req.headers['x-user-id']) {
      const user = await User.findById(req.headers['x-user-id']);
      if (user) {
        req.user = user;
        return next();
      }
    }

    // Clerk middleware attaches auth() to request
    const { userId } = req.auth || {};

    if (!userId) {
      return next(new AppError('You are not logged in. Please login to get access.', 401));
    }

    // Fetch user from MongoDB using Clerk userId
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      // If user doesn't exist in DB, create one from Clerk session
      return next(new AppError('User not found in database.', 404));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Authentication failed', 401));
  }
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new AppError('Access denied. Admin only.', 403));
  }
  next();
};

// Check ownership or admin access
const checkOwnership = (fieldName = 'id') => async (req, res, next) => {
  try {
    const resourceId = req.params[fieldName];
    const userId = req.user._id.toString();

    // If user is admin, allow access
    if (req.user.role === 'admin') {
      return next();
    }

    // For competitions, check createdBy
    if (req.baseUrl.includes('/competitions')) {
      const Competition = require('../models/Competition');
      const competition = await Competition.findById(resourceId);
      if (!competition) {
        return next(new AppError('Resource not found', 404));
      }
      if (competition.createdBy.toString() !== userId) {
        return next(new AppError('You do not have permission to access this resource', 403));
      }
    }

    next();
  } catch (error) {
    return next(new AppError('Ownership check failed', 500));
  }
};

// Optional auth - attach user if authenticated, but don't require it
const optionalAuth = async (req, res, next) => {
  try {
    const { userId } = req.auth || {};

    if (userId) {
      const user = await User.findOne({ clerkId: userId });
      if (user) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    next(); // Continue without user
  }
};

module.exports = {
  protect,
  isAdmin,
  checkOwnership,
  optionalAuth,
};
