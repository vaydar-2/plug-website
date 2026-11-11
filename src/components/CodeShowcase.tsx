"use client";

import { useState } from "react";
import { Copy, Check, Terminal, Code2 } from "./icons";

interface CodeSnippet {
  id: string;
  filename: string;
  title: string;
  description: string;
  code: string;
  output: string;
}

export function CodeShowcase() {
  const snippets: CodeSnippet[] = [
    {
      id: "postgres",
      filename: "postgres.plug",
      title: "PostgreSQL: Joins, Aggregates & Safe Writes",
      description: "Compiles chained query statements into single parameterized SQL statements over JDBC.",
      code: `# Connect to PostgreSQL database
plug.connect(driver: "postgres", host: "localhost", port: 5432,
             database: "plugdb", username: "postgres", password: "secret");

plug.use("users");

# Inner join with orders, conditions, sorting, and limit
plug.get(name, orders.total)
    .join(orders, on: (users.id, EQ, orders.user_id))
    .where((country, EQ, "Ghana") AND (orders.total, GTE, 100))
    .sort(orders.total, DESC)
    .limit(3);

# Aggregates scoped by conditions
plug.get().where((country, EQ, "Ghana")).count();
plug.get().sum(balance);

# Safe write operations: .where(...) is mandatory
plug.update(balance: 777).where((name, EQ, "Kwame"));
plug.delete().where((name, EQ, "Kwame"));

plug.close();`,
      output: `$ plug run examples/postgres.plug
Connected to postgresql database 'plugdb' at localhost:5432
Using collection: users
Executing plan: ExecutionPlan{op=READ, coll=users, join=orders, sort=orders.total DESC, limit=3}
Records found: 3
{name=Michael, orders.total=850.00}
{name=Ama, orders.total=420.50}
{name=Kofi, orders.total=150.00}
COUNT = 11
SUM(balance) = 590700
Records updated: 1
Records deleted: 1
Connection closed.`,
    },
    {
      id: "mongo",
      filename: "mongo.plug",
      title: "MongoDB: BSON Mapping & Pipeline Execution",
      description: "Translates the identical query grammar into MongoDB find(), $lookup, and $match/$group pipelines.",
      code: `# Connect to MongoDB (driver: "mongo" or "mongodb")
plug.connect(driver: "mongo", host: "localhost", port: 27017,
             database: "plugdb", username: "", password: "");

plug.use("mongo_people");

# Filtered read compiled to find() with server-side sort & limit
plug.get(name, age, balance)
    .where((age, GTE, 30))
    .sort(balance, DESC)
    .limit(1);

# Inner join across collections compiled to $lookup + $unwind
plug.get(name, mongo_orders.total)
    .join(mongo_orders, on: (mongo_people.id, EQ, mongo_orders.person_id))
    .sort(mongo_orders.total, ASC);

# Aggregates compiled to $match plus $group with exact BSON decoding
plug.get().where((age, GTE, 30)).count();
plug.get().sum(balance);
plug.get().avg(age);

plug.close();`,
      output: `$ plug run examples/mongo.plug
Connected to mongodb database 'plugdb' at localhost:27017
Using collection: mongo_people
Records found: 1
{age=30, balance=120.5, name=Alex}
Executing join pipeline: [$lookup, $unwind, $match, $sort]
Records found: 2
{name=Alex, mongo_orders.total=25.0}
{name=Alex, mongo_orders.total=75.5}
COUNT = 1
SUM(balance) = 120.5
AVG(age) = 30.0
Connection closed.`,
    },
    {
      id: "create_table",
      filename: "create-table.plug",
      title: "DDL & Schema Definitions",
      description: "Define schemas with typed fields and constraints. Works across mock, PostgreSQL, and MongoDB.",
      code: `# DDL walkthrough: Define a schema with types and constraints
plug.connect(driver: "mock", host: "localhost", port: 5432, 
             database: "mydb", username: "victor", password: "secret");

plug.create.table("products") {
    id: INT primary_key,
    name: STRING required,
    category: STRING unique,
    price: DECIMAL default 9.99,
    active: BOOL default true
};

plug.use("products");

# Insert records; omitted fields fall back to table defaults
plug.insert(name: "Laptop", category: "electronics", price: 450.0);
plug.insert(name: "Book", category: "media"); # price: 9.99, active: true

# Query with operator comparisons
plug.get(id, name, price, active).where((price, GTE, 10.0));
plug.get().sum(price);

plug.close();`,
      output: `$ plug run examples/create-table.plug
Mock database connected: localhost:5432 (mydb)
Table created: products
Using collection: products
Records inserted: 1
Records inserted: 1
Records found: 1
{active=true, category=electronics, id=1, name=Laptop, price=450.0}
SUM(price) = 459.99
Connection closed.`,
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const currentSnippet = snippets[activeTab];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="syntax" className="py-20 md:py-28 border-b border-neutral-800 bg-neutral-950/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-medium text-[#A3E635] bg-[#A3E635]/10 border border-[#A3E635]/20 rounded mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>Authoritative Language Syntax</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            One syntax across relational & document stores
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            Plug provides a single, unified chained expression syntax. The core runtime plans the execution, while the adapter translates it to native SQL or BSON pipelines.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {snippets.map((snippet, idx) => (
            <button
              key={snippet.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 text-xs sm:text-sm font-mono font-medium rounded transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] ${
                activeTab === idx
                  ? "bg-[#171717] text-[#A3E635] border border-neutral-700 shadow-sm"
                  : "bg-transparent text-neutral-400 hover:text-neutral-200 border border-transparent"
              }`}
            >
              <span className="opacity-60 mr-1.5">$</span>
              {snippet.filename}
            </button>
          ))}
        </div>

        {/* Code Editor Container */}
        <div className="border border-neutral-800 rounded-xl bg-[#171717] overflow-hidden shadow-2xl">
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-900/90 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="ml-2 font-mono text-neutral-300 font-semibold">{currentSnippet.filename}</span>
              <span className="hidden sm:inline text-neutral-500 font-mono text-[11px]">— {currentSnippet.title}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-neutral-500 hidden md:inline">Plug Language</span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A3E635]"
                aria-label="Copy code to clipboard"
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
          </div>

          {/* Code Body */}
          <div className="p-4 sm:p-6 overflow-x-auto bg-[#141414] font-mono text-xs sm:text-sm leading-relaxed text-neutral-300">
            <pre className="grid grid-cols-[auto_1fr] gap-x-4">
              <span className="select-none text-neutral-600 text-right pr-2 border-r border-neutral-800/80">
                {currentSnippet.code.split("\n").map((_, i) => (
                  <span key={i} className="block leading-relaxed">
                    {i + 1}
                  </span>
                ))}
              </span>
              <code className="text-neutral-200">
                {currentSnippet.code.split("\n").map((line, i) => {
                  const isComment = line.trim().startsWith("#");
                  const isPlugCall = line.includes("plug.") || line.includes(".where") || line.includes(".join") || line.includes(".sort") || line.includes(".limit") || line.includes(".get") || line.includes(".create");

                  return (
                    <span key={i} className="block leading-relaxed">
                      {isComment ? (
                        <span className="text-neutral-500 italic">{line}</span>
                      ) : isPlugCall ? (
                        <span>
                          <span className="text-[#A3E635] font-semibold">{line.split("(")[0]}</span>
                          <span>{line.slice(line.split("(")[0].length)}</span>
                        </span>
                      ) : (
                        line
                      )}
                    </span>
                  );
                })}
              </code>
            </pre>
          </div>

          {/* Interactive Output Terminal */}
          <div className="border-t border-neutral-800 bg-black/90 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2.5 text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>Execution Output</span>
            </div>
            <pre className="font-mono text-xs text-neutral-300 leading-relaxed overflow-x-auto whitespace-pre">
              {currentSnippet.output}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
