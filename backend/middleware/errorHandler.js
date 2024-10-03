// errorHandler.js
const AppError = require('../error/AppError.js');

const errorHandler = (err, req, res, next) => {
  // Log the error for debugging purposes (you can use a logging library here)
  console.error(err);

  // Set default values
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Something went wrong!';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    err.message = 'Invalid input data!';
    err.statusCode = 400;
  } else if (err.code === 11000) {
    // MongoDB duplicate key error
    err.message = 'Duplicate email address!';
    err.statusCode = 400;
  } else if (err.message === 'Only .png, .jpg, and .jpeg format allowed!') {
    err.statusCode = 400; // Bad request
  } else if (err.message === 'File size must be at least 2MB') {
    err.statusCode = 400; // Bad request
  }

  // Send the error response
  res.status(err.statusCode).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message,
  });
};

module.exports = errorHandler;
