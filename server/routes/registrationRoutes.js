const express = require('express');
const registrationController = require('../controllers/registrationController');
const { protect, isAdmin } = require('../middleware/auth');

const router = express.Router();

// User routes - specific routes first
router.get('/my-registrations', protect, registrationController.getMyRegistrations);
router.post('/', protect, registrationController.createRegistration);
router.get('/:id', protect, registrationController.getRegistrationById);
router.delete('/:id/cancel', protect, registrationController.cancelRegistration);

// Admin routes
router.get('/competition/:competitionId', protect, isAdmin, registrationController.getCompetitionRegistrations);
router.put('/:id/confirm', protect, isAdmin, registrationController.confirmRegistration);
router.put('/:id/reject', protect, isAdmin, registrationController.rejectRegistration);

module.exports = router;
