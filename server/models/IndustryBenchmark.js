import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  category: { type: String, required: true }
});

const industryBenchmarkSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  category: { type: String, required: true },
  demandScore: { type: Number, default: 90 },
  avgSalary: { type: String, required: true },
  keySkills: [skillSchema],
  emergingTrends: [{ type: String }]
}, {
  timestamps: true
});

export const IndustryBenchmark = mongoose.model('IndustryBenchmark', industryBenchmarkSchema);
