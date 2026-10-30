// components/StatusFeedback.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  Sparkles,
  RefreshCw,
  FolderPlus,
} from 'lucide-react';
import { ToastMessage } from '@/types/seedling';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className={`pointer-events-auto relative overflow-hidden rounded-2xl border backdrop-blur-xl p-4 shadow-2xl transition-colors ${
                isSuccess
                  ? 'bg-[#071526]/90 border-emerald-400/35 text-emerald-50 shadow-emerald-950/50'
                  : isError
                  ? 'bg-[#1A0B12]/90 border-rose-400/35 text-rose-50 shadow-rose-950/50'
                  : 'bg-[#071324]/90 border-sky-400/35 text-sky-50 shadow-sky-950/50'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${
                    isSuccess
                      ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'
                      : isError
                      ? 'bg-rose-500/15 border-rose-400/30 text-rose-300'
                      : 'bg-sky-500/15 border-sky-400/30 text-sky-300'
                  }`}
                >
                  {isSuccess && <CheckCircle2 className="h-4 w-4" />}
                  {isError && <AlertTriangle className="h-4 w-4" />}
                  {!isSuccess && !isError && <Info className="h-4 w-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold tracking-tight text-white">
                    {toast.title}
                  </p>
                  {toast.description && (
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      {toast.description}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onDismiss(toast.id)}
                  aria-label="Close notification"
                  className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading student projects"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-cyan-500/15 bg-[#081526]/70 backdrop-blur-xl p-6 shadow-xl animate-pulse flex flex-col justify-between h-[360px]"
        >
          <div>
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="h-6 w-28 rounded-full bg-cyan-400/10 border border-cyan-400/20" />
              <div className="h-7 w-20 rounded-full bg-emerald-400/10 border border-emerald-400/20" />
            </div>

            <div className="h-6 w-3/4 rounded-lg bg-slate-700/50 mb-3" />
            <div className="h-4 w-full rounded-md bg-slate-800/70 mb-2" />
            <div className="h-4 w-5/6 rounded-md bg-slate-800/70 mb-6" />

            <div className="flex flex-wrap gap-2 mb-6">
              <div className="h-6 w-24 rounded-lg bg-slate-800/80" />
              <div className="h-6 w-28 rounded-lg bg-slate-800/80" />
              <div className="h-6 w-20 rounded-lg bg-slate-800/80" />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <div>
              <div className="flex justify-between mb-2">
                <div className="h-4 w-24 rounded bg-slate-700/50" />
                <div className="h-4 w-16 rounded bg-slate-700/50" />
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full w-1/3 rounded-full bg-cyan-500/30" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="h-9 w-28 rounded-xl bg-slate-800/80" />
              <div className="h-9 w-32 rounded-xl bg-cyan-500/20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface EmptyProjectsStateProps {
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  onOpenSubmitModal: () => void;
}

export function EmptyProjectsState({
  hasActiveFilters,
  onResetFilters,
  onOpenSubmitModal,
}: EmptyProjectsStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#071426]/75 backdrop-blur-xl p-10 sm:p-14 text-center max-w-2xl mx-auto my-8 shadow-2xl"
    >
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 text-cyan-300 shadow-inner">
        {hasActiveFilters ? (
          <Sparkles className="h-7 w-7" />
        ) : (
          <FolderPlus className="h-7 w-7" />
        )}
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
        {hasActiveFilters
          ? 'No Matching Student Projects Found'
          : 'Be the First Pioneer on Seedling AI'}
      </h3>

      <p className="mt-2.5 text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
        {hasActiveFilters
          ? 'No projects matched your current search or AI score filter. Try clearing your filters to explore all active micro-grant initiatives.'
          : 'No projects have been submitted yet. Submit your student prototype for an instant Gemini 2.5 Flash venture evaluation and unlock micro-grant backing.'}
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/15 px-5 py-2.5 text-sm font-semibold text-cyan-200 hover:bg-cyan-500/25 transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            Reset Filters
          </button>
        ) : (
          <button
            type="button"
            onClick={onOpenSubmitModal}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            Submit Your First Project
          </button>
        )}
      </div>
    </motion.div>
  );
}

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-rose-500/35 bg-rose-950/30 backdrop-blur-xl p-5 text-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-6"
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-300 shrink-0">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">
            Unable to Load Live Project Data
          </h4>
          <p className="text-xs sm:text-sm text-rose-200/90 mt-0.5">{message}</p>
        </div>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500/20 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500/30 transition-colors shrink-0"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry Connection
        </button>
      )}
    </div>
  );
}