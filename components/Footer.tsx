// components/Footer.tsx
'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Terminal, Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-cyan-400/15 bg-[#030812] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 font-black text-xs shadow-md shadow-cyan-950">
                SVC
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Spark<span className="text-cyan-400">Venture</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Autonomous micro-grant protocol empowering student builders with instant Google Gemini 2.5 venture audits and PayPal sandbox disbursements.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>All Systems Operational • Gemini 2.5 Active</span>
            </div>
          </div>

          {/* Protocol Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Protocol
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#how-it-works" className="hover:text-cyan-300 transition-colors">
                  AI Venture Diligence
                </a>
              </li>
              <li>
                <a href="#top" className="hover:text-cyan-300 transition-colors">
                  Live Project Telemetry
                </a>
              </li>
              <li>
                <a
                  href="https://developer.paypal.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-cyan-300 transition-colors"
                >
                  PayPal Sandbox Engine
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Compliance & Safety
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Anti-Fraud Guidelines
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Sandbox Disclaimers
                </span>
              </li>
            </ul>
          </div>

          {/* Hackathon Badge Column */}
          <div className="space-y-3 md:col-span-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Hackathon Credentials
            </h4>
            <div className="rounded-2xl border border-white/10 bg-[#06101d] p-4 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-white font-medium">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                <span>PayPal AI Hackathon 2026</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Engineered with Next.js 16, Supabase, PayPal Orders SDK, and Google GenAI 2.5 Flash.
              </p>
              <div className="inline-flex items-center gap-1.5 text-[11px] text-cyan-300 border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified Audit Engine</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} SparkVenture (SVC). Built for student innovation.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-slate-400" />
              <span>Next.js 16 & TypeScript</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              Crafted with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for builders
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}