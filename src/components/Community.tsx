import { Github, GitBranch, GitPullRequest, BookOpen, ExternalLink } from "./icons";

export function Community() {
  const contributionTracks = [
    {
      icon: <GitPullRequest className="w-5 h-5 text-[#A3E635]" />,
      title: "Core Language & Runtime",
      desc: "Help improve the compiler, parser optimizations, type system diagnostics, and bytecode interpreter.",
    },
    {
      icon: <GitBranch className="w-5 h-5 text-[#A3E635]" />,
      title: "Adapter Development",
      desc: "Implement the Plug Adapter Protocol (PAP) for DuckDB, ClickHouse, Redis, or specialized corporate databases.",
    },
    {
      icon: <BookOpen className="w-5 h-5 text-[#A3E635]" />,
      title: "Documentation & Guides",
      desc: "Write cookbooks, translation guides from existing ORMs (Prisma, Diesel, SQLAlchemy), and real-world pipelines.",
    },
  ];

  return (
    <section id="community" className="py-20 md:py-28 border-b border-neutral-800 bg-[#141414]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto border border-neutral-800 rounded-2xl bg-neutral-950 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle accent glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 bg-[#A3E635]/[0.03] blur-[100px] pointer-events-none rounded-full"
            aria-hidden="true"
          />

          <div className="relative text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-medium text-[#A3E635] bg-[#A3E635]/10 border border-[#A3E635]/20 rounded mb-3">
              <Github className="w-3.5 h-3.5" />
              <span>Open Source & Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
              Built in the open, for developers
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400">
              Plug is open-source under the Apache 2.0 and MIT licenses. Our design decisions and adapter specifications are developed through public RFCs.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://github.com/plug-lang/plug"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#171717] bg-[#A3E635] hover:bg-[#b5f04b] rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
              >
                <Github className="w-4 h-4" />
                <span>Star on GitHub</span>
                <span className="text-neutral-900">•</span>
                <span className="font-mono text-xs">1.2k</span>
              </a>

              <a
                href="https://github.com/plug-lang/plug/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
              >
                <span>Contributing Guide</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            </div>
          </div>

          {/* Contribution Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-neutral-800/80">
            {contributionTracks.map((track, i) => (
              <div key={i} className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/70">
                <div className="mb-3">{track.icon}</div>
                <h3 className="text-sm font-semibold text-[#F8FAFC] mb-1.5">{track.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{track.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
