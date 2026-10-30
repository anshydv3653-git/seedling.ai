// components/SubmitProjectModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Rocket,
  GitBranch,
  Globe,
  DollarSign,
  User,
  Mail,
  FileText,
} from 'lucide-react';
import {
  Project,
  EvaluateProjectRequest,
  EvaluateProjectResponse,
} from '@/types/seedling';

interface SubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
}

const INITIAL_FORM: EvaluateProjectRequest = {
  title: '',
  tagline: '',
  description: '',
  builder_name: '',
  builder_email: '',
  demo_url: '',
  github_url: '',
  target_amount: 150,
};

export function SubmitProjectModal({
  isOpen,
  onClose,
  onProjectCreated,
}: SubmitProjectModalProps) {
  const [formData, setFormData] =
    useState<EvaluateProjectRequest>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [evaluatedProject, setEvaluatedProject] = useState<Project | null>(
    null
  );

  // Reset modal state when opened/closed
  useEffect(() => {
    if (!isOpen) {
      setErrorMsg(null);
      setIsSubmitting(false);
      setEvaluatedProject(null);
    }
  }, [isOpen]);

  // Close on Escape key when not actively submitting
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'target_amount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (
      !formData.title.trim() ||
      !formData.tagline.trim() ||
      !formData.description.trim() ||
      !formData.builder_name.trim() ||
      !formData.builder_email.trim()
    ) {
      setErrorMsg('Please fill out all required fields before submitting.');
      return;
    }

    if (!formData.target_amount || formData.target_amount <= 0) {
      setErrorMsg('Please enter a valid micro-grant target amount ($10+).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/projects/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title.trim(),
          tagline: formData.tagline.trim(),
          description: formData.description.trim(),
          builder_name: formData.builder_name.trim(),
          builder_email: formData.builder_email.trim(),
          demo_url: formData.demo_url?.trim() || '',
          github_url: formData.github_url?.trim() || '',
          target_amount: Number(formData.target_amount),
        }),
      });

      const data: EvaluateProjectResponse = await response.json();

      if (!response.ok || data.error || !data.project) {
        throw new Error(
          data.error || 'Gemini evaluation failed. Please try again.'
        );
      }

      setEvaluatedProject(data.project);
      onProjectCreated(data.project);
      setFormData(INITIAL_FORM);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unexpected error occurred during evaluation.';
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-project-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isSubmitting && onClose()}
          className="fixed inset-0 bg-[#03070E]/85 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-2xl rounded-3xl border border-cyan-400/25 bg-[#071426]/95 backdrop-blur-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5 bg-[#050E1C]/80">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 text-cyan-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2
                  id="submit-project-title"
                  className="text-lg sm:text-xl font-bold text-white tracking-tight"
                >
                  {evaluatedProject
                    ? 'Gemini 2.5 Venture Evaluation Complete'
                    : 'Submit Student Prototype'}
                </h2>
                <p className="text-xs text-slate-400">
                  {evaluatedProject
                    ? 'Your project is now live in the Seedling AI discovery grid.'
                    : 'Get an instant AI viability audit and unlock community micro-grants.'}
                </p>
              </div>
            </div>

            {!isSubmitting && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto">
            {evaluatedProject ? (
              /* Post-Evaluation Success View */
              <div className="space-y-6">
                <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-950/40 via-[#061528] to-cyan-950/40 p-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/20 text-emerald-300">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                    Gemini 2.5 Flash Viability Score
                  </p>
                  <p className="mt-1 text-4xl font-extrabold text-white">
                    {evaluatedProject.ai_score}
                    <span className="text-lg font-normal text-slate-400">
                      /100
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-slate-200 max-w-lg mx-auto leading-relaxed">
                    {evaluatedProject.ai_summary}
                  </p>
                </div>

                {Array.isArray(evaluatedProject.ai_strengths) &&
                  evaluatedProject.ai_strengths.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                        Key Strengths Identified by Gemini
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {evaluatedProject.ai_strengths.map((str, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/25 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-200"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                            {str}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-lg hover:brightness-110 transition-all cursor-pointer"
                  >
                    <Rocket className="h-4 w-4" />
                    View Live Project Card
                  </button>
                </div>
              </div>
            ) : (
              /* Submission Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-3.5 text-xs text-rose-200 flex items-center gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      disabled={isSubmitting}
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., MediScan Edge AI"
                      className="w-full rounded-xl border border-white/10 bg-[#040B16] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Target Micro-Grant (USD) *
                    </label>
                    <div className="relative">
                      <DollarSign className="h-4 w-4 text-cyan-400 absolute left-3 top-3" />
                      <input
                        type="number"
                        name="target_amount"
                        required
                        min={10}
                        max={5000}
                        disabled={isSubmitting}
                        value={formData.target_amount}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-[#040B16] pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    One-Line Tagline *
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    required
                    disabled={isSubmitting}
                    value={formData.tagline}
                    onChange={handleChange}
                    placeholder="Offline malaria screening on low-cost smartphones"
                    className="w-full rounded-xl border border-white/10 bg-[#040B16] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-cyan-400" />
                    Problem, Technical Architecture & Grant Usage *
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    required
                    disabled={isSubmitting}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Explain what problem your project solves, how you built it, and what this micro-grant will fund (e.g., cloud GPU credits, hardware sensors, domain)..."
                    className="w-full rounded-xl border border-white/10 bg-[#040B16] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-cyan-400" />
                      Builder Name *
                    </label>
                    <input
                      type="text"
                      name="builder_name"
                      required
                      disabled={isSubmitting}
                      value={formData.builder_name}
                      onChange={handleChange}
                      placeholder="Ansh Sharma"
                      className="w-full rounded-xl border border-white/10 bg-[#040B16] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-cyan-400" />
                      Student Email *
                    </label>
                    <input
                      type="email"
                      name="builder_email"
                      required
                      disabled={isSubmitting}
                      value={formData.builder_email}
                      onChange={handleChange}
                      placeholder="builder@university.edu"
                      className="w-full rounded-xl border border-white/10 bg-[#040B16] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <GitBranch className="h-3.5 w-3.5 text-cyan-400" />
                      GitHub Repository URL (Optional)
                    </label>
                    <input
                      type="url"
                      name="github_url"
                      disabled={isSubmitting}
                      value={formData.github_url}
                      onChange={handleChange}
                      placeholder="https://github.com/username/repo"
                      className="w-full rounded-xl border border-white/10 bg-[#040B16] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-cyan-400" />
                      Live Demo URL (Optional)
                    </label>
                    <input
                      type="url"
                      name="demo_url"
                      disabled={isSubmitting}
                      value={formData.demo_url}
                      onChange={handleChange}
                      placeholder="https://my-demo.vercel.app"
                      className="w-full rounded-xl border border-white/10 bg-[#040B16] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-[11px] text-slate-400">
                    Evaluated in real time by{' '}
                    <span className="text-cyan-300 font-semibold">
                      gemini-2.5-flash
                    </span>
                  </p>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={onClose}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Gemini Analyzing Viability...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 stroke-[2.2]" />
                          <span>Evaluate & Publish</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}