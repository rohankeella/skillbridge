import React from 'react';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  CheckCircle2, 
  AlertTriangle,
  Award,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Cloud,
  Shield,
  Cpu,
  Layers
} from 'lucide-react';

export default function InstitutionDashboard({ 
  curriculums = [], 
  jobs = [], 
  applications = [],
  mous = [],
  onNavigateToTab 
}) {
  const currentInstitution = curriculums[0]?.institution || 'Apex Institute of Technology';

  const commonSkillGaps = [
    { name: 'Cloud Computing (AWS / Azure / GCP)', gapPercent: 68, icon: Cloud, priority: 'High Deficit', remedial: '3-week Weekend AWS Cloud Practitioner Bootcamp' },
    { name: 'Cybersecurity & Secure Software Dev', gapPercent: 54, icon: Shield, priority: 'Medium Deficit', remedial: 'Integrate OWASP Top 10 labs into CS-302 Web Tech' },
    { name: 'AI / Machine Learning & PyTorch', gapPercent: 49, icon: Cpu, priority: 'Medium Deficit', remedial: 'Elective on LLM Fine-Tuning & Vector Search' },
    { name: 'DevOps, CI/CD & Docker Orchestration', gapPercent: 41, icon: Layers, priority: 'Moderate Deficit', remedial: 'Hands-on GitHub Actions Capstone Mandate' }
  ];

  return (
    <div className="space-y-6">
      {/* Institutional Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]"></span>
              </span>
              <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                College Analytics & TPO Command Center
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              College Analytics & Skill Alignment Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Monitor student cohort readiness, detect syllabus gaps, and design targeted industry training programs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#F8FAFC] border border-[#CBD5E1] px-4 py-2.5 rounded-2xl text-xs font-bold text-[#0F172A] shadow-xs">
              Institution: <strong className="text-[#7C3AED] ml-1">{currentInstitution}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* SIH Section 10 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Students: 2,486 */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Students</span>
            <div className="h-8 w-8 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] border border-[#DDD6FE]">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-[#0F172A]">
            2,486
          </div>
          <span className="text-[11px] text-[#64748B]">Enrolled Engineering Cohorts</span>
        </div>

        {/* Industry Partners: 42 */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Industry Partners</span>
            <div className="h-8 w-8 rounded-xl bg-[#FFFBEB] flex items-center justify-center text-[#D97706] border border-[#FDE68A]">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-[#D97706]">
            42
          </div>
          <span className="text-[11px] text-[#15803D] font-semibold">Active Corporate MoUs & CoEs</span>
        </div>

        {/* Active Internships: 86 */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Active Internships</span>
            <div className="h-8 w-8 rounded-xl bg-[#F0F9FF] flex items-center justify-center text-[#0284C7] border border-[#BAE6FD]">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-[#0284C7]">
            86
          </div>
          <span className="text-[11px] text-[#64748B]">Campus Drives & Research Labs</span>
        </div>

        {/* Placement Rate: 78% */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Placement Rate</span>
            <div className="h-8 w-8 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#16A34A] border border-[#BBF7D0]">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-[#15803D]">
            78%
          </div>
          <span className="text-[11px] text-[#15803D] font-semibold">+12% vs prior batch</span>
        </div>
      </div>

      {/* SIH Section 10: Common Skill Gaps Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Common Skill Gaps */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
            <div>
              <h3 className="font-extrabold text-[#0F172A] text-base">
                Common Skill Gaps Across Student Cohort
              </h3>
              <p className="text-xs text-[#64748B]">
                Aggregated student deficit metrics vs real-time corporate recruiter requirements.
              </p>
            </div>
            <span className="text-xs text-[#DC2626] font-bold bg-[#FEF2F2] border border-[#FECACA] px-3 py-0.5 rounded-full">
              Urgent Action
            </span>
          </div>

          <div className="space-y-4">
            {commonSkillGaps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#0F172A] flex items-center gap-2">
                      <Icon className="h-4 w-4 text-[#7C3AED]" />
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-[#FEF2F2] text-[#B91C1C] px-2 py-0.5 rounded-full font-bold border border-[#FECACA]">
                        {item.priority}
                      </span>
                      <strong className="text-sm font-black text-[#DC2626]">{item.gapPercent}%</strong>
                    </div>
                  </div>

                  <div className="w-full bg-[#E2E8F0] rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-[#DC2626] to-[#D97706]" 
                      style={{ width: `${item.gapPercent}%` }} 
                    />
                  </div>

                  <div className="text-[11px] text-[#64748B] pt-1 flex items-center justify-between">
                    <span>
                      <strong className="text-[#7C3AED]">Prescribed Training:</strong> {item.remedial}
                    </span>
                    <button 
                      onClick={() => onNavigateToTab('skill-mapping')}
                      className="text-[#7C3AED] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Analyze</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => onNavigateToTab('skill-mapping')}
            className="w-full bg-[#F5F3FF] hover:bg-[#EDE9FE] border border-[#DDD6FE] text-[#6D28D9] font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
          >
            <span>Launch Complete Curriculum Gap Vector Engine</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Right Column: Training Program Recommendations & Department Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
            <h3 className="font-extrabold text-[#0F172A] text-base">
              Targeted Training Initiatives
            </h3>
            <span className="text-xs text-[#15803D] font-bold">TPO Approved</span>
          </div>

          <div className="space-y-3.5">
            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-1.5 text-xs shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0F172A]">AWS Cloud & DevOps 4-Week CoE</span>
                <span className="text-[10px] bg-[#F0FDF4] text-[#15803D] px-2 py-0.5 rounded-full font-bold border border-[#BBF7D0]">
                  Enrolling
                </span>
              </div>
              <p className="text-[#64748B]">
                Sponsored by Amazon Web Services Academy. Targets 68% Cloud gap across 3rd-year CS students.
              </p>
              <div className="text-[11px] text-[#0284C7] font-semibold pt-1">
                Expected Readiness Boost: +16% Placement Alignment
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-1.5 text-xs shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0F172A]">NVIDIA Deep Learning Lab Elective</span>
                <span className="text-[10px] bg-[#F5F3FF] text-[#6D28D9] px-2 py-0.5 rounded-full font-bold border border-[#DDD6FE]">
                  Active
                </span>
              </div>
              <p className="text-[#64748B]">
                Hands-on GPU cluster training tackling the 49% AI/ML deficit in 4th-year cohorts.
              </p>
              <div className="text-[11px] text-[#0284C7] font-semibold pt-1">
                Corporate Hiring Partner: Tata Elxsi, NVIDIA
              </div>
            </div>

            <div className="p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl text-xs text-[#15803D] space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 font-bold text-[#15803D]">
                <Sparkles className="h-4 w-4 text-[#16A34A]" />
                <span>Autonomous Closed-Loop Feedback Engine</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#0F172A]">
                Corporate feedback from Microsoft and Google drives automatically recalibrates college syllabus recommendations every 14 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
