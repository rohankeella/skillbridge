import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  logo: { type: String, default: '💼' },
  type: { type: String, required: true }, // Full-time Placement, Internship
  workMode: { type: String, required: true },
  stipend: { type: String },
  ctcPostInternship: { type: String },
  openings: { type: Number, default: 5 },
  deadline: { type: String, required: true },
  requiredSkills: [{ type: String }],
  preferredSkills: [{ type: String }],
  description: { type: String, required: true },
  academicEligibility: { type: String, required: true },
  tier: { type: String, default: 'Industry Partner' }
}, {
  timestamps: true
});

export const Job = mongoose.model('Job', jobSchema);
