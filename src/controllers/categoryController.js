const categoryService = require('../services/categoryService');
const sendResponse = require('../utils/response');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    sendResponse(res, 200, categories, 'Categories fetched successfully');
  } catch (error) {
    next(error);
  }
};
