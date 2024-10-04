const express = require('express');
const { registerUser,editProfile, loginUser, signOutUser, forgotPassword, resetPassword, verifyEmail } = require('../controller/userController.js');
const upload = require('../uploads/multerConfig.js');
const authenticate = require('../middleware/authMiddleware.js');
const router = express.Router();

// Register route with single image upload
router.post('/register', upload.single('avatar'), registerUser);
router.put('/edit-profile', authenticate, upload.single('avatar'), editProfile);
// User Login
router.post('/login', loginUser);

// User Sign Out
router.post('/logout', signOutUser);

router.post("/forgot-password", forgotPassword);

// PUT route to handle password reset (token is passed in the URL)
router.put("/reset-password/:token", resetPassword);

router.post("/verify-email", verifyEmail);

module.exports = router;
