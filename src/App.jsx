import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SkillMappingEngine from './components/SkillMappingEngine';
import PlacementPortal from './components/PlacementPortal';
import ApplicationTracker from './components/ApplicationTracker';
import StudentProfileView from './components/StudentProfileView';
import MoUHub from './components/MoUHub';
import InstitutionDashboard from './components/InstitutionDashboard';
import AdminDashboard from './components/AdminDashboard';
import ApplyJobModal from './components/ApplyJobModal';
import PostJobModal from './components/PostJobModal';
import CurriculumCustomScannerModal from './components/CurriculumCustomScannerModal';
import ResumeParserModal from './components/ResumeParserModal';
import AICareerCoachDrawer from './components/AICareerCoachDrawer';
import LandingPage from './components/LandingPage';
import StudentAuthModal from './components/StudentAuthModal';
import AIInterviewModal from './components/AIInterviewModal';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  Building2, 
  Briefcase,
  Zap,
  Globe2,
  Cpu,
  Bot
} from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState('student');
  const [activeTab, setActiveTab] = useState('home');

  // Core Data States
  const [curriculums, setCurriculums] = useState([]);
  const [industryBenchmarks, setIndustryBenchmarks] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [mous, setMous] = useState([]);

  // Gap Analysis State
  const [selectedCurriculumId, setSelectedCurriculumId] = useState('');
  const [selectedIndustryId, setSelectedIndustryId] = useState('');
  const [gapAnalysis, setGapAnalysis] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // Modals, Drawers & Notifications
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isCustomScannerOpen, setIsCustomScannerOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAIInterviewOpen, setIsAIInterviewOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleStudentAuthSuccess = (student, message) => {
    setStudents(prev => {
      const exists = prev.some(s => s.id === student.id || (student.rollNo && s.rollNo === student.rollNo));
      if (!exists) {
        return [student, ...prev];
      }
      return prev.map(s => s.id === student.id ? student : s);
    });
    setSelectedStudent(student);
    setCurrentRole('student');
    setActiveTab('profile');
    showToast(message || `Welcome, ${student.name}!`);
  };

  // Step 6 & Twin Sync: AI Mock Interview Completion Handler
  const handleInterviewComplete = (interviewResult) => {
    if (!selectedStudent) return;
    const newVerified = [
      ...selectedStudent.verifiedSkills,
      {
        name: interviewResult.badge,
        level: 'Advanced',
        verifiedBy: 'AI Technical Interview Simulator',
        verifiedDate: new Date().toISOString().split('T')[0]
      }
    ];
    const updated = {
      ...selectedStudent,
      verifiedSkills: newVerified,
      assessmentScore: Math.min(100, (selectedStudent.assessmentScore || 78) + Math.round(interviewResult.criIncrease))
    };
    setSelectedStudent(updated);
    setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
    showToast(`🎉 AI Interview Completed! Verified Badge Awarded & Skill Twin CRI boosted by +${interviewResult.criIncrease}%`);
  };

  // Step 9 & Closed Loop: Industry Recruiter Feedback Handler (Updates Skill Twin)
  const handleIndustryFeedback = (appId, feedbackText, rating) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          notes: `[Recruiter Evaluation • ${rating}/10]: ${feedbackText}`
        };
      }
      return app;
    }));

    const targetApp = applications.find(a => a.id === appId);
    if (targetApp) {
      setStudents(prev => prev.map(s => {
        if (s.name.toLowerCase() === targetApp.studentName.toLowerCase()) {
          const updatedSkills = [
            ...s.verifiedSkills,
            {
              name: `Recruiter Verified: ${targetApp.jobTitle}`,
              level: 'Proficient',
              verifiedBy: `${targetApp.company} Interview Panel`,
              verifiedDate: new Date().toISOString().split('T')[0]
            }
          ];
          return {
            ...s,
            verifiedSkills: updatedSkills,
            assessmentScore: Math.min(100, (s.assessmentScore || 80) + 3)
          };
        }
        return s;
      }));

      if (selectedStudent && selectedStudent.name.toLowerCase() === targetApp.studentName.toLowerCase()) {
        setSelectedStudent(prev => ({
          ...prev,
          assessmentScore: Math.min(100, (prev.assessmentScore || 80) + 3)
        }));
      }
    }

    showToast(`🔄 Closed Loop Active: Candidate Skill Twin updated from live industry evaluation!`);
  };

  // Initial Data Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [currRes, indRes, jobsRes, appsRes, studRes, mousRes] = await Promise.all([
          fetch('/api/curriculums'),
          fetch('/api/industry-benchmarks'),
          fetch('/api/jobs'),
          fetch('/api/applications'),
          fetch('/api/students'),
          fetch('/api/mous')
        ]);

        const [currData, indData, jobsData, appsData, studData, mousData] = await Promise.all([
          currRes.json(),
          indRes.json(),
          jobsRes.json(),
          appsRes.json(),
          studRes.json(),
          mousRes.json()
        ]);

        if (currData.success) {
          setCurriculums(currData.data);
          setSelectedCurriculumId(currData.data[0]?.id || '');
        }

        if (indData.success) {
          setIndustryBenchmarks(indData.data);
          setSelectedIndustryId(indData.data[0]?.id || '');
        }

        if (jobsData.success) setJobs(jobsData.data);
        if (appsData.success) setApplications(appsData.data);
        if (mousData.success) setMous(mousData.data);

        if (studData.success && studData.data.length > 0) {
          setStudents(studData.data);
          setSelectedStudent(studData.data[0]);
        }

        // Run initial gap analysis
        if (currData.data?.[0]?.id && indData.data?.[0]?.id) {
          runGapAnalysis(currData.data[0].id, indData.data[0].id);
        }
      } catch (err) {
        console.error('Initial API load error:', err);
      }
    };

    fetchData();
  }, []);

  // Run Gap Analysis
  const runGapAnalysis = async (cId, iId) => {
    if (!cId || !iId) return;
    setLoadingAnalysis(true);
    try {
      const res = await fetch('/api/gap-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ curriculumId: cId, industryId: iId })
      });
      const data = await res.json();
      if (data.success) {
        setGapAnalysis(data.analysis);
      }
    } catch (err) {
      console.error('Gap analysis fetch error:', err);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  // Submit Job Application
  const handleApplyJob = (job) => {
    setSelectedJobForApply(job);
    setIsApplyModalOpen(true);
  };

  const handleSubmitApplication = async (appPayload) => {
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appPayload)
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev => [data.application, ...prev]);
        showToast(`🎉 Applied successfully to ${data.application.jobTitle}! ATS verification dispatched.`);
      }
    } catch (err) {
      console.error('Failed to submit application:', err);
      showToast('Error submitting application. Please try again.', 'error');
    }
  };

  // Update Application Status (Recruiter / Academic action)
  const handleUpdateAppStatus = async (appId, newStatus) => {
    try {
      const res = await fetch(`/api/applications/${appId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev => prev.map(a => a.id === appId ? data.application : a));
        showToast(`Application status updated to: ${newStatus}`);
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  // Add Job
  const handleAddJob = async (jobPayload) => {
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobPayload)
      });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => [data.job, ...prev]);
        showToast(`Campus opportunity "${data.job.title}" posted successfully!`);
      }
    } catch (err) {
      console.error('Failed to add job', err);
    }
  };

  // Add MoU
  const handleAddMou = async (mouPayload) => {
    try {
      const res = await fetch('/api/mous', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mouPayload)
      });
      const data = await res.json();
      if (data.success) {
        setMous(prev => [data.mou, ...prev]);
        showToast(`Institutional MoU with ${data.mou.partnerCompany} registered!`);
      }
    } catch (err) {
      console.error('Failed to add MoU', err);
    }
  };

  // Handle Resume Parsing Apply (Updates active student profile)
  const handleApplyParsedResume = (parsedData) => {
    if (!selectedStudent) return;
    const newVerifiedSkills = [
      ...selectedStudent.verifiedSkills,
      ...parsedData.skills.filter(s => !selectedStudent.verifiedSkills.some(vs => vs.name.toLowerCase() === s.toLowerCase())).map(s => ({
        name: s,
        level: 'Intermediate',
        verifiedBy: 'AI Resume Extraction',
        verifiedDate: '2026-03-24'
      }))
    ];

    const updated = {
      ...selectedStudent,
      verifiedSkills: newVerifiedSkills,
      cgpa: parsedData.education?.cgpa ? parseFloat(parsedData.education.cgpa) : selectedStudent.cgpa
    };

    setSelectedStudent(updated);
    setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
    showToast('✨ Resume competencies synchronized! Career Readiness updated.');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-['Inter'] selection:bg-[#EDE9FE] selection:text-[#6D28D9] bg-radial-mesh bg-grid-pattern relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white/95 border border-[#CBD5E1] text-[#0F172A] px-5 py-3.5 rounded-2xl shadow-xl backdrop-blur-xl animate-in slide-in-from-bottom duration-300">
          {toast.type === 'error' ? (
            <AlertCircle className="h-5 w-5 text-[#DC2626] shrink-0" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-[#16A34A] shrink-0" />
          )}
          <span className="text-xs font-bold text-[#0F172A]">{toast.message}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
        students={students}
        applicationCount={applications.length}
        onOpenAICoach={() => setIsAICoachOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenAIInterview={() => setIsAIInterviewOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 space-y-6 relative z-10">
        {/* Dynamic View rendering based on activeTab */}
        {activeTab === 'home' && (
          <LandingPage
            onNavigateTab={(tabId, role) => {
              if (role) setCurrentRole(role);
              setActiveTab(tabId);
            }}
            curriculums={curriculums}
            industryBenchmarks={industryBenchmarks}
            jobs={jobs}
            mous={mous}
            onOpenAICoach={() => setIsAICoachOpen(true)}
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onOpenAIInterview={() => setIsAIInterviewOpen(true)}
            selectedStudent={selectedStudent}
          />
        )}

        {activeTab === 'skill-mapping' && (
          <SkillMappingEngine
            curriculums={curriculums}
            industryBenchmarks={industryBenchmarks}
            gapAnalysis={gapAnalysis}
            selectedCurriculumId={selectedCurriculumId}
            setSelectedCurriculumId={setSelectedCurriculumId}
            selectedIndustryId={selectedIndustryId}
            setSelectedIndustryId={setSelectedIndustryId}
            onRunGapAnalysis={runGapAnalysis}
            onOpenCustomScanner={() => setIsCustomScannerOpen(true)}
            loading={loadingAnalysis}
          />
        )}

        {activeTab === 'placements' && (
          <PlacementPortal
            jobs={jobs}
            currentStudent={selectedStudent}
            currentRole={currentRole}
            onApplyJob={handleApplyJob}
            onOpenPostJobModal={() => setIsPostJobModalOpen(true)}
            applications={applications}
          />
        )}

        {activeTab === 'applications' && (
          <ApplicationTracker
            applications={applications}
            currentRole={currentRole}
            onUpdateStatus={handleUpdateAppStatus}
            onIndustryFeedback={handleIndustryFeedback}
          />
        )}

        {activeTab === 'mous' && (
          <MoUHub
            mous={mous}
            onAddNewMou={handleAddMou}
          />
        )}

        {activeTab === 'profile' && (
          <StudentProfileView
            student={selectedStudent}
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
            onOpenAICoach={() => setIsAICoachOpen(true)}
            onOpenAIInterview={() => setIsAIInterviewOpen(true)}
          />
        )}

        {activeTab === 'analytics' && (
          <InstitutionDashboard
            curriculums={curriculums}
            jobs={jobs}
            applications={applications}
            mous={mous}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Floating AI Coach Trigger Button (Bottom-Right) */}
      <button
        onClick={() => setIsAICoachOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#0284C7] text-white px-5 py-3.5 rounded-full shadow-xl shadow-[#7C3AED]/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all border border-white/40 group font-bold text-xs cursor-pointer"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <Sparkles className="h-4 w-4" />
        <span className="tracking-wide">Ask SkillBridge AI</span>
      </button>

      {/* Footer with refined light branding */}
      <footer className="border-t border-[#E2E8F0] bg-white/95 py-8 text-xs text-[#64748B] relative z-10">
        <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F5F3FF] text-[#7C3AED] font-bold border border-[#DDD6FE]">
              🎓
            </div>
            <div>
              <span className="font-extrabold text-[#0F172A]">SkillBridge.AI</span>
              <span className="text-[#64748B] ml-2">— SIH26044 Academia–Industry Collaboration Platform</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[#64748B] font-medium">
            <span>React + Vite</span>
            <span>•</span>
            <span>Node + Express</span>
            <span>•</span>
            <span>MongoDB Mongoose</span>
            <span>•</span>
            <span>AI Competency Vector Engine</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {isApplyModalOpen && (
        <ApplyJobModal
          job={selectedJobForApply}
          student={selectedStudent}
          onClose={() => setIsApplyModalOpen(false)}
          onSubmitApplication={handleSubmitApplication}
        />
      )}

      {isPostJobModalOpen && (
        <PostJobModal
          onClose={() => setIsPostJobModalOpen(false)}
          onAddJob={handleAddJob}
        />
      )}

      {isCustomScannerOpen && (
        <CurriculumCustomScannerModal
          industryBenchmarks={industryBenchmarks}
          onClose={() => setIsCustomScannerOpen(false)}
        />
      )}

      {isResumeModalOpen && (
        <ResumeParserModal
          student={selectedStudent}
          onClose={() => setIsResumeModalOpen(false)}
          onApplyParsedData={handleApplyParsedResume}
        />
      )}

      {isAuthModalOpen && (
        <StudentAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleStudentAuthSuccess}
          students={students}
        />
      )}

      {isAIInterviewOpen && (
        <AIInterviewModal
          isOpen={isAIInterviewOpen}
          onClose={() => setIsAIInterviewOpen(false)}
          student={selectedStudent}
          onInterviewComplete={handleInterviewComplete}
        />
      )}

      <AICareerCoachDrawer
        isOpen={isAICoachOpen}
        onClose={() => setIsAICoachOpen(false)}
        student={selectedStudent}
        onOpenRoadmap={() => {
          setIsAICoachOpen(false);
          setActiveTab('profile');
        }}
      />
    </div>
  );
}
