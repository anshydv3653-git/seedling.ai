import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

// Spam & Gibberish Filter (e.g. dasssassssssssss, aaaaaa, random keys)
function isGibberishText(text: string): boolean {
  if (!text || text.trim().length < 3) return true;
  // 4 ya usse zyada consecutive repeated characters
  if (/(.)\1{3,}/i.test(text)) return true;
  // Bina vowels ke lambe words (minimum 7 letters)
  const words = text.trim().split(/\s+/);
  for (const word of words) {
    if (word.length >= 7 && !/[aeiouy]/i.test(word)) return true;
  }
  return false;
}

// Live GitHub Repository Verification via Public API
async function verifyPublicGitHubRepo(url: string) {
  try {
    const match = url.match(/github\.com\/([^\/\s]+)\/([^\/\s#?]+)/);
    if (!match) {
      return { valid: false, message: 'Invalid GitHub URL structure. Format: https://github.com/owner/repo' };
    }

    const owner = match[1];
    const repo = match[2].replace(/\.git$/, '');

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'User-Agent': 'SparkVenture-Diligence-Engine',
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store',
    });

    if (res.status === 404) {
      return { valid: false, message: 'GitHub repository not found (404). Public repository link provide karein.' };
    }

    if (!res.ok) {
      return { valid: false, message: `GitHub API response error (${res.status}).` };
    }

    const data = await res.json();
    return {
      valid: true,
      stars: data.stargazers_count,
      language: data.language || 'Software',
      forks: data.forks_count,
      description: data.description || '',
    };
  } catch {
    return { valid: false, message: 'Unable to connect to GitHub. Verify internet access.' };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = (body.title || '').trim();
    const tagline = (body.tagline || '').trim();
    const description = (body.description || '').trim();
    const githubUrl = (body.githubUrl || body.github_url || '').trim();
    const fundingTarget = Number(body.fundingTarget || body.target_amount || 0);

    // 1. Mandatory Fields & Length Validation
    if (!title || title.length < 3) {
      return NextResponse.json({ error: 'Project Title me kam se kam 3 characters hone chahiye.' }, { status: 400 });
    }
    if (!tagline || tagline.length < 8) {
      return NextResponse.json({ error: 'Tagline kam se kam 8 characters ki honi chahiye.' }, { status: 400 });
    }
    if (!description || description.length < 20) {
      return NextResponse.json({ error: 'Detailed description kam se kam 20 characters ki honi chahiye.' }, { status: 400 });
    }
    if (!fundingTarget || fundingTarget < 25 || fundingTarget > 1000) {
      return NextResponse.json({ error: 'Target micro-grant $25 se $1,000 ke beech hona chahiye.' }, { status: 400 });
    }

    // 2. Anti-Gibberish Check
    if (isGibberishText(title) || isGibberishText(tagline) || isGibberishText(description)) {
      return NextResponse.json({
        error: 'Spam detected! Repeated characters ya fake words (jaise dasssassssssssss) allowed nahi hain.',
      }, { status: 400 });
    }

    // 3. Live GitHub Public API Ping
    const repoCheck = await verifyPublicGitHubRepo(githubUrl);
    if (!repoCheck.valid) {
      return NextResponse.json({ error: repoCheck.message }, { status: 400 });
    }

    // 4. Strict Gemini 2.5 Diligence Audit
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY server par configured nahi hai.' }, { status: 500 });
    }

    const auditPrompt = `
You are the Strict Anti-Fraud & Code Diligence Auditor for SparkVenture (SVC).
Critically audit this student project submission for micro-grant viability.

SUBMISSION:
- Title: ${title}
- Tagline: ${tagline}
- Description: ${description}
- Grant Requested: $${fundingTarget}
- GitHub Verified Info: Language: ${repoCheck.language}, Stars: ${repoCheck.stars}

RULES:
1. If the project claims are vague, senseless, low-effort nonsense, or fraudulent, set "verdict": "REJECTED" and assign "ai_score" strictly between 0 and 45.
2. If legitimate, sound engineering is demonstrated, assign "verdict": "FUNDABLE" and "ai_score" between 75 and 98.
3. Be candid, objective, and strict.

Return ONLY strict valid JSON:
{
  "ai_score": 88,
  "verdict": "FUNDABLE",
  "summary": "Concise 2-sentence technical evaluation",
  "rejection_reason": null
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: auditPrompt }] }],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.1,
      },
    });

    const audit = JSON.parse(response.text || '{}');

    if (audit.verdict === 'REJECTED' || (audit.ai_score && audit.ai_score < 60)) {
      return NextResponse.json({
        error: `Submission Rejected by Gemini Diligence: ${audit.rejection_reason || audit.summary || 'Low technical depth or spam content.'}`,
        score: audit.ai_score || 0,
      }, { status: 422 });
    }

    return NextResponse.json({
      success: true,
      audit,
      repoDetails: repoCheck,
    });
  } catch (err: any) {
    console.error('Strict Evaluation Route Error:', err);
    return NextResponse.json({ error: err.message || 'Internal audit processing error' }, { status: 500 });
  }
}