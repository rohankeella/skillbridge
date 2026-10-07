import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './config/db.js';
import { IndustryBenchmark } from './models/IndustryBenchmark.js';
import { Curriculum } from './models/Curriculum.js';
import { Job } from './models/Job.js';
import { Application } from './models/Application.js';
import { MoU } from './models/MoU.js';
import { Student } from './models/Student.js';
import { AIEngine } from './services/aiEngine.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Fallback Seed Data
const initialBenchmarks = [
  {
    id: 'ind-fullstack',
    role: 'Full Stack Developer',
    category: 'Software Engineering',
    demandScore: 95,
    avgSalary: '$85k - $130k / ₹14 - 24 LPA',
    keySkills: [
      { name: 'React', weight: 95, category: 'Frontend' },
      { name: 'Node.js', weight: 90, category: 'Backend' },
      { name: 'MongoDB', weight: 85, category: 'Databases' },
      { name: 'Docker', weight: 75, category: 'DevOps' },
      { name: 'AWS Cloud', weight: 70, category: 'Cloud' },
      { name: 'Automated Testing', weight: 75, category: 'Quality' }
    ],
    emergingTrends: ['Next.js App Router', 'Server Components', 'GraphQL & tRPC', 'Edge Computing']
  },
  {
    id: 'ind-cloud-devops',
    role: 'Cloud & DevOps Engineer',
    category: 'Cloud Engineering',
    demandScore: 96,
    avgSalary: '$95k - $140k / ₹14 - 26 LPA',
    keySkills: [
      { name: 'Docker & Kubernetes', weight: 95, category: 'Containerization' },
      { name: 'Terraform & IaC', weight: 90, category: 'Infrastructure' },
      { name: 'CI/CD Pipelines (GitHub Actions/ArgoCD)', weight: 92, category: 'DevOps' },
      { name: 'AWS / Azure / GCP Architecture', weight: 96, category: 'Cloud' },
      { name: 'Linux System Internals & Bash', weight: 85, category: 'Systems' },
      { name: 'Prometheus & Grafana Observability', weight: 82, category: 'Monitoring' }
    ],
    emergingTrends: ['GitOps', 'Platform Engineering', 'eBPF', 'FinOps']
  },
  {
    id: 'ind-ai-data',
    role: 'AI / Machine Learning Engineer',
    category: 'Artificial Intelligence',
    demandScore: 98,
    avgSalary: '$110k - $165k / ₹18 - 32 LPA',
    keySkills: [
      { name: 'PyTorch / TensorFlow Deep Learning', weight: 95, category: 'AI Core' },
      { name: 'LLM Fine-tuning & LoRA', weight: 94, category: 'GenAI' },
      { name: 'RAG Architecture & Vector DBs', weight: 92, category: 'GenAI' },
      { name: 'MLOps (MLflow, Kubeflow, BentoML)', weight: 88, category: 'MLOps' },
      { name: 'Feature Engineering & Data Pipelines', weight: 89, category: 'Data' }
    ],
    emergingTrends: ['Autonomous Agents', 'Multimodal LLMs', 'Edge AI', 'AI Safety & Evaluation']
  }
];

const initialCurriculums = [
  {
    id: 'curr-cs-btech',
    institution: 'Apex Institute of Technology',
    degree: 'B.Tech Computer Science & Engineering',
    semester: 'Semester 6 / 2026 Batch',
    totalStudents: 240,
    modules: [
      { code: 'CS301', title: 'Data Structures & Algorithms in C++', depth: 95, practicalHours: 40, theoryHours: 50 },
      { code: 'CS302', title: 'Relational Database Management Systems (SQL)', depth: 85, practicalHours: 30, theoryHours: 45 },
      { code: 'CS303', title: 'Operating Systems & Process Concurrency', depth: 82, practicalHours: 25, theoryHours: 45 },
      { code: 'CS304', title: 'Computer Networks & TCP/IP Model', depth: 80, practicalHours: 20, theoryHours: 45 },
      { code: 'CS305', title: 'Web Development Basics (HTML5, CSS, PHP)', depth: 55, practicalHours: 35, theoryHours: 30 },
      { code: 'CS306', title: 'Introduction to Artificial Intelligence', depth: 60, practicalHours: 20, theoryHours: 45 }
    ],
    currentStrengths: ['Core algorithmic problem solving', 'Database normalization', 'Memory management basics'],
    identifiedDeficits: ['Cloud deployment & Containerization', 'Modern JavaScript frameworks', 'Modern CI/CD pipelines', 'Production MLOps']
  },
  {
    id: 'curr-ai-btech',
    institution: 'National University of Engineering',
    degree: 'B.Tech Artificial Intelligence & Data Science',
    semester: 'Semester 7 / 2026 Batch',
    totalStudents: 180,
    modules: [
      { code: 'AI401', title: 'Machine Learning Algorithms (Scikit-Learn)', depth: 88, practicalHours: 40, theoryHours: 45 },
      { code: 'AI402', title: 'Deep Learning & Neural Networks', depth: 82, practicalHours: 35, theoryHours: 45 },
      { code: 'AI403', title: 'Natural Language Processing Fundamentals', depth: 75, practicalHours: 30, theoryHours: 40 },
      { code: 'AI404', title: 'Python Programming for Data Analysis', depth: 85, practicalHours: 40, theoryHours: 30 }
    ],
    currentStrengths: ['Mathematical rigor', 'Classic ML models', 'Statistical data exploration'],
    identifiedDeficits: ['Large Language Model (LLM) fine-tuning', 'Vector Search & Embeddings', 'MLOps pipelines in Kubernetes']
  }
];

let fallbackJobs = [
  {
    id: 'job-101',
    title: 'Software Engineer Intern',
    company: 'Microsoft',
    logo: '💻',
    type: 'Internship (6 Months)',
    workMode: 'Hybrid (Both Online & On-Site)',
    location: 'Bengaluru',
    stipend: '₹50,000 / month',
    stipendAmount: 50000,
    isUnpaid: false,
    ctcPostInternship: '₹18.5 LPA',
    openings: 12,
    deadline: '2026-11-25',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'Docker'],
    preferredSkills: ['AWS Cloud', 'Automated Testing'],
    description: 'Work with the Azure Developer Experience engineering squad to build developer tools and high-scale cloud dashboards.',
    academicEligibility: 'B.Tech CSE/IT, Min CGPA: 7.5, Passing year 2026/2027',
    tier: 'Tier 1 Industry Partner'
  },
  {
    id: 'job-105',
    title: 'Frontend Web Development Intern',
    company: 'NextGen EdTech Solutions',
    logo: '🌐',
    type: 'Internship (3 Months)',
    workMode: 'Online / Remote',
    location: 'Remote',
    stipend: '₹5,000 / month (Below 8k)',
    stipendAmount: 5000,
    isUnpaid: false,
    ctcPostInternship: '₹6.5 LPA',
    openings: 8,
    deadline: '2026-11-20',
    requiredSkills: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS'],
    preferredSkills: ['Git', 'REST APIs'],
    description: 'Build interactive student learning portals and responsive dashboards in a fast-paced EdTech startup. Flexible remote work hours.',
    academicEligibility: 'B.Tech/BCA/B.Sc Computer Science, 2nd/3rd/4th Year',
    tier: 'Startup Hub Accelerator'
  },
  {
    id: 'job-106',
    title: 'Python Data Analytics & Research Intern',
    company: 'Cognitive Insights Lab',
    logo: '📊',
    type: 'Internship (6 Months)',
    workMode: 'Online / Remote',
    location: 'Remote',
    stipend: '₹7,500 / month (Below 8k)',
    stipendAmount: 7500,
    isUnpaid: false,
    ctcPostInternship: '₹8.0 LPA',
    openings: 6,
    deadline: '2026-11-18',
    requiredSkills: ['Python', 'Pandas', 'SQL', 'Data Visualization'],
    preferredSkills: ['Scikit-learn', 'Excel'],
    description: 'Perform real-time dataset sanitization, exploratory data analysis, and build automated visualization reports for client deliverables.',
    academicEligibility: 'B.Tech CSE/IT/DS, MCA, Min CGPA 7.0',
    tier: 'R&D Innovation Hub'
  },
  {
    id: 'job-107',
    title: 'AICTE Open Source & Web Intern',
    company: 'OpenEdu Foundation',
    logo: '🏛️',
    type: 'Internship (Summer 3 Months)',
    workMode: 'Online / Remote',
    location: 'Remote',
    stipend: 'No Stipend (Academic Credit & Certificate)',
    stipendAmount: 0,
    isUnpaid: true,
    ctcPostInternship: 'PPO Eligible based on contributions',
    openings: 20,
    deadline: '2026-12-05',
    requiredSkills: ['React', 'Node.js', 'Git / GitHub', 'Markdown'],
    preferredSkills: ['Open Source Contributions', 'Documentation'],
    description: 'Contribute to public digital public infrastructure (DPI) education projects. Official AICTE activity points and verified certificate upon completion.',
    academicEligibility: 'Open to all Engineering & Polytechnic students',
    tier: 'National Open Source Initiative'
  },
  {
    id: 'job-108',
    title: 'Junior Cloud & Linux Lab Intern',
    company: 'ServerMesh Systems',
    logo: '🐧',
    type: 'Internship (6 Months)',
    workMode: 'Hybrid (Both Online & On-Site)',
    location: 'Pune',
    stipend: '₹6,000 / month (Below 8k)',
    stipendAmount: 6000,
    isUnpaid: false,
    ctcPostInternship: '₹7.2 LPA',
    openings: 5,
    deadline: '2026-11-22',
    requiredSkills: ['Linux System Internals & Bash', 'Networking Basics', 'Docker', 'Git'],
    preferredSkills: ['AWS Basics', 'Python Scripting'],
    description: 'Manage staging virtual machines, configure CI runner daemons, and monitor microservices in hybrid setup (3 days remote, 2 days office).',
    academicEligibility: 'B.Tech CSE/IT/ECE, Min CGPA 6.5',
    tier: 'Direct Campus Drive'
  },
  {
    id: 'job-109',
    title: 'Cybersecurity & Vulnerability Assessment Intern',
    company: 'Aegis Cyber Defense',
    logo: '🛡️',
    type: 'Internship (3 Months)',
    workMode: 'In-Office (On-Site)',
    location: 'Bengaluru',
    stipend: 'No Stipend (Certificate & Mentorship)',
    stipendAmount: 0,
    isUnpaid: true,
    ctcPostInternship: '₹9.0 LPA on PPO',
    openings: 4,
    deadline: '2026-11-10',
    requiredSkills: ['OWASP Top 10', 'Network Security', 'Linux', 'Burp Suite'],
    preferredSkills: ['Python Scripting', 'Wireshark'],
    description: 'Work alongside senior penetration testers to audit university and SMB web applications for security vulnerabilities.',
    academicEligibility: 'B.Tech CSE/IT, BCA/MCA, 3rd or 4th Year',
    tier: 'Cyber CoE Partner'
  },
  {
    id: 'job-110',
    title: 'Mobile App Developer Intern (Flutter / React Native)',
    company: 'AppWave Innovations',
    logo: '📱',
    type: 'Internship (6 Months)',
    workMode: 'Hybrid (Both Online & On-Site)',
    location: 'Delhi NCR',
    stipend: '₹7,000 / month (Below 8k)',
    stipendAmount: 7000,
    isUnpaid: false,
    ctcPostInternship: '₹7.5 LPA',
    openings: 7,
    deadline: '2026-11-28',
    requiredSkills: ['React Native / Flutter', 'JavaScript', 'REST APIs', 'UI/UX Design'],
    preferredSkills: ['Firebase', 'State Management'],
    description: 'Develop cross-platform client mobile applications for hyper-local delivery and student campus commerce.',
    academicEligibility: 'All undergraduate engineering students',
    tier: 'Startup Accelerator'
  },
  {
    id: 'job-102',
    title: 'Cloud DevOps Intern',
    company: 'CloudMatrix Technologies',
    logo: '☁️',
    type: 'Internship (6 Months)',
    workMode: 'Hybrid (Both Online & On-Site)',
    location: 'Pune',
    stipend: '₹45,000 / month',
    stipendAmount: 45000,
    isUnpaid: false,
    ctcPostInternship: '₹14.5 LPA',
    openings: 8,
    deadline: '2026-11-15',
    requiredSkills: ['Docker & Kubernetes', 'AWS / Azure / GCP Architecture', 'CI/CD Pipelines (GitHub Actions/ArgoCD)', 'Linux System Internals & Bash'],
    preferredSkills: ['Terraform & IaC', 'Prometheus & Grafana Observability'],
    description: 'Automate multi-region infrastructure provisioning, deploy Helm charts on EKS, and build fault-tolerant deployment pipelines.',
    academicEligibility: 'B.Tech CSE/IT, Min CGPA: 7.5, Passing year 2026/2027',
    tier: 'Industry Partner Tier 1'
  },
  {
    id: 'job-103',
    title: 'GenAI & MLOps Research Engineer (Placement)',
    company: 'NeuralSphere AI Labs',
    logo: '⚡',
    type: 'Full-time Placement',
    workMode: 'In-Office (On-Site)',
    location: 'Hyderabad',
    stipend: 'Full Benefits + Joining Bonus',
    stipendAmount: 0,
    isUnpaid: false,
    ctcPostInternship: '₹22.0 - 28.0 LPA',
    openings: 4,
    deadline: '2026-10-30',
    requiredSkills: ['PyTorch / TensorFlow Deep Learning', 'RAG Architecture & Vector DBs', 'LLM Fine-tuning & LoRA', 'MLOps (MLflow, Kubeflow, BentoML)'],
    preferredSkills: ['Model Optimization & TensorRT', 'Distributed training'],
    description: 'Design and deploy fine-tuned open-weights models for enterprise retrieval systems. Build automated inference benchmark pipelines.',
    academicEligibility: 'B.Tech/M.Tech AI, CS, Data Science with verified project portfolio',
    tier: 'R&D CoE Sponsored'
  },
  {
    id: 'job-104',
    title: 'Full-Stack Software Engineer Associate',
    company: 'FinVortex Global',
    logo: '💳',
    type: 'Full-time Placement',
    workMode: 'Online / Remote',
    location: 'Remote',
    stipend: 'Direct Offer',
    stipendAmount: 0,
    isUnpaid: false,
    ctcPostInternship: '₹16.0 LPA',
    openings: 15,
    deadline: '2026-11-20',
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    preferredSkills: ['Automated Testing', 'Redis Caching'],
    description: 'Build mission-critical real-time payment settlement dashboards handling millions of transactions daily with sub-50ms latency.',
    academicEligibility: 'All Engineering branches, Min CGPA 7.0',
    tier: 'Campus Placement Drive'
  }
];

let fallbackApplications = [
  {
    id: 'app-901',
    jobId: 'job-101',
    jobTitle: 'Software Engineer Intern',
    company: 'Microsoft',
    studentId: 'std-1',
    studentName: 'Rohan Sharma',
    college: 'Apex Institute of Technology',
    cgpa: 8.7,
    matchScore: 94,
    status: 'Shortlisted for Technical Assessment',
    appliedDate: '2026-10-02',
    timeline: [
      { step: 'Application Submitted', date: '2026-10-02', done: true },
      { step: 'ATS Skill Matching Verified', date: '2026-10-03', done: true },
      { step: 'Shortlisted by Recruiter', date: '2026-10-05', done: true },
      { step: 'Live Cloud Lab Assessment', date: 'Scheduled: Oct 12', done: false },
      { step: 'Final Interview & Offer', date: 'Pending', done: false }
    ],
    resumeUrl: 'https://example.com/resume/rohan.pdf',
    notes: 'Strong practical React & Node lab badge with verified Docker project.'
  }
];

let fallbackStudents = [
  {
    id: 'std-1',
    name: 'Rohan Sharma',
    avatar: '👨‍💻',
    email: 'rohan.sharma@apex.edu',
    college: 'Apex Institute of Technology',
    department: 'Computer Science & Engineering',
    year: '4th Year (Batch 2026)',
    cgpa: 8.7,
    targetRole: 'Full Stack Developer',
    verifiedSkills: [
      { name: 'React', level: 'Mastery', verifiedBy: 'Meta Certified Professional' },
      { name: 'Node.js', level: 'Advanced', verifiedBy: 'College Lab Exam' },
      { name: 'JavaScript / TypeScript', level: 'Advanced', verifiedBy: 'Department Faculty' },
      { name: 'MongoDB', level: 'Advanced', verifiedBy: 'MongoDB University' },
      { name: 'Docker & Kubernetes', level: 'Intermediate', verifiedBy: 'Google Cloud CoE' }
    ],
    skillGaps: [
      { name: 'AWS Cloud', severity: 'High', recommendation: 'Complete AWS Cloud Practitioner Sandbox Lab' },
      { name: 'Automated Testing (Playwright/Jest)', severity: 'Moderate', recommendation: 'Integrate E2E test suite in Capstone project' }
    ],
    projects: [
      { title: 'Full Stack Real-Time Collaboration Hub', tech: 'React, Node.js, Socket.IO, MongoDB' },
      { title: 'Microservices Cloud Platform', tech: 'Docker, Kubernetes, Express' },
      { title: 'AI Resume Competency Parser', tech: 'Python, NLP, React' }
    ],
    assessmentScore: 86,
    appliedJobsCount: 4,
    placementStatus: 'Shortlisted by Microsoft'
  },
  {
    id: 'std-2',
    name: 'Priya Sundaram',
    avatar: '👩‍💻',
    email: 'priya.sundaram@nue.edu',
    college: 'National University of Engineering',
    department: 'AI & Data Science',
    year: '4th Year (Batch 2026)',
    cgpa: 9.2,
    targetRole: 'AI / Machine Learning Engineer',
    verifiedSkills: [
      { name: 'PyTorch / TensorFlow Deep Learning', level: 'Advanced', verifiedBy: 'NVIDIA DLI' },
      { name: 'RAG Architecture & Vector DBs', level: 'Advanced', verifiedBy: 'Industry Capstone' },
      { name: 'LLM Fine-tuning & LoRA', level: 'Advanced', verifiedBy: 'Research Paper' },
      { name: 'Python Programming for Data Analysis', level: 'Mastery', verifiedBy: 'College Faculty' }
    ],
    skillGaps: [
      { name: 'MLOps (MLflow, Kubeflow, BentoML)', severity: 'Moderate', recommendation: 'Containerize LLM pipeline on Kubernetes cluster' }
    ],
    projects: [
      { title: 'Enterprise RAG Retrieval System', tech: 'Python, LangChain, VectorDB' },
      { title: 'Vision Transformer Benchmark', tech: 'PyTorch, TensorRT' }
    ],
    assessmentScore: 92,
    appliedJobsCount: 3,
    placementStatus: 'Shortlisted - NeuralSphere AI'
  }
];

let fallbackMoUs = [
  {
    id: 'mou-01',
    partnerCompany: 'Google Cloud Academic Alliances',
    institution: 'Apex Institute of Technology',
    signedDate: '2025-08-15',
    validUntil: '2028-08-14',
    scope: 'Cloud Architecture Center of Excellence (CoE), 500 annual cloud certification vouchers, sponsored faculty upskilling workshops.',
    activeProjects: 3,
    status: 'Active & Verified',
    impact: '180 students certified, 32 placed with average CTC of 15.2 LPA'
  },
  {
    id: 'mou-02',
    partnerCompany: 'NVIDIA Deep Learning Institute',
    institution: 'National University of Engineering',
    signedDate: '2025-11-01',
    validUntil: '2027-10-31',
    scope: 'Accelerated Computing Lab setup with DGX workstations, curriculum co-design for Generative AI elective CS492, joint research grants.',
    activeProjects: 5,
    status: 'Active & Verified',
    impact: '12 peer-reviewed papers, 18 high-package R&D placements'
  }
];

// Initialize DB Connection
connectDB().catch(console.error);

// Routes
// 1. System & Architecture Status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    project: 'SkillBridge Platform',
    architecture: {
      frontend: 'React 19 + Tailwind CSS v4 + Vite',
      backend: 'Node.js + Express 5',
      database: getDBStatus(),
      aiEngine: 'AIEngine (Career Readiness Score & 6-Factor Internship Matching)'
    },
    timestamp: new Date().toISOString()
  });
});

// 2. Career Readiness Score
app.get('/api/students/:id/career-readiness', (req, res) => {
  const student = fallbackStudents.find(s => s.id === req.params.id) || fallbackStudents[0];
  const benchmark = initialBenchmarks.find(b => b.role.toLowerCase() === student.targetRole.toLowerCase()) || initialBenchmarks[0];
  
  const readiness = AIEngine.calculateCareerReadiness(student, benchmark);
  res.json({ success: true, studentId: student.id, studentName: student.name, readiness });
});

// 3. AI Resume Parser & Skill Extractor
app.post('/api/students/:id/resume-parse', (req, res) => {
  const { resumeText = '' } = req.body;
  const parsed = AIEngine.parseResumeAI(resumeText);
  res.json({ success: true, ...parsed });
});

// 4. Interactive Visual Learning Roadmap
app.get('/api/roadmap/:studentId', (req, res) => {
  const student = fallbackStudents.find(s => s.id === req.params.studentId) || fallbackStudents[0];
  const benchmark = initialBenchmarks.find(b => b.role.toLowerCase() === student.targetRole.toLowerCase()) || initialBenchmarks[0];

  const roadmapData = AIEngine.generateVisualRoadmap(student.verifiedSkills.map(s => s.name), benchmark);
  res.json({ success: true, studentId: student.id, studentName: student.name, roadmapData });
});

// 5. 6-Factor Weighted Internship Matching
app.get('/api/matches/:studentId', (req, res) => {
  const student = fallbackStudents.find(s => s.id === req.params.studentId) || fallbackStudents[0];
  
  const matches = fallbackJobs.map(job => {
    const matchAnalysis = AIEngine.matchCandidateToJobDetailed(student, job);
    return {
      job,
      matchScore: matchAnalysis.matchScore,
      breakdown: matchAnalysis.breakdown,
      reasons: matchAnalysis.reasons,
      missingSkills: matchAnalysis.missingSkills
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  res.json({ success: true, studentId: student.id, count: matches.length, matches });
});

// 6. AI Career Coach Assistant
app.post('/api/ai-coach/chat', (req, res) => {
  const { studentId = 'std-1', message = '' } = req.body;
  const student = fallbackStudents.find(s => s.id === studentId) || fallbackStudents[0];

  const response = AIEngine.chatCareerCoach(student, message);
  res.json({ success: true, ...response });
});

// 7. Admin Platform Analytics
app.get('/api/admin/analytics', (req, res) => {
  res.json({
    success: true,
    platformMetrics: {
      totalStudents: 25480,
      colleges: 182,
      industryPartners: 420,
      internships: 1860,
      placements: 1240,
      usersOnline: 1284,
      applicationsToday: 342,
      newOpportunities: 28
    },
    commonSkillGaps: [
      { skill: 'Cloud Computing & Kubernetes', deficitPercentage: 68 },
      { skill: 'Cybersecurity & AppSec', deficitPercentage: 54 },
      { skill: 'AI/ML & Deep Learning', deficitPercentage: 49 },
      { skill: 'DevOps & CI/CD Tooling', deficitPercentage: 41 }
    ]
  });
});

// Standard Endpoints
app.get('/api/industry-benchmarks', (req, res) => {
  res.json({ success: true, count: initialBenchmarks.length, data: initialBenchmarks });
});

app.get('/api/curriculums', (req, res) => {
  res.json({ success: true, count: initialCurriculums.length, data: initialCurriculums });
});

app.post('/api/gap-analysis', (req, res) => {
  const { curriculumId, industryId } = req.body;
  const curr = initialCurriculums.find(c => c.id === curriculumId) || initialCurriculums[0];
  const ind = initialBenchmarks.find(b => b.id === industryId) || initialBenchmarks[0];

  const analysis = AIEngine.analyzeCurriculumGap(curr, ind);
  res.json({ success: true, analysis });
});

app.get('/api/jobs', (req, res) => {
  const { type, search } = req.query;
  let filtered = [...fallbackJobs];
  if (type && type !== 'all') {
    filtered = filtered.filter(j => j.type.toLowerCase().includes(type.toLowerCase()));
  }
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(j => 
      j.title.toLowerCase().includes(s) || 
      j.company.toLowerCase().includes(s) || 
      j.requiredSkills.some(sk => sk.toLowerCase().includes(s))
    );
  }
  res.json({ success: true, count: filtered.length, data: filtered });
});

app.post('/api/jobs', (req, res) => {
  const newJob = {
    id: `job-${Date.now().toString().slice(-4)}`,
    ...req.body,
    openings: Number(req.body.openings) || 5,
    logo: req.body.logo || '💼',
    tier: req.body.tier || 'Industry Partner'
  };
  fallbackJobs.unshift(newJob);
  res.status(201).json({ success: true, message: 'Opportunity posted successfully!', job: newJob });
});

app.get('/api/applications', (req, res) => {
  res.json({ success: true, count: fallbackApplications.length, data: fallbackApplications });
});

app.post('/api/applications', (req, res) => {
  const { jobId, studentId, studentName, college, cgpa, resumeUrl } = req.body;
  const job = fallbackJobs.find(j => j.id === jobId);
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

  const student = fallbackStudents.find(s => s.id === studentId) || fallbackStudents[0];
  const matchResult = AIEngine.matchCandidateToJobDetailed(student, job);

  const newApp = {
    id: `app-${Date.now().toString().slice(-4)}`,
    jobId,
    jobTitle: job.title,
    company: job.company,
    studentId: studentId || student.id,
    studentName: studentName || student.name,
    college: college || student.college,
    cgpa: Number(cgpa) || student.cgpa,
    matchScore: matchResult.matchScore,
    status: 'Application Submitted',
    appliedDate: new Date().toISOString().split('T')[0],
    timeline: [
      { step: 'Application Submitted', date: new Date().toISOString().split('T')[0], done: true },
      { step: 'ATS Skill Matching Verified', date: 'Processing', done: false },
      { step: 'Shortlisted by Recruiter', date: 'Pending', done: false },
      { step: 'Technical Assessment', date: 'Pending', done: false },
      { step: 'Final Interview & Offer', date: 'Pending', done: false }
    ],
    resumeUrl: resumeUrl || 'https://example.com/resume/verified_profile.pdf',
    notes: 'Candidate applied via Academia-Industry Placement portal.'
  };

  fallbackApplications.unshift(newApp);
  res.status(201).json({ success: true, message: 'Applied successfully!', application: newApp });
});

app.patch('/api/applications/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;
  const appIndex = fallbackApplications.findIndex(a => a.id === id);
  if (appIndex === -1) return res.status(404).json({ success: false, message: 'Application not found' });

  fallbackApplications[appIndex].status = status;
  if (note) fallbackApplications[appIndex].notes = note;
  
  const timeline = fallbackApplications[appIndex].timeline;
  const stepToUpdate = timeline.find(t => !t.done);
  if (stepToUpdate) {
    stepToUpdate.done = true;
    stepToUpdate.date = new Date().toISOString().split('T')[0];
  }

  res.json({ success: true, message: 'Status updated successfully', application: fallbackApplications[appIndex] });
});

app.get('/api/mous', (req, res) => {
  res.json({ success: true, count: fallbackMoUs.length, data: fallbackMoUs });
});

app.post('/api/mous', (req, res) => {
  const newMou = {
    id: `mou-${Date.now().toString().slice(-4)}`,
    ...req.body,
    signedDate: new Date().toISOString().split('T')[0],
    activeProjects: Number(req.body.activeProjects) || 1,
    status: 'Active & Verified'
  };
  fallbackMoUs.unshift(newMou);
  res.status(201).json({ success: true, message: 'MoU recorded successfully!', mou: newMou });
});

app.get('/api/students', (req, res) => {
  res.json({ success: true, count: fallbackStudents.length, data: fallbackStudents });
});

// Student Authentication Routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, college, department, year, rollNumber, cgpa, targetRole } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and university email are required.' });
  }

  const existing = fallbackStudents.find(s => s.email?.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: 'Student with this email is already registered.' });
  }

  const newStudent = {
    id: `std-${Date.now().toString().slice(-4)}`,
    name,
    avatar: '👨‍🎓',
    email,
    password: password || 'password123',
    college: college || 'Apex Institute of Technology',
    department: department || 'Computer Science & Engineering',
    year: year || '3rd Year (Batch 2027)',
    rollNumber: rollNumber || `2023CS${Math.floor(100 + Math.random() * 900)}`,
    cgpa: Number(cgpa) || 8.2,
    targetRole: targetRole || 'Full Stack Developer',
    verifiedSkills: [
      { name: 'JavaScript & Web Stack', level: 'Intermediate', verifiedBy: 'College Lab Exam' },
      { name: 'Data Structures & Algorithms', level: 'Intermediate', verifiedBy: 'Curriculum Coursework' },
      { name: 'Git & Version Control', level: 'Intermediate', verifiedBy: 'SkillBridge Diagnostic' }
    ],
    skillGaps: [
      { name: 'Docker & Kubernetes', severity: 'High', recommendation: 'Complete containerization foundation course' }
    ],
    projects: [
      { title: 'Campus Collaboration Portal', tech: 'React, Node.js, Express, MongoDB' }
    ],
    assessmentScore: 82,
    appliedJobsCount: 0,
    placementStatus: 'Actively Looking for Opportunities'
  };

  fallbackStudents.unshift(newStudent);
  res.status(201).json({ success: true, message: 'Student registered successfully! Welcome to SkillBridge.', student: newStudent });
});

app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier) {
    return res.status(400).json({ success: false, message: 'Email or University Roll Number is required.' });
  }

  const ident = identifier.toLowerCase().trim();
  const student = fallbackStudents.find(s => 
    s.email?.toLowerCase() === ident || 
    s.name?.toLowerCase().includes(ident) ||
    s.rollNumber?.toLowerCase() === ident
  );

  if (!student) {
    return res.status(404).json({ success: false, message: 'No registered student found with this Email or Roll Number. Please sign up.' });
  }

  res.json({ success: true, message: `Welcome back, ${student.name}!`, student });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(), 
    service: 'SkillBridge API',
    database: getDBStatus()
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 SkillBridge Backend running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`⚠️ Port ${PORT} is already in use by another instance. Using existing running service.`);
  } else {
    console.error('Server error:', err);
  }
});
