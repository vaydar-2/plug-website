import Image from "next/image";
import Link from "next/link";
import { Github } from "./icons";

export function Footer() {
  const footerSections = [
    {
      title: "Language & Runtime",
      links: [
        { label: "Overview", href: "#overview" },
        { label: "Language Syntax", href: "#syntax" },
        { label: "Architecture", href: "#architecture" },
        { label: "CLI Reference", href: "#cli" },
        { label: "Quickstart", href: "#quickstart" },
      ],
    },
    {
      title: "Adapters",
      links: [
        { label: "PostgreSQL Adapter", href: "#adapters" },
        { label: "MongoDB Adapter", href: "#adapters" },
        { label: "Mock In-Memory Adapter", href: "#adapters" },
        { label: "PlugDB (Next in Line)", href: "#adapters" },
        { label: "DatabaseAdapter Interface", href: "#adapters" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "GitHub Repository", href: "https://github.com/plug-lang/plug" },
        { label: "Contributing Guide", href: "https://github.com/plug-lang/plug/blob/main/CONTRIBUTING.md" },
        { label: "Issue Tracker", href: "https://github.com/plug-lang/plug/issues" },
        { label: "Discussions", href: "https://github.com/plug-lang/plug/discussions" },
      ],
    },
    {
      title: "Open Source",
      links: [
        { label: "Apache 2.0 License", href: "https://github.com/plug-lang/plug/blob/main/LICENSE" },
        { label: "MIT License", href: "https://github.com/plug-lang/plug/blob/main/LICENSE-MIT" },
        { label: "Security Policy", href: "https://github.com/plug-lang/plug/security" },
      ],
    },
  ];

  return (
    <footer id="docs" className="bg-[#141414] border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/assets/logo-dark.svg"
                alt="Plug"
                width={124}
                height={48}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed mb-4">
              The database-agnostic query language. Write one script against any database: the language stays the same, only the adapter driver changes.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
              <span className="inline-block w-2 h-2 rounded-full bg-[#A3E635]" />
              <span>v0.4.0 · Java 17+ Pure Runtime</span>
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((sec, i) => (
            <div key={i} className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-200 font-semibold">
                {sec.title}
              </h4>
              <ul className="space-y-2">
                {sec.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="hover:text-[#A3E635] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-400">
          <div>
            © {new Date().getFullYear()} Plug Language Contributors. Open source under Apache 2.0 and MIT.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/plug-lang/plug"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>github.com/plug-lang/plug</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
