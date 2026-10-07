import React, { useState } from 'react';
import { Sparkles, Cpu, BookOpen, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CurriculumCustomScannerModal({ 
  industryBenchmarks = [], 
  onClose,
  onApplyAnalysisResult
}) {
  const [syllabusText, setSyllabusText] = useState(
`Unit 1: Object-Oriented Programming & STL (Vectors, Maps, Templates)
Unit 2: Client-Server Architecture, HTTP 1.1, HTML5/CSS3, PHP and MySQL backend
Unit 3: Operating System Scheduling, Process Memory, Paging & Virtual Memory
Unit 4: Computer Networks: OSI 7-Layer model, TCP 3-way handshake, Socket Programming in C
Unit 5: Relational Algebra, BCNF Normalization, ACID Transactions and SQL Triggers`
  );

  const [targetIndustryId, setTargetIndustryId] = useState(industryBenchmarks[0]?.id || 'ind-cloud-devops');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const benchmark = industryBenchmarks.find(b => b.id === targetIndustryId) || industryBenchmarks[0];
      
      const lower = syllabusText.toLowerCase();
      
      // Analyze text against benchmark skills
      const results = benchmark.keySkills.map(skill => {
        const tokens = skill.name.toLowerCase().split(/[\s/()&,]+/).filter(Boolean);
        const matchFound = tokens.some(t => t.length > 3 && lower.includes(t));
        
        return {
          skill: skill.name,
          category: skill.category,
          detectedInSyllabus: matchFound,
          score: matchFound ? 85 : 15,
          verdict: matchFound ? 'Present in Syllabus' : 'Completely Missing',
          action: matchFound 
            ? 'Augment theoretical syllabus with hands-on lab environment.'
            : `Add 15-hour lab or elective module covering ${skill.name}.`
        };
      });

      const matchedCount = results.filter(r => r.detectedInSyllabus).length;
      const coveragePct = Math.round((matchedCount / results.length) * 100);

      const outdatedFlags = [];
      if (lower.includes('php')) outdatedFlags.push('PHP / Legacy Web Architecture — recommend modernizing to Node.js / React / Next.js');
      if (!lower.includes('docker') && !lower.includes('container')) outdatedFlags.push('No containerization modules found — add Docker & Kubernetes hands-on labs');
      if (!lower.includes('cloud') && !lower.includes('aws')) outdatedFlags.push('Absence of Cloud-native architecture coursework');

      setScanResult({
        roleName: benchmark.role,
        coveragePct,
        matchedCount,
        totalSkills: results.length,
        results,
        outdatedFlags
      });

      setIsScanning(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive Custom Syllabus AI Scanner</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Paste & Benchmark Any Department Course Syllabus
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-lg p-1">
            ✕
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-800 font-bold mb-1">
              Select Benchmark Industry Profile to Compare Against:
            </label>
            <select
              value={targetIndustryId}
              onChange={(e) => setTargetIndustryId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
            >
              {industryBenchmarks.map(b => (
                <option key={b.id} value={b.id}>
                  {b.role} ({b.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-800 font-bold mb-1">
              Paste Syllabus Units / Course Outline (Markdown or Plain Text):
            </label>
            <textarea
              rows="6"
              value={syllabusText}
              onChange={(e) => setSyllabusText(e.target.value)}
              placeholder="Paste units, lecture topic lists, or laboratory rubrics..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 font-mono text-[11px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] placeholder-slate-400"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleScan}
              disabled={isScanning}
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-3 rounded-xl font-extrabold flex items-center gap-2 shadow-md shadow-[#7C3AED]/25 disabled:opacity-50 transition-all"
            >
              <Cpu className="h-4 w-4" />
              <span>{isScanning ? 'Parsing Syllabus...' : 'Run Real-Time AI Gap Scan'}</span>
            </button>
          </div>
        </div>

        {/* Scan Results Display */}
        {scanResult && (
          <div className="pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-200 text-xs">
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[11px]">Syllabus Industry Alignment:</span>
                <span className="text-2xl font-black text-slate-900">
                  {scanResult.coveragePct}% <span className="text-xs font-normal text-slate-500">Match</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500">Competencies Detected:</span>
                <span className="block font-bold text-emerald-600">
                  {scanResult.matchedCount} of {scanResult.totalSkills} Required Skills
                </span>
              </div>
            </div>

            {scanResult.outdatedFlags.length > 0 && (
              <div className="bg-red-50 border border-red-200 p-3.5 rounded-2xl space-y-1">
                <span className="font-bold text-red-700 text-[11px] flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4 text-red-600" /> Outdated or Missing Modern Stack Flags:
                </span>
                <ul className="list-disc list-inside text-red-700/90 text-[11px] space-y-0.5">
                  {scanResult.outdatedFlags.map((flag, i) => (
                    <li key={i}>{flag}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <span className="font-bold text-slate-900 block">
                Detailed Skill Mapping Breakdown:
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {scanResult.results.map((r, i) => (
                  <div 
                    key={i}
                    className={`p-3 rounded-xl border flex items-center justify-between ${
                      r.detectedInSyllabus
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <div>
                      <span className="font-bold">{r.skill}</span>
                      <span className={`text-[10px] block ${r.detectedInSyllabus ? 'text-emerald-700' : 'text-slate-500'}`}>
                        {r.action}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      r.detectedInSyllabus
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                        : 'bg-amber-50 border-amber-200 text-amber-700'
                    }`}>
                      {r.verdict}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
