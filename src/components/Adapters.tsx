import { Boxes, ArrowRight } from "./icons";

interface AdapterInfo {
  name: string;
  driverId: string;
  status: "Implemented" | "Next in Line" | "Roadmap";
  type: string;
  description: string;
  features: string[];
}

export function Adapters() {
  const adapters: AdapterInfo[] = [
    {
      name: "PostgreSQL",
      driverId: 'driver: "postgres" / "postgresql"',
      status: "Implemented",
      type: "Relational (JDBC)",
      description: "Bundled JDBC driver compiling Plug statements into single parameterized SQL statements with schema caching.",
      features: [
        "Parameterized SQL generation with strict ? binding",
        "Schema introspection via information_schema",
        "Explicit INNER JOIN ... ON execution",
        "DDL support: CREATE TABLE & CREATE DATABASE",
      ],
    },
    {
      name: "MongoDB",
      driverId: 'driver: "mongo" / "mongodb"',
      status: "Implemented",
      type: "Document (BSON)",
      description: "Bundled MongoDB sync driver translating the identical syntax into BSON queries, $lookup joins, and $match/$group aggregates.",
      features: [
        "Find() reads with server-side sort & limit",
        "Joined reads via pipeline $lookup + $unwind",
        "Aggregates via $match and $group pipelines",
        "CREATE TABLE with strict $jsonSchema validators",
      ],
    },
    {
      name: "Mock In-Memory",
      driverId: 'driver: "mock"',
      status: "Implemented",
      type: "Reference Engine",
      description: "Zero-configuration in-memory adapter bundled with sample collections (users, orders, inventory) for instant local execution.",
      features: [
        "Semantic reference implementation for the grammar",
        "In-memory nested-loop inner joins",
        "Schema and type validation checks",
        "No external server or database required",
      ],
    },
    {
      name: "PlugDB",
      driverId: 'driver: "plugdb"',
      status: "Next in Line",
      type: "Native Engine",
      description: "A custom storage and execution database using Plug as its native query language without driver translation overhead.",
      features: [
        "Native execution of AST and query plans",
        "First-class storage primitives",
        "Status: Next major milestone in the roadmap",
      ],
    },
    {
      name: "SQLite",
      driverId: 'driver: "sqlite"',
      status: "Roadmap",
      type: "Embedded Relational",
      description: "Local embedded file-based relational driver planned for lightweight desktop and client workloads.",
      features: [
        "Zero-network local file database",
        "Planned for upcoming adapter milestones",
      ],
    },
    {
      name: "More Database Categories",
      driverId: "Community & RFCs",
      status: "Roadmap",
      type: "Extensible Ecosystem",
      description: "Pluggable DatabaseAdapter interface allowing new drivers to implement connect, execute(plan), and close.",
      features: [
        "Standardized DatabaseAdapter Java interface",
        "Registered via DatabaseAdapterRegistry",
      ],
    },
  ];

  return (
    <section id="adapters" className="py-20 md:py-28 border-b border-neutral-800 bg-[#171717]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-medium text-[#A3E635] bg-[#A3E635]/10 border border-[#A3E635]/20 rounded mb-3">
            <Boxes className="w-3.5 h-3.5" />
            <span>Adapter Registry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Supported Database Adapters
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            Plug decouples your query logic from the storage engine. Drivers register by name and compile common execution plans into native backend protocols.
          </p>
        </div>

        {/* Adapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adapters.map((adapter) => {
            const isImplemented = adapter.status === "Implemented";
            const isNext = adapter.status === "Next in Line";

            return (
              <div
                key={adapter.name}
                className={`p-6 rounded-xl border flex flex-col justify-between transition-colors ${
                  isImplemented
                    ? "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
                    : "bg-neutral-900/25 border-neutral-800/60 hover:border-neutral-800 opacity-90"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-neutral-400">{adapter.type}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        isImplemented
                          ? "bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/30 font-semibold"
                          : isNext
                          ? "bg-amber-400/10 text-amber-300 border-amber-400/30"
                          : "bg-neutral-800 text-neutral-400 border-neutral-700"
                      }`}
                    >
                      {adapter.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#F8FAFC]">{adapter.name}</h3>
                  <code className="text-xs font-mono text-[#A3E635] block mt-1 mb-3">
                    {adapter.driverId}
                  </code>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5">
                    {adapter.description}
                  </p>

                  <div className="space-y-1.5 pt-4 border-t border-neutral-800/80">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                      Capabilities
                    </span>
                    {adapter.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="w-1 h-1 rounded-full bg-[#A3E635]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/60">
                  <span className="text-xs font-mono text-neutral-400">
                    {isImplemented ? (
                      <span className="text-neutral-300">Pass via: <code className="text-[#A3E635]">plug.connect({adapter.driverId.split("/")[0].trim()})</code></span>
                    ) : (
                      <span className="text-neutral-500 italic">Planned on project roadmap</span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on Adapter Registry */}
        <div className="mt-12 p-6 bg-neutral-900/30 border border-neutral-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-[#F8FAFC]">The DatabaseAdapter Contract</h4>
            <p className="text-xs text-neutral-400 mt-1">
              Adapters implement <code>connect</code>, <code>execute(plan)</code>, and <code>close</code>. They return structured QueryResult objects and never print to stdout.
            </p>
          </div>
          <a
            href="https://github.com/plug-lang/plug"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded border border-neutral-700 transition-colors whitespace-nowrap"
          >
            <span>Inspect Interface</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
