const authService = require('../services/authService');
const sendResponse = require('../utils/response');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await authService.register(name, email, password);
    sendResponse(res, 201, { user, token }, 'User registered successfully');
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    sendResponse(res, 200, { user, token }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  // Since we are using stateless JWT, we can't invalidate the token on the server side without a blacklist.
  // The client should just delete the token.
  sendResponse(res, 200, null, 'Logged out successfully (Client should clear token)');
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const updatedUser = await authService.updateProfile(req.user.id, name, email, password);
    sendResponse(res, 200, { user: updatedUser }, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};
