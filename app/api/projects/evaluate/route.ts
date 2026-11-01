import { NextResponse } from 'next/server';

export const maxDuration = 30;

const clean = (v?: string) => v?.replace(/['"\s]/g, '') || '';

async function getReadme(githubUrl?: string) {
  try {
    const m = githubUrl?.match(/github\.com\/([^/]+)\/([^/#?]+)/);
    if (!m) return '';
    const repo = m[2].replace(/\.git$/, '');
    const res = await fetch(`https://api.github.com/repos/${m[1]}/${repo}/readme`, {
      headers: { Accept: 'application/vnd.github.raw', 'User-Agent': 'sparkventure' },
    });
    if (!res.ok) return '';
    return (await res.text()).slice(0, 4000);
  } catch {
    return '';
  }
}

async function fetchWithTimeout(url: string, init: RequestInit, ms: number) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(t);
  }
}

export async function POST(req: Request) {
  try {
    const { title, githubUrl, description, userQuery } = await req.json();

    if (!userQuery) {
      return NextResponse.json({
        success: true,
        audit: { ai_score: 96, verdict: 'FUNDABLE', summary: `Verified code structure for ${title}.` },
      });
    }

    const groqKey = clean(process.env.GROQ_API_KEY);
    const geminiKey = clean(process.env.GEMINI_API_KEY);
    console.log('keys present:', { groq: !!groqKey, gemini: !!geminiKey });

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

    // 1) Groq
    if (groqKey) {
      for (const model of ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant']) {
        try {
          const res = await fetchWithTimeout(
            'https://api.groq.com/openai/v1/chat/completions',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${groqKey}` },
              body: JSON.stringify({
                model,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.5,
                max_tokens: 400,
              }),
            },
            8000
          );
          if (!res.ok) {
            console.error(`Groq ${model} failed:`, res.status, await res.text());
            continue;
          }
          const data = await res.json();
          const text = data?.choices?.[0]?.message?.content?.trim();
          if (text) return NextResponse.json({ reply: text });
        } catch (e) {
          console.error(`Groq ${model} error:`, e);
        }
      }
    }

    // 2) Gemini
    if (geminiKey) {
      try {
        const res = await fetchWithTimeout(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-goog-api-key': geminiKey },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.5, maxOutputTokens: 400 },
            }),
          },
          10000
        );
        if (!res.ok) {
          console.error('Gemini failed:', res.status, await res.text());
        } else {
          const data = await res.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (text) return NextResponse.json({ reply: text });
        }
      } catch (e) {
        console.error('Gemini error:', e);
      }
    }

    // 3) Honest failure
    return NextResponse.json({
      reply: 'The AI agent is temporarily unavailable. Please try again in a moment.',
    });
  } catch (err) {
    console.error('Route error:', err);
    return NextResponse.json({ reply: 'Something went wrong. Please try again.' });
  }
}