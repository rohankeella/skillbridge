import mongoose from 'mongoose';

const verifiedSkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  verifiedBy: { type: String, required: true }
});

const skillGapSchema = new mongoose.Schema({
  name: { type: String, required: true },
  severity: { type: String, required: true },
  recommendation: { type: String, required: true }
});

const studentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String, default: '👨‍🎓' },
  email: { type: String, required: true },
  college: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  cgpa: { type: Number, required: true },
  targetRole: { type: String, required: true },
  verifiedSkills: [verifiedSkillSchema],
  skillGaps: [skillGapSchema],
  appliedJobsCount: { type: Number, default: 0 },
  placementStatus: { type: String, default: 'Active Candidate' }
}, {
  timestamps: true
});

export const Student = mongoose.model('Student', studentSchema);
