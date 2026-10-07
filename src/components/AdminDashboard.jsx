import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Building2, 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  Search, 
  Filter, 
  Check, 
  X, 
  Clock, 
  FileText,
  Sparkles,
  Award,
  Zap,
  Globe2
} from 'lucide-react';

export default function AdminDashboard() {
  const [pendingVerifications, setPendingVerifications] = useState([
    {
      id: 'ver-1',
      type: 'College',
      name: 'Vellore Institute of Emerging Technologies (VIET)',
      state: 'Tamil Nadu',
      appliedAt: '2 hours ago',
      documents: 'AICTE-2025-VIET.pdf, NAAC A++ Cert',
      status: 'pending'
    },
    {
      id: 'ver-2',
      type: 'Company',
      name: 'QuantumEdge AI Systems Pvt Ltd',
      location: 'Bengaluru / Hyderabad',
      appliedAt: '3 hours ago',
      documents: 'CIN-U72900KA2024PTC, GSTIN Verification',
      status: 'pending'
    },
    {
      id: 'ver-3',
      type: 'College',
      name: 'Delhi State University of Aerospace Engineering',
      state: 'New Delhi',
      appliedAt: 'Yesterday',
      documents: 'UGC-Approved-DSUAE.pdf',
      status: 'pending'
    },
    {
      id: 'ver-4',
      type: 'Company',
      name: 'NextGen Autonomous Robotics Corp',
      location: 'Pune / Remote',
      appliedAt: 'Yesterday',
      documents: 'DPIIT Startup India ID: DIPP98214',
      status: 'pending'
    }
  ]);

  const [moderationJobs, setModerationJobs] = useState([
    {
      id: 'mod-1',
      title: 'Full Stack AI Engineering Intern',
      company: 'NeuroScale Technologies',
      stipend: '₹45,000 / month',
      openings: 8,
      status: 'under_review'
    },
    {
      id: 'mod-2',
      title: 'Graduate Engineer Trainee (GET) - Embedded Systems',
      company: 'Tata Advanced Systems',
      stipend: '₹7.5 LPA CTC',
      openings: 25,
      status: 'under_review'
    }
  ]);

  const handleApproveVerification = (id) => {
    setPendingVerifications(prev => prev.map(v => v.id === id ? { ...v, status: 'approved' } : v));
  };

  const handleRejectVerification = (id) => {
    setPendingVerifications(prev => prev.map(v => v.id === id ? { ...v, status: 'rejected' } : v));
  };

  const handleApproveJob = (id) => {
    setModerationJobs(prev => prev.filter(j => j.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Admin Command Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]"></span>
              </span>
              <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                National Portal Administration & Governance Center
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              SIH26044 Platform Oversight & Ecosystem Audit
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Verified regulatory administration bridging colleges, students, and national industry partners.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#F8FAFC] border border-[#DDD6FE] px-4 py-2.5 rounded-2xl text-xs text-[#0F172A] shadow-xs">
              <span className="text-[#64748B]">Current Clearance:</span>
              <strong className="text-[#7C3AED] ml-2 font-mono">ROOT_ADMIN_SUPERVISOR</strong>
            </div>
          </div>
        </div>
      </div>

      {/* SIH Section 11 Core Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Students: 25,480 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Total Students</span>
            <div className="h-8 w-8 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] border border-[#DDD6FE]">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0F172A]">
            25,480
          </div>
          <span className="text-[11px] text-[#16A34A] font-semibold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +1,420 this semester
          </span>
        </div>

        {/* Colleges: 182 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Colleges & Univs</span>
            <div className="h-8 w-8 rounded-xl bg-[#F0F9FF] flex items-center justify-center text-[#0284C7] border border-[#BAE6FD]">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0284C7]">
            182
          </div>
          <span className="text-[11px] text-[#64748B]">Across 28 States & UTs</span>
        </div>

        {/* Industry Partners: 420 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Industry Partners</span>
            <div className="h-8 w-8 rounded-xl bg-[#FFFBEB] flex items-center justify-center text-[#D97706] border border-[#FDE68A]">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#D97706]">
            420
          </div>
          <span className="text-[11px] text-[#16A34A] font-semibold">Tier-1 Corporates & Startups</span>
        </div>

        {/* Internships: 1,860 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Total Internships</span>
            <div className="h-8 w-8 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#16A34A] border border-[#BBF7D0]">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#16A34A]">
            1,860
          </div>
          <span className="text-[11px] text-[#64748B]">Stipend Avg: ₹38k / mo</span>
        </div>

        {/* Placements: 1,240 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-sm space-y-2 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Placements Concluded</span>
            <div className="h-8 w-8 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] border border-[#DDD6FE]">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0F172A]">
            1,240
          </div>
          <span className="text-[11px] text-[#16A34A] font-semibold">91.4% Retention Rate</span>
        </div>
      </div>

      {/* SIH Section 11 Platform Activity Strip */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E2E8F0] shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-[#16A34A] animate-pulse" />
          <span className="font-extrabold text-[#0F172A]">Live Platform Real-Time Telemetry:</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#16A34A]" />
            <span className="text-[#64748B]">Users Online:</span>
            <strong className="text-[#0F172A] font-black text-sm">1,284</strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0284C7]" />
            <span className="text-[#64748B]">Applications Submitted Today:</span>
            <strong className="text-[#0F172A] font-black text-sm">342</strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
            <span className="text-[#64748B]">New Opportunities Created:</span>
            <strong className="text-[#0F172A] font-black text-sm">28</strong>
          </div>
        </div>
      </div>

      {/* Two Columns: Verification Queue & Job Moderation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Queue */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
            <div>
              <h3 className="font-extrabold text-[#0F172A] text-base">
                Institutional & Corporate Verification Queue
              </h3>
              <p className="text-xs text-[#64748B]">
                Review accreditation and legal registration before issuing portal credentials.
              </p>
            </div>
            <span className="bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] px-3 py-0.5 rounded-full text-xs font-bold">
              {pendingVerifications.filter(v => v.status === 'pending').length} Pending
            </span>
          </div>

          <div className="space-y-3.5">
            {pendingVerifications.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] flex flex-col justify-between gap-3 text-xs shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                        item.type === 'College' ? 'bg-[#F0F9FF] text-[#0369A1] border border-[#BAE6FD]' : 'bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]'
                      }`}>
                        {item.type}
                      </span>
                      <h4 className="font-extrabold text-[#0F172A] text-sm">{item.name}</h4>
                    </div>
                    <p className="text-[11px] text-[#64748B]">
                      {item.state || item.location} • Applied {item.appliedAt}
                    </p>
                    <p className="text-[11px] text-[#7C3AED] font-mono">
                      Docs: {item.documents}
                    </p>
                  </div>

                  {item.status === 'approved' && (
                    <span className="bg-[#F0FDF4] text-[#15803D] px-3 py-1 rounded-xl text-xs font-bold border border-[#BBF7D0] flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Approved
                    </span>
                  )}
                  {item.status === 'rejected' && (
                    <span className="bg-[#FEF2F2] text-[#B91C1C] px-3 py-1 rounded-xl text-xs font-bold border border-[#FECACA] flex items-center gap-1">
                      <X className="h-3.5 w-3.5" /> Rejected
                    </span>
                  )}
                  {item.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRejectVerification(item.id)}
                        className="p-2 rounded-xl bg-white hover:bg-[#FEF2F2] text-[#DC2626] border border-[#CBD5E1] transition cursor-pointer shadow-xs"
                        title="Reject Verification"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleApproveVerification(item.id)}
                        className="px-3.5 py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold transition shadow-sm shadow-[#16A34A]/20 flex items-center gap-1 cursor-pointer"
                        title="Approve Entity"
                      >
                        <Check className="h-4 w-4" />
                        <span>Verify</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Internship Listing Moderation */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
            <div>
              <h3 className="font-extrabold text-[#0F172A] text-base">
                Campus Drive Moderation & Policy Filter
              </h3>
              <p className="text-xs text-[#64748B]">
                Ensuring fair compensation, transparent job descriptions, and anti-spam verification.
              </p>
            </div>
            <span className="bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE] px-3 py-0.5 rounded-full text-xs font-bold">
              AI Monitored
            </span>
          </div>

          <div className="space-y-3.5">
            {moderationJobs.map((job) => (
              <div key={job.id} className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] flex items-center justify-between gap-3 text-xs shadow-2xs">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-[#0F172A] text-sm">{job.title}</h4>
                  <p className="text-[#64748B]">
                    {job.company} • Compensation: <strong className="text-[#15803D]">{job.stipend}</strong> ({job.openings} Openings)
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#15803D]">
                    <CheckCircle2 className="h-3 w-3" /> AI Verification: Compliant with SIH minimum stipend guidelines
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApproveJob(job.id)}
                    className="px-4 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold shadow-xs transition cursor-pointer"
                  >
                    Authorize Drive
                  </button>
                </div>
              </div>
            ))}

            <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#7C3AED] font-bold">
                <Shield className="h-4 w-4" />
                <span>Automated Compliance Protocols Active:</span>
              </div>
              <ul className="text-[#64748B] space-y-1 pl-4 list-disc text-[11px]">
                <li>Mandatory transparent stipend disclosure enforcement</li>
                <li>University MoU verification check before opening campus drive slots</li>
                <li>Zero-cost application enforcement for all students across participating colleges</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
