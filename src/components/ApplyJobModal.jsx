import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  GraduationCap, 
  Building, 
  Briefcase,
  AlertCircle 
} from 'lucide-react';

export default function ApplyJobModal({ 
  job, 
  student, 
  onClose, 
  onSubmitApplication 
}) {
  const [resumeUrl, setResumeUrl] = useState('https://github.com/rohan-sharma-portfolio/resume.pdf');
  const [statement, setStatement] = useState('Enthusiastic candidate with verified lab certifications seeking hands-on industry experience.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    setTimeout(() => {
      onSubmitApplication({
        jobId: job.id,
        studentId: student?.id,
        studentName: student?.name,
        college: student?.college,
        cgpa: student?.cgpa,
        resumeUrl: resumeUrl
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-[#CBD5E1] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200 text-[#0F172A]">
        <div className="flex items-start justify-between pb-4 border-b border-[#E2E8F0]">
          <div>
            <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
              Campus Placement Application
            </span>
            <h2 className="text-xl font-extrabold text-[#0F172A] mt-0.5">
              Apply for {job.title}
            </h2>
            <p className="text-xs text-[#64748B]">
              {job.company} • {job.type}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-[#64748B] hover:text-[#0F172A] text-lg p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Candidate Summary Preview */}
        <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] text-xs space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[#64748B]">Applicant:</span>
            <strong className="text-[#0F172A]">{student?.name || 'Verified Student'}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#64748B]">Institute & CGPA:</span>
            <span className="text-[#0F172A]">{student?.college} ({student?.cgpa} CGPA)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#64748B]">Stipend / CTC:</span>
            <span className="text-[#15803D] font-black">{job.ctcPostInternship || job.stipend}</span>
          </div>
          <div className="flex items-center gap-1.5 pt-1 text-[11px] text-[#0284C7] font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Automatic ATS verified credentials will be dispatched with application.</span>
          </div>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#0F172A] font-bold mb-1">
              Verified Digital Portfolio / Resume Link:
            </label>
            <input
              type="url"
              required
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            />
          </div>

          <div>
            <label className="block text-[#0F172A] font-bold mb-1">
              Brief Candidate Statement / Highlights:
            </label>
            <textarea
              rows="3"
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A] px-4 py-2 rounded-xl font-bold hover:bg-[#F8FAFC] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-2.5 rounded-xl font-extrabold flex items-center gap-2 shadow-md shadow-[#7C3AED]/25 disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isSubmitting ? 'Transmitting...' : 'Confirm & Apply'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
