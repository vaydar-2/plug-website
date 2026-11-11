import { Layers } from "./icons";

export function Architecture() {
  const layers = [
    {
      step: "01",
      badge: "Lexer & Parser",
      title: "AST with Accurate Line Numbers",
      description:
        "The Lexer and Parser parse .plug statements into an AST. Lexer and parser errors report exact line numbers (e.g. 'line 3: Expected a value').",
      code: ".plug file → Lexer → Parser → AST",
    },
    {
      step: "02",
      badge: "Query Planner",
      title: "ExecutionPlan Generation",
      description:
        "The QueryPlanner compiles chained statements into an ExecutionPlan—a single unit of work (READ, INSERT, UPDATE, DELETE with conditions and payloads; or a SchemaPlan for DDL).",
      code: "AST → Runtime → Query → QueryPlanner → ExecutionPlan",
    },
    {
      step: "03",
      badge: "Adapter Contract",
      title: "DatabaseAdapter & Registry",
      description:
        "DatabaseAdapter is the backend contract: connect, execute(plan) → QueryResult, executeSchema(plan), and close. Adapters return structured results and never print directly.",
      code: "public interface DatabaseAdapter {\n  QueryResult execute(ExecutionPlan plan);\n  QueryResult executeSchema(SchemaPlan plan);\n}",
    },
    {
      step: "04",
      badge: "Driver Execution",
      title: "PostgreSQL & MongoDB Drivers",
      description:
        "PostgresQueryCompiler translates plans to parameterized SQL with ? bindings over JDBC. MongoQueryCompiler translates plans to BSON find(), $lookup, and $match/$group pipelines.",
      code: "Postgres: SELECT * FROM t WHERE c = ?\nMongoDB:  db.collection.aggregate([...])",
    },
  ];

  return (
    <section id="architecture" className="py-20 md:py-28 border-b border-neutral-800 bg-[#141414]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-medium text-[#A3E635] bg-[#A3E635]/10 border border-[#A3E635]/20 rounded mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture & Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            From Script to Execution Plan
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            How Plug compiles chained script statements into native backend queries through a clean, decoupled execution pipeline.
          </p>
        </div>

        {/* Visual Pipeline Flow Diagram */}
        <div className="mb-14 p-6 sm:p-8 bg-neutral-900/50 border border-neutral-800 rounded-xl">
          <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6 text-center">
            Plug Compilation & Execution Pipeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Stage 1 */}
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg text-center relative group">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Source Code</span>
              <h4 className="text-sm font-semibold text-[#F8FAFC]">.plug File</h4>
              <p className="text-xs text-neutral-400 mt-1">Lexer & Parser</p>
            </div>

            {/* Stage 2 */}
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg text-center relative group">
              <span className="text-[10px] font-mono text-[#A3E635] uppercase block mb-1">Query Planner</span>
              <h4 className="text-sm font-semibold text-[#F8FAFC]">ExecutionPlan</h4>
              <p className="text-xs text-neutral-400 mt-1">READ / WRITE / DDL</p>
            </div>

            {/* Stage 3 */}
            <div className="p-4 bg-neutral-950 border border-[#A3E635]/40 rounded-lg text-center relative group shadow-sm shadow-[#A3E635]/5">
              <span className="text-[10px] font-mono text-[#A3E635] uppercase block mb-1">Adapter Layer</span>
              <h4 className="text-sm font-semibold text-[#A3E635]">DatabaseAdapter</h4>
              <p className="text-xs text-neutral-300 mt-1">execute(plan) Contract</p>
            </div>

            {/* Stage 4 */}
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg text-center relative group">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Storage Drivers</span>
              <h4 className="text-sm font-semibold text-[#F8FAFC]">Target Database</h4>
              <p className="text-xs text-neutral-400 mt-1">PostgreSQL & MongoDB</p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {layers.map((layer) => (
            <div
              key={layer.step}
              className="p-6 bg-neutral-950/60 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#A3E635] font-semibold">{layer.step}</span>
                  <span className="text-[11px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                    {layer.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">{layer.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">{layer.description}</p>
              </div>
              <div className="p-3 bg-neutral-900/90 border border-neutral-800/80 rounded font-mono text-xs text-neutral-300 overflow-x-auto whitespace-pre">
                {layer.code}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
