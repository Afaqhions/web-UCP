const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Competition = require('../models/Competition');
const APIFeatures = require('../utils/apiFeatures');
const aiService = require('../services/aiService');

exports.getAllCompetitions = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Competition.find({ status: 'published' })
      .populate('category', 'name icon color')
      .populate('createdBy', 'name profilePicture'),
    req.query
  )
    .filter()
    .search(['title', 'description'])
    .sort()
    .paginate();

  const competitions = await features.query;
  const total = await Competition.countDocuments({ status: 'published' });

  res.status(200).json({
    success: true,
    results: competitions.length,
    total,
    page: features.page,
    pageSize: features.limit,
    data: competitions,
  });
});

exports.getTrendingCompetitions = catchAsync(async (req, res, next) => {
  const competitions = await Competition.find({ status: 'published' })
    .sort({ views: -1, currentRegistrations: -1 })
    .limit(10)
    .populate('category', 'name icon color');

  res.status(200).json({
    success: true,
    results: competitions.length,
    data: competitions,
  });
});

exports.getMostRegisteredCompetitions = catchAsync(async (req, res, next) => {
  const competitions = await Competition.find({ status: 'published' })
    .sort({ currentRegistrations: -1 })
    .limit(10)
    .populate('category', 'name icon color');

  res.status(200).json({
    success: true,
    results: competitions.length,
    data: competitions,
  });
});

exports.getUpcomingCompetitions = catchAsync(async (req, res, next) => {
  const now = new Date();
  const competitions = await Competition.find({
    status: 'published',
    startDate: { $gte: now },
  })
    .sort({ startDate: 1 })
    .limit(10)
    .populate('category', 'name icon color');

  res.status(200).json({
    success: true,
    results: competitions.length,
    data: competitions,
  });
});

exports.getCompetitionById = catchAsync(async (req, res, next) => {
  const competition = await Competition.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  )
    .populate('category')
    .populate('createdBy', 'name profilePicture email');

  if (!competition) {
    return next(new AppError('Competition not found', 404));
  }

  res.status(200).json({
    success: true,
    data: competition,
  });
});

exports.getCompetitionBySlug = catchAsync(async (req, res, next) => {
  const competition = await Competition.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { views: 1 } },
    { new: true }
  )
    .populate('category')
    .populate('createdBy', 'name profilePicture email');

  if (!competition) {
    return next(new AppError('Competition not found', 404));
  }

  res.status(200).json({
    success: true,
    data: competition,
  });
});

exports.createCompetition = catchAsync(async (req, res, next) => {
  const { title, description, summary, category, rules, prizes, startDate, endDate, registrationDeadline, maxRegistrations, image, tags, location } = req.body;

  // Generate slug
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const competition = await Competition.create({
    title,
    slug,
    description,
    summary,
    category,
    rules: rules || [],
    prizes: prizes || [],
    startDate,
    endDate,
    registrationDeadline,
    maxRegistrations,
    status: 'draft',
    image: image || 'default-competition.jpg',
    createdBy: req.user._id,
    tags: tags || [],
    location: location || 'online',
  });

  res.status(201).json({
    success: true,
    message: 'Competition created successfully',
    data: competition,
  });
});

exports.updateCompetition = catchAsync(async (req, res, next) => {
  const allowedFields = ['title', 'description', 'summary', 'rules', 'prizes', 'startDate', 'endDate', 'registrationDeadline', 'maxRegistrations', 'image', 'tags', 'location'];
  const updateData = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  });

  const competition = await Competition.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!competition) {
    return next(new AppError('Competition not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Competition updated successfully',
    data: competition,
  });
});

exports.deleteCompetition = catchAsync(async (req, res, next) => {
  const competition = await Competition.findByIdAndUpdate(
    req.params.id,
    { status: 'cancelled' },
    { new: true }
  );

  if (!competition) {
    return next(new AppError('Competition not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Competition cancelled successfully',
  });
});

exports.updateCompetitionStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const validStatuses = ['draft', 'published', 'completed', 'cancelled'];

  if (!validStatuses.includes(status)) {
    return next(new AppError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`, 400));
  }

  const competition = await Competition.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!competition) {
    return next(new AppError('Competition not found', 404));
  }

  res.status(200).json({
    success: true,
    message: `Competition status updated to ${status}`,
    data: competition,
  });
});

module.exports = exports;
