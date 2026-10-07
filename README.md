# SkillBridge — SIH26044

## Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placement

> **Tagline**: *From classroom skills to industry-ready careers.*  
> **Problem Statement**: SIH26044 — Digital platform connecting academia, students, and industry through skill mapping, internship opportunities, assessments, career readiness analysis, and placement support.

---

## 🏛️ System Architecture

SkillBridge implements a 4-tier intelligent career ecosystem:

```text
React (Frontend)
       ↓
Node.js + Express (Backend)
       ↓
MongoDB (Database)
       ↓
AI / Recommendation Engine
```

```text
Industry Requirements ➔ Skill Mapping ➔ Student Assessment ➔ Skill Gap Detection ➔
Personalized Learning Roadmap ➔ Projects & Certifications ➔ Internship Matching ➔
Placement ➔ Industry Feedback (Closed Loop)
```

---

## 👥 4 Main User Roles

1. **Student**
   - Professional verified transcript & profile
   - AI Resume upload and instant competency extraction
   - Real-time **Career Readiness Score (78%)** with 5-factor weighted breakdown
   - **Personalized Visual Learning Roadmap** with 5 discrete interactive states (*Not Started*, *Learning*, *Practiced*, *Project Completed*, *Industry Ready*)
   - 6-Factor weighted internship matching with match reasons and deficit highlights
   - **AI Career Coach Assistant** ("Ask SkillBridge AI") for contextual guidance

2. **College / Faculty**
   - Department-level performance and student cohort monitoring
   - **Common Skill Gaps telemetry** (Cloud Computing 68%, Cybersecurity 54%, AI/ML 49%, DevOps 41%)
   - Targeted training program recommendations
   - Curriculum modernization scanner detecting obsolete modules
   - Bilateral corporate MoU and Center of Excellence (CoE) tracker

3. **Industry / Company**
   - Opportunity creation & required competency specification
   - Company Dashboard (24 Open Positions, 842 Applications, 86 Shortlisted, 32 Interviews, 8 Hired)
   - Top applicant skills distribution (React, Python, Node.js, AWS, Docker)
   - Multi-factor candidate ranking and ATS pipeline management

4. **Admin (National Portal Oversight)**
   - System-wide metrics (25,480 Students, 182 Colleges, 420 Industry Partners, 1,860 Internships, 1,240 Placements)
   - Real-time activity counter (1,284 Online, 342 Applications Today, 28 New Opportunities)
   - Verification queue for accrediting new colleges and legal corporate entities
   - Campus drive moderation queue and anti-spam enforcement

---

## 🎨 Design System & Theme Colors

Strictly configured in `src/index.css` with dark SaaS aesthetics:

| Token | Hex Code | Purpose |
|---|---|---|
| **Background** | `#070A12` | Deep navy base |
| **Card** | `#0D1220` | Glassmorphic surface |
| **Primary** | `#8B5CF6` | Electric violet accent & glows |
| **Secondary** | `#06B6D4` | Cyan highlights & telemetry |
| **Success** | `#22C55E` | Verified badges & match scores |
| **Warning** | `#F59E0B` | Deficit alerts & deadlines |
| **Danger** | `#EF4444` | Critical skill gaps & rejections |
| **Text** | `#F8FAFC` | High-contrast readable typography |
| **Muted** | `#94A3B8` | Subtle descriptions & captions |

---

## 🧮 Core Algorithms Implemented

### 1. Career Readiness Score (SIH Section 4.1)
```text
Career Score =
    40% Technical Skills (82%)
  + 20% Projects (75%)
  + 15% Assessments (84%)
  + 15% Experience (65%)
  + 10% Certifications (70%)
  = 78% Industry Ready Index
```

### 2. 6-Factor Internship Matching Engine (SIH Section 20)
```text
Match Score =
    Skill Match × 50%
  + Education Match × 15%
  + Project Match × 15%
  + Experience Match × 10%
  + Location Preference × 5%
  + Certification Match × 5%
```
*Example: Software Engineer Intern at Microsoft matches at 94% with explicit "Why this matches" breakdown and missing skill alerts.*

---

## 🏆 SIH Winning Demo Presentation Flow (Section 25)

```text
1. Student selects target role ("Full Stack Developer")
        ↓
2. Uploads or loads sample resume via AI Resume Parser
        ↓
3. AI extracts verified skills and projects
        ↓
4. System recalculates Career Readiness Score (78%)
        ↓
5. AI detects skill gaps (Docker, AWS, Automated Testing)
        ↓
6. Interactive 5-state visual roadmap guides milestone completion
        ↓
7. System matches student to Microsoft Internship (94% Match)
        ↓
8. Student applies with one click into ATS pipeline
        ↓
9. Company reviews candidate ranking with 6-factor breakdown
        ↓
10. College monitors aggregated cohort skill gaps (Cloud 68%, AI/ML 49%)
        ↓
11. Admin verifies corporate partners and moderates active drives
```

---

## 🛠️ Technology Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) + [Tailwind CSS v4](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)
- **Backend**: [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/) (`--watch` mode enabled)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose 9](https://mongoosejs.com/) (with zero-config offline fallback)
- **AI Engine**: Modular vectoring service in [`server/services/aiEngine.js`](file:///server/services/aiEngine.js)

---

## 🚀 How to Run the Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Fullstack Dev Server (Backend + Frontend)
```bash
npm run dev
```

This concurrently runs:
- **Backend API**: `http://localhost:5000` (Node.js + Express with live auto-restart)
- **Frontend App**: `http://localhost:5173` (React 19 + Vite HMR)

### 3. Verify Health
- System status: `http://localhost:5000/api/status`
- Admin analytics: `http://localhost:5000/api/admin/analytics`
- Career readiness: `http://localhost:5000/api/students/std-1/career-readiness`
