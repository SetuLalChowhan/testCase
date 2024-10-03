const express = require('express');
const { registerUser,editProfile } = require('../controller/userController.js');
const upload = require('../uploads/multerConfig.js');
const authenticate = require('../middleware/authMiddleware.js');
const router = express.Router();

// Register route with single image upload
router.post('/register', upload.single('avatar'), registerUser);
router.put('/edit-profile', authenticate, upload.single('avatar'), editProfile);

module.exports = router;
