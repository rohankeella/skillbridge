import React, { useState } from 'react';
import { 
  UserCheck, 
  Sparkles, 
  Cpu, 
  GitCompare, 
  AlertTriangle, 
  Compass, 
  Bot, 
  Briefcase, 
  Award, 
  MessageSquare, 
  ArrowDown, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2, 
  Zap, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Sliders,
  BarChart2
} from 'lucide-react';

export default function SkillBridgeArchitectureFlow({ 
  onNavigateTab, 
  onOpenAIInterview, 
  onOpenAICoach,
  onOpenResumeModal,
  selectedStudent
}) {
  const [activeStepId, setActiveStepId] = useState('twin');
  const [simulatedCycleRunning, setSimulatedCycleRunning] = useState(false);
  const [lastFeedbackLog, setLastFeedbackLog] = useState(null);

  const steps = [
    {
      id: 'profile',
      number: '01',
      title: 'AI Profile Ingestion',
      shortTitle: 'AI PROFILE',
      icon: UserCheck,
      color: '#7C3AED',
      badge: 'Step 1 • Ingestion',
      summary: 'Parses academic transcripts, GitHub repos, uploaded resumes, and semester course syllabi.',
      details: [
        'Multi-format resume vector extraction (PDF, DOCX, LinkedIn)',
        'Transcript CGPA & branch coursework normalization',
        'Direct project repository code quality & stack parsing'
      ],
      actionLabel: 'Upload Resume / Parse Profile',
      actionType: 'resume'
    },
    {
      id: 'twin',
      number: '02',
      title: 'Dynamic Digital Skill Twin',
      shortTitle: 'SKILL TWIN',
      icon: Cpu,
      color: '#6D28D9',
      badge: 'Step 2 • Digital Avatar',
      summary: 'Maintains a live, multi-dimensional competency vector representing the student\'s verified capabilities.',
      details: [
        'Live Career Readiness Index (CRI 0-100% composite score)',
        'Self-updating skill vector across 40+ engineering facets',
        'Blockchain/tamper-proof academic transcript micro-credentials'
      ],
      actionLabel: 'Inspect Active Skill Twin',
      actionType: 'profile'
    },
    {
      id: 'demand_vs_skills',
      number: '03',
      title: 'Industry Demand vs Student Skills',
      shortTitle: 'DEMAND VS SKILLS',
      icon: GitCompare,
      color: '#0284C7',
      badge: 'Step 3 • Semantic Benchmark',
      summary: 'Runs semantic vector cosine-similarity against 10,000+ real-time corporate job requirements and campus benchmark tiers.',
      details: [
        'Vector alignment against Tier-1 Corporate benchmarks',
        'Weighting theory depth vs practical hands-on building',
        'Real-time indexing against current Q3 2026 hiring tech stacks'
      ],
      actionLabel: 'Explore Market Gap Matrix',
      actionType: 'mapping'
    },
    {
      id: 'gap',
      number: '04',
      title: 'Pinpointed Skill Gap Analysis',
      shortTitle: 'SKILL GAP',
      icon: AlertTriangle,
      color: '#D97706',
      badge: 'Step 4 • Gap Detection',
      summary: 'Identifies critical missing dependencies, outdated frameworks, and practical experience deficits.',
      details: [
        'Distinguishes Missing vs Sub-optimal proficiency gaps',
        'Ranks gaps by hiring market impact and role urgency',
        'Highlights AICTE syllabus obsolescence vulnerabilities'
      ],
      actionLabel: 'View Detailed Skill Gaps',
      actionType: 'mapping'
    },
    {
      id: 'roadmap',
      number: '05',
      title: 'AI Dynamic Remediation Roadmap',
      shortTitle: 'AI ROADMAP',
      icon: Compass,
      color: '#7C3AED',
      badge: 'Step 5 • Learning Path',
      summary: 'Generates a 5-stage personalized step-by-step milestone curriculum to bridge identified deficits.',
      details: [
        'Curated micro-modules, open-source projects, and lab exercises',
        'Sprint-based completion timelines (2 to 8 weeks)',
        'Real-time milestone unlock mechanism based on evidence'
      ],
      actionLabel: 'Open Interactive Roadmap',
      actionType: 'roadmap'
    },
    {
      id: 'interview',
      number: '06',
      title: 'AI Mock Technical Interview',
      shortTitle: 'AI INTERVIEW',
      icon: Bot,
      color: '#0891B2',
      badge: 'Step 6 • Assessment',
      summary: 'Simulates corporate technical, architectural, and behavioral screening rounds with real-time AI evaluation.',
      details: [
        'Role-specific coding, debugging, and system design challenges',
        'Instant AI feedback on conceptual depth and communication',
        'Direct calibration of interview score into readiness indices'
      ],
      actionLabel: 'Launch AI Interview Simulator 🎙️',
      actionType: 'interview'
    },
    {
      id: 'matching',
      number: '07',
      title: 'Precision Job & Internship Matching',
      shortTitle: 'JOB MATCHING',
      icon: Briefcase,
      color: '#16A34A',
      badge: 'Step 7 • Synergy Engine',
      summary: 'Matches candidate profiles to campus drives, stipend tiers (including Below 8k & Academic Credit), and work modes.',
      details: [
        'Compatibility scoring (e.g. 92% match) before applying',
        'Filters for Online/Remote, In-Office, and Hybrid modes',
        'Stipend presets: Below ₹8k, No Stipend / Unpaid, and CTC roles'
      ],
      actionLabel: 'Browse Matched Drives',
      actionType: 'placements'
    },
    {
      id: 'placement',
      number: '08',
      title: 'Placement & ATS Pipeline Tracking',
      shortTitle: 'PLACEMENT',
      icon: Award,
      color: '#D97706',
      badge: 'Step 8 • Selection',
      summary: 'Tracks candidate progression across Shortlisted, Technical Round, Interview, and Offer Letter stages.',
      details: [
        'Transparent digital application status tracker',
        'Direct institutional TPO & Corporate HR notification feed',
        'Verified placement offer letter issuance & acceptance'
      ],
      actionLabel: 'View Application Tracker',
      actionType: 'applications'
    },
    {
      id: 'feedback',
      number: '09',
      title: 'Industry Feedback & Loop Closure',
      shortTitle: 'INDUSTRY FEEDBACK',
      icon: MessageSquare,
      color: '#7C3AED',
      badge: 'Step 9 • Closed Loop 🔄',
      summary: 'Recruiter evaluations and interview scorecards feed directly back into the student\'s Digital Skill Twin.',
      details: [
        'Structured interview rubrics (Code Quality, Communication, Grit)',
        'Deficits identified during corporate interviews dynamically logged',
        'Closes the loop: Automatically updates the Skill Twin and adjusts future roadmap'
      ],
      actionLabel: 'Simulate Feedback Sync 🔄',
      actionType: 'simulate_feedback'
    }
  ];

  const activeStep = steps.find(s => s.id === activeStepId) || steps[1];

  const handleStepAction = (type) => {
    if (type === 'resume' && onOpenResumeModal) onOpenResumeModal();
    else if (type === 'interview' && onOpenAIInterview) onOpenAIInterview();
    else if (type === 'roadmap' && onNavigateTab) onNavigateTab('profile', 'student');
    else if (type === 'profile' && onNavigateTab) onNavigateTab('profile', 'student');
    else if (type === 'mapping' && onNavigateTab) onNavigateTab('skill-mapping', 'academic');
    else if (type === 'placements' && onNavigateTab) onNavigateTab('placements', 'student');
    else if (type === 'applications' && onNavigateTab) onNavigateTab('applications', 'student');
    else if (type === 'simulate_feedback') runSimulatedFeedbackCycle();
  };

  const runSimulatedFeedbackCycle = () => {
    setSimulatedCycleRunning(true);
    setTimeout(() => {
      setSimulatedCycleRunning(false);
      setLastFeedbackLog({
        timestamp: new Date().toLocaleTimeString(),
        source: 'Google Cloud / Tier-1 Campus Drive Evaluator',
        technicalScore: '8.8 / 10',
        identifiedGapResolved: 'Docker Containerization & CI/CD Pipelines verified',
        criIncrease: '+4.5% CRI Score',
        status: 'Skill Twin Vectors Successfully Updated!'
      });
      setActiveStepId('twin');
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E2E8F0] shadow-md space-y-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] px-3.5 py-1 text-xs font-bold text-[#6D28D9]">
            <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />
            <span>Autonomous Closed-Loop Competency Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            SkillBridge AI Execution Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl">
            From raw student profile ingestion to live digital twin, real-time demand matching, AI mock interviews, and automated recruiter feedback loop closure.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={runSimulatedFeedbackCycle}
            disabled={simulatedCycleRunning}
            className="flex items-center gap-2 bg-[#F5F3FF] hover:bg-[#EDE9FE] border border-[#DDD6FE] text-[#6D28D9] px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${simulatedCycleRunning ? 'animate-spin text-[#7C3AED]' : ''}`} />
            <span>{simulatedCycleRunning ? 'Running Closed Loop Cycle...' : 'Simulate Complete Loop'}</span>
          </button>

          <button
            onClick={() => onOpenAIInterview && onOpenAIInterview()}
            className="flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2.5 rounded-2xl text-xs font-extrabold transition shadow-md shadow-[#7C3AED]/20 cursor-pointer"
          >
            <Bot className="h-4 w-4" />
            <span>Launch AI Interview</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Architecture Flow Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Step Ladder (Matches the Diagram) */}
        <div className="lg:col-span-7 space-y-2.5 relative">
          {/* Continuous Loop indicator line on the side */}
          <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#7C3AED] via-[#0284C7] to-[#16A34A] -z-0 opacity-40" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStepId === step.id;
            const isLast = idx === steps.length - 1;

            return (
              <div key={step.id} className="relative z-10">
                <button
                  onClick={() => setActiveStepId(step.id)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group cursor-pointer ${
                    isSelected
                      ? 'bg-[#F5F3FF] border-[#C4B5FD] shadow-md ring-2 ring-[#7C3AED]/15'
                      : 'bg-white hover:bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Step Icon Badge */}
                    <div 
                      className={`h-11 w-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-transform group-hover:scale-105 shadow-xs ${
                        isSelected 
                          ? 'bg-[#7C3AED] text-white shadow-[#7C3AED]/30' 
                          : 'bg-[#F1F5F9] text-[#64748B]'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-[#EDE9FE] text-[#6D28D9]' : 'bg-[#F1F5F9] text-[#64748B]'
                        }`}>
                          {step.number}
                        </span>
                        <h4 className={`text-sm font-extrabold tracking-tight ${
                          isSelected ? 'text-[#6D28D9]' : 'text-[#0F172A]'
                        }`}>
                          {step.shortTitle}
                        </h4>
                      </div>
                      <p className="text-xs text-[#64748B] line-clamp-1 mt-0.5 font-normal">
                        {step.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {step.id === 'twin' && (
                      <span className="hidden sm:inline-block bg-[#F0FDF4] text-[#16A34A] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#BBF7D0]">
                        Live Core
                      </span>
                    )}
                    {step.id === 'feedback' && (
                      <span className="hidden sm:inline-block bg-[#F5F3FF] text-[#7C3AED] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#DDD6FE] animate-pulse">
                        Loop Back
                      </span>
                    )}
                    <ChevronRight className={`h-4 w-4 transition-transform ${
                      isSelected ? 'text-[#7C3AED] translate-x-1' : 'text-[#CBD5E1]'
                    }`} />
                  </div>
                </button>

                {/* Arrow connecting to next step */}
                {!isLast && (
                  <div className="flex justify-center my-0.5">
                    <ArrowDown className="h-3.5 w-3.5 text-[#CBD5E1]" />
                  </div>
                )}

                {/* Special Visual: Feedback Loop return banner */}
                {isLast && (
                  <div className="mt-2.5 p-3 rounded-xl bg-gradient-to-r from-[#EDE9FE] via-[#E0F2FE] to-[#F0FDF4] border border-[#DDD6FE] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#6D28D9]">
                      <RefreshCw className="h-3.5 w-3.5 text-[#7C3AED]" />
                      <span>Closes the Loop: Feedback updates Skill Twin vectors</span>
                    </div>
                    <button
                      onClick={() => setActiveStepId('twin')}
                      className="text-[11px] font-black text-[#7C3AED] hover:underline cursor-pointer"
                    >
                      View Twin ➔
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Step Deep Dive Panel */}
        <div className="lg:col-span-5 bg-[#F8FAFC] rounded-3xl p-6 border border-[#E2E8F0] space-y-6 lg:sticky lg:top-24 shadow-sm">
          {/* Header of Active Step */}
          <div className="space-y-3 pb-5 border-b border-[#E2E8F0]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7C3AED] bg-[#F5F3FF] border border-[#DDD6FE] px-3 py-1 rounded-full">
                {activeStep.badge}
              </span>
              <span className="text-xs font-bold text-[#64748B]">
                Stage {activeStep.number} / 09
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#7C3AED]/20">
                <activeStep.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0F172A] leading-tight">
                  {activeStep.title}
                </h3>
                <p className="text-xs text-[#64748B] font-medium mt-0.5">
                  Core Architectural Component
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pt-1">
              {activeStep.summary}
            </p>
          </div>

          {/* Key Architectural Highlights */}
          <div className="space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" />
              <span>Key Technical Mechanisms:</span>
            </div>
            <div className="space-y-2">
              {activeStep.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-[#E2E8F0] text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#7C3AED] mt-1.5 shrink-0" />
                  <span className="text-[#334155] font-medium leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Twin Live Telemetry Widget (When inspecting Step 2 or 9) */}
          {(activeStep.id === 'twin' || activeStep.id === 'feedback') && selectedStudent && (
            <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-[#7C3AED]" />
                  <span>Live Twin Telemetry: {selectedStudent.name}</span>
                </span>
                <span className="bg-[#F0FDF4] text-[#16A34A] px-2 py-0.5 rounded-full font-black text-[10px]">
                  ACTIVE
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
                  <div className="text-[10px] text-[#64748B]">Readiness Index</div>
                  <div className="text-lg font-black text-[#7C3AED]">{selectedStudent.assessmentScore || 78}%</div>
                </div>
                <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
                  <div className="text-[10px] text-[#64748B]">Verified Skills</div>
                  <div className="text-lg font-black text-[#16A34A]">{selectedStudent.verifiedSkills?.length || 4} Badges</div>
                </div>
              </div>
            </div>
          )}

          {/* Simulated Feedback Log Alert */}
          {lastFeedbackLog && activeStep.id === 'twin' && (
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-3.5 space-y-2 text-xs animate-in fade-in">
              <div className="flex items-center gap-1.5 font-bold text-[#15803D]">
                <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
                <span>Last Feedback Telemetry ({lastFeedbackLog.timestamp})</span>
              </div>
              <div className="text-[#166534] text-[11px] space-y-0.5">
                <div>• Source: <strong>{lastFeedbackLog.source}</strong></div>
                <div>• Verified: <strong>{lastFeedbackLog.identifiedGapResolved}</strong></div>
                <div>• Impact: <span className="bg-[#DCFCE7] px-1.5 py-0.5 rounded font-bold text-[#15803D]">{lastFeedbackLog.criIncrease}</span></div>
              </div>
            </div>
          )}

          {/* Action Button for the Step */}
          <div className="pt-2">
            <button
              onClick={() => handleStepAction(activeStep.actionType)}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-3 text-xs font-black shadow-md shadow-[#7C3AED]/20 transition-all hover:scale-101 cursor-pointer"
            >
              <span>{activeStep.actionLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
