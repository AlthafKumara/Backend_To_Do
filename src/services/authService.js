const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d',
  });
};

const register = async (name, email, password) => {
  // 1. Check if user already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new AppError('Email is already registered', 400);
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // 3. Create user
  const { data: newUser, error } = await supabase
    .from('users')
    .insert([
      {
        name,
        email,
        password: hashedPassword,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new AppError('Error creating user: ' + error.message, 500);
  }

  // 4. Generate token
  const token = signToken(newUser.id);
  
  delete newUser.password; // Don't send password back

  return { user: newUser, token };
};

const login = async (email, password) => {
  // 1. Check if user exists
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    throw new AppError('Incorrect email or password', 401);
  }

  // 2. Check password
  const isCorrect = await bcrypt.compare(password, user.password);

  if (!isCorrect) {
    throw new AppError('Incorrect email or password', 401);
  }

  // 3. Generate token
  const token = signToken(user.id);

  delete user.password;

  return { user, token };
};

const updateProfile = async (userId, name, password) => {
  const updates = {};
  if (name) updates.name = name;
  if (password) {
    updates.password = await bcrypt.hash(password, 12);
  }

  const { data: updatedUser, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw new AppError('Error updating profile: ' + error.message, 500);
  }
  
  delete updatedUser.password;
  
  return updatedUser;
};

module.exports = {
  register,
  login,
  updateProfile,
};
