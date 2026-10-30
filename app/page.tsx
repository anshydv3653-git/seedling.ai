// app/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, RefreshCw, Sprout } from 'lucide-react';
import {
  ProjectWithFunding,
  Project,
  Donation,
  ToastMessage,
} from '@/types/seedling';
import { fetchProjectsWithFunding } from '@/lib/supabaseClient';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectDetailModal } from '@/components/ProjectDetailModal';
import { SubmitProjectModal } from '@/components/SubmitProjectModal';
import { BackingModal } from '@/components/BackingModal';
import {
  ToastContainer,
  ProjectGridSkeleton,
  EmptyProjectsState,
  ErrorBanner,
} from '@/components/StatusFeedback';

export default function SeedlingHomePage() {
  const [projects, setProjects] = useState<ProjectWithFunding[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scoreFilter, setScoreFilter] = useState<string>('all'); // 'all' | '85' | '70'

  // Modal States
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithFunding | null>(null);
  const [backingProject, setBackingProject] =
    useState<ProjectWithFunding | null>(null);

  // Toast Notifications State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (
      title: string,
      description?: string,
      type: 'success' | 'error' | 'info' = 'success'
    ) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Load Projects from Supabase Client
  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await fetchProjectsWithFunding();
      setProjects(data);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Failed to connect to Supabase database.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Handle new project submission success
  const handleProjectCreated = (newProject: Project) => {
    const newEntry: ProjectWithFunding = {
      ...newProject,
      raised_amount: 0,
      backer_count: 0,
      donations: [],
    };
    setProjects((prev) => [newEntry, ...prev]);
    setIsSubmitModalOpen(false);
    addToast(
      'Prototype Evaluated & Published!',
      `"${newProject.title}" received a Gemini score of ${newProject.ai_score}/100.`
    );
  };

  // Handle successful micro-grant backing
  const handleDonationSuccess = (projectId: string, donation: Donation) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (String(p.id) === String(projectId)) {
          const updatedDonations = [donation, ...p.donations];
          const newRaised = updatedDonations.reduce(
            (sum, d) => sum + (Number(d.amount) || 0),
            0
          );
          return {
            ...p,
            donations: updatedDonations,
            raised_amount: newRaised,
            backer_count: updatedDonations.length,
          };
        }
        return p;
      })
    );

    // Update selected project view if modal is open
    setSelectedProject((prev) => {
      if (prev && String(prev.id) === String(projectId)) {
        const updatedDonations = [donation, ...prev.donations];
        const newRaised = updatedDonations.reduce(
          (sum, d) => sum + (Number(d.amount) || 0),
          0
        );
        return {
          ...prev,
          donations: updatedDonations,
          raised_amount: newRaised,
          backer_count: updatedDonations.length,
        };
      }
      return prev;
    });

    setBackingProject(null);
    addToast(
      'Micro-Grant Successfully Backed!',
      `Thank you for contributing $${donation.amount} to this student project.`
    );
  };

  // Filter Logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.builder_name.toLowerCase().includes(searchQuery.toLowerCase());

    const score = Number(project.ai_score) || 0;
    let matchesScore = true;
    if (scoreFilter === '85') {
      matchesScore = score >= 85;
    } else if (scoreFilter === '70') {
      matchesScore = score >= 70 && score < 85;
    }

    return matchesSearch && matchesScore;
  });

  const hasActiveFilters =
    searchQuery.trim().length > 0 || scoreFilter !== 'all';

  return (
    <div className="min-h-screen flex flex-col bg-[#050B14] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Navigation */}
      <Navbar
        projectCount={projects.length}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onExploreClick={() => {
          const gridEl = document.getElementById('project-grid-section');
          gridEl?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          projects={projects}
          isLoading={isLoading}
          onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
          onExploreClick={() => {
            const gridEl = document.getElementById('project-grid-section');
            gridEl?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Project Discovery Section */}
        <section
          id="project-grid-section"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20"
        >
          {/* Section Header & Filters Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 mb-2">
                <Sprout className="h-3.5 w-3.5" />
                Live Student Prototypes
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Explore &amp; Back Innovations
              </h2>
            </div>

            {/* Search and Score Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[240px] sm:w-72">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects or builders..."
                  className="w-full rounded-xl border border-cyan-400/20 bg-[#071426] pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none shadow-inner"
                />
              </div>

              {/* AI Score Filter */}
              <div className="relative">
                <div className="flex items-center gap-1.5 rounded-xl border border-cyan-400/20 bg-[#071426] px-3 py-2 text-xs sm:text-sm text-slate-200">
                  <Filter className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <select
                    value={scoreFilter}
                    onChange={(e) => setScoreFilter(e.target.value)}
                    className="bg-transparent text-white focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-[#071426] text-white">
                      All AI Scores
                    </option>
                    <option value="85" className="bg-[#071426] text-white">
                      Top Tier (85+)
                    </option>
                    <option value="70" className="bg-[#071426] text-white">
                      Promising (70-84)
                    </option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={loadProjects}
                disabled={isLoading}
                title="Refresh Projects"
                className="p-2.5 rounded-xl border border-cyan-400/20 bg-[#071426] text-cyan-300 hover:bg-cyan-500/10 transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <ErrorBanner message={errorMessage} onRetry={loadProjects} />
          )}

          {/* Grid Content States */}
          {isLoading ? (
            <ProjectGridSkeleton count={6} />
          ) : filteredProjects.length === 0 ? (
            <EmptyProjectsState
              hasActiveFilters={hasActiveFilters}
              onResetFilters={() => {
                setSearchQuery('');
                setScoreFilter('all');
              }}
              onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            />
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelectProject={(proj) => setSelectedProject(proj)}
                  onBackProject={(proj) => setBackingProject(proj)}
                />
              ))}
            </motion.div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-500/10 bg-[#040913] py-8 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-emerald-300">
              <Sprout className="h-3.5 w-3.5" />
            </span>
            <span className="font-semibold text-white">Seedling AI</span>
            <span>&copy; {new Date().getFullYear()} — Student Micro-Grants</span>
          </div>
          <p className="text-slate-500">
            Powered by Google Gemini 2.5 Flash &amp; Supabase Database
          </p>
        </div>
      </footer>

      {/* Modals */}
      <SubmitProjectModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onBackProject={(proj) => setBackingProject(proj)}
      />

      <BackingModal
        project={backingProject}
        onClose={() => setBackingProject(null)}
        onDonationSuccess={handleDonationSuccess}
      />
    </div>
  );
}