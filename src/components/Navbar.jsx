import React from 'react';
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Cpu, 
  Layers, 
  Award, 
  BarChart3, 
  FileCheck2, 
  Sparkles, 
  ChevronDown, 
  UserCheck, 
  Zap, 
  Globe2,
  Shield,
  FileText,
  Bot,
  LogIn
} from 'lucide-react';

export default function Navbar({ 
  currentRole, 
  setCurrentRole, 
  activeTab, 
  setActiveTab, 
  selectedStudent, 
  setSelectedStudent, 
  students = [],
  applicationCount = 0,
  onOpenAICoach,
  onOpenResumeModal,
  onOpenAuthModal
}) {
  // SIH Section 3 & 23: 4 Main Roles: Student, College, Industry, Admin
  const roles = [
    { 
      id: 'student', 
      label: 'Student', 
      roleTitle: 'Candidate Career Portal',
      icon: GraduationCap, 
      color: 'text-[#7C3AED]', 
      border: 'border-[#DDD6FE]',
      activeBg: 'bg-white text-[#6D28D9]' 
    },
    { 
      id: 'academic', 
      label: 'College', 
      roleTitle: 'Dean & TPO Portal',
      icon: Building2, 
      color: 'text-[#0284C7]', 
      border: 'border-[#BAE6FD]',
      activeBg: 'bg-white text-[#0369A1]' 
    },
    { 
      id: 'industry', 
      label: 'Industry', 
      roleTitle: 'Corporate Recruiter Portal',
      icon: Briefcase, 
      color: 'text-[#D97706]', 
      border: 'border-[#FDE68A]',
      activeBg: 'bg-white text-[#B45309]' 
    },
    { 
      id: 'admin', 
      label: 'Admin', 
      roleTitle: 'National Portal Administrator',
      icon: Shield, 
      color: 'text-[#16A34A]', 
      border: 'border-[#BBF7D0]',
      activeBg: 'bg-white text-[#15803D]' 
    },
  ];

  const tabs = [
    { id: 'home', label: 'Home Overview', icon: Globe2 },
    { id: 'skill-mapping', label: 'AI Skill Gap Engine', icon: Cpu, badge: 'Vector AI' },
    { id: 'placements', label: 'Internships & Drives', icon: Briefcase, badge: 'Live Matching' },
    { id: 'applications', label: 'ATS Tracker', icon: FileCheck2, count: applicationCount },
    { id: 'mous', label: 'Corporate MoUs', icon: Award },
    { id: 'profile', label: 'Career Readiness & Roadmap', icon: UserCheck, roleReq: 'student' },
    { id: 'analytics', label: 'College Analytics', icon: BarChart3, roleReq: 'academic' },
    { id: 'admin', label: 'National Admin Overview', icon: Shield, roleReq: 'admin' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E2E8F0] bg-white/95 backdrop-blur-2xl transition-all shadow-sm">
      {/* Top Telemetry & Status Bar */}
      <div className="border-b border-[#E2E8F0] bg-[#F8FAFC]/90 px-4 sm:px-8 lg:px-12 py-1.5 text-xs">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]"></span>
              </span>
              <span className="text-[#0F172A] font-semibold tracking-wide">SIH26044 National Career Grid Active</span>
            </div>
            <span className="hidden md:inline text-[#CBD5E1]">•</span>
            <span className="hidden md:inline text-[#64748B] text-[11px] font-mono">
              MongoDB + AI Competency Recommendation Engine Online
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* AI Assistant Quick Trigger */}
            <button
              onClick={onOpenAICoach}
              className="flex items-center gap-1.5 bg-[#F5F3FF] hover:bg-[#EDE9FE] border border-[#DDD6FE] text-[#6D28D9] px-3 py-0.5 rounded-full text-[11px] font-bold transition shadow-xs cursor-pointer"
            >
              <Sparkles className="h-3 w-3 text-[#7C3AED]" />
              <span>Ask SkillBridge AI ✨</span>
            </button>

            {currentRole === 'student' && (
              <button
                onClick={onOpenResumeModal}
                className="hidden sm:flex items-center gap-1.5 bg-[#F0F9FF] hover:bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] px-2.5 py-0.5 rounded-full text-[11px] font-bold transition cursor-pointer"
              >
                <FileText className="h-3 w-3 text-[#0284C7]" />
                <span>Resume AI</span>
              </button>
            )}

            {currentRole === 'student' && students.length > 0 && (
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-0.5 rounded-full border border-[#E2E8F0] shadow-xs">
                <span className="text-[#64748B] text-[11px]">Active:</span>
                <select
                  value={selectedStudent?.id}
                  onChange={(e) => {
                    const st = students.find(s => s.id === e.target.value);
                    if (st) setSelectedStudent(st);
                  }}
                  className="bg-transparent text-[#7C3AED] font-bold focus:outline-none cursor-pointer text-xs"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id} className="bg-white text-[#0F172A]">
                      {s.name} ({s.department})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex w-full items-center justify-between px-4 sm:px-8 lg:px-12 py-3">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3.5 group cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7C3AED] via-[#6D28D9] to-[#0284C7] shadow-md shadow-[#7C3AED]/20 ring-1 ring-black/5 transition-transform group-hover:scale-105">
            <GraduationCap className="h-6 w-6 text-white" />
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-white flex items-center justify-center border border-[#7C3AED]/40 shadow-xs">
              <Zap className="h-2.5 w-2.5 text-[#7C3AED]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-[#0F172A] font-['Plus_Jakarta_Sans']">
                SkillBridge<span className="text-[#7C3AED]">.AI</span>
              </span>
              <span className="rounded-full bg-[#F5F3FF] px-2 py-0.5 text-[10px] font-black text-[#7C3AED] border border-[#DDD6FE]">
                SIH26044
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] font-medium hidden sm:block">
              Academia–Industry Skill Mapping & Placement Engine
            </p>
          </div>
        </div>

        {/* 4 Roles Switcher (Student, College, Industry, Admin) */}
        <div className="flex items-center rounded-2xl bg-[#F1F5F9] p-1 border border-[#E2E8F0] shadow-xs">
          {roles.map((r) => {
            const Icon = r.icon;
            const isSelected = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => {
                  setCurrentRole(r.id);
                  if (r.id === 'academic' && (activeTab === 'profile' || activeTab === 'admin')) setActiveTab('analytics');
                  if (r.id === 'industry' && (activeTab === 'profile' || activeTab === 'admin' || activeTab === 'analytics')) setActiveTab('placements');
                  if (r.id === 'admin') setActiveTab('admin');
                  if (r.id === 'student' && (activeTab === 'analytics' || activeTab === 'admin')) setActiveTab('profile');
                }}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? `${r.activeBg} border ${r.border} shadow-sm`
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white/60'
                }`}
                title={r.roleTitle}
              >
                <Icon className={`h-4 w-4 ${isSelected ? r.color : 'text-[#64748B]'}`} />
                <span className="hidden sm:inline leading-none">{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Student Login / Register CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm hover:shadow-md cursor-pointer ring-2 ring-[#7C3AED]/20"
          >
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">Student Portal (Login / Register)</span>
            <span className="sm:hidden">Student</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex w-full overflow-x-auto px-4 sm:px-8 lg:px-12">
        <nav className="flex space-x-1.5 border-t border-[#E2E8F0] pt-1.5 pb-2.5">
          {tabs
            .filter(tab => !tab.roleReq || tab.roleReq === currentRole)
            .map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE] shadow-xs font-bold'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-[#7C3AED]' : 'text-[#64748B]'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="rounded-full bg-[#F0F9FF] px-2 py-0.5 text-[9px] text-[#0284C7] font-bold uppercase tracking-wider border border-[#BAE6FD]">
                      {tab.badge}
                    </span>
                  )}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="rounded-full bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 text-[10px] text-[#16A34A] font-black shadow-xs">
                      {tab.count}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent rounded-full" />
                  )}
                </button>
              );
            })}
        </nav>
      </div>
    </header>
  );
}
