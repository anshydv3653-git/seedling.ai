// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
import { Project, Donation, ProjectWithFunding } from '@/types/seedling';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Fetches all projects and donations from Supabase and merges them into
 * ProjectWithFunding objects sorted newest first.
 */
export async function fetchProjectsWithFunding(): Promise<ProjectWithFunding[]> {
  if (!supabaseClient) {
    throw new Error(
      'Supabase client environment variables (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing.'
    );
  }

  const [projectsRes, donationsRes] = await Promise.all([
    supabaseClient
      .from('projects')
      .select('*')
      .order('id', { ascending: false }),
    supabaseClient.from('donations').select('*'),
  ]);

  if (projectsRes.error) {
    throw new Error(projectsRes.error.message);
  }

  const rawProjects = (projectsRes.data || []) as Project[];
  const rawDonations = (donationsRes.data || []) as Donation[];

  // Group donations by project_id
  const donationsByProject = new Map<string, Donation[]>();
  for (const donation of rawDonations) {
    const pid = String(donation.project_id);
    if (!donationsByProject.has(pid)) {
      donationsByProject.set(pid, []);
    }
    donationsByProject.get(pid)!.push(donation);
  }

  // Sort projects by created_at descending if present
  const sortedProjects = [...rawProjects].sort((a, b) => {
    if (a.created_at && b.created_at) {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    return 0;
  });

  return sortedProjects.map((project) => {
    const projectDonations = donationsByProject.get(String(project.id)) || [];
    const raisedAmount = projectDonations.reduce(
      (sum, d) => sum + (Number(d.amount) || 0),
      0
    );

    return {
      ...project,
      ai_score: Number(project.ai_score) || 0,
      target_amount: Number(project.target_amount) || 0,
      ai_strengths: Array.isArray(project.ai_strengths)
        ? project.ai_strengths
        : [],
      raised_amount: raisedAmount,
      backer_count: projectDonations.length,
      donations: projectDonations,
    };
  });
}