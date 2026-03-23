const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['seeker', 'employer'], required: true },
  // Common fields
  name: String,
  phone: String,
  location: String,
  profilePicture: String,
  // Seeker fields
  yearsOfExperience: Number,
  bio: String,
  address: {
    country: String,
    city: String
  },
  socialProfiles: {
    github: String,
    twitter: String,
    portfolioWebsite: String
  },
  skills: [String],
  workExperience: [{
    jobTitle: String,
    company: {
      name: String,
      logoUrl: String
    },
    startMonth: Date,
    endMonth: Date,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startYear: Date,
    endYear: Date
  }],
  resume: String, // URL to file
  savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  // Employer fields
  companyName: String,
  companyWebsite: String,
  companyDescription: String,
  companyLogo: String,
  position: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);