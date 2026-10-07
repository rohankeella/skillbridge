import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Code, 
  Layers, 
  Sparkles, 
  ArrowDown, 
  BookOpen, 
  Award, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu,
  ShieldCheck
} from 'lucide-react';

export default function VisualRoadmap({ 
  onClose,
  targetRole = 'Full Stack Developer',
  onStateChange 
}) {
  const [stages, setStages] = useState([
    {
      id: 'js',
      skill: 'JavaScript (ES6+, Async, DOM)',
      status: 'Industry Ready',
      progress: 100,
      icon: '⚡',
      duration: 'Week 1-2',
      deliverable: 'Async API Data Pipeline with Error Boundaries',
      resources: ['MDN Deep Dive', 'JavaScript: The Good Parts', 'LeetCode Medium Strings/Arrays'],
      completed: true
    },
    {
      id: 'react',
      skill: 'React (Hooks, Context, Performance)',
      status: 'Industry Ready',
      progress: 95,
      icon: '⚛️',
      duration: 'Week 3-4',
      deliverable: 'Realtime Enterprise Dashboard with Optimistic UI updates',
      resources: ['React Docs v19', 'Frontend Masters Advanced React', 'TailwindCSS System'],
      completed: true
    },
    {
      id: 'node',
      skill: 'Node.js & Express (REST, JWT, Middleware)',
      status: 'Industry Ready',
      progress: 90,
      icon: '🟢',
      duration: 'Week 5-6',
      deliverable: 'Secure Microservice Auth Engine with Redis Token Blacklisting',
      resources: ['Node.js Design Patterns', 'Express Production Best Practices', 'Postman Specs'],
      completed: true
    },
    {
      id: 'mongo',
      skill: 'MongoDB & Mongoose (Aggregation, Indexing)',
      status: 'Practiced',
      progress: 72,
      icon: '🍃',
      duration: 'Week 7',
      deliverable: 'Complex Multi-collection Aggregation Pipeline with Geospatial Indexing',
      resources: ['MongoDB University M201', 'Database Indexing In-Depth', 'Studio 3T Profiler'],
      completed: false
    },
    {
      id: 'docker',
      skill: 'Docker & Containerization (Multi-stage builds, Compose)',
      status: 'Learning',
      progress: 31,
      icon: '🐳',
      duration: 'Week 8',
      deliverable: 'Alpine Multi-Stage Containerized Full Stack Deployment with Healthchecks',
      resources: ['Docker Deep Dive (Nigel Poulton)', 'Docker Official Labs', 'Container Security 101'],
      completed: false
    },
    {
      id: 'aws',
      skill: 'AWS Cloud Deployment (EC2, S3, IAM, CloudFront)',
      status: 'Not Started',
      progress: 22,
      icon: '☁️',
      duration: 'Week 9',
      deliverable: 'Production Terraform/CloudFormation IaC deploy with SSL & CDN Edge Caching',
      resources: ['AWS Skill Builder', 'Stephane Maarek SAA-C03', 'Free Tier Cloud Playground'],
      completed: false
    },
    {
      id: 'capstone',
      skill: 'Full Stack Capstone Production Project',
      status: 'Not Started',
      progress: 15,
      icon: '🚀',
      duration: 'Week 10',
      deliverable: 'Live Production SaaS with CI/CD GitHub Actions, E2E Tests, and Custom Domain',
      resources: ['Vercel + AWS Architecture', 'Cypress Testing Suite', 'Production Monitoring (Datadog/Sentry)'],
      completed: false
    }
  ]);

  const stateOptions = [
    'Not Started',
    'Learning',
    'Practiced',
    'Project Completed',
    'Industry Ready'
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Industry Ready':
        return 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]';
      case 'Project Completed':
        return 'bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]';
      case 'Practiced':
        return 'bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE]';
      case 'Learning':
        return 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]';
    }
  };

  const handleUpdateStatus = (id, newStatus) => {
    let newProgress = 0;
    if (newStatus === 'Industry Ready') newProgress = 100;
    else if (newStatus === 'Project Completed') newProgress = 85;
    else if (newStatus === 'Practiced') newProgress = 70;
    else if (newStatus === 'Learning') newProgress = 40;
    else newProgress = 10;

    setStages(prev => prev.map(s => s.id === id ? { 
      ...s, 
      status: newStatus, 
      progress: newProgress,
      completed: newStatus === 'Industry Ready' || newStatus === 'Project Completed'
    } : s));

    if (onStateChange) onStateChange();
  };

  const completedCount = stages.filter(s => s.status === 'Industry Ready' || s.status === 'Project Completed').length;
  const overallRoadmapProgress = Math.round((stages.reduce((acc, s) => acc + s.progress, 0) / (stages.length * 100)) * 100);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDD6FE] space-y-6 shadow-md relative overflow-hidden">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] px-3.5 py-1 text-xs font-bold text-[#6D28D9]">
            <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />
            <span>SIH Section 6 — Interactive AI Skill Progression Roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            Personalized Career Learning Pathway
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Target Role: <strong className="text-[#7C3AED]">{targetRole}</strong> • Adaptive sequence designed to eliminate identified corporate hiring gaps.
          </p>
        </div>

        {/* Progress Stats Box */}
        <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] flex items-center gap-4 text-xs shadow-xs">
          <div>
            <span className="text-[#64748B] block text-[11px] font-medium">Roadmap Completion</span>
            <span className="text-xl font-black text-[#16A34A] block">{overallRoadmapProgress}%</span>
          </div>
          <div className="h-8 w-px bg-[#E2E8F0]" />
          <div>
            <span className="text-[#64748B] block text-[11px] font-medium">Completed Milestones</span>
            <span className="text-xl font-black text-[#7C3AED] block">{completedCount} / {stages.length}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#64748B]">
          <span>Linear Skill Journey (5 Interactive Progression States)</span>
          <span className="font-extrabold text-[#0F172A]">{completedCount} of {stages.length} Skills Industry Verified</span>
        </div>
        <div className="w-full bg-[#E2E8F0] rounded-full h-3 overflow-hidden">
          <div 
            className="h-3 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#0284C7] to-[#16A34A] transition-all duration-700" 
            style={{ width: `${overallRoadmapProgress}%` }}
          />
        </div>
      </div>

      {/* Interactive Pathway Steps */}
      <div className="space-y-4 pt-2">
        {stages.map((stage, idx) => {
          const isLast = idx === stages.length - 1;
          return (
            <div key={stage.id} className="relative">
              <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0] hover:border-[#DDD6FE] transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-5 group shadow-2xs hover:shadow-xs">
                {/* Left: Step Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="h-12 w-12 rounded-2xl bg-white border border-[#CBD5E1] flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    {stage.icon}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xs font-black text-[#7C3AED] uppercase tracking-wider">
                        {stage.duration}
                      </span>
                      <h4 className="font-extrabold text-[#0F172A] text-base group-hover:text-[#7C3AED] transition-colors">
                        {stage.skill}
                      </h4>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(stage.status)}`}>
                        {stage.status === 'Industry Ready' && '✓ '}
                        {stage.status}
                      </span>
                    </div>

                    <div className="text-xs text-[#64748B] bg-white p-3 rounded-xl border border-[#E2E8F0] space-y-1 shadow-2xs">
                      <div className="text-[#0F172A] flex items-center gap-1.5">
                        <strong className="text-[#15803D] font-bold">Capstone Deliverable:</strong>
                        <span>{stage.deliverable}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#64748B]">
                        <span className="text-[#7C3AED] font-semibold">Recommended Curricula:</span>
                        {stage.resources.map((res, ri) => (
                          <span key={ri} className="bg-[#F8FAFC] px-2 py-0.5 rounded text-[#0F172A] font-medium border border-[#E2E8F0]">
                            {res}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Interactive State Selector & Progress Gauge */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#E2E8F0]">
                  <div className="text-right">
                    <span className="text-[11px] text-[#64748B] block">Current Proficiency:</span>
                    <span className="text-lg font-black text-[#0F172A]">
                      {stage.progress}%
                    </span>
                  </div>

                  {/* Discrete State Toggle (SIH Section 6) */}
                  <div className="flex items-center gap-1.5">
                    <select
                      value={stage.status}
                      onChange={(e) => handleUpdateStatus(stage.id, e.target.value)}
                      className="bg-white text-[#0F172A] border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-[#7C3AED] cursor-pointer shadow-xs"
                    >
                      {stateOptions.map(opt => (
                        <option key={opt} value={opt} className="bg-white text-[#0F172A]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Connecting Down Arrow between roadmap steps */}
              {!isLast && (
                <div className="flex justify-center my-1.5">
                  <div className="h-6 w-0.5 bg-[#DDD6FE] flex items-center justify-center relative">
                    <ArrowDown className="h-3 w-3 text-[#7C3AED] absolute" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4 text-xs text-[#64748B]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
          <span>Roadmap milestones automatically update verified micro-credentials on corporate hiring partner radar.</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#F1F5F9] text-[#0F172A] font-bold border border-[#CBD5E1] transition shadow-xs cursor-pointer"
          >
            Close Roadmap
          </button>
        )}
      </div>
    </div>
  );
}
