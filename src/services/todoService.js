const supabase = require('../config/supabase');
const AppError = require('../utils/appError');

const createTodo = async (userId, todoData) => {
  // Check if category exists
  if (todoData.category_id) {
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('id', todoData.category_id)
      .single();
    
    if (!category) {
      throw new AppError('Category not found', 404);
    }
  }

  const { data, error } = await supabase
    .from('todos')
    .insert([{ ...todoData, user_id: userId }])
    .select()
    .single();

  if (error) {
    throw new AppError('Error creating todo: ' + error.message, 500);
  }

  return data;
};

const getTodos = async (userId) => {
  const { data, error } = await supabase
    .from('todos')
    .select('*, categories(name)') // Join with categories to get name
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new AppError('Error fetching todos: ' + error.message, 500);
  }

  // Transform result to look nicer if needed, but raw is fine
  return data;
};

const getTodoById = async (userId, todoId) => {
  const { data, error } = await supabase
    .from('todos')
    .select('*, categories(name)')
    .eq('id', todoId)
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    throw new AppError('Todo not found', 404);
  }

  return data;
};

const updateTodo = async (userId, todoId, updateData) => {
  // First check if todo belongs to user
  const { data: existingTodo } = await supabase
    .from('todos')
    .select('id')
    .eq('id', todoId)
    .eq('user_id', userId)
    .single();

  if (!existingTodo) {
    throw new AppError('Todo not found', 404);
  }

  const { data, error } = await supabase
    .from('todos')
    .update(updateData)
    .eq('id', todoId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw new AppError('Error updating todo: ' + error.message, 500);
  }

  return data;
};

const deleteTodo = async (userId, todoId) => {
  const { data, error } = await supabase
    .from('todos')
    .delete()
    .eq('id', todoId)
    .eq('user_id', userId)
    .select();

  // Supabase delete returns the deleted rows. If ID not found/owned, it returns empty array but no error usually.
  if (error) {
    throw new AppError('Error deleting todo: ' + error.message, 500);
  }
  
  if (data.length === 0) {
     throw new AppError('Todo not found or already deleted', 404);
  }

  return null;
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
