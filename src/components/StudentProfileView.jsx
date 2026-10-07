import React, { useState } from 'react';
import { 
  UserCheck, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Calendar, 
  GraduationCap, 
  BookOpen, 
  Compass, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Check,
  FileText,
  Bot
} from 'lucide-react';
import CareerReadinessCard from './CareerReadinessCard';
import VisualRoadmap from './VisualRoadmap';
import SkillBridgeArchitectureFlow from './SkillBridgeArchitectureFlow';

export default function StudentProfileView({ 
  student, 
  onOpenResumeModal,
  onOpenAICoach,
  onOpenAIInterview
}) {
  const [targetRole, setTargetRole] = useState(student?.targetRole || 'Full Stack Developer');
  const [activeProfileTab, setActiveProfileTab] = useState('overview');

  if (!student) {
    return (
      <div className="text-[#64748B] p-12 text-center glass-panel rounded-3xl">
        No student profile selected.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Student Identity Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-tr from-[#7C3AED] via-[#6D28D9] to-[#0284C7] border border-white/20 text-4xl shadow-md shadow-[#7C3AED]/20">
              {student.avatar || '👨‍🎓'}
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                  {student.name}
                </h1>
                <span className="bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] px-3 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-2xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#16A34A]" />
                  <span>Verified Candidate Transcript</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B]">
                {student.department} • {student.college}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#64748B]">
                <span className="bg-[#F8FAFC] px-3 py-1 rounded-lg border border-[#E2E8F0] text-[#0F172A] font-semibold">
                  {student.year}
                </span>
                <span>•</span>
                <span className="text-[#7C3AED] font-bold">
                  Academic CGPA: {student.cgpa} / 10.0
                </span>
                <span>•</span>
                <span className="text-[#D97706] font-bold">
                  Target Profile: {targetRole}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Profile Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenResumeModal}
              className="flex items-center gap-2 rounded-2xl bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#7C3AED] px-4 py-2.5 text-xs font-bold text-[#0F172A] transition shadow-xs cursor-pointer"
            >
              <FileText className="h-4 w-4 text-[#7C3AED]" />
              <span>Sync Resume AI</span>
            </button>
            <button
              onClick={onOpenAIInterview}
              className="flex items-center gap-2 rounded-2xl bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#BBF7D0] px-4 py-2.5 text-xs font-bold text-[#15803D] transition shadow-xs cursor-pointer"
            >
              <Bot className="h-4 w-4 text-[#16A34A]" />
              <span>AI Mock Interview 🎙️</span>
            </button>
            <button
              onClick={onOpenAICoach}
              className="flex items-center gap-2 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] px-4 py-2.5 text-xs font-extrabold text-white shadow-md shadow-[#7C3AED]/25 transition hover:scale-102 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Ask AI Coach</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SIH Section 4.1 & 13: Dedicated Career Readiness Card (78% Index) */}
      <CareerReadinessCard
        student={student}
        targetRole={targetRole}
        onSelectRole={setTargetRole}
        onOpenRoadmap={() => setActiveProfileTab('roadmap')}
        onOpenResumeModal={onOpenResumeModal}
        onOpenAICoach={onOpenAICoach}
      />

      {/* Sub navigation between Overview, Interactive Roadmap, and Digital Skill Twin Loop */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E2E8F0] pb-2">
        <button
          onClick={() => setActiveProfileTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeProfileTab === 'overview'
              ? 'bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE] shadow-xs'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          Competency & Skill Badges
        </button>
        <button
          onClick={() => setActiveProfileTab('roadmap')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeProfileTab === 'roadmap'
              ? 'bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE] shadow-xs'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />
          <span>Interactive 5-State Learning Roadmap</span>
        </button>
        <button
          onClick={() => setActiveProfileTab('twin-loop')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeProfileTab === 'twin-loop'
              ? 'bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE] shadow-xs'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Cpu className="h-3.5 w-3.5 text-[#7C3AED]" />
          <span>Digital Skill Twin & Loop Flow 🔄</span>
        </button>
      </div>

      {activeProfileTab === 'overview' && (
        /* Verified Skills & Gaps Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
          {/* Verified Skills */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2.5">
                <Award className="h-5 w-5 text-[#16A34A]" />
                <h3 className="font-extrabold text-[#0F172A] text-base">Verified Skill Micro-Credentials</h3>
              </div>
              <span className="text-xs bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] px-3 py-0.5 rounded-full font-bold">
                {student.verifiedSkills.length} Badges
              </span>
            </div>

            <div className="space-y-3">
              {student.verifiedSkills.map((sk, idx) => (
                <div 
                  key={idx}
                  className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] flex items-center justify-between hover:border-[#DDD6FE] transition shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F172A] text-sm">{sk.name}</span>
                      <span className="text-[10px] bg-[#F5F3FF] text-[#6D28D9] px-2 py-0.5 rounded-full font-bold border border-[#DDD6FE]">
                        {sk.level}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#64748B] flex items-center gap-1 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" /> Verified Authority: {sk.verifiedBy}
                    </span>
                  </div>
                  <div className="h-9 w-9 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A] shadow-2xs">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Identified Gaps to Target Role */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-5 w-5 text-[#D97706]" />
                <h3 className="font-extrabold text-[#0F172A] text-base">Identified Deficits for {targetRole}</h3>
              </div>
              <span className="text-xs bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] px-3 py-0.5 rounded-full font-bold">
                {student.skillGaps.length} Target Gaps
              </span>
            </div>

            <div className="space-y-3">
              {student.skillGaps.map((gap, idx) => (
                <div 
                  key={idx}
                  className="bg-[#FFFBEB] p-4 rounded-2xl border border-[#FDE68A] flex flex-col justify-between gap-2.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#0F172A] text-sm">{gap.name}</span>
                    <span className="text-[10px] bg-white text-[#B45309] px-2.5 py-0.5 rounded-full font-bold border border-[#FDE68A]">
                      {gap.severity} Priority
                    </span>
                  </div>
                  <p className="text-xs text-[#0F172A] leading-relaxed">
                    <strong className="text-[#B45309] font-bold">Prescribed Upskilling Action:</strong> {gap.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeProfileTab === 'roadmap' && (
        <div className="animate-in fade-in duration-200">
          <VisualRoadmap targetRole={targetRole} />
        </div>
      )}

      {activeProfileTab === 'twin-loop' && (
        <div className="animate-in fade-in duration-200">
          <SkillBridgeArchitectureFlow
            selectedStudent={student}
            onOpenAIInterview={onOpenAIInterview}
            onOpenAICoach={onOpenAICoach}
            onOpenResumeModal={onOpenResumeModal}
          />
        </div>
      )}
    </div>
  );
}
