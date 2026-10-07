import React from 'react';
import { 
  FileCheck2, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Building, 
  ExternalLink,
  Sparkles, 
  ChevronRight,
  User,
  GraduationCap,
  Calendar,
  Zap
} from 'lucide-react';

export default function ApplicationTracker({ 
  applications = [], 
  currentRole, 
  onUpdateStatus 
}) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C3AED]"></span>
              </span>
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
                Application Tracking System (ATS) Pipeline
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Candidate Selection & Interview Progression
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Live multi-stage recruitment pipeline tracking resume verification, technical cloud labs, and placement letters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#F8FAFC] border border-[#CBD5E1] px-4 py-2 rounded-2xl text-[#64748B] font-bold shadow-xs">
              Active Applications: <strong className="text-[#0F172A] text-sm ml-1">{applications.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Applications Cards List */}
      <div className="space-y-5">
        {applications.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E2E8F0] rounded-3xl shadow-sm">
            <FileCheck2 className="h-12 w-12 text-[#94A3B8] mx-auto mb-3" />
            <p className="text-[#0F172A] text-base font-semibold">No active applications currently submitted.</p>
            <p className="text-[#64748B] text-xs mt-1">Navigate to the Internships & Placements board to apply with your verified profile.</p>
          </div>
        ) : (
          applications.map((app) => {
            return (
              <div 
                key={app.id} 
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] hover:border-[#DDD6FE] transition-all duration-300 space-y-5 shadow-sm hover:shadow-md"
              >
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black text-[#6D28D9] bg-[#F5F3FF] px-3 py-0.5 rounded-full border border-[#DDD6FE]">
                        {app.company}
                      </span>
                      <span className="text-[#CBD5E1]">•</span>
                      <span className="text-xs text-[#64748B] flex items-center gap-1 font-medium">
                        <Clock className="h-3.5 w-3.5 text-[#94A3B8]" /> Applied on {app.appliedDate}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[#0F172A]">
                      {app.jobTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#64748B]">
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-[#64748B]" /> Candidate: <strong className="text-[#0F172A]">{app.studentName}</strong>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="h-3.5 w-3.5 text-[#64748B]" /> {app.college} (CGPA: <strong className="text-[#7C3AED]">{app.cgpa}</strong>)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2">
                    <div className="flex items-center gap-1.5 bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] px-3.5 py-1.5 rounded-full text-xs font-black shadow-xs">
                      <Sparkles className="h-3.5 w-3.5 text-[#16A34A]" />
                      <span>{app.matchScore}% ATS Verification Score</span>
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] bg-[#F8FAFC] px-3 py-1 rounded-xl border border-[#CBD5E1]">
                      Stage: {app.status}
                    </span>
                  </div>
                </div>

                {/* Pipeline Timeline */}
                <div className="py-2">
                  <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-3.5">
                    Live Evaluation & Technical Interview Progression:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {app.timeline.map((step, idx) => {
                      return (
                        <div 
                          key={idx}
                          className={`p-4 rounded-2xl border text-xs flex flex-col justify-between transition-all duration-200 ${
                            step.done 
                              ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#15803D] shadow-2xs' 
                              : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                              Phase 0{idx + 1}
                            </span>
                            {step.done ? (
                              <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                            ) : (
                              <Clock className="h-4 w-4 text-[#94A3B8]" />
                            )}
                          </div>
                          <span className={`font-bold line-clamp-2 leading-tight ${step.done ? 'text-[#0F172A]' : 'text-[#64748B]'}`}>
                            {step.step}
                          </span>
                          <span className="text-[11px] mt-3 block font-mono opacity-80">
                            {step.date}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recruiter Controls */}
                <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <p className="text-[#0F172A]">
                    <strong className="text-[#7C3AED] font-bold">Reviewer Assessment Notes: </strong>
                    {app.notes}
                  </p>

                  {(currentRole === 'industry' || currentRole === 'academic') && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[#64748B] text-xs font-semibold">Advance Pipeline:</span>
                      <button
                        onClick={() => onUpdateStatus(app.id, 'Shortlisted for Assessment')}
                        className="bg-white hover:bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => onUpdateStatus(app.id, 'Interview Round Scheduled')}
                        className="bg-white hover:bg-[#F0F9FF] border border-[#BAE6FD] text-[#0369A1] px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                      >
                        Schedule Interview
                      </button>
                      <button
                        onClick={() => onUpdateStatus(app.id, 'Placement Offer Extended! 🎉')}
                        className="bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#BBF7D0] text-[#15803D] px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                      >
                        Extend Offer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
