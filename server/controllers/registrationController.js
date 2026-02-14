// controllers/registrationController.js
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Registration = require('../models/Registration');
const Competition = require('../models/Competition');
const APIFeatures = require('../utils/apiFeatures');
const emailService = require('../services/emailService');

exports.createRegistration = catchAsync(async (req, res, next) => {
  const { competitionId, teamMembers, notes } = req.body;

  // Check if competition exists
  const competition = await Competition.findById(competitionId);
  if (!competition) {
    return next(new AppError('Competition not found', 404));
  }

  // Check if already registered
  const existingRegistration = await Registration.findOne({
    user: req.user._id,
    competition: competitionId,
  });

  if (existingRegistration) {
    return next(new AppError('You are already registered for this competition', 400));
  }

  // Check if registrations are open
  const now = new Date();
  if (now > new Date(competition.registrationDeadline)) {
    return next(new AppError('Registration deadline has passed', 400));
  }

  // Check max registrations
  if (competition.currentRegistrations >= competition.maxRegistrations) {
    return next(new AppError('Competition is full', 400));
  }

  // Create registration
  const registration = await Registration.create({
    user: req.user._id,
    competition: competitionId,
    teamMembers: teamMembers || [],
    notes,
    status: 'pending',
  });

  // Update competition registration count
  await Competition.findByIdAndUpdate(competitionId, {
    $inc: { currentRegistrations: 1 },
  });

  // Send welcome email
  await emailService.sendRegistrationConfirmation(req.user.email, competition.title);

  res.status(201).json({
    success: true,
    message: 'Registration created successfully',
    data: registration,
  });
});

exports.getMyRegistrations = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Registration.find({ user: req.user._id })
      .populate('competition', 'title status startDate endDate image')
      .populate('user', 'name email'),
    req.query
  )
    .filter()
    .sort()
    .paginate();

  const registrations = await features.query;
  const total = await Registration.countDocuments({ user: req.user._id });

  res.status(200).json({
    success: true,
    results: registrations.length,
    total,
    page: features.page,
    pageSize: features.limit,
    data: registrations,
  });
});

exports.getRegistrationById = catchAsync(async (req, res, next) => {
  const registration = await Registration.findById(req.params.id)
    .populate('user', 'name email')
    .populate('competition', 'title description');

  if (!registration) {
    return next(new AppError('Registration not found', 404));
  }

  // Check access: user's own registration or admin
  if (registration.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return next(new AppError('Access denied', 403));
  }

  res.status(200).json({
    success: true,
    data: registration,
  });
});

exports.cancelRegistration = catchAsync(async (req, res, next) => {
  const { reason } = req.body;

  const registration = await Registration.findById(req.params.id);

  if (!registration) {
    return next(new AppError('Registration not found', 404));
  }

  // Check if user owns the registration
  if (registration.user.toString() !== req.user._id.toString()) {
    return next(new AppError('Access denied', 403));
  }

  // Can only cancel pending or confirmed registrations
  if (!['pending', 'confirmed'].includes(registration.status)) {
    return next(new AppError('Cannot cancel this registration', 400));
  }

  // Update registration
  registration.status = 'cancelled';
  registration.cancelledAt = new Date();
  registration.cancellationReason = reason;
  await registration.save();

  // Decrease competition registration count
  await Competition.findByIdAndUpdate(registration.competition, {
    $inc: { currentRegistrations: -1 },
  });

  res.status(200).json({
    success: true,
    message: 'Registration cancelled successfully',
  });
});

exports.confirmRegistration = catchAsync(async (req, res, next) => {
  const registration = await Registration.findById(req.params.id);

  if (!registration) {
    return next(new AppError('Registration not found', 404));
  }

  registration.status = 'confirmed';
  registration.confirmedAt = new Date();
  registration.confirmedBy = req.user._id;
  await registration.save();

  // Send confirmation email
  const User = require('../models/User');
  const user = await User.findById(registration.user);
  const competition = await Competition.findById(registration.competition);
  await emailService.sendRegistrationConfirmation(user.email, competition.title);

  res.status(200).json({
    success: true,
    message: 'Registration confirmed successfully',
    data: registration,
  });
});

exports.rejectRegistration = catchAsync(async (req, res, next) => {
  const { reason } = req.body;

  const registration = await Registration.findById(req.params.id);

  if (!registration) {
    return next(new AppError('Registration not found', 404));
  }

  registration.status = 'cancelled';
  registration.cancelledAt = new Date();
  registration.cancellationReason = reason || 'Rejected by admin';
  await registration.save();

  // Decrease competition registration count
  await Competition.findByIdAndUpdate(registration.competition, {
    $inc: { currentRegistrations: -1 },
  });

  res.status(200).json({
    success: true,
    message: 'Registration rejected successfully',
  });
});

exports.getCompetitionRegistrations = catchAsync(async (req, res, next) => {
  const { competitionId } = req.params;

  const features = new APIFeatures(
    Registration.find({ competition: competitionId })
      .populate('user', 'name email profilePicture')
      .populate('competition', 'title'),
    req.query
  )
    .filter()
    .sort()
    .paginate();

  const registrations = await features.query;
  const total = await Registration.countDocuments({ competition: competitionId });

  res.status(200).json({
    success: true,
    results: registrations.length,
    total,
    page: features.page,
    pageSize: features.limit,
    data: registrations,
  });
});

module.exports = exports;
