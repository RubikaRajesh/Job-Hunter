const express = require('express');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const { getMyProfile, updateProfile, getPublicProfile, uploadResume } = require('../controllers/userController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Profile routes
router.get('/profile/me', authMiddleware, getMyProfile);
router.put('/profile/me', authMiddleware, updateProfile);
router.get('/profile/public/:id', getPublicProfile);
router.post('/upload-resume', authMiddleware, roleMiddleware('seeker'), upload.single('resume'), uploadResume);

module.exports = router;