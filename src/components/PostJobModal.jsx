import React, { useState } from 'react';
import { Briefcase, Building, PlusCircle, CheckCircle2, DollarSign } from 'lucide-react';

export default function PostJobModal({ onClose, onAddJob }) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [type, setType] = useState('Internship (3 Months)');
  const [workMode, setWorkMode] = useState('Online / Remote');
  const [location, setLocation] = useState('Remote');
  const [stipendPreset, setStipendPreset] = useState('below-8k-5000'); // 'unpaid', 'below-8k-5000', 'below-8k-7500', 'custom'
  const [customStipend, setCustomStipend] = useState('');
  const [ctcPostInternship, setCtcPostInternship] = useState('₹7.5 LPA');
  const [openings, setOpenings] = useState('5');
  const [deadline, setDeadline] = useState('2026-11-30');
  const [skillsInput, setSkillsInput] = useState('React, JavaScript, Node.js, Git');
  const [description, setDescription] = useState('');
  const [academicEligibility, setAcademicEligibility] = useState('B.Tech/BCA/B.Sc Computer Science');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !company) return;

    const requiredSkills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);

    let finalStipend = customStipend;
    let stipendAmount = 0;
    let isUnpaid = false;

    if (stipendPreset === 'unpaid') {
      finalStipend = 'No Stipend (Academic Credit & Certificate)';
      stipendAmount = 0;
      isUnpaid = true;
    } else if (stipendPreset === 'below-8k-5000') {
      finalStipend = '₹5,000 / month (Below 8k)';
      stipendAmount = 5000;
      isUnpaid = false;
    } else if (stipendPreset === 'below-8k-7500') {
      finalStipend = '₹7,500 / month (Below 8k)';
      stipendAmount = 7500;
      isUnpaid = false;
    } else {
      finalStipend = customStipend || '₹6,000 / month';
      const parsed = parseInt(customStipend.replace(/[^0-9]/g, ''));
      stipendAmount = isNaN(parsed) ? 6000 : parsed;
      isUnpaid = stipendAmount === 0;
    }

    onAddJob({
      title,
      company,
      type,
      workMode,
      location,
      stipend: finalStipend,
      stipendAmount,
      isUnpaid,
      ctcPostInternship,
      openings: Number(openings) || 5,
      deadline,
      requiredSkills,
      description: description || 'Exciting opportunity for high-caliber graduates to solve production problems at scale.',
      academicEligibility,
      logo: '💼',
      tier: 'Direct Campus Placement Drive'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Post New Campus Drive / Internship</h3>
            <p className="text-xs text-slate-500">Add online remote, on-site, or hybrid internship opportunities</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-lg p-1">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-800 font-bold mb-1">Job / Internship Title:</label>
              <input
                type="text"
                required
                placeholder="e.g. Frontend Web Development Intern"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] placeholder-slate-400 font-medium"
              />
            </div>
            <div>
              <label className="block text-slate-800 font-bold mb-1">Hiring Company Name:</label>
              <input
                type="text"
                required
                placeholder="e.g. NextGen EdTech Solutions"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] placeholder-slate-400 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-slate-800 font-bold mb-1">Opportunity Type:</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
              >
                <option value="Internship (3 Months)">Internship (3 Months)</option>
                <option value="Internship (6 Months)">Internship (6 Months)</option>
                <option value="Internship (Summer 3 Months)">Internship (Summer)</option>
                <option value="Full-time Placement">Full-time Placement</option>
                <option value="Research Fellowship">Research Fellowship</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-800 font-bold mb-1">Work Mode (Online/Both):</label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
              >
                <option value="Online / Remote">Online / Remote</option>
                <option value="In-Office (On-Site)">In-Office (On-Site)</option>
                <option value="Hybrid (Both Online & On-Site)">Hybrid (Both Online & On-Site)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-800 font-bold mb-1">Location:</label>
              <input
                type="text"
                placeholder="e.g. Remote, Pune, Bengaluru"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
              />
            </div>
          </div>

          {/* Stipend Options (Below 8k & No Stipend Presets) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-slate-800 font-bold mb-1">
                Stipend Tier (Below 8k / No Stipend):
              </label>
              <select
                value={stipendPreset}
                onChange={(e) => setStipendPreset(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
              >
                <option value="below-8k-5000">Below 8k: ₹5,000 / month</option>
                <option value="below-8k-7500">Below 8k: ₹7,500 / month</option>
                <option value="unpaid">No Stipend (Academic Credit / Certificate)</option>
                <option value="custom">Custom Amount / Above 8k</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-800 font-bold mb-1">
                {stipendPreset === 'custom' ? 'Custom Stipend (₹):' : 'Calculated Stipend Display:'}
              </label>
              <input
                type="text"
                disabled={stipendPreset !== 'custom'}
                placeholder="e.g. ₹6,500 / month or ₹0"
                value={
                  stipendPreset === 'unpaid'
                    ? 'No Stipend (Academic Credit & Certificate)'
                    : stipendPreset === 'below-8k-5000'
                    ? '₹5,000 / month'
                    : stipendPreset === 'below-8k-7500'
                    ? '₹7,500 / month'
                    : customStipend
                }
                onChange={(e) => setCustomStipend(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium disabled:bg-slate-100 disabled:text-slate-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-800 font-bold mb-1">Expected CTC on PPO / Placement:</label>
              <input
                type="text"
                placeholder="e.g. ₹6.5 - 9.0 LPA"
                value={ctcPostInternship}
                onChange={(e) => setCtcPostInternship(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] placeholder-slate-400 font-medium"
              />
            </div>
            <div>
              <label className="block text-slate-800 font-bold mb-1">Open Positions & Seats:</label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 5"
                value={openings}
                onChange={(e) => setOpenings(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] placeholder-slate-400 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-800 font-bold mb-1">
              Required Core Competencies (comma separated):
            </label>
            <input
              type="text"
              required
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-800 font-bold mb-1">Academic Eligibility Criteria:</label>
            <input
              type="text"
              value={academicEligibility}
              onChange={(e) => setAcademicEligibility(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-800 font-bold mb-1">Role Overview & Responsibilities:</label>
            <textarea
              rows="3"
              placeholder="Detail candidate expectations and projects..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] placeholder-slate-400 font-medium"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-bold hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-2.5 rounded-xl font-extrabold shadow-md shadow-[#7C3AED]/25 transition-all"
            >
              Publish Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
