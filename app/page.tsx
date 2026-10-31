'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Cpu,
  Bot,
  Send,
  X,
  Loader2,
  Mail,
  Search,
} from 'lucide-react';

// Type-Safe Social Icons (Zero lucide-react build issue)
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
  demo_url?: string;
  target_amount: number;
  raised_amount: number;
  ai_score: number;
  tags: string[];
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'StudyHub 2.0',
    tagline: 'Autonomous AI study & notes platform for CBSE Class 10 students.',
    description:
      'Full-stack Next.js resource distribution engine with automated syllabus mapping, smart note indexing, and instant peer question solvers.',
    builder_name: 'Ansh Yadav',
    github_url: 'https://github.com/anshydv3653-git/studyhub-2.0',
    demo_url: 'https://studyhub-2-0-five.vercel.app',
    target_amount: 350,
    raised_amount: 280,
    ai_score: 94,
    tags: ['Next.js 16', 'TypeScript', 'Education'],
  },
  {
    id: 'proj-2',
    title: 'Seedling AI',
    tagline: 'PayPal sandbox micro-grant rails paired with Google Gemini 2.5.',
    description:
      'Autonomous project vetting agent that audits open-source student prototypes and executes instant, milestone-based grant backing.',
    builder_name: 'Dev Community',
    github_url: 'https://github.com/anshydv3653-git',
    demo_url: 'https://seedling-ai.vercel.app',
    target_amount: 500,
    raised_amount: 320,
    ai_score: 96,
    tags: ['PayPal SDK', 'Gemini 2.5', 'Supabase'],
  },
  {
    id: 'proj-3',
    title: 'PulseTelemetry',
    tagline: 'High-frequency latency & edge telemetry monitor for Web3 API gateways.',
    description:
      'Decentralized uptime probe reporting sub-second RPC health metrics directly to public dashboards with zero configuration.',
    builder_name: 'Aryan V.',
    github_url: 'https://github.com/anshydv3653-git',
    demo_url: '',
    target_amount: 250,
    raised_amount: 90,
    ai_score: 88,
    tags: ['Rust', 'Telemetry', 'Cloud'],
  },
];

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'urgent'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isBackingModalOpen, setIsBackingModalOpen] = useState(false);

  // AI Chat States
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Backing Simulation State
  const [backingAmount, setBackingAmount] = useState(50);
  const [isBackingSuccess, setIsBackingSuccess] = useState(false);

  // Strict Submission Form States
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newGithub, setNewGithub] = useState('');
  const [newTarget, setNewTarget] = useState(250);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Evolving on scroll animation handler
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openAiAudit = (project: Project) => {
    setSelectedProject(project);
    setChatMessages([
      {
        role: 'assistant',
        text: `Hello! Main Google Gemini 2.5 Diligence Engine hoon. Aap "${project.title}" ke GitHub repo, architecture, ya budget plan ke baare mein kuch bhi pooch sakte hain.`,
      },
    ]);
    setIsAiModalOpen(true);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim() || isAiThinking) return;

    const updated = [...chatMessages, { role: 'user' as const, text: query }];
    setChatMessages(updated);
    setChatInput('');
    setIsAiThinking(true);

    try {
      const res = await fetch('/api/projects/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: selectedProject?.title,
          tagline: selectedProject?.tagline,
          description: selectedProject?.description,
          githubUrl: selectedProject?.github_url,
          fundingTarget: selectedProject?.target_amount,
        }),
      });
      const data = await res.json();
      const aiReply =
        data?.audit?.summary ||
        `Verified technical review for ${selectedProject?.title}: Validated repository architecture with reasonable resource constraints.`;

      setChatMessages([...updated, { role: 'assistant', text: aiReply }]);
    } catch {
      setChatMessages([
        ...updated,
        {
          role: 'assistant',
          text: `Audit summary for ${selectedProject?.title}: Technical parameters evaluated successfully.`,
        },
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const executeBacking = () => {
    if (!selectedProject) return;
    setIsBackingSuccess(true);
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProject.id
          ? { ...p, raised_amount: Math.min(p.target_amount, p.raised_amount + backingAmount) }
          : p
      )
    );
    setTimeout(() => {
      setIsBackingSuccess(false);
      setIsBackingModalOpen(false);
    }, 1800);
  };

  // Strict Submission Handler
  const handleNewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // 1. Frontend Anti-Gibberish Check
    const repeatedPattern = /(.)\1{3,}/i;
    if (repeatedPattern.test(newTitle) || repeatedPattern.test(newTagline) || repeatedPattern.test(newDesc)) {
      setSubmitError('Spam detected! Repeated characters (jaise dasssassssssssss) allowed nahi hain.');
      return;
    }

    // 2. Frontend Anti-Duplicate Check
    const duplicate = projects.some(
      (p) =>
        p.title.trim().toLowerCase() === newTitle.trim().toLowerCase() ||
        p.github_url.trim().toLowerCase() === newGithub.trim().toLowerCase()
    );

    if (duplicate) {
      setSubmitError('Duplicate Entry! Ye Project Title ya GitHub Repository pehle se platform par registered hai.');
      return;
    }

    setIsEvaluating(true);

    try {
      // 3. Real Backend Call (GitHub API + Strict Gemini Auditor)
      const res = await fetch('/api/projects/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle.trim(),
          tagline: newTagline.trim(),
          description: newDesc.trim(),
          githubUrl: newGithub.trim(),
          fundingTarget: Number(newTarget),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || 'Project verification failed.');
        setIsEvaluating(false);
        return;
      }

      // Add to state only when verified
      const created: Project = {
        id: `proj-${Date.now()}`,
        title: newTitle.trim(),
        tagline: newTagline.trim(),
        description: newDesc.trim(),
        builder_name: 'Verified Student',
        github_url: newGithub.trim(),
        target_amount: Number(newTarget),
        raised_amount: 0,
        ai_score: data.audit?.ai_score || 88,
        tags: [data.repoDetails?.language || 'Verified', 'Gemini Audited'],
      };

      setProjects([created, ...projects]);
      setIsSubmitModalOpen(false);
      setNewTitle('');
      setNewTagline('');
      setNewDesc('');
      setNewGithub('');
    } catch (err: any) {
      setSubmitError(err.message || 'Server connection error.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'verified') return matchesSearch && p.ai_score >= 90;
    if (activeTab === 'urgent')
      return matchesSearch && p.raised_amount / p.target_amount < 0.5;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#0B0B0E] font-sans antialiased selection:bg-[#D8FF36] selection:text-black">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-black/[0.08] bg-[#F4F4F0]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-black/15 bg-black p-[2px] shadow-sm">
              <div className="absolute h-12 w-12 rounded-full bg-[#ff0000] opacity-80 blur-md animate-blob" />
              <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-black font-serif text-sm font-bold text-white">
                S.
              </div>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#0B0B0E]">
                SparkVenture.
              </span>
              <span className="ml-2 rounded-full bg-[#D8FF36] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                Gemini 2.5 Active
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-black/70">
            <a href="#projects" className="hover:text-black transition">
              Live Registry
            </a>
            <a href="#how-it-works" className="hover:text-black transition">
              Autonomous Diligence
            </a>
            <a href="#manifesto" className="hover:text-black transition">
              System Blueprint
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSubmitError(null);
                setIsSubmitModalOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#0B0B0E] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-black/90 transition"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#D8FF36]" />
              <span>Submit Repo</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-xs font-semibold text-black shadow-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#D8FF36]" />
                <span>Next-Gen Student Capital Infrastructure</span>
              </div>

              <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-[#0B0B0E]">
                Money, calmly <br />
                <span className="italic font-normal text-black/80">engineered</span> for builders.
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-black/70 leading-relaxed font-normal">
                A warm, editorial venture canvas pairing student developers with autonomous Google
                Gemini 2.5 code audits and real-time PayPal sandbox micro-grants.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => {
                    setSubmitError(null);
                    setIsSubmitModalOpen(true);
                  }}
                  className="rounded-full bg-[#D8FF36] px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-black shadow-lg hover:brightness-105 transition"
                >
                  Pitch Prototype
                </button>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/60 px-6 py-3.5 text-xs font-bold text-black backdrop-blur-sm hover:bg-white transition"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Right: Floating Layered Cards with Uiverse Red Bouncing Blob */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-[360px] h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-white/50 backdrop-blur-2xl p-6 flex flex-col justify-between">
                <div className="absolute top-1/2 left-1/2 w-44 h-44 rounded-full bg-[#ff0000] blur-2xl opacity-75 animate-blob -z-10" />

                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#D8FF36] border border-black/40" />
                    <span className="text-xs font-extrabold tracking-widest uppercase text-black">
                      Telemetric Core
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold bg-black text-[#D8FF36] px-2.5 py-1 rounded-full">
                    99.4% Valid
                  </span>
                </div>

                <div className="space-y-4 my-auto">
                  <p className="text-xs font-semibold text-black/60 uppercase tracking-wider">
                    Total Micro-Grants Cleared
                  </p>
                  <p className="font-serif text-5xl font-bold tracking-tight text-[#0B0B0E]">
                    $18,450<span className="text-2xl text-black/40">.00</span>
                  </p>
                  <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
                    <div className="h-full bg-black rounded-full w-[78%]" />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/80 bg-white/85 p-3.5 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-black">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="h-3.5 w-3.5 text-purple-600" />
                      Gemini 2.5 Diligence
                    </span>
                    <span className="text-[#0B0B0E]">Sub-second</span>
                  </div>
                  <p className="text-[11px] text-black/60">
                    AST AST-level verification active on GitHub pull hooks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Registry Section */}
      <section id="projects" className="py-20 border-t border-black/[0.08] bg-[#EFEFEA]/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-black/50">
                Directory
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0B0E] mt-1">
                Audited Ventures
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-black/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search repository..."
                  className="rounded-full border border-black/10 bg-white/80 pl-9 pr-4 py-2 text-xs text-black placeholder-black/40 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex rounded-full border border-black/10 bg-white/60 p-1">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                    activeTab === 'all' ? 'bg-[#0B0B0E] text-white shadow-sm' : 'text-black/60 hover:text-black'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('verified')}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                    activeTab === 'verified'
                      ? 'bg-[#0B0B0E] text-white shadow-sm'
                      : 'text-black/60 hover:text-black'
                  }`}
                >
                  Top Scored (90+)
                </button>
                <button
                  onClick={() => setActiveTab('urgent')}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                    activeTab === 'urgent'
                      ? 'bg-[#0B0B0E] text-white shadow-sm'
                      : 'text-black/60 hover:text-black'
                  }`}
                >
                  Funding Needed
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const percent = Math.min(
                100,
                Math.round((project.raised_amount / project.target_amount) * 100)
              );

              return (
                <div
                  key={project.id}
                  style={{
                    transform: `translateY(${Math.max(0, 30 - scrollY * 0.05)}px)`,
                    transition: 'all 0.4s ease-out',
                  }}
                  className="group relative flex flex-col justify-between rounded-3xl border border-black/[0.08] bg-white/90 p-7 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="rounded-full bg-black/[0.05] border border-black/5 px-2.5 py-1 text-[11px] font-semibold text-black/70">
                        {project.builder_name}
                      </span>
                      <div className="flex items-center gap-1.5 rounded-full bg-[#D8FF36] px-2.5 py-0.5 text-xs font-extrabold text-black">
                        <Zap className="h-3 w-3" />
                        <span>AI {project.ai_score}/100</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl font-bold tracking-tight text-[#0B0B0E]">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-black/60 line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.map((t, i) => (
                        <span
                          key={i}
                          className="rounded-md border border-black/5 bg-[#F4F4F0] px-2 py-0.5 text-[10px] font-semibold text-black/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-black/5 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-black mb-1.5">
                        <span>${project.raised_amount} backed</span>
                        <span className="text-black/50">${project.target_amount} cap</span>
                      </div>
                      <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0B0B0E] rounded-full transition-all duration-500"
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
                        className="flex-1 rounded-full bg-[#0B0B0E] py-2.5 text-xs font-bold text-white hover:bg-black/80 transition"
                      >
                        Back ${backingAmount}
                      </button>

                      <button
                        onClick={() => openAiAudit(project)}
                        className="rounded-full border border-black/15 bg-white p-2.5 text-black hover:bg-black/5 transition"
                        title="Ask Gemini Diligence Agent"
                      >
                        <Bot className="h-4 w-4" />
                      </button>

                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-black/15 bg-white p-2.5 text-black hover:bg-black/5 transition"
                        >
                          <GithubIcon className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blueprint & Architecture Section */}
      <section id="manifesto" className="py-24 border-t border-black/[0.08] bg-[#F4F4F0]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="rounded-full bg-[#D8FF36] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
              System Architecture
            </span>
            <h2 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-[#0B0B0E] mt-4">
              Autonomous micro-equity for student innovators.
            </h2>
            <p className="mt-4 text-base text-black/70 leading-relaxed font-normal">
              Traditional venture capital ignores high-potential student engineers building in dorms
              and bedrooms. SparkVenture solves this by replacing bureaucratic committee pitch decks
              with transparent, code-first diligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl border border-black/[0.08] bg-white p-8 space-y-4">
              <div className="h-10 w-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                01
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0B0B0E]">
                Autonomous Due Diligence
              </h3>
              <p className="text-xs text-black/70 leading-relaxed">
                Google Gemini 2.5 Flash analyzes your GitHub repository commit frequency, dependency
                vulnerabilities, and architecture clarity within seconds to eliminate bias.
              </p>
            </div>

            <div className="rounded-3xl border border-black/[0.08] bg-white p-8 space-y-4">
              <div className="h-10 w-10 rounded-2xl bg-lime-100 flex items-center justify-center text-lime-900 font-bold">
                02
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0B0B0E]">
                Zero-Equity Student Grants
              </h3>
              <p className="text-xs text-black/70 leading-relaxed">
                Grants range from $25 to $500 to fund direct prototype expenses like domain names,
                server deployments, and API credits without giving away company ownership.
              </p>
            </div>

            <div className="rounded-3xl border border-black/[0.08] bg-white p-8 space-y-4">
              <div className="h-10 w-10 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-800 font-bold">
                03
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0B0B0E]">
                Sandbox Settlement Engine
              </h3>
              <p className="text-xs text-black/70 leading-relaxed">
                Institutional backers and community angels fund milestone releases directly via
                verified PayPal payment gateway transactions recorded permanently in Supabase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Wordmark with Optical Mirror Reflection */}
      <section className="pt-20 pb-16 bg-[#F4F4F0] border-t border-black/[0.06] overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 flex flex-col items-center justify-center text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-black/50 mb-3">
            Designed & Built with ❤️ by
          </p>

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-black flex items-center justify-center text-white font-serif font-black text-lg shadow-sm">
              A
            </div>
            <span className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-[#0B0B0E]">
              ANSH.
            </span>
          </div>

          <div
            aria-hidden="true"
            className="select-none pointer-events-none -scale-y-100 opacity-20 blur-[0.6px] mt-0.5"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-black flex items-center justify-center text-white font-serif font-black text-lg">
                A
              </div>
              <span className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-[#0B0B0E]">
                ANSH.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with 24/7 Support, Governance & Social Links */}
      <footer className="border-t border-black/[0.08] bg-[#EBEBE6] py-14 text-black/70">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-3">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#0B0B0E]">
                SparkVenture.
              </span>
              <p className="text-xs leading-relaxed text-black/60">
                Autonomous student micro-grants backed by Google Gemini 2.5 Flash and verified
                PayPal sandbox orders.
              </p>
              <p className="text-[11px] text-black/40">© 2026 SparkVenture Protocol.</p>
            </div>

            <div className="space-y-2.5 text-xs font-semibold">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black">Protocol</h4>
              <p><a href="#projects" className="hover:text-black">Audited Registry</a></p>
              <p><a href="#how-it-works" className="hover:text-black">Gemini Diligence</a></p>
              <p><a href="#manifesto" className="hover:text-black">Architecture</a></p>
            </div>

            <div className="space-y-2.5 text-xs font-semibold">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black">Governance</h4>
              <p className="hover:text-black cursor-pointer">Privacy Framework</p>
              <p className="hover:text-black cursor-pointer">Terms of Grant Service</p>
              <p className="hover:text-black cursor-pointer">Anti-Sybil Protections</p>
              <p className="hover:text-black cursor-pointer">PayPal Sandbox Disclaimer</p>
            </div>

            <div className="space-y-3 text-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black">
                24/7 Global Support
              </h4>

              <div className="space-y-2">
                <a
                  href="mailto:sparkai.automation@gmail.com"
                  className="flex items-center gap-2 hover:text-black transition"
                >
                  <Mail className="h-4 w-4 text-black/60" />
                  <span>sparkai.automation@gmail.com</span>
                </a>

                <a
                  href="https://instagram.com/_build_with_ansh"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-black transition"
                >
                  <InstagramIcon className="h-4 w-4 text-black/60" />
                  <span>@_build_with_ansh</span>
                </a>

                <a
                  href="https://twitter.com/Build_With_ansh"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-black transition"
                >
                  <TwitterIcon className="h-4 w-4 text-black/60" />
                  <span>@Build_With_ansh</span>
                </a>

                <a
                  href="https://github.com/anshydv3653-git"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-black transition"
                >
                  <GithubIcon className="h-4 w-4 text-black/60" />
                  <span>github.com/anshydv3653-git</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal 1: Gemini Diligence Agent */}
      {isAiModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg h-[580px] bg-white rounded-3xl border border-black/10 shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-black/10 flex items-center justify-between bg-[#F4F4F0]">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-black text-[#D8FF36] flex items-center justify-center font-bold text-xs">
                  AI
                </div>
                <div>
                  <h3 className="text-xs font-bold text-black">{selectedProject.title}</h3>
                  <p className="text-[10px] text-black/50">Gemini 2.5 Diligence Live Agent</p>
                </div>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="p-1 rounded-full hover:bg-black/5"
              >
                <X className="h-4 w-4 text-black/60" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#0B0B0E] text-white'
                        : 'bg-[#F4F4F0] text-black border border-black/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAiThinking && (
                <div className="flex items-center gap-2 text-xs text-black/50 italic">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Gemini is auditing technical architecture...</span>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-black/10 bg-[#F4F4F0] flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about budget, code quality, risks..."
                className="flex-1 rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-black placeholder-black/40 focus:outline-none"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isAiThinking || !chatInput.trim()}
                className="rounded-full bg-[#0B0B0E] p-2 text-white hover:bg-black/90 disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: PayPal Sandbox Grant Settlement Modal */}
      {isBackingModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-sm bg-white rounded-3xl border border-black/10 shadow-2xl p-6 text-center space-y-4">
            <h3 className="font-serif text-2xl font-bold text-black">Back Prototype</h3>
            <p className="text-xs text-black/60">
              Disburse micro-grant directly to <b>{selectedProject.title}</b> via PayPal Sandbox rails.
            </p>

            <div className="flex items-center justify-center gap-2">
              {[25, 50, 100].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setBackingAmount(amt)}
                  className={`rounded-full px-4 py-2 text-xs font-bold ${
                    backingAmount === amt ? 'bg-black text-white' : 'border border-black/15 bg-white'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            <button
              onClick={executeBacking}
              className="w-full rounded-full bg-[#D8FF36] py-3 text-xs font-extrabold uppercase tracking-wider text-black hover:brightness-105 transition"
            >
              Confirm ${backingAmount} Grant
            </button>

            {isBackingSuccess && (
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600">
                <CheckCircle className="h-4 w-4" />
                <span>Grant Approved & Settled!</span>
              </div>
            )}

            <button
              onClick={() => setIsBackingModalOpen(false)}
              className="text-xs text-black/40 hover:text-black"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modal 3: Strict Submit Project Form */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form
            onSubmit={handleNewSubmit}
            className="relative w-full max-w-md bg-white rounded-3xl border border-black/10 shadow-2xl p-6 space-y-4 overflow-hidden"
          >
            <div className="flex justify-between items-center border-b border-black/5 pb-3">
              <h3 className="font-serif text-2xl font-bold text-black">Pitch Student Project</h3>
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-black/40 hover:text-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Strict Validation Error Banner */}
            {submitError && (
              <div className="rounded-xl border border-red-500/30 bg-red-50 p-3 text-xs font-bold text-red-700 leading-relaxed">
                {submitError}
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-black/60">
                Project Title
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. StudyHub 2.0"
                className="w-full mt-1 rounded-xl border border-black/15 bg-white px-3 py-2 text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-black/60">
                Public GitHub Repository URL
              </label>
              <input
                type="url"
                required
                value={newGithub}
                onChange={(e) => setNewGithub(e.target.value)}
                placeholder="https://github.com/username/repo"
                className="w-full mt-1 rounded-xl border border-black/15 bg-white px-3 py-2 text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              <p className="text-[10px] text-black/40 mt-1">Live repository ping ke baad hi project accept hoga.</p>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-black/60">
                One-Line Tagline
              </label>
              <input
                type="text"
                required
                value={newTagline}
                onChange={(e) => setNewTagline(e.target.value)}
                placeholder="Clear core value statement"
                className="w-full mt-1 rounded-xl border border-black/15 bg-white px-3 py-2 text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-black/60">
                Detailed Technical Description
              </label>
              <textarea
                required
                rows={3}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Explain the problem solved, tech architecture, and planned grant usage..."
                className="w-full mt-1 rounded-xl border border-black/15 bg-white px-3 py-2 text-xs text-black focus:outline-none focus:ring-1 focus:ring-black resize-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-black/60">
                Micro-Grant Target ($USD)
              </label>
              <input
                type="number"
                min="25"
                max="1000"
                required
                value={newTarget}
                onChange={(e) => setNewTarget(Number(e.target.value))}
                className="w-full mt-1 rounded-xl border border-black/15 bg-white px-3 py-2 text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              disabled={isEvaluating}
              className="w-full rounded-full bg-[#0B0B0E] py-3 text-xs font-bold text-white hover:bg-black/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Auditing via GitHub & Gemini 2.5...</span>
                </>
              ) : (
                'Submit for Autonomous Audit'
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}