const express = require('express');
const competitionController = require('../controllers/competitionController');
const { protect, isAdmin, checkOwnership } = require('../middleware/auth');
const { validateCompetition } = require('../middleware/validation');

const router = express.Router();

// Public routes - specific routes first
router.get('/trending', competitionController.getTrendingCompetitions);
router.get('/most-registered', competitionController.getMostRegisteredCompetitions);
router.get('/upcoming', competitionController.getUpcomingCompetitions);
router.get('/slug/:slug', competitionController.getCompetitionBySlug);
router.get('/', competitionController.getAllCompetitions);
router.get('/:id', competitionController.getCompetitionById);

// Admin/Organizer routes
router.post('/', protect, isAdmin, validateCompetition, competitionController.createCompetition);
router.put('/:id', protect, isAdmin, checkOwnership('id'), validateCompetition, competitionController.updateCompetition);
router.patch('/:id/status', protect, isAdmin, competitionController.updateCompetitionStatus);
router.delete('/:id', protect, isAdmin, checkOwnership('id'), competitionController.deleteCompetition);

module.exports = router;
