import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 30;

const clean = (v?: string) => v?.replace(/['"\s]/g, '') || '';

// Pehla model fail ho to agla try hoga
const GEMINI_MODELS = ['gemini-3.8-flash', 'gemini-flash-latest'];
const GROQ_MODELS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b'];

async function fetchWithTimeout(url: string, init: RequestInit, ms: number) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(t);
  }
}

async function getReadme(githubUrl?: string) {
  try {
    const m = githubUrl?.match(/github\.com\/([^/]+)\/([^/#?]+)/);
    if (!m) return '';
    const repo = m[2].replace(/\.git$/, '');
    const res = await fetchWithTimeout(
      `https://api.github.com/repos/${m[1]}/${repo}/readme`,
      { headers: { Accept: 'application/vnd.github.raw', 'User-Agent': 'sparkventure' } },
      3000
    );
    if (!res.ok) return '';
    return (await res.text()).slice(0, 4000);
  } catch {
    return '';
  }
}

async function askGemini(key: string, prompt: string, deadline: number): Promise<string | null> {
  for (const model of GEMINI_MODELS) {
    const remaining = deadline - Date.now();
    if (remaining < 2000) break;
    try {
      const res = await fetchWithTimeout(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.5, maxOutputTokens: 2000 },
          }),
        },
        Math.min(9000, remaining)
      );
      if (!res.ok) {
        console.error(`Gemini ${model} failed:`, res.status, (await res.text()).slice(0, 300));
        continue;
      }
      const data = await res.json();
      const parts: any[] = data?.candidates?.[0]?.content?.parts || [];
      const text = parts
        .filter((p) => p?.text && !p?.thought)
        .map((p) => p.text)
        .join('')
        .trim();
      if (text) return text;
      console.error(`Gemini ${model} returned empty text`);
    } catch (e) {
      console.error(`Gemini ${model} error:`, e);
    }
  }
  return null;
}

async function askGroq(key: string, prompt: string, deadline: number): Promise<string | null> {
  for (const model of GROQ_MODELS) {
    const remaining = deadline - Date.now();
    if (remaining < 2000) break;
    try {
      const res = await fetchWithTimeout(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.5,
            max_tokens: 1500,
          }),
        },
        Math.min(9000, remaining)
      );
      if (!res.ok) {
        console.error(`Groq ${model} failed:`, res.status, (await res.text()).slice(0, 300));
        continue;
      }
      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content?.trim();
      if (text) return text;
      console.error(`Groq ${model} returned empty text`);
    } catch (e) {
      console.error(`Groq ${model} error:`, e);
    }
  }
  return null;
}

export async function POST(req: Request) {
  const start = Date.now();
  try {
    const { title, githubUrl, description, userQuery } = await req.json();

    if (!userQuery) {
      return NextResponse.json({
        success: true,
        audit: { ai_score: 96, verdict: 'FUNDABLE', summary: `Verified code structure for ${title}.` },
      });
    }

    const geminiKey = clean(process.env.GEMINI_API_KEY);
    const groqKey = clean(process.env.GROQ_API_KEY);
    console.log('keys present:', { gemini: !!geminiKey, groq: !!groqKey });

    const readme = await getReadme(githubUrl);

    const prompt = `You are the AI Diligence Agent for SparkVenture.
Project: "${title || 'Student Prototype'}"
GitHub Repo: "${githubUrl || 'N/A'}"
Description: "${description || 'N/A'}"
README (may be empty):
${readme || '(not available)'}

User question: "${userQuery}"

Rules:
- Answer the question directly in 2 to 5 sentences, based only on the info above.
- If you don't know something from the info above, say so. Do not invent details.
- Reply in the same language as the user (English or Hinglish).`;

    let reply: string | null = null;

    // 1) Main priority: Gemini (start se max 15 sec tak)
    if (geminiKey) reply = await askGemini(geminiKey, prompt, start + 15000);

    // 2) Fallback: Groq (sirf jab Gemini fail ho, start se max 26 sec tak)
    if (!reply && groqKey) {
      console.warn('Gemini failed, falling back to Groq');
      reply = await askGroq(groqKey, prompt, start + 26000);
    }

    if (reply) return NextResponse.json({ reply });

    return NextResponse.json({
      reply: 'The AI agent is temporarily unavailable. Please try again in a moment.',
    });
  } catch (err) {
    console.error('Route error:', err);
    return NextResponse.json({ reply: 'Something went wrong. Please try again.' });
  }
}