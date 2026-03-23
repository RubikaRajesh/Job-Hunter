const User = require('../models/User');

// @desc    Get current user's full profile
// @route   GET /api/users/profile/me
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile/me
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update fields (you can spread req.body, but careful with nested objects)
    // For simplicity, we'll allow updating top-level fields and handle nested manually
    // Since the frontend sends all fields, we can just set user = req.body
    // But we must ensure we don't overwrite password or _id
    const { password, _id, ...updateData } = req.body;

    Object.assign(user, updateData);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get public profile by user ID
// @route   GET /api/users/profile/public/:id
const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -email -savedJobs');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload resume (seeker only)
// @route   POST /api/users/upload-resume
const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const resumeUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const user = await User.findById(req.user.id);
    user.resume = resumeUrl;
    await user.save();

    res.json({ url: resumeUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMyProfile, updateProfile, getPublicProfile, uploadResume };