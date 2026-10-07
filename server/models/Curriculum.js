import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  depth: { type: Number, default: 80 },
  practicalHours: { type: Number, default: 20 },
  theoryHours: { type: Number, default: 40 }
});

const curriculumSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  semester: { type: String, default: '' },
  totalStudents: { type: Number, default: 120 },
  modules: [moduleSchema],
  currentStrengths: [{ type: String }],
  identifiedDeficits: [{ type: String }]
}, {
  timestamps: true
});

export const Curriculum = mongoose.model('Curriculum', curriculumSchema);
