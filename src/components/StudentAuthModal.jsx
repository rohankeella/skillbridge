import React, { useState } from 'react';
import { 
  GraduationCap, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  BookOpen, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  LogIn, 
  UserPlus,
  Shield,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

export default function StudentAuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  students = [] 
}) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('rohan.sharma@apex.edu');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Registration Form State
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: 'Apex Institute of Technology',
    department: 'Computer Science & Engineering',
    year: '3rd Year (Batch 2027)',
    rollNumber: '',
    cgpa: '8.4',
    targetRole: 'Full Stack Developer',
    agreedTerms: true
  });

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: loginIdentifier, password: loginPassword })
      });
      const data = await res.json();

      if (data.success && data.student) {
        onLoginSuccess(data.student, 'Logged in successfully!');
        onClose();
      } else {
        // Fallback search in existing students list
        const found = students.find(s => 
          s.email?.toLowerCase() === loginIdentifier.toLowerCase().trim() ||
          s.name?.toLowerCase().includes(loginIdentifier.toLowerCase().trim())
        );
        if (found) {
          onLoginSuccess(found, 'Logged in successfully!');
          onClose();
        } else {
          setError(data.message || 'Invalid credentials. Please verify your email or roll number.');
        }
      }
    } catch (err) {
      // Local fallback
      const found = students.find(s => 
        s.email?.toLowerCase() === loginIdentifier.toLowerCase().trim() ||
        s.name?.toLowerCase().includes(loginIdentifier.toLowerCase().trim())
      );
      if (found) {
        onLoginSuccess(found, 'Logged in successfully!');
        onClose();
      } else {
        setError('Login failed. Please check connection or try demo login.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (regData.password && regData.confirmPassword && regData.password !== regData.confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    if (!regData.name || !regData.email) {
      setError('Please provide your name and email.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regData)
      });
      const data = await res.json();

      if (data.success && data.student) {
        onLoginSuccess(data.student, 'Student account created and logged in!');
        onClose();
      } else {
        setError(data.message || 'Registration failed. Email might already exist.');
      }
    } catch (err) {
      // Fallback create in memory
      const fallbackNew = {
        id: `std-${Date.now().toString().slice(-4)}`,
        name: regData.name,
        avatar: '👨‍🎓',
        email: regData.email,
        college: regData.college,
        department: regData.department,
        year: regData.year,
        rollNumber: regData.rollNumber || '2023CS999',
        cgpa: Number(regData.cgpa) || 8.2,
        targetRole: regData.targetRole,
        verifiedSkills: [
          { name: 'JavaScript & Web Tech', level: 'Intermediate', verifiedBy: 'College Practical' },
          { name: 'Data Structures & Algorithms', level: 'Intermediate', verifiedBy: 'Coursework' }
        ],
        skillGaps: [
          { name: 'Docker & Kubernetes', severity: 'High', recommendation: 'Complete containerization foundation course' }
        ],
        projects: [
          { title: 'Academic Project', tech: 'React, Node.js' }
        ],
        assessmentScore: 80,
        appliedJobsCount: 0,
        placementStatus: 'Actively Looking for Opportunities'
      };
      onLoginSuccess(fallbackNew, 'Account created locally and logged in!');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (student) => {
    onLoginSuccess(student, `Switched to ${student.name}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center text-[#7C3AED]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                {mode === 'login' ? 'Student Portal Login' : 'Create Student Account'}
              </h3>
              <p className="text-xs text-slate-500">
                {mode === 'login' 
                  ? 'Access your Career Readiness Score, Roadmaps & Campus Drives' 
                  : 'Register for AI curriculum benchmarking and verified campus drives'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-700 text-lg p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher (Login vs Register) */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-[#7C3AED] shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <LogIn className="h-4 w-4" />
            <span>Student Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-[#7C3AED] shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <UserPlus className="h-4 w-4" />
            <span>New Student Registration</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Mode 1: LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-800 font-bold mb-1">
                University Email or Roll Number:
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. rohan.sharma@apex.edu or 2023CS101"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-800 font-bold mb-1">
                Password:
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password..."
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#7C3AED] focus:ring-0" />
                <span>Remember this workstation</span>
              </label>
              <span className="text-[#7C3AED] font-bold hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-3.5 rounded-xl font-extrabold flex items-center justify-center gap-2 shadow-md shadow-[#7C3AED]/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <LogIn className="h-4 w-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Student Portal'}</span>
            </button>

            {/* Quick Demo Student Switcher */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Or Fast-Track Demo Sign-In:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {students.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleQuickDemoLogin(st)}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-[#7C3AED] bg-slate-50 hover:bg-[#F5F3FF] text-left transition flex items-center gap-2.5 cursor-pointer"
                  >
                    <span className="text-xl">{st.avatar || '👨‍🎓'}</span>
                    <div className="truncate">
                      <div className="font-bold text-slate-900 text-xs">{st.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{st.college} • CGPA {st.cgpa}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </form>
        )}

        {/* Mode 2: REGISTRATION FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-800 font-bold mb-1">Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sen"
                  value={regData.name}
                  onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">University Email:</label>
                <input
                  type="email"
                  required
                  placeholder="ananya.sen@university.edu"
                  value={regData.email}
                  onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-800 font-bold mb-1">University / College:</label>
                <select
                  value={regData.college}
                  onChange={(e) => setRegData({ ...regData, college: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
                >
                  <option value="Apex Institute of Technology">Apex Institute of Technology</option>
                  <option value="National University of Engineering">National University of Engineering</option>
                  <option value="Delhi Technological University">Delhi Technological University</option>
                  <option value="Indian Institute of Information Tech">Indian Institute of Information Tech</option>
                  <option value="State Polytechnic & Engineering College">State Polytechnic & Engineering College</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">Academic Department / Branch:</label>
                <select
                  value={regData.department}
                  onChange={(e) => setRegData({ ...regData, department: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Cloud Computing & Cyber Security">Cloud Computing & Cyber Security</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-800 font-bold mb-1">Batch / Year:</label>
                <select
                  value={regData.year}
                  onChange={(e) => setRegData({ ...regData, year: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
                >
                  <option value="1st Year (Batch 2029)">1st Year (Batch 2029)</option>
                  <option value="2nd Year (Batch 2028)">2nd Year (Batch 2028)</option>
                  <option value="3rd Year (Batch 2027)">3rd Year (Batch 2027)</option>
                  <option value="4th Year (Batch 2026)">4th Year (Batch 2026)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">University Roll No:</label>
                <input
                  type="text"
                  placeholder="e.g. 2023CS502"
                  value={regData.rollNumber}
                  onChange={(e) => setRegData({ ...regData, rollNumber: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">Current CGPA:</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  placeholder="8.4"
                  value={regData.cgpa}
                  onChange={(e) => setRegData({ ...regData, cgpa: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-800 font-bold mb-1">Target Professional Career Goal:</label>
              <select
                value={regData.targetRole}
                onChange={(e) => setRegData({ ...regData, targetRole: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
              >
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
                <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
                <option value="Cybersecurity & Ethical Hacking Specialist">Cybersecurity & Ethical Hacking Specialist</option>
                <option value="Big Data Engineer & Pipeline Architect">Big Data Engineer & Pipeline Architect</option>
                <option value="Mobile App Developer (iOS, Android & Flutter)">Mobile App Developer (iOS, Android & Flutter)</option>
                <option value="Embedded Systems & IoT Hardware Engineer">Embedded Systems & IoT Hardware Engineer</option>
                <option value="Blockchain & Web3 Smart Contract Engineer">Blockchain & Web3 Smart Contract Engineer</option>
                <option value="UI/UX & Product Design Technologist">UI/UX & Product Design Technologist</option>
                <option value="Site Reliability Engineer (SRE)">Site Reliability Engineer (SRE)</option>
                <option value="FinTech & Quantitative Software Engineer">FinTech & Quantitative Software Engineer</option>
                <option value="HealthTech & Biomedical Informatics Engineer">HealthTech & Biomedical Informatics Engineer</option>
                <option value="Robotics, Autonomous Systems & Computer Vision Engineer">Robotics, Autonomous Systems & Computer Vision Engineer</option>
                <option value="Game Engine & Real-Time 3D Simulation Developer">Game Engine & Real-Time 3D Simulation Developer</option>
                <option value="Automotive Embedded & Autonomous Mobility Engineer">Automotive Embedded & Autonomous Mobility Engineer</option>
                <option value="Climate Intelligence & GreenTech Systems Architect">Climate Intelligence & GreenTech Systems Architect</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-800 font-bold mb-1">Password:</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={regData.password}
                  onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">Confirm Password:</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={regData.confirmPassword}
                  onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] font-medium"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 pt-1 text-slate-600 text-xs cursor-pointer">
              <input 
                type="checkbox" 
                checked={regData.agreedTerms} 
                onChange={(e) => setRegData({ ...regData, agreedTerms: e.target.checked })}
                className="rounded text-[#7C3AED] focus:ring-0 mt-0.5" 
              />
              <span>I confirm my academic enrollment and authorize SkillBridge AI to verify my degree transcripts and project credentials.</span>
            </label>

            <button
              type="submit"
              disabled={loading || !regData.agreedTerms}
              className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-3.5 rounded-xl font-extrabold flex items-center justify-center gap-2 shadow-md shadow-[#16A34A]/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <UserPlus className="h-4 w-4" />
              <span>{loading ? 'Creating Account...' : 'Complete Student Registration'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
