import mongoose from 'mongoose';

const timelineStepSchema = new mongoose.Schema({
  step: { type: String, required: true },
  date: { type: String, required: true },
  done: { type: Boolean, default: false }
});

const applicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  jobId: { type: String, required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  college: { type: String, required: true },
  cgpa: { type: Number, required: true },
  matchScore: { type: Number, required: true },
  status: { type: String, default: 'Application Submitted' },
  appliedDate: { type: String, required: true },
  timeline: [timelineStepSchema],
  resumeUrl: { type: String },
  notes: { type: String }
}, {
  timestamps: true
});

export const Application = mongoose.model('Application', applicationSchema);
