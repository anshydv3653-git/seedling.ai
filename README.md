# ⚡ SparkVenture AI (Seedling AI)
> **Autonomous Student Capital Infrastructure** — Pairing student builders with automated Google Gemini 2.5 code diligence and verified PayPal Sandbox micro-grant disbursements.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Google Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-orange?logo=google)](https://ai.google.dev/)
[![PayPal](https://img.shields.io/badge/PayPal-Sandbox%20SDK-00457C?logo=paypal)](https://developer.paypal.com/)

---

## 🎯 Project Overview
Student innovators and bedroom hackers frequently build high-potential open-source prototypes but lack access to early seed capital for basic infrastructure (domains, edge servers, API keys). Traditional venture capital ignores grants under $5,000 due to overhead.

**SparkVenture AI** solves this through:
1. **Autonomous Code Diligence:** Leverages **Google Gemini 2.5 Flash** to conduct rigorous AST-level codebase audits directly from public GitHub repositories.
2. **Anti-Spam & Sybil Resistance:** Blocks dummy repositories, duplicate submissions, and nonsensical text through strict heuristic filtering.
3. **Sandbox Micro-Grant Rail:** Seamless disbursement of $25–$500 micro-grants directly via PayPal Sandbox payments without equity dilution.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS, Custom Ambient Moving Blob Glassmorphism
- **AI Core:** Google Gemini 2.5 Flash API (`@google/genai`)
- **Payments:** PayPal Sandbox Orders & Capture API
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel Edge Network

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.18.0 or later)
- npm or pnpm
- Google AI Studio API Key
- PayPal Developer Sandbox Client Credentials

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/anshydv3653-git/Seedling-AI.git
cd Seedling-AI
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add the following keys:

\`\`\`env
# Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# PayPal Sandbox
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_paypal_sandbox_client_secret

# Supabase (Optional for full DB persistence)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### 4. Run Development Server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) with your browser to explore the platform.

### 5. Build for Production
\`\`\`bash
npm run build
\`\`\`

---

## 🔒 Strict Security & Due Diligence Rules
SparkVenture integrates automated safeguards in `app/api/projects/evaluate/route.ts`:
- **Live GitHub Verification:** Real-time ping via GitHub REST API. Returns 404 block for non-existent repositories.
- **Anti-Gibberish Filter:** Rejects consecutive repeating characters and vowel-sparse string spam.
- **Duplicate Protection:** Disallows duplicate repository URLs or matching project titles.

---

## 📜 License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author & Support
- **Founder & Developer:** Ansh Yadav
- **Support Email:** sparkai.automation@gmail.com
- **Instagram:** [@_build_with_ansh](https://instagram.com/_build_with_ansh)
- **Twitter / X:** [@Build_With_ansh](https://twitter.com/Build_With_ansh)
- **GitHub:** [@anshydv3653-git](https://github.com/anshydv3653-git)