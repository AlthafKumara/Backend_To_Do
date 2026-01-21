const supabase = require('../config/supabase');
const AppError = require('../utils/appError');

const getAllCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*');

  if (error) {
    throw new AppError('Error fetching categories: ' + error.message, 500);
  }

  return data;
};

module.exports = {
  getAllCategories,
};
