// lib/github.ts
export interface GitHubRepoSummary {
  exists: boolean;
  stars?: number;
  forks?: number;
  openIssues?: number;
  primaryLanguage?: string;
  readmeSnippet?: string;
  error?: string;
}

/**
 * Public GitHub repo se metadata aur README fetch karta hai.
 * Kisi API token ki zaroorat nahi hai (Public GitHub REST API use hoti hai).
 */
export async function fetchGitHubRepoDetails(repoUrl: string): Promise<GitHubRepoSummary> {
  try {
    if (!repoUrl || !repoUrl.includes('github.com')) {
      return { exists: false, error: 'Invalid GitHub URL format' };
    }

    // URL parse karke owner aur repo name nikalna: github.com/owner/repo
    const cleanUrl = repoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const parts = cleanUrl.split('/');
    if (parts.length < 3) {
      return { exists: false, error: 'Incomplete GitHub repository path' };
    }

    const owner = parts[1];
    const repo = parts[2];

    // 1. Repo Metadata Fetch
    const metaRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'SparkVenture-AI-Auditor',
      },
      next: { revalidate: 300 }, // 5 min cache
    });

    if (!metaRes.ok) {
      return { exists: false, error: `GitHub repo not found (${metaRes.status})` };
    }

    const meta = await metaRes.json();

    // 2. README.md Fetch
    let readmeSnippet = 'No README provided.';
    try {
      const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
        headers: {
          'Accept': 'application/vnd.github.raw+json',
          'User-Agent': 'SparkVenture-AI-Auditor',
        },
      });
      if (readmeRes.ok) {
        const rawReadme = await readmeRes.text();
        readmeSnippet = rawReadme.slice(0, 2000); // Pehle 2000 characters Gemini ke context ke liye
      }
    } catch {
      // README optional hai, failure par crash nahi hoga
    }

    return {
      exists: true,
      stars: meta.stargazers_count,
      forks: meta.forks_count,
      openIssues: meta.open_issues_count,
      primaryLanguage: meta.language || 'Not specified',
      readmeSnippet,
    };
  } catch (err: any) {
    return { exists: false, error: err.message || 'GitHub fetch failed' };
  }
}