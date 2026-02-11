const express = require('express');
const joi = require('joi');
const authController = require('../controllers/authController');
const validate = require('../middlewares/validationMiddleware');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const updateProfileSchema = joi.object({
  name: joi.string(),
  email: joi.string().email(),
  password: joi.string().min(6),
}).min(1);

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.put('/profile', protect, validate(updateProfileSchema), authController.updateProfile);

module.exports = router;
