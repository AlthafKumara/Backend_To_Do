const express = require('express');
const categoryController = require('../controllers/categoryController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect); // Protect all category routes (optional, but good practice)

router.get('/', categoryController.getAllCategories);

module.exports = router;
