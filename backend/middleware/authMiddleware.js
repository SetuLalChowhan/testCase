const jwt = require('jsonwebtoken');
const AppError = require('../error/AppError.js');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from header

    if (!token) {
        return next(new AppError('Not authorized, no token', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = { userId: decoded.userId }; // Attach userId to req.user
        next();
    } catch (error) {
        return next(new AppError('Not authorized, token failed', 401));
    }
};

module.exports = authenticate;
