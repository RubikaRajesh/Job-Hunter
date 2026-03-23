const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Get all jobs with filters
// @route   GET /api/jobs
const getJobs = async (req, res) => {
  try {
    const { location, type, skills, page = 1, limit = 10 } = req.query;
    let filter = { isActive: true };

    if (location) filter.location = new RegExp(location, 'i');
    if (type) filter.type = type;
    if (skills) filter.skills = { $in: skills.split(',') };

    const jobs = await Job.find(filter)
      .populate('employer', 'companyName companyLogo email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Job.countDocuments(filter);

    res.json({ jobs, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new job (hirer only)
// @route   POST /api/jobs
const createJob = async (req, res) => {
  try {
    const jobData = { ...req.body, employer: req.user.id };
    const job = await Job.create(jobData);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a job (hirer who posted only)
// @route   PUT /api/jobs/:id
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete/deactivate a job
// @route   DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    job.isActive = false;
    await job.save();
    res.json({ message: 'Job deactivated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save a job for current user (seeker)
// @route   POST /api/jobs/saved/:jobId
const saveJob = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.savedJobs.includes(req.params.jobId)) {
      user.savedJobs.push(req.params.jobId);
      await user.save();
    }
    res.json({ message: 'Job saved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove saved job
// @route   DELETE /api/jobs/saved/:jobId
const unsaveJob = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.savedJobs = user.savedJobs.filter(id => id.toString() !== req.params.jobId);
    await user.save();
    res.json({ message: 'Job removed from saved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get saved jobs for current user
// @route   GET /api/jobs/saved/me
const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'savedJobs',
      populate: { path: 'employer', select: 'companyName companyLogo' }
    });
    res.json(user.savedJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getJobs, getJobById, createJob, updateJob, deleteJob, saveJob, unsaveJob, getSavedJobs };