# 🚀 SkillProof

> **Skills, Verified. Not Claimed.**
> A dual-sided platform built for the **Nerds Hack Days Lucknow**, designed to bridge the gap between candidates and recruiters through AI-driven technical assessments and automated skill validation.

## 📸 Platform Showcase

### 1. The Landing Page
![Landing Page](./screenshots/landing.png)

### 2. Student Skill Dashboard
The centralized hub showing verified scores, skill breakdown, and upcoming interviews.

![Student Dashboard - Top](./screenshots/dashboard1.png)
<br>
![Student Dashboard - Bottom](./screenshots/dashboard2.png)

### 3. Live AI Interview IDE
An immersive testing environment with real-time code execution and mock test validation.

![Live AI Interview IDE](./screenshots/AIinterview.png)

### 4. Career Twin (AI Advisor)
Context-aware chatbot providing personalized career roadmaps and readiness checks.

![Career Twin - Part 1](./screenshots/careerTwin.png)
<br>
![Career Twin - Part 2](./screenshots/careerTwin2.png)

### 5. Smart Job Search
Curated opportunities matching the candidate's verified skills, complete with match scores.

![Job Search - Part 1](./screenshots/jobSearch.png)
<br>
![Job Search - Part 2](./screenshots/jobSearch2.png)

### 6. ATS Resume Polish
Instant, actionable feedback to ensure your resume bypasses strict ATS filters.

![ATS Polish](./screenshots/ATSpolish.png)

### 7. Recruiter Candidate Discovery
A powerful dashboard for recruiters featuring detailed, slide-out candidate profiles to instantly view GitHub stats and interview performance.

![Recruiter Dashboard - Candidate Grid](./screenshots/recruiter1.png)
<br>
![Recruiter Dashboard - Candidate Deep Dive](./screenshots/recruiter2.png)

---

## 📖 The Problem
In modern hiring, recruiters are flooded with resumes full of self-reported skills that are impossible to verify until late in the interview process. Meanwhile, talented students struggle to stand out in a sea of generic applications, often getting filtered out by ATS (Applicant Tracking Systems) before they ever get a chance to prove themselves.

## 💡 Our Solution
**SkillProof** is a complete Career OS that replaces self-reported claims with hard data. We empower students to build a verifiable profile of their skills, and we give recruiters a dashboard to instantly discover pre-vetted talent.

### For Students
1. **Connect GitHub:** Automatically sync repositories, languages, and commit history.
2. **AI Technical Interviews:** Take a mock technical interview (Code, MCQ, and Theory) directly on the platform. An AI evaluates the answers in real-time and assigns a verified "SkillProof Score".
3. **Career Twin Chatbot:** An AI career advisor that analyzes your current skills, compares them to target roles (e.g., "Am I Amazon ready?"), and provides a tailored roadmap for improvement.
4. **ATS Polish:** Upload a resume and get instant, actionable feedback to bypass strict ATS filters.

### For Recruiters
1. **Recruiter Dashboard:** Search for candidates based on verified skills, location, and minimum SkillProof scores.
2. **Deep-Dive Profiles:** Click into a candidate to view their overall score dial, GitHub commit/star statistics, and detailed AI Interview feedback.
3. **Direct Engagement:** Contact vetted candidates instantly or invite them for live follow-up interviews.

---

## 🛠️ Tech Stack (Frontend Prototype)
This repository contains the frontend prototype designed for the online submission round. 

* **Framework:** React.js
* **Routing:** React Router DOM
* **Styling:** Tailwind CSS + Lucide React Icons
* **UI Components:** Shadcn UI (Radix UI primitives)
* **Build Tool:** CRA + Craco (for path aliases)

*(Note: Data is currently mocked for the hackathon prototype to demonstrate the seamless UI/UX flow before integrating with the backend API).*

---

## 🏃‍♂️ How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/skillproof-frontend.git
   cd skillproof-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```
   *The application will open automatically at http://localhost:3000*

---

## 🎯 Key Workflows to Test (For Judges)
Since this is an online round, we invite the judges to test the following fully-built UI workflows:

1. **The Mock GitHub Auth:** On the landing page, click `Sign in with GitHub`. Fill out the mock modal to enter the Student Dashboard.
2. **The AI Interview IDE:** Navigate to `AI Interview` -> Select `Frontend Developer` -> Click `Start Interview`. Test the built-in IDE environment, Run & Debug feature, and automated boilerplate injection.
3. **Career Twin Chatbot:** Navigate to `Career Twin` and ask a question like *"Am I Amazon-ready?"* to see how the AI parses the user's profile to give tailored advice.
4. **Recruiter Discovery:** Go back to the landing page and click `I'm a Recruiter`. Search the dashboard and click `View Profile` on any candidate to see the slide-out deep-dive statistics.

---
*Built with ❤️ for Nerds Hack Days Lucknow*
