import React, { useState } from 'react';
import { 
  Award, 
  Handshake, 
  Building2, 
  Calendar, 
  PlusCircle, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Users,
  Zap
} from 'lucide-react';

export default function MoUHub({ mous = [], onAddNewMou }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [partnerCompany, setPartnerCompany] = useState('');
  const [institution, setInstitution] = useState('Apex Institute of Technology');
  const [scope, setScope] = useState('');
  const [activeProjects, setActiveProjects] = useState(2);
  const [impact, setImpact] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!partnerCompany || !scope) return;
    onAddNewMou({
      partnerCompany,
      institution,
      scope,
      activeProjects: Number(activeProjects),
      impact: impact || 'Direct student training and internship pipeline established.'
    });
    setShowAddModal(false);
    setPartnerCompany('');
    setScope('');
    setImpact('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0284C7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0284C7]"></span>
              </span>
              <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider">
                Institutional Partnerships & CoE Network
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Active Academia–Industry MoUs & Centers of Excellence
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Legally established corporate partnerships providing joint specialized laboratories, curriculum co-design, and priority hiring channels.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] px-5 py-3 text-xs font-extrabold text-white shadow-md shadow-[#0284C7]/20 transition-all hover:scale-102 cursor-pointer"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Propose New Institutional MoU</span>
          </button>
        </div>
      </div>

      {/* MoU Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mous.map((mou) => (
          <div 
            key={mou.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] flex flex-col justify-between hover:border-[#BAE6FD] transition-all duration-300 space-y-5 shadow-sm hover:shadow-md"
          >
            <div className="space-y-3.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-black bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#16A34A]" />
                  <span>{mou.status}</span>
                </span>
                <span className="text-[11px] font-bold text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-[#E2E8F0]">
                  {mou.activeProjects} CoE Labs
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#0F172A] leading-tight">
                  {mou.partnerCompany}
                </h3>
                <p className="text-xs font-semibold text-[#7C3AED] mt-1">
                  Partner: {mou.institution}
                </p>
              </div>

              <div className="text-xs text-[#0F172A] bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0]">
                <span className="text-[10px] uppercase font-bold text-[#64748B] block mb-1">Scope of Agreement:</span>
                <p className="text-[#64748B] text-xs line-clamp-3 leading-relaxed">
                  {mou.scope}
                </p>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-[#16A34A] font-bold">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Measured Student Outcome:</span>
                </div>
                <p className="text-xs text-[#0F172A] pl-5 leading-relaxed font-medium">
                  {mou.impact}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#64748B]" /> Signed: {mou.signedDate}
              </span>
              <span className="text-[#0F172A] font-bold">
                Valid: {mou.validUntil || '2028'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add MoU Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-[#CBD5E1] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <h3 className="text-lg font-extrabold text-[#0F172A]">Record New Academia–Industry MoU</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-[#64748B] hover:text-[#0F172A] text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#0F172A] font-bold mb-1">Corporate Partner Entity:</label>
                <input
                  type="text"
                  placeholder="e.g. AWS Educate / Siemens EDA / Intel Labs"
                  value={partnerCompany}
                  onChange={(e) => setPartnerCompany(e.target.value)}
                  required
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7] font-medium"
                />
              </div>

              <div>
                <label className="block text-[#0F172A] font-bold mb-1">Academic Partner Institution:</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  required
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7] font-medium"
                />
              </div>

              <div>
                <label className="block text-[#0F172A] font-bold mb-1">MoU Scope & Facilities:</label>
                <textarea
                  rows="3"
                  placeholder="Describe joint laboratories, student quotas, faculty development programs, credit recognition..."
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  required
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7] font-medium"
                />
              </div>

              <div>
                <label className="block text-[#0F172A] font-bold mb-1">Target Placement / Upskilling Impact:</label>
                <input
                  type="text"
                  placeholder="e.g. 100 students trained, min 20 campus offers guaranteed at ₹12+ LPA"
                  value={impact}
                  onChange={(e) => setImpact(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7] font-medium"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-white border border-[#CBD5E1] text-[#64748B] px-4 py-2 rounded-xl font-bold hover:bg-[#F8FAFC] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-5 py-2 rounded-xl font-extrabold shadow-md shadow-[#0284C7]/20 cursor-pointer"
                >
                  Register MoU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
