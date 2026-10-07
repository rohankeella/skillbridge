import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Compass, 
  ShieldAlert, 
  ExternalLink, 
  SlidersHorizontal, 
  FileSpreadsheet, 
  Award, 
  Zap, 
  Check,
  GraduationCap,
  Clock,
  Wrench,
  BadgeCheck,
  Briefcase
} from 'lucide-react';

export default function SkillMappingEngine({ 
  curriculums = [], 
  industryBenchmarks = [], 
  gapAnalysis, 
  selectedCurriculumId, 
  setSelectedCurriculumId, 
  selectedIndustryId, 
  setSelectedIndustryId, 
  onRunGapAnalysis,
  onOpenCustomScanner,
  loading 
}) {
  const [filterSeverity, setFilterSeverity] = useState('all');

  const selectedCurriculum = curriculums.find(c => c.id === selectedCurriculumId) || curriculums[0];
  const selectedBenchmark = industryBenchmarks.find(b => b.id === selectedIndustryId) || industryBenchmarks[0];

  const analysis = gapAnalysis || {};
  const breakdown = analysis.skillBreakdown || [];

  const filteredBreakdown = breakdown.filter(item => {
    if (filterSeverity === 'all') return true;
    if (filterSeverity === 'critical') return item.urgency === 'High';
    if (filterSeverity === 'moderate') return item.urgency === 'Medium';
    if (filterSeverity === 'aligned') return item.urgency === 'Low';
    return true;
  });

  const criticalGapsCount = breakdown.filter(s => s.urgency === 'High').length;
  const moderateGapsCount = breakdown.filter(s => s.urgency === 'Medium').length;
  const alignedCount = breakdown.filter(s => s.urgency === 'Low').length;
  const matchPct = analysis.overallMatchPercentage || 0;

  // SVG circular gauge calculations
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (matchPct / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 relative border border-[#DDD6FE] shadow-md">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] px-3.5 py-1 text-xs font-bold text-[#6D28D9]">
              <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />
              <span>AI-Powered Curriculum Vector Matching Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Curriculum Competency & Real-Time Industry Gap Analysis
            </h1>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Dynamically cross-examines university course structures against real-world job profiles to pinpoint missing practical competencies, obsolete technologies, and actionable Board of Studies (BoS) reform roadmaps.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCustomScanner}
              className="flex items-center gap-2 rounded-2xl bg-white hover:bg-[#F8FAFC] px-4 sm:px-5 py-3 text-xs font-bold text-[#0F172A] border border-[#CBD5E1] transition-all shadow-xs hover:border-[#7C3AED] cursor-pointer"
            >
              <FileSpreadsheet className="h-4 w-4 text-[#0284C7]" />
              <span>Paste Custom Syllabus</span>
            </button>
            <button
              onClick={() => onRunGapAnalysis(selectedCurriculumId, selectedIndustryId)}
              disabled={loading}
              className="flex items-center gap-2 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] px-5 sm:px-6 py-3 text-xs font-extrabold text-white shadow-md shadow-[#7C3AED]/25 transition-all disabled:opacity-50 hover:scale-102 cursor-pointer"
            >
              <Cpu className="h-4 w-4" />
              <span>{loading ? 'Evaluating Vectors...' : 'Recalculate AI Match'}</span>
            </button>
          </div>
        </div>

        {/* Dual Benchmarking Selectors */}
        <div className="mt-8 pt-6 border-t border-[#E2E8F0] grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {/* Syllabus Selector */}
          <div className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-2xs">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#16A34A]" />
                <span>Academic Institution & Degree Syllabus:</span>
              </label>
              <span className="text-[10px] font-bold bg-[#F0FDF4] text-[#15803D] px-2.5 py-0.5 rounded-full border border-[#BBF7D0]">
                Accredited Syllabus
              </span>
            </div>
            <select
              value={selectedCurriculumId}
              onChange={(e) => {
                setSelectedCurriculumId(e.target.value);
                onRunGapAnalysis(e.target.value, selectedIndustryId);
              }}
              className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-sm text-[#0F172A] font-semibold focus:ring-2 focus:ring-[#7C3AED] focus:outline-none transition cursor-pointer shadow-xs"
            >
              {curriculums.map((c) => (
                <option key={c.id} value={c.id} className="bg-white text-[#0F172A]">
                  {c.institution} — {c.degree}
                </option>
              ))}
            </select>
            {selectedCurriculum && (
              <div className="mt-2.5 flex flex-wrap items-center gap-2.5 text-xs text-[#64748B]">
                <span className="bg-white px-2.5 py-0.5 rounded-md text-[#15803D] font-semibold border border-[#BBF7D0]">
                  {selectedCurriculum.modules?.length || 0} Syllabus Units Mapped
                </span>
                <span>•</span>
                <span className="text-[#0F172A] font-medium">Cohort Size: {selectedCurriculum.totalStudents} Students</span>
              </div>
            )}
          </div>

          {/* Benchmark Selector */}
          <div className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-2xs">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#0284C7]" />
                <span>Benchmark Industry Target Profile:</span>
              </label>
              <span className="text-[10px] font-bold bg-[#F0F9FF] text-[#0369A1] px-2.5 py-0.5 rounded-full border border-[#BAE6FD]">
                Industry Benchmark
              </span>
            </div>
            <select
              value={selectedIndustryId}
              onChange={(e) => {
                setSelectedIndustryId(e.target.value);
                onRunGapAnalysis(selectedCurriculumId, e.target.value);
              }}
              className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-sm text-[#0F172A] font-semibold focus:ring-2 focus:ring-[#7C3AED] focus:outline-none transition cursor-pointer shadow-xs"
            >
              {industryBenchmarks.map((b) => (
                <option key={b.id} value={b.id} className="bg-white text-[#0F172A]">
                  {b.role} — ({b.category}) [Demand Score: {b.demandScore}/100]
                </option>
              ))}
            </select>
            {selectedBenchmark && (
              <div className="mt-2.5 flex flex-wrap items-center gap-2.5 text-xs text-[#64748B]">
                <span className="bg-white text-[#7C3AED] border border-[#DDD6FE] px-2.5 py-0.5 rounded-md font-bold">
                  Market CTC: {selectedBenchmark.avgSalary}
                </span>
                <span>•</span>
                <span className="text-[#D97706] font-bold">
                  Hiring Demand: {selectedBenchmark.demandScore}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 Telemetry Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Circular Match Gauge */}
        <div className="bg-white rounded-2xl p-5 border border-[#DDD6FE] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
              Curriculum Synergy
            </span>
            <div className="text-2xl font-black text-[#0F172A]">
              {analysis.alignmentCategory || 'Analyzed'}
            </div>
            <span className="text-[11px] text-[#64748B] block">
              {100 - matchPct}% requires intervention
            </span>
          </div>

          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-20 h-20 -rotate-90">
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="currentColor"
                strokeWidth="6"
                className="text-[#E2E8F0]"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="currentColor"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-[#7C3AED] transition-all duration-1000 ease-out"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-sm font-extrabold text-[#0F172A]">
              {matchPct}%
            </span>
          </div>
        </div>

        {/* Card 2: Critical Gaps */}
        <div className="bg-white rounded-2xl p-5 border border-[#FECACA] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">High-Urgency Gaps</span>
            <div className="h-8 w-8 rounded-xl bg-[#FEF2F2] flex items-center justify-center text-[#DC2626] border border-[#FECACA]">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-[#DC2626]">{criticalGapsCount}</div>
            <span className="text-xs text-[#64748B]">Completely Missing in Syllabus</span>
          </div>
          <p className="mt-2 text-[11px] text-[#B91C1C] leading-snug">
            High industry weight skills with zero syllabus representation.
          </p>
        </div>

        {/* Card 3: Moderate Lab Needs */}
        <div className="bg-white rounded-2xl p-5 border border-[#FDE68A] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Theory-Heavy Units</span>
            <div className="h-8 w-8 rounded-xl bg-[#FFFBEB] flex items-center justify-center text-[#D97706] border border-[#FDE68A]">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-[#D97706]">{moderateGapsCount}</div>
            <span className="text-xs text-[#64748B]">Needs Hands-on Lab Tooling</span>
          </div>
          <p className="mt-2 text-[11px] text-[#B45309] leading-snug">
            Taught theoretically but missing modern production tooling.
          </p>
        </div>

        {/* Card 4: Well Aligned */}
        <div className="bg-white rounded-2xl p-5 border border-[#BBF7D0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Well Aligned</span>
            <div className="h-8 w-8 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#16A34A] border border-[#BBF7D0]">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-[#15803D]">{alignedCount}</div>
            <span className="text-xs text-[#64748B]">Solid Academic Foundations</span>
          </div>
          <p className="mt-2 text-[11px] text-[#15803D] leading-snug">
            Theoretical core meets standard industry hiring benchmarks.
          </p>
        </div>
      </div>

      {/* Target Profile Requirements & Academic Prerequisites */}
      {(selectedBenchmark?.requirements || analysis?.requirements) && (() => {
        const req = selectedBenchmark?.requirements || analysis?.requirements;
        return (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DDD6FE] shadow-md space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] border border-[#DDD6FE] shadow-xs">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
                    <span>{selectedBenchmark.role} — Industry Profile Requirements</span>
                    <span className="text-xs font-bold text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD] px-2.5 py-0.5 rounded-full">
                      Hiring Standard
                    </span>
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Tier-1 industry qualification benchmarks, minimum practical lab hours, and required tooling standards.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#6D28D9] bg-[#F5F3FF] border border-[#DDD6FE] px-3 py-1 rounded-xl">
                  Market CTC: {selectedBenchmark.avgSalary}
                </span>
              </div>
            </div>

            {/* 4 Eligibility Parameters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#64748B]">
                  <GraduationCap className="h-3.5 w-3.5 text-[#7C3AED]" />
                  <span>Minimum Degree & CGPA:</span>
                </div>
                <p className="text-xs font-bold text-[#0F172A] leading-snug">{req.minDegree}</p>
                <span className="text-[11px] font-semibold text-[#6D28D9] block mt-1">Academic Cutoff: {req.minCgpa}</span>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#64748B]">
                  <Clock className="h-3.5 w-3.5 text-[#0284C7]" />
                  <span>Practical Lab Hours:</span>
                </div>
                <p className="text-xs font-bold text-[#0F172A] leading-snug">{req.practicalHours}</p>
                <span className="text-[11px] font-semibold text-[#0369A1] block mt-1">Experience: {req.experienceLevel}</span>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#64748B]">
                  <BadgeCheck className="h-3.5 w-3.5 text-[#16A34A]" />
                  <span>Recognized Certifications:</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {req.certifications?.map((cert, cIdx) => (
                    <span key={cIdx} className="text-[10px] font-bold bg-white text-[#15803D] border border-[#BBF7D0] px-2 py-0.5 rounded-md">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#64748B]">
                  <Wrench className="h-3.5 w-3.5 text-[#D97706]" />
                  <span>Production Tooling Stack:</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {req.coreTools?.slice(0, 6).map((tool, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-bold bg-white text-[#0F172A] border border-[#CBD5E1] px-2 py-0.5 rounded-md">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Capstone Portfolio Requirement */}
            {req.capstoneRequirement && (
              <div className="bg-[#F5F3FF] p-4 rounded-2xl border border-[#DDD6FE] flex items-start gap-3">
                <Zap className="h-4 w-4 text-[#7C3AED] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="font-bold text-[#6D28D9]">Mandatory Capstone Portfolio Requirement: </strong>
                  <span className="text-[#334155]">{req.capstoneRequirement}</span>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Competency Gap Breakdown Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
          <div>
            <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center gap-2">
              <span>Required Core Competencies & Syllabus Gap Matrix</span>
              <span className="text-xs font-bold text-[#6D28D9] bg-[#F5F3FF] border border-[#DDD6FE] px-2.5 py-0.5 rounded-full">
                {breakdown.length} Evaluated
              </span>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Granular matching between target industry skills and syllabus course codes.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#F1F5F9] p-1 rounded-xl border border-[#CBD5E1] text-xs shadow-2xs">
            <button
              onClick={() => setFilterSeverity('all')}
              className={`px-3 py-1.5 rounded-lg transition font-semibold cursor-pointer ${filterSeverity === 'all' ? 'bg-white text-[#7C3AED] shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'}`}
            >
              All ({breakdown.length})
            </button>
            <button
              onClick={() => setFilterSeverity('critical')}
              className={`px-3 py-1.5 rounded-lg transition font-semibold cursor-pointer ${filterSeverity === 'critical' ? 'bg-[#DC2626] text-white shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'}`}
            >
              Critical ({criticalGapsCount})
            </button>
            <button
              onClick={() => setFilterSeverity('moderate')}
              className={`px-3 py-1.5 rounded-lg transition font-semibold cursor-pointer ${filterSeverity === 'moderate' ? 'bg-[#D97706] text-white shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'}`}
            >
              Needs Labs ({moderateGapsCount})
            </button>
            <button
              onClick={() => setFilterSeverity('aligned')}
              className={`px-3 py-1.5 rounded-lg transition font-semibold cursor-pointer ${filterSeverity === 'aligned' ? 'bg-[#16A34A] text-white shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'}`}
            >
              Aligned ({alignedCount})
            </button>
          </div>
        </div>

        {/* Skill Gap Cards */}
        <div className="space-y-4">
          {filteredBreakdown.length === 0 ? (
            <div className="text-center py-12 text-[#64748B] text-sm">
              No skills match the selected filter criteria.
            </div>
          ) : (
            filteredBreakdown.map((item, idx) => {
              const isCritical = item.urgency === 'High';
              const isModerate = item.urgency === 'Medium';

              return (
                <div 
                  key={idx}
                  className={`rounded-2xl p-5 transition-all border shadow-2xs ${
                    isCritical 
                      ? 'bg-[#FEF2F2] border-[#FECACA] hover:border-[#F87171]' 
                      : isModerate 
                      ? 'bg-[#FFFBEB] border-[#FDE68A] hover:border-[#FCD34D]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#DDD6FE]'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    {/* Left: Skill name, category & syllabus course */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-extrabold text-[#0F172A] text-base">
                          {item.skill}
                        </span>
                        <span className="text-[11px] font-bold bg-white text-[#64748B] px-2.5 py-0.5 rounded-md border border-[#E2E8F0]">
                          {item.category}
                        </span>
                        <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          isCritical 
                            ? 'bg-white text-[#DC2626] border border-[#FECACA]' 
                            : isModerate 
                            ? 'bg-white text-[#D97706] border border-[#FDE68A]'
                            : 'bg-white text-[#16A34A] border border-[#BBF7D0]'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#64748B]">
                        <span>
                          Mapped Course: <strong className={item.matchedCourse.includes('None') ? 'text-[#DC2626] font-bold' : 'text-[#0F172A]'}>{item.matchedCourse}</strong>
                        </span>
                        <span>•</span>
                        <span>Industry Demand Weight: <strong className="text-[#7C3AED]">{item.industryWeight}/100</strong></span>
                      </div>

                      {/* Required Proficiency & Hands-on Deliverable */}
                      {(item.minProficiency || item.labDeliverable) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-1">
                          {item.minProficiency && (
                            <div className="bg-white p-2.5 rounded-xl border border-[#E2E8F0] flex items-start gap-2 shadow-2xs">
                              <SlidersHorizontal className="h-3.5 w-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-[#7C3AED]">Required Competency Level: </span>
                                <span className="text-[#334155]">{item.minProficiency}</span>
                              </div>
                            </div>
                          )}
                          {item.labDeliverable && (
                            <div className="bg-white p-2.5 rounded-xl border border-[#E2E8F0] flex items-start gap-2 shadow-2xs">
                              <BookOpen className="h-3.5 w-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-[#16A34A]">Lab Deliverable Standard: </span>
                                <span className="text-[#334155]">{item.labDeliverable}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="pt-1 text-xs text-[#0F172A] bg-white p-3 rounded-xl border border-[#CBD5E1] flex items-start gap-2.5 shadow-2xs">
                        <Compass className="h-4 w-4 text-[#0284C7] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#0284C7]">Recommended Bridging Action: </span>
                          <span>{item.recommendedAction}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Coverage and Gap meters */}
                    <div className="w-full lg:w-72 space-y-2.5 lg:border-l lg:border-[#CBD5E1] lg:pl-6">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#64748B] font-medium">Syllabus Coverage:</span>
                        <span className="font-extrabold text-[#0F172A]">{item.curriculumCoverage}%</span>
                      </div>
                      <div className="w-full bg-[#E2E8F0] rounded-full h-2.5 overflow-hidden">
                        <div 
                          className={`h-2.5 rounded-full transition-all duration-500 ${
                            item.curriculumCoverage >= 70 ? 'bg-[#16A34A]' :
                            item.curriculumCoverage >= 40 ? 'bg-[#D97706]' : 'bg-[#DC2626]'
                          }`}
                          style={{ width: `${item.curriculumCoverage}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-[#64748B] font-medium">Industry Gap Deficit:</span>
                        <span className={`font-black ${isCritical ? 'text-[#DC2626]' : isModerate ? 'text-[#D97706]' : 'text-[#16A34A]'}`}>
                          {item.gapScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Actionable Curriculum Reform Roadmap & Emerging Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Academic Senate Action Plan */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-md space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-[#E2E8F0]">
            <div className="h-10 w-10 rounded-2xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] border border-[#DDD6FE] shadow-xs">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#0F172A] text-base">Academic Senate & Board of Studies (BoS) Action Plan</h3>
              <p className="text-xs text-[#64748B]">High-impact academic interventions for degree curriculum accreditation</p>
            </div>
          </div>

          <div className="space-y-4">
            {(analysis.proposedBridgeActions || []).map((action, idx) => (
              <div key={idx} className="bg-[#F8FAFC] p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] flex items-start gap-4 shadow-2xs">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED] text-white font-extrabold text-xs shadow-xs">
                  {idx + 1}
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-bold text-[#0F172A] text-sm">{action.title}</h4>
                    <span className="text-[11px] font-bold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] px-2.5 py-0.5 rounded-full">
                      {action.readinessBoost}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">{action.description}</p>
                  <div className="pt-1 text-[11px] text-[#64748B] flex items-center gap-2">
                    <span className="font-medium">Target Implementation:</span>
                    <span className="text-[#0F172A] bg-white px-2 py-0.5 rounded font-semibold border border-[#E2E8F0]">{action.timeframe}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emerging Tech Horizons */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-[#E2E8F0]">
              <div className="h-10 w-10 rounded-2xl bg-[#F0F9FF] flex items-center justify-center text-[#0284C7] border border-[#BAE6FD] shadow-xs">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#0F172A] text-base">Emerging Tech Horizons</h3>
                <p className="text-xs text-[#64748B]">18-month forward enterprise horizon</p>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#64748B] leading-relaxed">
              These emerging technologies are actively recruited by Tier-1 corporate partners but are rarely present in legacy university curricula:
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {(analysis.emergingTrendsToAdopt || []).map((trend, idx) => (
                <div 
                  key={idx}
                  className="bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs"
                >
                  <Sparkles className="h-3 w-3 text-[#0284C7]" />
                  <span>{trend}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-[#F8FAFC] border border-[#DDD6FE] shadow-inner">
            <h5 className="text-xs font-bold text-[#6D28D9] flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-[#7C3AED]" /> Co-Design Curriculum Electives
            </h5>
            <p className="mt-1 text-[11px] text-[#64748B] leading-normal">
              Invite active corporate MoU partners to co-author accredited elective syllabi and sponsor student cloud credits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
