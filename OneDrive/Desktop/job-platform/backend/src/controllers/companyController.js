const User = require('../models/User');

// @desc    Get all companies (employers)
// @route   GET /api/companies
const getCompanies = async (req, res) => {
  try {
    const companies = await User.find({ role: 'employer' }).select('companyName companyLogo companyDescription location website email');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single company by ID
// @route   GET /api/companies/:id
const getCompanyById = async (req, res) => {
  try {
    const company = await User.findOne({ _id: req.params.id, role: 'employer' }).select('-password -savedJobs');
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCompanies, getCompanyById };