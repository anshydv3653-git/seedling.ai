# SparkVenture AI

Autonomous student capital prototype pairing open-source repositories with AI-assisted code diligence and simulated PayPal Sandbox micro-grant disbursements.

[Live Demo](https://sparkventure-ai.vercel.app) • [GitHub Repository](https://github.com/anshydv3653-git/seedling.ai)

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Google Gemini](https://img.shields.io/badge/Gemini-3.8--Flash-orange?style=flat&logo=google)](https://ai.google.dev/)
[![Groq Fallback](https://img.shields.io/badge/Groq-Fallback-green?style=flat)](https://groq.com/)
[![PayPal Sandbox](https://img.shields.io/badge/PayPal-Sandbox-003087?style=flat&logo=paypal)](https://developer.paypal.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

> **Hackathon Note:** Built for the PayPal Hackathon 2026.  
> 📺 **Demo Video:** [Watch Demo Video](ADD_LINK_HERE)

---

## Problem & Solution

### The Problem
Student builders and early open-source developers often need small amounts of non-dilutive capital ($25–$500) to cover basic infrastructure costs like domain names, cloud hosting, and database services. Traditional venture capital and formal grants involve heavy paperwork, equity dilution, and review committees that are impractical for early-stage prototypes.

### The Solution
SparkVenture AI explores a lightweight alternative:
1. Student repositories are showcased with key project information and README summaries.
2. An interactive AI diligence agent reviews repository metadata and answers questions about architecture and project scope.
3. Backers can test milestone micro-grant funding directly using PayPal Developer Sandbox rails without transferring real funds.

---

## How It Works

1. **Browse Showcase Repositories:** Select a project card to view repository tags, milestone goals, and builder details.
2. **Review via AI Diligence Agent:** Open the AI chat dialog to query the project's codebase structure, framework choices, and grant allocation scope.
3. **Simulate a Micro-Grant:** Select a funding tier ($25, $50, or $100) and complete the simulated transaction via PayPal Sandbox.
4. **Issue Impact Certificate:** Generate a demo Certificate of Micro-Capital Impact containing simulated transaction metadata, date, and project title.

---

## Features

- **Dual-Model AI Diligence:** AI chat engine powered primarily by Google Gemini (`gemini-3.8-flash` with `gemini-flash-latest` fallback), backed by an automatic failover to Groq (`openai/gpt-oss-120b`, `openai/gpt-oss-20b`) for reliable query handling.
- **README & Metadata Review:** The AI diligence agent inspects repository descriptions, dependency manifests, and README files to contextualize responses.
- **PayPal Sandbox Checkout:** Integrated PayPal sandbox flow simulating order creation and grant settlement without real money.
- **Demo Impact Certificates:** In-browser printable impact certificate modal displaying transaction hashes, recipient details, and date.
- **Database Row Level Security (RLS):** Supabase PostgreSQL tables configured with strict RLS policies to prevent client-side score modification and ledger tampering.
- **Telemetric Sonar Radar:** Interactive HTML5 canvas component visualizing scan sweeps and simulated registry telemetry.

---

## Screenshots

![Home](docs/home.png)
![AI Chat](docs/chat.png)
![PayPal Sandbox](docs/paypal.png)

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Frontend Library** | React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Primary AI Engine** | Google Gemini (`gemini-3.8-flash`, fallback: `gemini-flash-latest`) |
| **Failover AI Engine**| Groq (`openai/gpt-oss-120b`, fallback: `openai/gpt-oss-20b`) |
| **Payment Rail** | PayPal Sandbox (Orders & Capture API) |
| **Database** | Supabase (PostgreSQL with Row Level Security) |
| **Deployment** | Vercel |

---

## Getting Started

### Prerequisites
- Node.js `18.18.0` or `>= 20.0.0`
- npm, pnpm, or yarn
- A Supabase account and project
- Google AI Studio API key
- Groq Cloud API key (for failover support)
- PayPal Developer account (for Sandbox Client ID & Secret)

### 1. Clone the Repository
```bash
git clone [https://github.com/anshydv3653-git/seedling.ai.git](https://github.com/anshydv3653-git/seedling.ai.git)
cd seedling.ai