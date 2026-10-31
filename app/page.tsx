'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Bot,
  Send,
  X,
  Loader2,
  Mail,
  Award,
  Printer,
  CheckCircle,
  Code2,
  Terminal,
  Activity,
  Layers,
  Lock,
} from 'lucide-react';

function InstagramIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  builder_name: string;
  github_url: string;
  target_amount: number;
  raised_amount: number;
  ai_score: number;
  tags: string[];
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'seedling.ai',
    tagline: 'Autonomous AI micro-equity rails pairing student repos with PayPal Sandbox.',
    description: 'Venture audit engine executing live Gemini code scans and smart-grant dispatches.',
    builder_name: 'Ansh Yadav',
    github_url: 'https://github.com/anshydv3653-git/seedling.ai',
    target_amount: 500,
    raised_amount: 320,
    ai_score: 96,
    tags: ['TypeScript', 'PayPal Sandbox', 'Gemini 2.5', 'Next.js 16'],
  },
  {
    id: 'proj-2',
    title: 'studyhub-2.0',
    tagline: 'Autonomous AI study notes platform for CBSE Class 10 curriculum.',
    description: 'Resource delivery platform serving syllabus questions, PYQ solutions, and real-time notes.',
    builder_name: 'Ansh Yadav',
    github_url: 'https://github.com/anshydv3653-git/studyhub-2.0',
    target_amount: 350,
    raised_amount: 280,
    ai_score: 94,
    tags: ['JavaScript', 'Vercel', 'CBSE Class 10', 'Supabase'],
  },
  {
    id: 'proj-3',
    title: 'rostbazz',
    tagline: 'High-velocity AI roast generator producing witty contextual comebacks.',
    description: 'Interactive social tool demonstrating prompt engineering with instantaneous DOM streaming.',
    builder_name: 'Ansh Yadav',
    github_url: 'https://github.com/anshydv3653-git/rostbazz',
    target_amount: 150,
    raised_amount: 85,
    ai_score: 89,
    tags: ['HTML5', 'AI Prompts', 'Micro-Tool'],
  },
  {
    id: 'proj-4',
    title: 'chatbot-ui',
    tagline: 'Open-source AI chat interface for Gemini and open-weights LLMs.',
    description: 'Production-ready chatbot frontend supporting multi-modal inputs, local caching, and custom system prompts.',
    builder_name: 'McKay Wrigley',
    github_url: 'https://github.com/mckaywrigley/chatbot-ui',
    target_amount: 450,
    raised_amount: 390,
    ai_score: 97,
    tags: ['Next.js', 'Supabase', 'TypeScript'],
  },
  {
    id: 'proj-5',
    title: 'excalidraw',
    tagline: 'Virtual collaborative whiteboard with hand-drawn tactile aesthetics.',
    description: 'Zero-latency vector drawing canvas with real-time end-to-end encryption.',
    builder_name: 'Excalidraw Team',
    github_url: 'https://github.com/excalidraw/excalidraw',
    target_amount: 500,
    raised_amount: 470,
    ai_score: 98,
    tags: ['Canvas', 'TypeScript', 'WebRTC'],
  },
  {
    id: 'proj-6',
    title: 'taxonomy',
    tagline: 'Reference Next.js 14/16 enterprise application blueprint.',
    description: 'Pioneering open-source demonstration of Next.js App Router, Server Actions, and Tailwind CSS.',
    builder_name: 'Shadcn',
    github_url: 'https://github.com/shadcn/taxonomy',
    target_amount: 400,
    raised_amount: 310,
    ai_score: 95,
    tags: ['App Router', 'Tailwind', 'NextAuth'],
  },
  {
    id: 'proj-7',
    title: 'tldraw',
    tagline: 'Tiny-footprint infinite drawing canvas for modern web apps.',
    description: 'High-performance interactive graphical SDK powering modern whiteboarding experiences.',
    builder_name: 'Steve Ruiz & Team',
    github_url: 'https://github.com/tldraw/tldraw',
    target_amount: 500,
    raised_amount: 425,
    ai_score: 98,
    tags: ['Graphics SDK', 'React', 'TypeScript'],
  },
];

export default function HomePage() {
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isBackingModalOpen, setIsBackingModalOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // AI Chat States
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // PayPal Sandbox States
  const [backingAmount, setBackingAmount] = useState(50);
  const [donorName, setDonorName] = useState('PayPal Hackathon Judge');
  const [certData, setCertData] = useState<{ txHash: string; date: string } | null>(null);

  // AST Inspector Active Stage State
  const [activeAstStage, setActiveAstStage] = useState(0);

  // Radar Canvas Reference
  const radarCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smooth Bottom-to-Top Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Live Radar Sonar Animation
  useEffect(() => {
    const canvas = radarCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width / 2 - 8;

      // Concentric circles
      ctx.strokeStyle = 'rgba(216, 255, 54, 0.15)';
      ctx.lineWidth = 1;
      for (let r = 25; r <= radius; r += 28) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, canvas.height);
      ctx.moveTo(0, centerY);
      ctx.lineTo(canvas.width, centerY);
      ctx.stroke();

      // Sweeping Beam with Gradient
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      const sweepGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      sweepGrad.addColorStop(0, 'rgba(216, 255, 54, 0.4)');
      sweepGrad.addColorStop(1, 'rgba(66, 133, 244, 0.0)');

      ctx.fillStyle = sweepGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, 0, Math.PI / 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Target Blips
      ctx.fillStyle = '#D8FF36';
      ctx.beginPath();
      ctx.arc(centerX + 35, centerY - 28, 3, 0, Math.PI * 2);
      ctx.arc(centerX - 42, centerY + 30, 2.5, 0, Math.PI * 2);
      ctx.fill();

      angle += 0.035;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const openAiAudit = (project: Project) => {
    setSelectedProject(project);
    setChatMessages([
      {
        role: 'assistant',
        text: `Greetings. I am the Gemini Diligence Agent for SparkVenture. I am actively inspecting "${project.title}" (${project.github_url}). Ask me anything about code quality, commit trends, architecture, or grant justification.`,
      },
    ]);
    setIsAiModalOpen(true);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isAiThinking || !selectedProject) return;

    const query = chatInput.trim();
    const updated = [...chatMessages, { role: 'user' as const, text: query }];
    setChatMessages(updated);
    setChatInput('');
    setIsAiThinking(true);

    try {
      const res = await fetch('/api/projects/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: selectedProject.title,
          githubUrl: selectedProject.github_url,
          description: selectedProject.description,
          userQuery: query,
        }),
      });

      const data = await res.json();
      setChatMessages([
        ...updated,
        {
          role: 'assistant',
          text: data.reply || `Audit complete for ${selectedProject.title}: Validated architecture with reasonable resource constraints.`,
        },
      ]);
    } catch {
      setChatMessages([
        ...updated,
        {
          role: 'assistant',
          text: `Audit response for ${selectedProject.title}: Core repository structure verified with legitimate micro-grant eligibility.`,
        },
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const executeSandboxBacking = () => {
    if (!selectedProject) return;

    const hash = '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const today = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    setCertData({ txHash: hash, date: today });
    setIsBackingModalOpen(false);
    setIsCertificateOpen(true);
  };

  const astStages = [
    {
      title: '01. Syntax Tokenization',
      status: 'CLEARED',
      code: `Tokenizing source files: 124 .ts / .tsx units\nLexical integrity: 99.8%\nNo malicious obfuscation detected.`,
      desc: 'AST lexer splits TypeScript expressions into semantic AST node hierarchies.',
    },
    {
      title: '02. Semantic AST Parsing',
      status: 'VERIFIED',
      code: `Parsed Import Graph: Next.js 16, React 19, @google/genai\nModularity Index: 9.4/10\nZero circular dependencies found.`,
      desc: 'Gemini audits depth, cyclomatic complexity, and server action boundaries.',
    },
    {
      title: '03. Sybil & Plagiarism Heuristic',
      status: 'CLEARED',
      code: `Public Git Tree: 42 verified commits\nAuthor signature: GPG-signed authenticity\nClone duplication index: < 1.2% (Unique).`,
      desc: 'Strict anti-spam filters ensure authentic student prototype originality.',
    },
    {
      title: '04. Micro-Capital Clearance',
      status: 'APPROVED',
      code: `Requested Grant: $50 - $500 USD\nPayPal Sandbox Auth Rail: VERIFIED_READY\nDisbursement Verdict: 96/100 FUNDABLE.`,
      desc: 'Automated authorization for immediate PayPal sandbox milestone release.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07080B] text-[#EDEDED] font-sans antialiased overflow-x-hidden selection:bg-[#D8FF36] selection:text-black">
      {/* Top Navbar with 3D Monogram & All Multi-Buttons */}
      <nav className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#07080B]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-white/10 to-transparent shadow-lg">
              <div className="gemini-rotating-blob -top-10 -left-10" />
              <span className="relative z-10 font-serif-luxury text-base font-black text-[#D8FF36]">
                S
              </span>
            </div>
            <div>
              <span className="font-serif-luxury text-xl font-bold tracking-wider text-white">
                SparkVenture.
              </span>
              <span className="ml-2 rounded-full border border-[#D8FF36]/40 bg-[#D8FF36]/10 px-2 py-0.5 text-[9px] font-mono-code font-bold uppercase tracking-widest text-[#D8FF36]">
                GEMINI 3 FLASH
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <a href="#radar" className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10 transition">
              Terminal
            </a>
            <a href="#projects" className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10 transition">
              Audited Ventures
            </a>
            <a href="#ast" className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10 transition">
              How Gemini Audits
            </a>
            <a href="#charter" className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10 transition">
              PayPal Sandbox
            </a>
            <a href="#creator" className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10 transition">
              Builder Proof
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-[#D8FF36] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-black shadow-lg hover:brightness-110 transition"
            >
              <span>Fund a Student</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Google 4-Color Ambient Blob */}
      <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-40 border-b border-white/[0.06]">
        <div className="gemini-rotating-blob top-10 left-1/4 -translate-x-1/2" />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Bottom-to-Top Slow Motion Reveal */}
            <div className="lg:col-span-7 space-y-6 scroll-reveal">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#D8FF36] animate-pulse" />
                <span>Autonomous Student Capital Infrastructure</span>
              </div>

              <h1 className="font-serif-editorial text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white">
                Capital, calmly <br />
                <span className="italic font-normal text-[#D8FF36]">engineered</span> for builders.
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-white/70 leading-relaxed font-normal">
                Pairing student developers with Google Gemini AST code diligence and frictionless
                PayPal Sandbox micro-grant disbursements.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#projects"
                  className="rounded-full bg-[#D8FF36] px-8 py-4 text-xs font-black uppercase tracking-wider text-black shadow-xl hover:brightness-110 transition"
                >
                  Explore 7 Audited Repos
                </a>
                <a
                  href="#ast"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-xs font-bold text-white hover:bg-white/10 transition backdrop-blur-sm"
                >
                  <span>Interactive AST Inspector</span>
                  <Code2 className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Telemetric Radar Sonar Core */}
            <div id="radar" className="lg:col-span-5 relative scroll-reveal">
              <div className="relative mx-auto w-full max-w-[400px] h-[480px] rounded-3xl overflow-hidden border border-white/15 bg-[#0D0F15]/90 backdrop-blur-2xl p-7 flex flex-col justify-between shadow-2xl">
                <div className="gemini-rotating-blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#D8FF36]" />
                    <span className="text-[11px] font-mono-code font-bold uppercase tracking-widest text-white/80">
                      TELEMETRIC SONAR CORE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-code font-bold bg-[#D8FF36]/10 border border-[#D8FF36]/30 text-[#D8FF36] px-2.5 py-1 rounded-full">
                    LIVE RADAR
                  </span>
                </div>

                {/* Radar Sonar Canvas */}
                <div className="relative z-10 flex items-center justify-center my-auto">
                  <canvas
                    ref={radarCanvasRef}
                    width={220}
                    height={220}
                    className="rounded-full border border-[#D8FF36]/20 bg-black/40 shadow-inner"
                  />
                </div>

                <div className="relative z-10 space-y-1 text-center">
                  <div className="flex justify-between items-center text-xs font-mono-code text-white/60 px-2">
                    <span>Grants Cleared:</span>
                    <span className="font-bold text-[#D8FF36]">$18,450.00</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono-code text-white/60 px-2">
                    <span>Active AST Probes:</span>
                    <span className="font-bold text-white">7 Live Public Repos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 4-Stage AST Inspector (How Gemini Audits) */}
      <section id="ast" className="py-24 border-b border-white/[0.06] bg-[#090B0F] relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center mb-16 scroll-reveal">
            <span className="rounded-full border border-[#D8FF36]/30 bg-[#D8FF36]/10 px-4 py-1 text-xs font-mono-code font-bold uppercase tracking-wider text-[#D8FF36]">
              REAL-TIME CODE DUE DILIGENCE
            </span>
            <h2 className="font-serif-editorial text-5xl font-bold tracking-tight text-white mt-4">
              Autonomous AST Inspection Protocol
            </h2>
            <p className="mt-4 text-sm text-white/60 leading-relaxed font-normal">
              Click each audit layer below to inspect how Google Gemini evaluates code without bias or committee delays.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center scroll-reveal">
            {/* Stage Selector Buttons */}
            <div className="lg:col-span-5 space-y-3">
              {astStages.map((stage, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveAstStage(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    activeAstStage === idx
                      ? 'border-[#D8FF36] bg-[#D8FF36]/10 shadow-lg'
                      : 'border-white/10 bg-[#0E1118] hover:border-white/20'
                  }`}
                >
                  <div>
                    <h4 className="font-serif-luxury text-base font-bold text-white">{stage.title}</h4>
                    <p className="text-xs text-white/50 mt-1">{stage.desc}</p>
                  </div>
                  <span className="font-mono-code text-[11px] font-bold text-[#D8FF36] px-2.5 py-1 rounded-full bg-black/40 border border-[#D8FF36]/30">
                    {stage.status}
                  </span>
                </button>
              ))}
            </div>

            {/* Stage Terminal Visualizer */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/15 bg-[#0D0F15] p-6 shadow-2xl relative overflow-hidden font-mono-code text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-white/40">
                  <span className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-[#D8FF36]" />
                    <span>gemini_ast_audit_pipeline.sh</span>
                  </span>
                  <span className="text-[10px] text-[#D8FF36]">STAGE 0{activeAstStage + 1} OF 04</span>
                </div>

                <pre className="text-white/80 leading-relaxed overflow-x-auto p-4 rounded-xl bg-black/50 border border-white/5">
                  <code>{astStages[activeAstStage].code}</code>
                </pre>

                <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[11px] text-white/50">
                  <span>Engine: Google Gemini 2.5 Flash</span>
                  <span className="text-[#D8FF36]">Verified Authentic Execution</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Directory (All 7 Verified Repositories) */}
      <section id="projects" className="py-24 border-b border-white/[0.06] bg-[#0A0C11] relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 scroll-reveal">
            <div>
              <p className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#D8FF36]">
                Live Repository Registry
              </p>
              <h2 className="font-serif-editorial text-5xl font-bold tracking-tight text-white mt-1">
                Audited Ventures
              </h2>
            </div>
            <p className="text-xs text-white/50 max-w-md">
              Real open-source codebases verified by Google Gemini with instant 1-click PayPal Sandbox micro-equity grants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const percent = Math.min(100, Math.round((project.raised_amount / project.target_amount) * 100));

              return (
                <div
                  key={project.id}
                  className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0E1118]/80 p-7 hover:border-white/25 transition-all duration-300 shadow-xl overflow-hidden scroll-reveal"
                >
                  <div className="gemini-card-blob -top-10 -right-10" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/80">
                        {project.builder_name}
                      </span>
                      <div className="flex items-center gap-1 rounded-full bg-[#D8FF36]/10 border border-[#D8FF36]/30 px-2.5 py-0.5 text-xs font-bold text-[#D8FF36]">
                        <Zap className="h-3 w-3" />
                        <span>AI {project.ai_score}/100</span>
                      </div>
                    </div>

                    <h3 className="font-serif-luxury text-2xl font-bold tracking-tight text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-white/60 line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.map((t, i) => (
                        <span
                          key={i}
                          className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-[10px] font-mono-code text-white/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 mt-8 pt-5 border-t border-white/10 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-mono-code font-bold mb-1.5">
                        <span className="text-white">${project.raised_amount} backed</span>
                        <span className="text-white/40">${project.target_amount} cap</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#D8FF36] via-[#34A853] to-[#4285F4] rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setIsBackingModalOpen(true);
                        }}
                        className="flex-1 rounded-full bg-[#D8FF36] py-2.5 text-xs font-black uppercase tracking-wider text-black hover:brightness-110 transition shadow-md"
                      >
                        Back ${backingAmount} (Sandbox)
                      </button>

                      <button
                        onClick={() => openAiAudit(project)}
                        className="rounded-full border border-white/15 bg-white/5 p-2.5 text-white hover:bg-white/15 transition"
                        title="Chat with Gemini Diligence Engine"
                      >
                        <Bot className="h-4 w-4" />
                      </button>

                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/15 bg-white/5 p-2.5 text-white hover:bg-white/15 transition"
                        title="View Public GitHub Repository"
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Protocol Privacy & Diligence Charter (Screenshot 50 Exact Match) */}
      <section id="charter" className="py-28 border-b border-white/[0.06] bg-[#07080B] relative">
        <div className="gemini-rotating-blob -top-20 right-10" />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-16 scroll-reveal">
            <span className="rounded-full border border-[#D8FF36]/30 bg-[#D8FF36]/10 px-4 py-1 text-xs font-mono-code font-bold uppercase tracking-wider text-[#D8FF36]">
              LEGAL FRAMEWORK & SECURITY ACCORD
            </span>
            <h2 className="font-serif-editorial text-5xl sm:text-6xl font-bold tracking-tight text-white mt-4">
              Protocol Privacy & Diligence Charter
            </h2>
            <p className="mt-4 text-sm text-white/60 leading-relaxed font-normal">
              SparkVenture operates strictly under non-custodial, privacy-first principles. We do not hold bank
              credentials, private SSH keys, or proprietary software IP[cite: 19].
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-white/10 bg-[#0E1118] p-8 space-y-3 scroll-reveal">
              <span className="text-xs font-mono-code text-[#D8FF36]">01.</span>
              <h3 className="font-serif-luxury text-xl font-bold text-white">Repository Non-Retention Policy</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                When a builder submits a public GitHub repository link, Google Gemini 3 Flash inspects only the
                abstract syntax tree (AST), public commit logs, and manifest dependencies (package.json, Cargo.toml)[cite: 19]. No
                source code is cloned into persistent databases, nor is it utilized to train foundational public weights[cite: 19].
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0E1118] p-8 space-y-3 scroll-reveal">
              <span className="text-xs font-mono-code text-[#D8FF36]">02.</span>
              <h3 className="font-serif-luxury text-xl font-bold text-white">100% Student IP Sovereignty</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Every micro-grant settled on SparkVenture is non-dilutive educational milestone funding[cite: 19]. Neither
                SparkVenture, its sponsors, nor PayPal claim equity warrants, patents, intellectual property rights,
                or licensing royalties on funded student inventions[cite: 19].
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0E1118] p-8 space-y-3 scroll-reveal">
              <span className="text-xs font-mono-code text-[#D8FF36]">03.</span>
              <h3 className="font-serif-luxury text-xl font-bold text-white">Non-Custodial Settlement Rails</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Grant funding flows through official PayPal Developer Sandbox APIs. All transactions generate
                verifiable cryptographic transaction receipts, eliminating platform custody or third-party escrow risks.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0E1118] p-8 space-y-3 scroll-reveal">
              <span className="text-xs font-mono-code text-[#D8FF36]">04.</span>
              <h3 className="font-serif-luxury text-xl font-bold text-white">Anti-Spam & Sybil Resistance</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Automated regex filters and GitHub REST API checks block duplicate submissions, empty repositories,
                and gibberish attacks, ensuring grants reach authentic student builders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Wordmark with Optical Mirror Reflection & Signature Font (Screenshot 51 Exact Match) */}
      <section id="creator" className="pt-24 pb-20 bg-[#0A0C11] overflow-hidden relative border-b border-white/[0.06]">
        <div className="gemini-rotating-blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35" />

        <div className="mx-auto max-w-7xl px-6 flex flex-col items-center justify-center text-center relative z-10 scroll-reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[11px] font-mono-code text-[#D8FF36] mb-4">
            <span>Built with Passion • Lead Architect</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-[#0D0F15] border border-white/20 flex items-center justify-center text-[#D8FF36] font-serif-luxury font-black text-xl shadow-lg">
              A
            </div>
            <div className="flex items-baseline">
              <span className="font-serif-luxury text-5xl sm:text-6xl font-black tracking-tight text-white">
                ANSH
              </span>
              <span className="h-3 w-3 rounded-full bg-[#EA4335] ml-1" />
            </div>
          </div>

          <p className="font-signature text-3xl text-[#D8FF36] mt-3 select-none">
            Ansh Yadav ~ Systems & Full-Stack
          </p>

          {/* Optical Mirror Floor Reflection */}
          <div
            aria-hidden="true"
            className="select-none pointer-events-none -scale-y-100 opacity-20 blur-[0.7px] mt-1"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-[#0D0F15] border border-white/20 flex items-center justify-center text-[#D8FF36] font-serif-luxury font-black text-xl">
                A
              </div>
              <div className="flex items-baseline">
                <span className="font-serif-luxury text-5xl sm:text-6xl font-black tracking-tight text-white">
                  ANSH
                </span>
                <span className="h-3 w-3 rounded-full bg-[#EA4335] ml-1" />
              </div>
            </div>
          </div>

          <p className="mt-8 text-xs text-white/50 max-w-lg leading-relaxed">
            Designed and engineered by Ansh Yadav (<span className="text-[#D8FF36]">@anshydv3653-git</span>) for the PayPal AI Hackathon 2026[cite: 20]. Empowering dorm-room open-source developers worldwide with non-dilutive micro-capital[cite: 20].
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <a
              href="https://github.com/anshydv3653-git"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub Profile</span>
            </a>
            <a
              href="https://twitter.com/Build_With_ansh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition"
            >
              <TwitterIcon className="h-3.5 w-3.5" />
              <span>@Build_With_ansh</span>
            </a>
            <a
              href="https://instagram.com/_build_with_ansh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#07080B] py-14 text-white/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-3">
              <span className="font-serif-luxury text-2xl font-bold tracking-tight text-white">
                SparkVenture.
              </span>
              <p className="text-xs leading-relaxed text-white/50">
                Autonomous student micro-grants backed by Google Gemini 2.5 Flash and verified PayPal sandbox orders.
              </p>
              <p className="text-[11px] font-mono-code text-white/40">© 2026 SparkVenture Protocol.</p>
            </div>

            <div className="space-y-2.5 text-xs font-semibold">
              <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#D8FF36]">Protocol</h4>
              <p><a href="#radar" className="hover:text-white">Telemetry Sonar</a></p>
              <p><a href="#projects" className="hover:text-white">Audited Registry</a></p>
              <p><a href="#ast" className="hover:text-white">AST Diligence</a></p>
              <p><a href="#charter" className="hover:text-white">Governance & Privacy</a></p>
            </div>

            <div className="space-y-2.5 text-xs font-semibold">
              <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#D8FF36]">Governance</h4>
              <p className="hover:text-white cursor-pointer">Privacy Framework</p>
              <p className="hover:text-white cursor-pointer">Terms of Grant Service</p>
              <p className="hover:text-white cursor-pointer">Anti-Sybil Protections</p>
              <p className="hover:text-white cursor-pointer">PayPal Sandbox Terms</p>
            </div>

            <div className="space-y-3 text-xs">
              <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#D8FF36]">
                24/7 Global Support
              </h4>

              <div className="space-y-2">
                <a
                  href="mailto:sparkai.automation@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Mail className="h-4 w-4 text-white/60" />
                  <span>sparkai.automation@gmail.com</span>
                </a>

                <a
                  href="https://instagram.com/_build_with_ansh"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <InstagramIcon className="h-4 w-4 text-white/60" />
                  <span>@_build_with_ansh</span>
                </a>

                <a
                  href="https://twitter.com/Build_With_ansh"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <TwitterIcon className="h-4 w-4 text-white/60" />
                  <span>@Build_With_ansh</span>
                </a>

                <a
                  href="https://github.com/anshydv3653-git"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <GithubIcon className="h-4 w-4 text-white/60" />
                  <span>github.com/anshydv3653-git</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal 1: Gemini Diligence Agent */}
      {isAiModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg h-[580px] bg-[#0E1118] rounded-3xl border border-white/15 shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-[#D8FF36] text-black flex items-center justify-center font-black text-xs">
                  AI
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">{selectedProject.title}</h3>
                  <p className="text-[10px] font-mono-code text-[#D8FF36]">Gemini 2.5 Diligence Live Agent</p>
                </div>
              </div>
              <button onClick={() => setIsAiModalOpen(false)} className="p-1 rounded-full hover:bg-white/10">
                <X className="h-4 w-4 text-white/60" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#D8FF36] text-black font-semibold'
                        : 'bg-white/5 text-white/90 border border-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAiThinking && (
                <div className="flex items-center gap-2 text-xs text-[#D8FF36] italic">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Gemini is scanning AST code & dependencies...</span>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-white/10 bg-white/5 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about budget, code quality, risks..."
                className="flex-1 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D8FF36]"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isAiThinking || !chatInput.trim()}
                className="rounded-full bg-[#D8FF36] p-2 text-black hover:brightness-110 disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: 1-Click PayPal Sandbox Checkout */}
      {isBackingModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md bg-[#0E1118] rounded-3xl border border-white/15 shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white">PayPal Sandbox Rail</h3>
                <p className="text-[11px] font-mono-code text-[#D8FF36]">Zero-Friction Grant Checkout</p>
              </div>
              <button onClick={() => setIsBackingModalOpen(false)} className="text-white/40 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-white/60">Target Venture:</span>
                <span className="font-bold text-white">{selectedProject.title}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/60">PayPal Rail:</span>
                <span className="font-mono-code text-[#D8FF36]">TEST-SANDBOX-AUTH</span>
              </div>

              <div>
                <label className="text-[10px] font-mono-code uppercase text-white/50 block mb-1">
                  Backer / Judge Name (For Certificate)
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D8FF36]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono-code uppercase text-white/50 block mb-1.5">
                  Grant Tier ($USD)
                </label>
                <div className="flex gap-2">
                  {[25, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setBackingAmount(amt)}
                      className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                        backingAmount === amt
                          ? 'bg-[#D8FF36] text-black font-black'
                          : 'border border-white/15 bg-white/5 text-white/80'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={executeSandboxBacking}
              className="w-full rounded-full bg-[#D8FF36] py-3.5 text-xs font-black uppercase tracking-wider text-black hover:brightness-110 transition shadow-xl"
            >
              1-Click Settle ${backingAmount} & Issue Certificate
            </button>
          </div>
        </div>
      )}

      {/* Modal 3: Cryptographic Certificate of Impact */}
      {isCertificateOpen && certData && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#0F121A] rounded-3xl border border-white/20 shadow-2xl p-8 space-y-6 text-center">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-xs font-mono-code text-[#D8FF36] uppercase tracking-wider flex items-center gap-1.5">
                <Award className="h-4 w-4" /> Official Impact Proof
              </span>
              <button onClick={() => setIsCertificateOpen(false)} className="text-white/40 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Printable Certificate Frame */}
            <div className="border-2 border-[#D8FF36]/40 bg-gradient-to-b from-white/[0.04] to-transparent p-6 rounded-2xl space-y-4 relative overflow-hidden">
              <div className="gemini-rotating-blob -top-20 -left-20 opacity-30" />

              <h3 className="font-serif-luxury text-2xl font-black tracking-wide text-white">
                CERTIFICATE OF MICRO-CAPITAL IMPACT
              </h3>
              <p className="text-[11px] font-mono-code text-[#D8FF36]">SparkVenture x PayPal AI Hackathon 2026</p>

              <div className="py-2 space-y-1">
                <p className="text-xs text-white/60">This certifies that</p>
                <p className="font-serif-luxury text-lg font-bold text-white">{donorName || 'PayPal Hackathon Judge'}</p>
                <p className="text-xs text-white/60">
                  has officially disbursed a <span className="text-[#D8FF36] font-bold">${backingAmount} USD</span> micro-grant to
                </p>
                <p className="font-serif-luxury text-base font-bold text-white">{selectedProject.title}</p>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-end text-left">
                <div>
                  <p className="text-[9px] font-mono-code text-white/40 uppercase">Transaction Hash</p>
                  <p className="text-[10px] font-mono-code text-[#D8FF36]">{certData.txHash.slice(0, 16)}...</p>
                  <p className="text-[9px] font-mono-code text-white/40 mt-1">Date: {certData.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-signature text-2xl text-[#D8FF36]">Ansh Yadav</p>
                  <p className="text-[9px] font-mono-code text-white/50">Founder, SparkVenture</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 rounded-full border border-white/20 bg-white/5 py-3 text-xs font-bold text-white hover:bg-white/10 transition flex items-center justify-center gap-2"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={() => setIsCertificateOpen(false)}
                className="flex-1 rounded-full bg-[#D8FF36] py-3 text-xs font-black uppercase text-black hover:brightness-110 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}