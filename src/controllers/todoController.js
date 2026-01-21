const todoService = require('../services/todoService');
const sendResponse = require('../utils/response');

exports.createTodo = async (req, res, next) => {
  try {
    const todo = await todoService.createTodo(req.user.id, req.body);
    sendResponse(res, 201, todo, 'Todo created successfully');
  } catch (error) {
    next(error);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await todoService.getTodos(req.user.id);
    sendResponse(res, 200, todos, 'Todos fetched successfully');
  } catch (error) {
    next(error);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const todo = await todoService.getTodoById(req.user.id, req.params.id);
    sendResponse(res, 200, todo, 'Todo fetched successfully');
  } catch (error) {
    next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await todoService.updateTodo(req.user.id, req.params.id, req.body);
    sendResponse(res, 200, todo, 'Todo updated successfully');
  } catch (error) {
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    await todoService.deleteTodo(req.user.id, req.params.id);
    sendResponse(res, 204, null, 'Todo deleted successfully');
  } catch (error) {
    next(error);
  }
};
