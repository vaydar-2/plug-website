"use client";

import { useState } from "react";
import { Terminal, Check, Copy } from "./icons";

interface CliCommand {
  cmd: string;
  name: string;
  summary: string;
  details: string[];
  output: string;
}

export function CliExperience() {
  const commands: CliCommand[] = [
    {
      cmd: "plug run examples/test.plug",
      name: "run",
      summary: "Execute a .plug script file. Outputs records to stdout and errors with line numbers to stderr.",
      details: [
        "Executes exactly one script argument (quoted paths with spaces supported)",
        "Exit codes: 0 success, 1 runtime / parse error, 2 usage error",
        "Packaged executable: java -jar plug.jar run <file.plug>",
      ],
      output: `$ plug run examples/test.plug
Mock database connected:
Host: localhost
Port: 5432
Database: mydb
Username: victor
Connection successful.
Using collection: users
Executing plan: ExecutionPlan{op=READ, coll=users, where=AND(...), limit=2}
Records found: 2
{balance=45000, country=Ghana, name=Brian}
{balance=12500, country=Ghana, name=Kwame}
Connection closed.`,
    },
    {
      cmd: "plug check examples/create-table.plug",
      name: "check",
      summary: "Perform a fast syntax check. Validates lexing and parsing without opening a database connection.",
      details: [
        "Verifies syntax and DDL definitions without touching a database",
        "Never connects or validates schemas against live servers",
        "Prints ok: <file> on success, line numbers on parse error",
      ],
      output: `$ plug check examples/create-table.plug
ok: examples/create-table.plug

$ plug check invalid.plug
Error: line 3: Expected a value.`,
    },
    {
      cmd: "plug --version",
      name: "version",
      summary: "Display build-derived CLI and Plug language versions.",
      details: [
        "Reports runtime build version",
        "Pure Java 17+ bytecode target",
      ],
      output: `$ plug --version
plug 0.4.0 (Plug language runtime, Java 17+)
Bundled drivers: mock, postgresql, mongodb`,
    },
    {
      cmd: "plug --help",
      name: "help",
      summary: "Print command line usage information and available options.",
      details: [
        "Single entry point for all commands",
        "REPL is deferred; plug repl reports usage error",
      ],
      output: `$ plug --help
Usage: plug <command> [options]

Commands:
  run <file.plug>    Execute a Plug script
  check <file.plug>  Check script syntax without executing
  --version          Print version information
  --help             Print this help message`,
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const active = commands[activeIdx];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(active.cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="cli" className="py-20 md:py-28 border-b border-neutral-800 bg-neutral-950/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-medium text-[#A3E635] bg-[#A3E635]/10 border border-[#A3E635]/20 rounded mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Command-Line Interface</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            CLI & Packaging
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            Plug provides a focused CLI interface for script execution and syntax checking. Distributed as an executable JAR with bundled drivers or as a native executable.
          </p>
        </div>

        {/* CLI Interactive Widget */}
        <div className="border border-neutral-800 rounded-xl bg-[#171717] overflow-hidden shadow-2xl">
          {/* Top Bar with Command Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 sm:px-4 sm:py-3 border-b border-neutral-800 bg-neutral-900/90">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {commands.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`px-3 py-1.5 text-xs font-mono rounded transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A3E635] ${
                    activeIdx === i
                      ? "bg-[#171717] text-[#A3E635] border border-neutral-700 font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  plug {c.name}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A3E635]"
              aria-label="Copy CLI command"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span className="text-[#A3E635]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Description & Command Header */}
          <div className="p-4 sm:p-6 border-b border-neutral-800/80 bg-neutral-900/40">
            <div className="flex items-center gap-2 mb-2 font-mono text-sm sm:text-base text-[#F8FAFC]">
              <span className="text-[#A3E635] font-bold">$</span>
              <span>{active.cmd}</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400">{active.summary}</p>

            {/* Notes */}
            <div className="mt-4 pt-3 border-t border-neutral-800/60">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1.5">
                Behavior & Notes
              </span>
              <div className="space-y-1 font-mono text-xs text-neutral-400">
                {active.details.map((detail, idx) => (
                  <div key={idx} className="text-neutral-400">
                    • {detail}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Terminal Output */}
          <div className="p-4 sm:p-6 bg-black/95 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-neutral-300">
            <pre className="whitespace-pre">{active.output}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
