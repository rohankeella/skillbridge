import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Shield, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  Award, 
  BarChart3, 
  Zap, 
  Layers, 
  Compass, 
  Users, 
  FileCheck2, 
  ExternalLink,
  Target,
  FileSpreadsheet,
  Bot,
  Play,
  ShieldCheck,
  Check,
  ChevronRight,
  LogIn
} from 'lucide-react';
import SkillBridgeArchitectureFlow from './SkillBridgeArchitectureFlow';

export default function LandingPage({ 
  onNavigateTab, 
  curriculums = [], 
  industryBenchmarks = [], 
  jobs = [], 
  mous = [], 
  onOpenAICoach,
  onOpenResumeModal,
  onOpenAuthModal,
  onOpenAIInterview,
  selectedStudent
}) {
  const [selectedDemoRole, setSelectedDemoRole] = useState('student');
  const [activeFaq, setActiveFaq] = useState(null);

  // Stats from live system or defaults
  const totalJobsCount = jobs.length || 8;
  const totalMousCount = mous.length || 6;
  const totalCurriculumsCount = curriculums.length || 4;

  const rolesShowcase = [
    {
      id: 'student',
      title: 'Students & Job Seekers',
      roleSubtitle: 'Career Readiness & Precision Placement',
      icon: GraduationCap,
      badge: 'Candidate Portal',
      badgeColor: 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]',
      accentColor: '#7C3AED',
      targetTab: 'profile',
      description: 'Discover exactly where your university degree falls short of corporate hiring standards. Gain a verified Career Readiness Index score, personalized AI learning roadmaps, and 1-click applications to high-match placement drives.',
      keyCapabilities: [
        'Multi-factor Career Readiness Index (0-100%)',
        'AI Resume Parser with instant skill gap extraction',
        'Automated Visual Roadmap & step-by-step milestones',
        'Live match compatibility score on every campus drive'
      ],
      ctaText: 'Launch Student Portal',
      metric: '94% Placement Match Rate'
    },
    {
      id: 'academic',
      title: 'Academic Institutions & TPOs',
      roleSubtitle: 'Curriculum Modernization & Placement Analytics',
      icon: Building2,
      badge: 'Dean & TPO Portal',
      badgeColor: 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]',
      accentColor: '#0284C7',
      targetTab: 'analytics',
      description: 'Empower Board of Studies (BoS) members and Placement Officers to benchmark syllabi against real-time industry demands. Pinpoint obsolete technologies and implement high-demand industry modules.',
      keyCapabilities: [
        'AI Syllabus Scanner (Plain text or Markdown course outlines)',
        'Accreditation alignment (AICTE & NBA compliance reporting)',
        'Cohort-wide skill deficit & placement analytics',
        'Direct Industry Center of Excellence (CoE) establishment'
      ],
      ctaText: 'Open College Dashboard',
      metric: '480+ Partner Universities'
    },
    {
      id: 'industry',
      title: 'Corporate Recruiters & MNCs',
      roleSubtitle: 'Pre-Filtered Talent & Institutional MoUs',
      icon: Briefcase,
      badge: 'Recruiter Portal',
      badgeColor: 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]',
      accentColor: '#D97706',
      targetTab: 'placements',
      description: 'Cut campus hiring cycle times by 70%. Post direct internship drives and access verified student profiles matched specifically on practical core competencies rather than generic resumes.',
      keyCapabilities: [
        'Targeted Campus Drives with granular skill filtering',
        'Institutional MoU Hub with digital stage tracking',
        'High-Signal ATS tracker with candidate scorecards',
        'Direct syllabus co-creation & hackathon sponsorship'
      ],
      ctaText: 'Explore Hiring Portal',
      metric: '₹18.4 LPA Average Tech CTC'
    },
    {
      id: 'admin',
      title: 'Regulatory & National Grid',
      roleSubtitle: 'AICTE / UGC Macro Workforce Intelligence',
      icon: Shield,
      badge: 'National Admin',
      badgeColor: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
      accentColor: '#16A34A',
      targetTab: 'admin',
      description: 'Govern national talent supply-demand equilibrium across regions and institutions. Monitor verified credentials, prevent skill inflation, and foster strategic industry-academia partnerships at scale.',
      keyCapabilities: [
        'Macro-level regional skill deficit heatmaps',
        'University accreditation & MoU compliance audits',
        'AI verification moderation queue for student credentials',
        'Real-time workforce market trends forecasting'
      ],
      ctaText: 'View National Admin Grid',
      metric: '100% Tamper-Proof Audit'
    }
  ];

  const features = [
    {
      icon: Cpu,
      title: 'AI Vector Competency Matching',
      description: 'Deep neural semantic vector alignment matching syllabus modules against 10,000+ real-time industry job specifications.',
      color: 'text-[#7C3AED]',
      bg: 'bg-[#F5F3FF]',
      border: 'border-[#DDD6FE]'
    },
    {
      icon: Bot,
      title: 'Real-Time AI Career Coach',
      description: 'Interactive career mentorship agent trained on current hiring market requirements, offering instant resume critiques and roadmap tips.',
      color: 'text-[#0284C7]',
      bg: 'bg-[#F0F9FF]',
      border: 'border-[#BAE6FD]'
    },
    {
      icon: Award,
      title: 'Digital MoU & CoE Governance',
      description: 'Structured bilateral agreement hub for establishing Corporate Labs, CoEs, Faculty Training programs, and joint research ventures.',
      color: 'text-[#D97706]',
      bg: 'bg-[#FFFBEB]',
      border: 'border-[#FDE68A]'
    },
    {
      icon: FileCheck2,
      title: 'End-to-End ATS Application Tracker',
      description: 'Real-time transparent candidate application pipeline tracking every stage from Shortlisted to Technical Interview and Offer Release.',
      color: 'text-[#16A34A]',
      bg: 'bg-[#F0FDF4]',
      border: 'border-[#BBF7D0]'
    },
    {
      icon: Target,
      title: 'Dynamic Readiness Index (CRI)',
      description: 'Weighted 0-100 score balancing core theory, practical projects, industry certifications, and coding benchmark consistency.',
      color: 'text-[#6D28D9]',
      bg: 'bg-[#EDE9FE]',
      border: 'border-[#C4B5FD]'
    },
    {
      icon: BarChart3,
      title: 'Curriculum Reform Simulator',
      description: 'Paste any university syllabus to instantly detect outdated modules, calculate industry coverage %, and get modern curriculum replacements.',
      color: 'text-[#0369A1]',
      bg: 'bg-[#E0F2FE]',
      border: 'border-[#7DD3FC]'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Curriculum Vector Ingestion',
      subtitle: 'Syllabus & Course Outline Analysis',
      desc: 'Colleges upload or paste university syllabus units. The AI engine extracts core concepts, laboratory rubrics, and technology stacks into high-dimensional embeddings.'
    },
    {
      number: '02',
      title: 'Live Market Benchmarking',
      subtitle: 'Corporate Hiring Profiling',
      desc: 'Active job profiles across Cloud, Full Stack, AI/ML, and Cybersecurity continuously calibrate required skill weights, tool ecosystems, and salary tiers.'
    },
    {
      number: '03',
      title: 'Deficit & Gap Detection',
      subtitle: 'Real-Time Synergy Calculation',
      desc: 'The mathematical cosine similarity engine highlights critical deficiencies (e.g. Docker, Kubernetes, CI/CD) and flags obsolete legacy components.'
    },
    {
      number: '04',
      title: 'Actionable Career Roadmaps',
      subtitle: 'Placement & Reform Execution',
      desc: 'Students receive personalized learning milestones, colleges implement Board of Studies syllabus upgrades, and recruiters hire interview-ready candidates.'
    }
  ];

  const currentRoleData = rolesShowcase.find(r => r.id === selectedDemoRole) || rolesShowcase[0];

  return (
    <div className="space-y-16 pb-12 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-10">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E2E8F0] shadow-md relative overflow-hidden">
          {/* Subtle Ambient Background Mesh Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-radial-mesh opacity-40 pointer-events-none" />
          
          <div className="relative z-10 w-full text-center space-y-6">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] px-4 py-1.5 text-xs font-bold text-[#6D28D9] shadow-2xs">
              <Sparkles className="h-4 w-4 text-[#7C3AED]" />
              <span>Smart India Hackathon SIH26044 • Unified Industry-Academia Ecosystem</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-tight sm:leading-none">
              Bridging the Chasm Between <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#0284C7]">
                Campus Curriculum
              </span>{' '}
              &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0891B2] to-[#16A34A]">
                Corporate Hiring
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-[#64748B] max-w-3xl mx-auto leading-relaxed font-normal">
              An intelligent national ecosystem aligning university syllabi with real-time job market requirements through dynamic competency vector matching, automated institutional MoUs, and targeted AI career roadmaps.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              <button
                onClick={() => onNavigateTab('skill-mapping', 'academic')}
                className="flex items-center gap-2.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] px-6 sm:px-8 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#7C3AED]/25 transition-all hover:scale-102 cursor-pointer"
              >
                <Cpu className="h-4.5 w-4.5" />
                <span>Launch AI Skill Gap Engine</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigateTab('placements', 'student')}
                className="flex items-center gap-2 rounded-2xl bg-white hover:bg-[#F8FAFC] px-6 sm:px-7 py-3.5 text-sm font-bold text-[#0F172A] border border-[#CBD5E1] transition-all shadow-xs hover:border-[#7C3AED] cursor-pointer"
              >
                <Briefcase className="h-4 w-4 text-[#0284C7]" />
                <span>Explore Campus Drives ({totalJobsCount})</span>
              </button>

              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] px-5 sm:px-6 py-3.5 text-sm font-extrabold text-white transition-all shadow-md shadow-[#7C3AED]/25 cursor-pointer"
              >
                <LogIn className="h-4.5 w-4.5" />
                <span>Student Register & Login</span>
              </button>

              <button
                onClick={onOpenAICoach}
                className="flex items-center gap-2 rounded-2xl bg-[#F0F9FF] hover:bg-[#E0F2FE] px-5 sm:px-6 py-3.5 text-sm font-bold text-[#0284C7] border border-[#BAE6FD] transition-all shadow-xs cursor-pointer"
              >
                <Bot className="h-4.5 w-4.5 text-[#0284C7]" />
                <span>Try AI Career Coach</span>
              </button>
            </div>

            {/* Live Metrics Counter Strip */}
            <div className="pt-8 border-t border-[#E2E8F0] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                <div className="text-2xl sm:text-3xl font-black text-[#7C3AED]">94.2%</div>
                <div className="text-xs text-[#64748B] font-medium mt-0.5">Average Synergy Match</div>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                <div className="text-2xl sm:text-3xl font-black text-[#0284C7]">12,400+</div>
                <div className="text-xs text-[#64748B] font-medium mt-0.5">Students Benchmarked</div>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                <div className="text-2xl sm:text-3xl font-black text-[#16A34A]">{totalMousCount}+ Active</div>
                <div className="text-xs text-[#64748B] font-medium mt-0.5">Corporate MoUs & CoEs</div>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                <div className="text-2xl sm:text-3xl font-black text-[#D97706]">₹18.4 LPA</div>
                <div className="text-xs text-[#64748B] font-medium mt-0.5">Average Premium CTC</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Way Ecosystem Roles Matrix */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#7C3AED] bg-[#F5F3FF] px-3 py-1 rounded-full border border-[#DDD6FE]">
            <Users className="h-3.5 w-3.5" />
            <span>Multi-Stakeholder Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
            Tailored Experiences for Every Stakeholder
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            SkillBridge unifies all four key pillars of higher education and employment into a synchronized platform.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {rolesShowcase.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedDemoRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedDemoRole(role.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#0F172A] shadow-md border-2 border-[#7C3AED]'
                    : 'bg-[#F8FAFC] text-[#64748B] border border-[#CBD5E1] hover:bg-white hover:text-[#0F172A]'
                }`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? 'text-[#7C3AED]' : 'text-[#64748B]'}`} />
                <span>{role.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Role Showcase Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] shadow-md w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 text-[11px] font-black rounded-full border ${currentRoleData.badgeColor}`}>
                  {currentRoleData.badge}
                </span>
                <span className="text-xs text-[#64748B] font-medium">• {currentRoleData.roleSubtitle}</span>
              </div>

              <h3 className="text-2xl font-black text-[#0F172A]">
                {currentRoleData.title}
              </h3>

              <p className="text-sm text-[#64748B] leading-relaxed">
                {currentRoleData.description}
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Core Platform Capabilities:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {currentRoleData.keyCapabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                      <span className="text-[#0F172A] font-medium leading-snug">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigateTab(currentRoleData.targetTab, currentRoleData.id)}
                  className="flex items-center gap-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] px-6 py-3 text-xs font-extrabold text-white shadow-md shadow-[#7C3AED]/20 transition-all cursor-pointer"
                >
                  <span>{currentRoleData.ctaText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                {currentRoleData.id === 'student' && (
                  <button
                    onClick={onOpenAuthModal}
                    className="flex items-center gap-2 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] px-5 py-3 text-xs font-extrabold text-[#7C3AED] shadow-xs hover:border-[#7C3AED] transition-all cursor-pointer"
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    <span>Sign In / Register</span>
                  </button>
                )}

                <div className="text-xs font-bold text-[#16A34A] bg-[#F0FDF4] px-3 py-2 rounded-xl border border-[#BBF7D0]">
                  ✓ {currentRoleData.metric}
                </div>
              </div>
            </div>

            {/* Right Column: Visual Preview Card */}
            <div className="lg:col-span-5 bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#EF4444]" />
                  <div className="h-3 w-3 rounded-full bg-[#F59E0B]" />
                  <div className="h-3 w-3 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-[11px] font-mono text-[#64748B]">live-grid-telemetry.io</span>
              </div>

              {selectedDemoRole === 'student' && (
                <div className="space-y-3">
                  <div className="bg-white p-3.5 rounded-xl border border-[#E2E8F0]">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#0F172A]">Career Readiness Score</span>
                      <span className="font-extrabold text-[#7C3AED]">84/100</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#7C3AED] h-full rounded-full w-[84%]" />
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] flex items-center justify-between text-xs">
                    <span className="text-[#64748B]">Top Suggested Role:</span>
                    <span className="font-bold text-[#0284C7]">Associate Platform Engineer</span>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-800">
                    ✓ Verified Credentials: 4 Micro-Certifications Linked
                  </div>
                </div>
              )}

              {selectedDemoRole === 'academic' && (
                <div className="space-y-3">
                  <div className="bg-white p-3.5 rounded-xl border border-[#E2E8F0]">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#0F172A]">B.Tech CSE Syllabus Coverage</span>
                      <span className="font-extrabold text-[#0284C7]">72% Aligned</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#0284C7] h-full rounded-full w-[72%]" />
                    </div>
                  </div>
                  <div className="bg-red-50 p-2.5 rounded-xl border border-red-200 text-xs text-red-800">
                    ⚠ Detected Gaps: Docker, Kubernetes, CI/CD Actions
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] text-xs flex justify-between">
                    <span className="text-[#64748B]">BoS Meeting Action:</span>
                    <span className="font-bold text-[#7C3AED]">Curriculum Upgrade Ready</span>
                  </div>
                </div>
              )}

              {selectedDemoRole === 'industry' && (
                <div className="space-y-3">
                  <div className="bg-white p-3.5 rounded-xl border border-[#E2E8F0] space-y-2">
                    <div className="text-xs font-bold text-[#0F172A]">Active Direct Drives</div>
                    <div className="flex justify-between text-xs text-[#64748B]">
                      <span>Databricks India</span>
                      <span className="font-bold text-[#16A34A]">96% Match Candidate Pool</span>
                    </div>
                  </div>
                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs text-amber-800">
                    💼 Active MoUs: 3 Center of Excellence Labs Formed
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] text-xs flex justify-between">
                    <span className="text-[#64748B]">Average Time to Hire:</span>
                    <span className="font-bold text-[#0F172A]">4.2 Days (vs 28 Days)</span>
                  </div>
                </div>
              )}

              {selectedDemoRole === 'admin' && (
                <div className="space-y-3">
                  <div className="bg-white p-3.5 rounded-xl border border-[#E2E8F0]">
                    <div className="text-xs font-bold text-[#0F172A] mb-1">National Talent Equilibrium</div>
                    <div className="flex justify-between text-xs text-[#64748B]">
                      <span>AICTE Universities Audited:</span>
                      <span className="font-bold text-[#16A34A]">482 Verified</span>
                    </div>
                  </div>
                  <div className="bg-sky-50 p-2.5 rounded-xl border border-sky-200 text-xs text-sky-800">
                    📊 Regional Deficit: High DevOps Demand in South Region
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] text-xs flex justify-between">
                    <span className="text-[#64748B]">Fraud Prevention:</span>
                    <span className="font-bold text-[#16A34A]">0 Fake Credential Flags</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Complete Architecture & Closed-Loop Engine */}
      <section className="space-y-6">
        <SkillBridgeArchitectureFlow
          onNavigateTab={onNavigateTab}
          onOpenAIInterview={onOpenAIInterview}
          onOpenAICoach={onOpenAICoach}
          onOpenResumeModal={onOpenResumeModal}
          selectedStudent={selectedStudent}
        />
      </section>

      {/* 4-Step Technical Pipeline Flow */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#0284C7] bg-[#F0F9FF] px-3 py-1 rounded-full border border-[#BAE6FD]">
            <Compass className="h-3.5 w-3.5" />
            <span>The AI Transformation Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
            How SkillBridge Bridges the Skill Chasm
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            From university syllabus extraction to verified industry placement in four automated steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {steps.map((st, i) => (
            <div key={i} className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3 relative group hover:border-[#7C3AED]/40 hover:shadow-md transition-all">
              <div className="text-2xl font-black text-[#7C3AED]/30 font-mono group-hover:text-[#7C3AED] transition-colors">
                {st.number}
              </div>
              <h4 className="text-base font-extrabold text-[#0F172A]">
                {st.title}
              </h4>
              <div className="text-xs font-bold text-[#0284C7]">
                {st.subtitle}
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Innovation Feature Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#16A34A] bg-[#F0FDF4] px-3 py-1 rounded-full border border-[#BBF7D0]">
            <Zap className="h-3.5 w-3.5" />
            <span>Feature Highlights</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
            Built Specifically for High-Impact Outcomes
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Engineered with deep vector analytics, real-time MongoDB tracking, and automated placement pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3 hover:shadow-md transition-all">
                <div className={`h-11 w-11 rounded-xl ${feat.bg} flex items-center justify-center border ${feat.border} ${feat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-[#0F172A]">
                  {feat.title}
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Quick Launch CTA Banner */}
      <section className="w-full">
        <div className="bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#0284C7] rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Ready to Modernize Higher Education & Campus Placements?
            </h3>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
              Jump straight into our interactive modules. Benchmark university courses, generate career roadmaps, or publish hiring drives with instant compatibility analytics.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onNavigateTab('skill-mapping', 'academic')}
              className="bg-white text-[#6D28D9] hover:bg-[#F8FAFC] px-7 py-3.5 rounded-2xl font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              Test AI Curriculum Benchmark
            </button>
            <button
              onClick={() => onNavigateTab('placements', 'student')}
              className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-7 py-3.5 rounded-2xl font-extrabold text-xs border border-white/20 transition-all cursor-pointer"
            >
              View Campus Placement Drives
            </button>
            <button
              onClick={onOpenResumeModal}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-2xl font-extrabold text-xs border border-white/20 transition-all cursor-pointer"
            >
              Scan Student Resume
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
