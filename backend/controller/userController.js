const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require("../error/AppError.js");

// Register User
const registerUser = async (req, res, next) => {
  // Check for file upload errors
  if (req.fileValidationError) {
    return next(new AppError(req.fileValidationError, 400));
  }

  const { name, email, password } = req.body;
  const avatar = req.file ? req.file.path : null;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return next(new AppError("User Already Exists", 400));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      name,
      email,
      password: hashedPassword, // Store hashed password
      avatar,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return next(new AppError('Server error', 500)); // Use next to pass the error
  }
};

const editProfile = async (req, res, next) => {
    const { name, email, password } = req.body;
    const avatar = req.file ? req.file.path : null;
    const userId = req.user.userId; // Assuming you're using JWT to authenticate users

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return next(new AppError("User not found", 404));
        }

        // Check if the email is being updated
        if (email) {
            const emailExists = await User.findOne({ email });
            if (emailExists && emailExists._id.toString() !== userId) {
                return next(new AppError("Email already in use", 400));
            }
            user.email = email; // Update email
        }
        if (name) {
            user.name = name; // Update name
        }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt); // Update password
        }
        if (avatar) {
            user.avatar = avatar; // Update avatar path if a new one is uploaded
        }

        await user.save();

        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { registerUser, editProfile };