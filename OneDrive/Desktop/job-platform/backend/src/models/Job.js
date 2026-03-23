const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  responsibilities: [String],
  requirements: [String],
  skills: [String],
  education: String,
  experience: String,
  salaryRange: {
    from: Number,
    to: Number
  },
  type: { type: String, enum: ['Full-time', 'Part-time', 'Internship', 'Freelance'] },
  location: String,
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  benefits: [String],
  applicationDeadline: Date,
  workMode: { type: String, enum: ['Onsite', 'Hybrid', 'Remote'] },
  additionalRequirements: String,
  urgent: Boolean,
  numberOfOpenings: Number,
  primaryRole: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);