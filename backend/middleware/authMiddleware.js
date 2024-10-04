const jwt = require('jsonwebtoken');
const AppError = require('../error/AppError.js');
const authenticate = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return next(new AppError('Not authorized, no token', 401));
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new AppError('Token is not valid', 401));
      }
      req.user = decoded; // Attach the user payload to the request
      next(); // Call the next middleware
    });
  }

module.exports = authenticate;
