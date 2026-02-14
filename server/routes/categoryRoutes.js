const express = require('express');
const categoryController = require('../controllers/categoryController');
const { protect, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id/competitions', categoryController.getCategoryCompetitions);
router.get('/:id', categoryController.getCategoryById);

// Admin routes
router.post('/', protect, isAdmin, categoryController.createCategory);
router.put('/:id', protect, isAdmin, categoryController.updateCategory);
router.delete('/:id', protect, isAdmin, categoryController.deleteCategory);

module.exports = router;
