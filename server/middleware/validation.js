// middleware/validation.js
const AppError = require('../utils/AppError');
const validators = require('../utils/validators');

const validateRegistration = (req, res, next) => {
  const { email, password, name } = req.body;

  // Email validation
  if (!email || !validators.isValidEmail(email)) {
    return next(new AppError('Please provide a valid email address', 400));
  }

  // Password validation
  if (!password || !validators.isValidPassword(password)) {
    return next(
      new AppError(
        'Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character',
        400
      )
    );
  }

  // Name validation
  if (!name || !validators.isValidName(name)) {
    return next(new AppError('Please provide a valid name (2-50 characters)', 400));
  }

  next();
};

const validateCompetition = (req, res, next) => {
  const { title, description, category, startDate, endDate, registrationDeadline, maxRegistrations } = req.body;

  // Title validation
  if (!title || title.trim().length === 0 || title.length > 100) {
    return next(new AppError('Title is required and must be less than 100 characters', 400));
  }

  // Description validation
  if (!description || description.trim().length === 0 || description.length > 2000) {
    return next(new AppError('Description is required and must be less than 2000 characters', 400));
  }

  // Category validation
  if (!category || !validators.isValidMongoId(category)) {
    return next(new AppError('Valid category ID is required', 400));
  }

  // Dates validation
  if (!startDate || !endDate || !registrationDeadline) {
    return next(new AppError('Start date, end date, and registration deadline are required', 400));
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const deadline = new Date(registrationDeadline);
  const now = new Date();

  if (start <= now) {
    return next(new AppError('Start date must be in the future', 400));
  }

  if (end <= start) {
    return next(new AppError('End date must be after start date', 400));
  }

  if (deadline > start) {
    return next(new AppError('Registration deadline must be before start date', 400));
  }

  // Max registrations validation
  if (!maxRegistrations || maxRegistrations < 1) {
    return next(new AppError('Max registrations must be at least 1', 400));
  }

  next();
};

const validateUpdate = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError('Please provide fields to update', 400));
  }
  next();
};

module.exports = {
  validateRegistration,
  validateCompetition,
  validateUpdate,
};
