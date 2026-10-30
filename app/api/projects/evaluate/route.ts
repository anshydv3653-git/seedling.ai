// app/api/evaluate/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { fetchGitHubRepoDetails } from '@/lib/github';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, problemStatement, fundingTarget, githubUrl, demoUrl } = body;

    // 1. Live GitHub Audit Fetch
    let gitHubDiligence = null;
    if (githubUrl) {
      gitHubDiligence = await fetchGitHubRepoDetails(githubUrl);
    }

    // 2. Comprehensive Gemini 2.5 Prompt
    const systemPrompt = `
You are the Lead Investment & Technical Diligence Partner for SparkVenture (SVC).
Your job is to rigorously evaluate student engineering projects for micro-grant funding ($25 to $500).

You must inspect:
1. Technical depth and clarity of the pitch.
2. Real-world GitHub repository authenticity (is it a real codebase or an empty/template repo?).
3. Realistic budget justification ($50-$200 for hosting/APIs vs inflated amounts).

Return your evaluation STRICTLY as valid JSON with this exact schema:
{
  "ai_score": number (0 to 100),
  "verdict": "FUNDABLE" | "HIGH_POTENTIAL" | "NEEDS_REVISION" | "FLAGGED_SUSPICIOUS",
  "summary": "2-3 concise sentences explaining the decision",
  "code_diligence_summary": "1-2 sentences analyzing their GitHub repo health",
  "strengths": ["string", "string", "string"],
  "risk_factors": ["string", "string"],
  "suggested_grant_usd": number
}
`;

    const userPrompt = `
PROJECT SUBMISSION:
- Title: ${title}
- Description: ${description}
- Problem Solved: ${problemStatement}
- Funding Target Requested: $${fundingTarget}
- Live Demo: ${demoUrl || 'Not provided'}
- GitHub Repo URL: ${githubUrl || 'Not provided'}

GITHUB REPOSITORY VERIFICATION DATA:
${
  gitHubDiligence?.exists
    ? `
- Primary Language: ${gitHubDiligence.primaryLanguage}
- Stars: ${gitHubDiligence.stars} | Forks: ${gitHubDiligence.forks} | Open Issues: ${gitHubDiligence.openIssues}
- README Content (First 2000 chars):
"""
${gitHubDiligence.readmeSnippet}
"""`
    : `- Verification Status: Repository unreachable or invalid (${gitHubDiligence?.error || 'No link provided'}).`
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + '\n\n' + userPrompt }] },
      ],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2, // Consistent, objective scoring
      },
    });

    const auditResult = JSON.parse(response.text || '{}');

    return NextResponse.json({
      success: true,
      audit: auditResult,
      gitHubVerified: gitHubDiligence?.exists || false,
    });
  } catch (error: any) {
    console.error('Audit Error:', error);
    return NextResponse.json(
      { error: 'Evaluation failed', details: error.message },
      { status: 500 }
    );
  }
}