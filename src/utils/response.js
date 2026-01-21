const sendResponse = (res, statusCode, data, message = '') => {
  res.status(statusCode).json({
    status: `${statusCode}`.startsWith('2') ? 'success' : 'fail',
    message,
    data,
  });
};

module.exports = sendResponse;
