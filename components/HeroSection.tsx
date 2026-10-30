// components/HeroSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowDownRight,
  Cpu,
  ShieldCheck,
  Coins,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { ProjectWithFunding } from '@/types/seedling';

interface HeroSectionProps {
  projects: ProjectWithFunding[];
  isLoading: boolean;
  onOpenSubmitModal: () => void;
  onExploreClick: () => void;
}

export function HeroSection({
  projects,
  isLoading,
  onOpenSubmitModal,
  onExploreClick,
}: HeroSectionProps) {
  // Real metrics derived strictly from loaded backend records
  const totalProjects = projects.length;
  const totalRaised = projects.reduce(
    (sum, p) => sum + (Number(p.raised_amount) || 0),
    0
  );
  const averageAiScore =
    totalProjects > 0
      ? Math.round(
          projects.reduce((sum, p) => sum + (Number(p.ai_score) || 0), 0) /
            totalProjects
        )
      : 0;

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-cyan-500/10"
    >
      {/* Arctic Glass Ambient Background Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[780px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-sky-400/10 to-emerald-400/15 blur-3xl" />
        <div className="absolute top-60 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-32 -right-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Top Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-[#08172B]/80 px-4 py-1.5 text-xs font-medium text-cyan-200 backdrop-blur-xl shadow-lg shadow-cyan-950/40 mb-6"
          >
            <Cpu className="h-3.5 w-3.5 text-emerald-300" />
            <span>Evaluated by Google Gemini 2.5 Flash</span>
            <span className="h-1 w-1 rounded-full bg-cyan-400" />
            <span className="text-emerald-300 font-semibold">
              Instant Micro-Grants
            </span>
          </motion.div>

          {/* SparkVenture Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
          >
            Big Ideas Deserve{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent">
              A Little Spark
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            SparkVenture pairs student builders with transparent Gemini 2.5
            venture audits and direct community micro-grants. Submit your prototype,
            get an instant viability score, and fund the next breakthrough.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={onOpenSubmitModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4 stroke-[2.2]" />
              Submit Student Project
            </button>

            <button
              type="button"
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-400/25 bg-[#081526]/80 px-7 py-3.5 text-sm font-semibold text-slate-100 backdrop-blur-xl hover:border-cyan-300/45 hover:bg-[#0C1E36] transition-all cursor-pointer"
            >
              <span>Explore Live Projects</span>
              <ArrowDownRight className="h-4 w-4 text-cyan-300" />
            </button>
          </motion.div>
        </div>

        {/* Live Telemetry Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border border-cyan-400/15 bg-[#071426]/75 backdrop-blur-xl p-5 flex items-center gap-4 shadow-lg">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-500/10 text-cyan-300">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Evaluated Projects
              </p>
              <p className="text-2xl font-bold text-white mt-0.5">
                {isLoading ? '—' : totalProjects}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-400/15 bg-[#071426]/75 backdrop-blur-xl p-5 flex items-center gap-4 shadow-lg">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-500/10 text-emerald-300">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Avg Gemini Score
              </p>
              <p className="text-2xl font-bold text-white mt-0.5">
                {isLoading
                  ? '—'
                  : totalProjects > 0
                  ? `${averageAiScore}/100`
                  : 'N/A'}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-sky-400/15 bg-[#071426]/75 backdrop-blur-xl p-5 flex items-center gap-4 shadow-lg">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-sky-400/25 bg-sky-500/10 text-sky-300">
              <Coins className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Micro-Grants Backed
              </p>
              <p className="text-2xl font-bold text-white mt-0.5">
                {isLoading ? '—' : `$${totalRaised.toLocaleString()}`}
              </p>
            </div>
          </div>
        </motion.div>

        {/* How It Works Strip */}
        <div
          id="how-it-works"
          className="mt-12 rounded-3xl border border-white/10 bg-[#061120]/70 backdrop-blur-xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-xs font-bold text-cyan-300">
                01
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Pitch Your Prototype
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Share your problem statement, GitHub repo, live demo, and a
                  modest micro-grant target.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-xs font-bold text-emerald-300">
                02
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Gemini 2.5 Venture Audit
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Our AI analyst evaluates technical feasibility, clarity, and
                  impact—generating an objective score and key strengths.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 border border-sky-400/30 text-xs font-bold text-sky-300">
                03
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                  Direct PayPal Micro-Grants
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Backers fund verified student projects directly via PayPal
                  checkout with instant order capture recorded in Supabase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}