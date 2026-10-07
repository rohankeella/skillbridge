import mongoose from 'mongoose';

const mouSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  partnerCompany: { type: String, required: true },
  institution: { type: String, required: true },
  signedDate: { type: String, required: true },
  validUntil: { type: String, required: true },
  scope: { type: String, required: true },
  activeProjects: { type: Number, default: 1 },
  status: { type: String, default: 'Active & Verified' },
  impact: { type: String, required: true }
}, {
  timestamps: true
});

export const MoU = mongoose.model('MoU', mouSchema);
