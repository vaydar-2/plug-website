"use client";

import { useState } from "react";
import { Copy, Check, ArrowRight, ShieldCheck, Zap, Database, Terminal } from "./icons";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const runCommand = "plug run script.plug";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(runCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="overview" className="relative pt-20 pb-16 md:pt-28 md:pb-24 border-b border-neutral-800 overflow-hidden">
      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#F8FAFC 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Subtle ambient lime glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[340px] bg-[#A3E635]/[0.035] blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-mono font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-full">
          <span className="flex h-2 w-2 rounded-full bg-[#A3E635] animate-pulse" />
          <span className="text-[#A3E635]">Plug Core</span>
          <span className="text-neutral-500">|</span>
          <span>PostgreSQL & MongoDB Adapters Bundled</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F8FAFC] max-w-4xl mx-auto leading-[1.08]">
          One query language. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] via-[#c2f25f] to-[#F8FAFC]">
            Any database.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Plug is a database-agnostic query language and runtime. Write one script against any database: the language stays the same, only the adapter driver changes.
        </p>

        {/* Action Controls */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          {/* Quick CLI Bar */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3 px-4 py-2.5 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors rounded-lg font-mono text-xs text-neutral-300 shadow-sm">
            <span className="text-neutral-500 select-none">$</span>
            <span className="text-neutral-200 truncate">{runCommand}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 -mr-1 text-neutral-400 hover:text-[#A3E635] hover:bg-neutral-800/60 rounded transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A3E635]"
              title="Copy to clipboard"
              aria-label="Copy run command"
            >
              {copied ? <Check className="w-4 h-4 text-[#A3E635]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick CTA */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="#syntax"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#171717] bg-[#A3E635] hover:bg-[#b5f04b] rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A3E635]"
            >
              <span>Explore Syntax</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#architecture"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
            >
              <span>Architecture</span>
            </a>
          </div>
        </div>

        {/* Value Proposition Highlights */}
        <div className="mt-14 pt-10 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="p-4 bg-neutral-900/40 border border-neutral-800/80 rounded-lg">
            <div className="flex items-center gap-2 text-[#A3E635] mb-1.5">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300">Unified Grammar</span>
            </div>
            <p className="text-xs text-neutral-400 leading-normal">
              Chained expressions compile directly to SQL (Postgres) or aggregation pipelines (MongoDB).
            </p>
          </div>

          <div className="p-4 bg-neutral-900/40 border border-neutral-800/80 rounded-lg">
            <div className="flex items-center gap-2 text-[#A3E635] mb-1.5">
              <Database className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300">Pluggable Adapters</span>
            </div>
            <p className="text-xs text-neutral-400 leading-normal">
              Switch backends by changing only the driver name in <code>plug.connect()</code>.
            </p>
          </div>

          <div className="p-4 bg-neutral-900/40 border border-neutral-800/80 rounded-lg">
            <div className="flex items-center gap-2 text-[#A3E635] mb-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300">Safe by Design</span>
            </div>
            <p className="text-xs text-neutral-400 leading-normal">
              Mandatory WHERE clauses on UPDATE and DELETE guarantee no accidental table wipes.
            </p>
          </div>

          <div className="p-4 bg-neutral-900/40 border border-neutral-800/80 rounded-lg">
            <div className="flex items-center gap-2 text-[#A3E635] mb-1.5">
              <Terminal className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300">Pure Java Runtime</span>
            </div>
            <p className="text-xs text-neutral-400 leading-normal">
              Runs on any Java 17+ runtime or as a self-contained executable built with jpackage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
