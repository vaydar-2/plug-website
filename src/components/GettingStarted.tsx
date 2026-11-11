"use client";

import { useState } from "react";
import { Check, Copy } from "./icons";

interface Step {
  step: string;
  title: string;
  description: string;
  command: string;
  fileSnippet?: {
    name: string;
    code: string;
  };
}

export function GettingStarted() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const steps: Step[] = [
    {
      step: "01",
      title: "Build the Packaged Executable",
      description: "Plug requires Java 17+. Build the packaged JAR with bundled PostgreSQL JDBC and MongoDB drivers via Maven.",
      command: "mvn package",
    },
    {
      step: "02",
      title: "Write a Plug Script",
      description: "Create a .plug file connecting to your database (or use the bundled in-memory mock driver for instant local testing).",
      command: "cat << 'EOF' > test.plug",
      fileSnippet: {
        name: "test.plug",
        code: `plug.connect(host: "localhost", port: 5432, database: "mydb", username: "victor", password: "secret");
plug.use("users");

plug.get(name, country, balance)
    .where((balance, GT, 10000) AND (country, NE, "Nigeria"))
    .limit(2);

plug.close();`,
      },
    },
    {
      step: "03",
      title: "Execute or Syntax Check",
      description: "Run the script with the CLI, or use 'check' to verify syntax without opening any database connections.",
      command: "java -jar target/plug.jar run test.plug",
    },
  ];

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="quickstart" className="py-20 md:py-28 border-b border-neutral-800 bg-[#171717]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-medium text-[#A3E635] bg-[#A3E635]/10 border border-[#A3E635]/20 rounded mb-3">
            <span>Quickstart</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Running Plug in 3 Steps
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            Plug targets Java 17+ and packages all drivers directly into a standalone JAR. Produce a native binary with jpackage or execute directly.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 text-xs font-mono font-bold text-[#A3E635]">
                    {item.step}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-[#F8FAFC]">{item.title}</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 mb-4 pl-0 sm:pl-10 leading-relaxed">
                {item.description}
              </p>

              {/* Command Box */}
              <div className="sm:ml-10 flex items-center justify-between gap-3 p-3 bg-neutral-950 border border-neutral-800 rounded-lg font-mono text-xs text-neutral-300">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="text-[#A3E635] select-none font-bold">$</span>
                  <span className="truncate">{item.command}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(item.command, idx)}
                  className="p-1.5 text-neutral-400 hover:text-[#A3E635] rounded transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A3E635] shrink-0"
                  aria-label="Copy step command"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-4 h-4 text-[#A3E635]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Optional Code Snippet */}
              {item.fileSnippet && (
                <div className="sm:ml-10 mt-4 border border-neutral-800/80 rounded-lg overflow-hidden bg-neutral-950">
                  <div className="px-3 py-1.5 bg-neutral-900 border-b border-neutral-800 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                    <span>{item.fileSnippet.name}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.fileSnippet!.code, 99)}
                      className="text-neutral-400 hover:text-white"
                      aria-label="Copy snippet"
                    >
                      {copiedIndex === 99 ? (
                        <span className="text-[#A3E635] text-[10px]">Copied</span>
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                  <pre className="p-3 text-xs font-mono text-neutral-300 overflow-x-auto leading-relaxed">
                    {item.fileSnippet.code}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Native Packaging Note */}
        <div className="mt-8 p-5 bg-neutral-900/30 border border-neutral-800 rounded-xl text-xs text-neutral-400 leading-relaxed max-w-4xl mx-auto">
          <span className="font-semibold text-neutral-200">Native Executable Distribution:</span> Use{" "}
          <code className="text-[#A3E635]">jpackage --name plug --input target --main-jar plug.jar</code>{" "}
          to package a self-contained platform executable (.exe / .msi on Windows, .deb on Linux, .dmg on macOS) with a private runtime bundled—no external JDK required.
        </div>
      </div>
    </section>
  );
}
