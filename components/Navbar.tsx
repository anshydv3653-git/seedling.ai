// components/Navbar.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  projectCount: number;
  onOpenSubmitModal: () => void;
  onExploreClick: () => void;
}

export function Navbar({
  projectCount,
  onOpenSubmitModal,
  onExploreClick,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-400/15 bg-[#050B14]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#050B14]/65">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Identity */}
        <a
          href="#top"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-emerald-500/20 shadow-lg shadow-cyan-950/50 group-hover:border-cyan-300/50 transition-all">
            <Sprout className="h-5 w-5 text-emerald-300 transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">
                Seedling<span className="text-cyan-400">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                Gemini 2.5
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              AI-Evaluated Student Micro-Grants
            </p>
          </div>
        </a>

        {/* Center Navigation Pills */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1 rounded-2xl border border-white/10 bg-[#081526]/80 p-1.5 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-300 transition-colors"
          >
            <Compass className="h-3.5 w-3.5 text-cyan-400" />
            Discover Projects
            <span className="ml-1 rounded-full bg-cyan-500/15 border border-cyan-400/25 px-2 py-0.5 text-[11px] font-semibold text-cyan-300">
              {projectCount}
            </span>
          </button>

          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-emerald-300 transition-colors"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            AI Venture Protocol
          </a>
        </nav>

        {/* Action CTA */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onOpenSubmitModal}
            className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/35 transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4 stroke-[2.2]" />
            <span>Submit Project</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}