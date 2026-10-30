// components/ProjectDetailModal.tsx
'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  HeartHandshake,
  User,
  Mail,
  MessageSquareQuote,
  Calendar,
  Award,
} from 'lucide-react';
import { ProjectWithFunding } from '@/types/seedling';

interface ProjectDetailModalProps {
  project: ProjectWithFunding | null;
  onClose: () => void;
  onBackProject: (project: ProjectWithFunding) => void;
}

export function ProjectDetailModal({
  project,
  onClose,
  onBackProject,
}: ProjectDetailModalProps) {
  // Close on Escape key press
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const target = Math.max(Number(project.target_amount) || 1, 1);
  const raised = Number(project.raised_amount) || 0;
  const percentage = Math.min(Math.round((raised / target) * 100), 100);
  const score = Number(project.ai_score) || 0;
  const strengths = Array.isArray(project.ai_strengths)
    ? project.ai_strengths
    : [];
  const donations = Array.isArray(project.donations) ? project.donations : [];

  const formattedDate = project.created_at
    ? new Date(project.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#03070E]/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-3xl rounded-3xl border border-cyan-400/25 bg-[#071426]/95 backdrop-blur-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Sticky Top Header */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5 bg-[#050E1C]/80">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-0.5 text-xs font-bold text-emerald-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Gemini Score: {score}/100
                </span>

                {formattedDate && (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                    <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                    {formattedDate}
                  </span>
                )}
              </div>

              <h2
                id="project-detail-title"
                className="text-xl sm:text-2xl font-extrabold text-white tracking-tight"
              >
                {project.title}
              </h2>
              <p className="mt-1 text-sm text-cyan-200/90">{project.tagline}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Builder Info & External Links Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#050E1C]/70 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Student Builder</p>
                  <p className="text-sm font-semibold text-white">
                    {project.builder_name}
                  </p>
                  {project.builder_email && (
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Mail className="h-3 w-3 text-cyan-400" />
                      {project.builder_email}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-cyan-400/35 hover:text-white transition-colors"
                  >
                    <GitBranch className="h-3.5 w-3.5 text-cyan-300" />
                    Source Code
                  </a>
                )}

                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-2 text-xs font-semibold text-cyan-200 hover:bg-cyan-500/20 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live Prototype
                  </a>
                )}
              </div>
            </div>

            {/* Gemini 2.5 Flash Venture Evaluation Card */}
            <div className="rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-cyan-950/40 via-[#061325] to-emerald-950/30 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-300" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                    Gemini 2.5 Flash Venture Audit
                  </h3>
                </div>
                <span className="text-lg font-extrabold text-white">
                  {score}
                  <span className="text-xs font-normal text-slate-400">
                    /100
                  </span>
                </span>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed">
                {project.ai_summary ||
                  'Evaluated by Seedling AI for student micro-grant viability.'}
              </p>

              {strengths.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                    Key Identified Strengths
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {strengths.map((strength, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Full Project Description */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                Project Overview & Architecture
              </h3>
              <div className="rounded-2xl border border-white/10 bg-[#050E1C]/60 p-5 text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {project.description}
              </div>
            </div>

            {/* Recent Backers / Micro-Grants List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Community Micro-Grants ({donations.length})
                </h3>
                <span className="text-xs text-cyan-300 font-semibold">
                  ${raised.toLocaleString()} of ${target.toLocaleString()} ({percentage}%)
                </span>
              </div>

              {donations.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-[#050E1C]/50 p-6 text-center">
                  <p className="text-xs sm:text-sm text-slate-400">
                    No micro-grants recorded yet. Be the first supporter to back{' '}
                    <span className="text-white font-semibold">
                      {project.title}
                    </span>
                    !
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {donations.map((donation) => (
                    <div
                      key={donation.id}
                      className="rounded-xl border border-white/10 bg-[#050E1C]/80 p-3.5 flex items-start justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white">
                          {donation.backer_name || 'Anonymous Founder'}
                        </p>
                        {donation.message && (
                          <p className="mt-1 text-xs text-slate-300 flex items-start gap-1.5">
                            <MessageSquareQuote className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{donation.message}</span>
                          </p>
                        )}
                      </div>
                      <span className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-300 shrink-0">
                        +${Number(donation.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sticky Bottom Footer with Funding Bar & CTA */}
          <div className="border-t border-white/10 bg-[#050E1C]/90 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-1/2">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-white">
                  ${raised.toLocaleString()} raised
                </span>
                <span className="text-slate-400">
                  Target: ${target.toLocaleString()}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  style={{ width: `${percentage}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBackProject(project);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer"
            >
              <HeartHandshake className="h-4 w-4 stroke-[2.2]" />
              Back This Project with PayPal
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}