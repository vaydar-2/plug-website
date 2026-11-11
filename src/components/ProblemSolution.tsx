import { X, Check } from "./icons";

export function ProblemSolution() {
  const comparisons = [
    {
      title: "Data Access Paradigm",
      flawTitle: "Raw SQL String Injection & ORM Bloat",
      flawDesc: "Applications mix raw SQL string interpolation with bulky ORMs, risking SQL injection, N+1 query penalties, and unpredictable mapping overhead.",
      plugTitle: "Native Chained Query Grammar",
      plugDesc: "Plug statements compile into parameterized SQL over JDBC or native BSON aggregation pipelines. Values are always bound as safe parameters, never interpolated.",
    },
    {
      title: "Cross-Database Portability",
      flawTitle: "Dialect Lock-In & Rewrites",
      flawDesc: "Migrating from PostgreSQL to MongoDB or testing against in-memory doubles forces developers to rewrite queries, aggregation pipelines, and driver glue code.",
      plugTitle: "Unified Query Semantics",
      plugDesc: "The language stays identical whether targeting PostgreSQL, MongoDB, or the in-memory mock. Only the driver parameter in plug.connect() changes.",
    },
    {
      title: "Mutation Safety",
      flawTitle: "Unrestricted Accidental Wipes",
      flawDesc: "In standard SQL or ORMs, a forgotten WHERE clause in an UPDATE or DELETE silently overwrites or wipes an entire production table.",
      plugTitle: "Mandatory Scoped Conditions",
      plugDesc: "Plug's parser and runtime strictly require at least one .where(...) condition on plug.update() and plug.delete(), preventing unscoped destructive operations.",
    },
    {
      title: "Schema Introspection",
      flawTitle: "Disconnected Schema Drift",
      flawDesc: "Application models easily drift out of sync with real database tables, causing runtime crashes only when missing columns are hit in production.",
      plugTitle: "Session-Cached Schema Introspection",
      plugDesc: "Plug introspects tables via PostgreSQL information_schema or MongoDB $jsonSchema validators at use time, rejecting unknown fields with exact line numbers.",
    },
  ];

  return (
    <section id="problem" className="py-20 md:py-28 border-b border-neutral-800 bg-[#171717]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 rounded mb-3">
            <span>The Status Quo vs. Plug</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Why build a database-agnostic query language?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            Plug eliminates the friction between different database engines. Write one script, query any backend, and rely on built-in safety guards.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comparisons.map((item, idx) => (
            <div
              key={idx}
              className="border border-neutral-800 rounded-xl bg-neutral-950/70 p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#A3E635] block mb-4">
                  {item.title}
                </span>

                {/* Legacy Problem */}
                <div className="flex items-start gap-3 mb-5 p-3.5 rounded-lg bg-red-950/15 border border-red-900/30">
                  <div className="p-1 rounded bg-red-900/40 text-red-400 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-200">{item.flawTitle}</h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{item.flawDesc}</p>
                  </div>
                </div>

                {/* Plug Solution */}
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#A3E635]/[0.06] border border-[#A3E635]/25">
                  <div className="p-1 rounded bg-[#A3E635]/20 text-[#A3E635] mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F8FAFC]">{item.plugTitle}</h4>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{item.plugDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
