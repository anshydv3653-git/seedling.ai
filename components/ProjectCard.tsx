// components/ProjectCard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ExternalLink,
  GitBranch,
  HeartHandshake,
  Eye,
  User,
  CheckCircle2,
} from 'lucide-react';
import { ProjectWithFunding } from '@/types/seedling';

interface ProjectCardProps {
  project: ProjectWithFunding;
  onSelectProject: (project: ProjectWithFunding) => void;
  onBackProject: (project: ProjectWithFunding) => void;
}

export function ProjectCard({
  project,
  onSelectProject,
  onBackProject,
}: ProjectCardProps) {
  const target = Math.max(Number(project.target_amount) || 1, 1);
  const raised = Number(project.raised_amount) || 0;
  const percentage = Math.min(Math.round((raised / target) * 100), 100);
  const score = Number(project.ai_score) || 0;

  // Dynamic badge styling based on Gemini AI score
  const scoreBadgeStyle =
    score >= 85
      ? 'border-emerald-400/35 bg-emerald-500/15 text-emerald-300'
      : score >= 70
      ? 'border-cyan-400/35 bg-cyan-500/15 text-cyan-300'
      : 'border-sky-400/35 bg-sky-500/15 text-sky-300';

  const strengths = Array.isArray(project.ai_strengths)
    ? project.ai_strengths.slice(0, 3)
    : [];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col justify-between rounded-2xl border border-cyan-400/15 bg-[#071426]/80 backdrop-blur-xl p-6 shadow-xl hover:border-cyan-400/35 hover:shadow-cyan-950/50 transition-all"
    >
      {/* Top Subtle Highlight Line */}
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Header Row: Builder & Gemini AI Score */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 truncate">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300">
              <User className="h-3 w-3" />
            </span>
            <span className="truncate">{project.builder_name}</span>
          </div>

          <div
            title="Gemini 2.5 Flash Viability Score"
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold tracking-tight shrink-0 ${scoreBadgeStyle}`}
          >
            <Sparkles className="h-3 w-3" />
            <span>AI {score}/100</span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3
          onClick={() => onSelectProject(project)}
          className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-1"
        >
          {project.title}
        </h3>

        <p className="mt-1.5 text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {project.tagline}
        </p>

        {/* Gemini AI Summary Box */}
        {project.ai_summary && (
          <div className="mt-4 rounded-xl border border-white/5 bg-[#050E1C]/90 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Gemini Verdict
            </p>
            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {project.ai_summary}
            </p>
          </div>
        )}

        {/* AI Strength Pills */}
        {strengths.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {strengths.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-lg border border-cyan-400/15 bg-cyan-500/5 px-2.5 py-1 text-[11px] font-medium text-cyan-200"
              >
                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                <span className="truncate max-w-[180px]">{item}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section: Funding Progress & Actions */}
      <div className="mt-6 pt-4 border-t border-white/10">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-baseline justify-between text-xs mb-1.5">
            <div>
              <span className="text-sm font-bold text-white">
                ${raised.toLocaleString()}
              </span>
              <span className="text-slate-400">
                {' '}
                of ${target.toLocaleString()} goal
              </span>
            </div>
            <span className="font-semibold text-emerald-300">
              {percentage}%
            </span>
          </div>

          <div className="h-2 w-full rounded-full bg-slate-800/90 overflow-hidden p-0.5">
            <div
              style={{ width: `${percentage}%` }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
            />
          </div>
        </div>

        {/* Action Buttons & External Links */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelectProject(project)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-cyan-400/30 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5 text-cyan-300" />
              Details
            </button>

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                title="View Source Repository"
                className="p-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400/30 transition-colors"
              >
                <GitBranch className="h-3.5 w-3.5" />
              </a>
            )}

            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live Demo"
                title="Open Live Demo"
                className="p-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/30 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => onBackProject(project)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-md shadow-cyan-500/15 hover:brightness-110 transition-all cursor-pointer"
          >
            <HeartHandshake className="h-3.5 w-3.5 stroke-[2.2]" />
            <span>Back Project</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}