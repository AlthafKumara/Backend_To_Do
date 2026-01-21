const express = require('express');
const joi = require('joi');
const todoController = require('../controllers/todoController');
const validate = require('../middlewares/validationMiddleware');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

const createTodoSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().allow('', null),
  status: joi.string().valid('pending', 'done').default('pending'),
  deadline: joi.date().iso().allow(null),
  priority: joi.string().valid('low', 'medium', 'high').default('medium'),
  category_id: joi.number().required(),
});

const updateTodoSchema = joi.object({
  title: joi.string(),
  description: joi.string().allow('', null),
  status: joi.string().valid('pending', 'done'),
  deadline: joi.date().iso().allow(null),
  priority: joi.string().valid('low', 'medium', 'high'),
  category_id: joi.number(),
}).min(1);

router.route('/')
  .get(todoController.getTodos)
  .post(validate(createTodoSchema), todoController.createTodo);

router.route('/:id')
  .get(todoController.getTodoById)
  .put(validate(updateTodoSchema), todoController.updateTodo)
  .delete(todoController.deleteTodo);

module.exports = router;
