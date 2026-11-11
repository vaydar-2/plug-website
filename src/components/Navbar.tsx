"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Github, ArrowRight } from "./icons";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Overview", href: "#overview" },
    { name: "Syntax", href: "#syntax" },
    { name: "Problem", href: "#problem" },
    { name: "Architecture", href: "#architecture" },
    { name: "Adapters", href: "#adapters" },
    { name: "CLI", href: "#cli" },
    { name: "Docs", href: "#docs" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-[#171717]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] rounded">
          <Image
            src="/assets/logo-dark.svg"
            alt="Plug"
            width={124}
            height={48}
            className="h-8 w-auto object-contain transition-opacity group-hover:opacity-90"
            priority
          />
          <span className="hidden sm:inline-flex items-center text-[10px] font-mono uppercase tracking-widest text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
            Runtime v0.4
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-[#A3E635] focus:outline-none focus-visible:text-[#A3E635]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/plug-lang/plug"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 rounded hover:border-neutral-700 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
            aria-label="Plug on GitHub"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <span className="text-neutral-500">•</span>
            <span className="text-[#A3E635]">★ 1.2k</span>
          </a>

          <a
            href="#quickstart"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#171717] bg-[#A3E635] rounded hover:bg-[#b5f04b] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A3E635]"
          >
            <span>Install</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="https://github.com/plug-lang/plug"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-neutral-400 hover:text-white focus:outline-none"
            aria-label="GitHub repository"
          >
            <Github className="w-5 h-5" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] rounded"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-[#171717] px-4 pt-3 pb-6">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-2 text-base font-medium text-neutral-200 hover:text-[#A3E635] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
              <a
                href="#quickstart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-[#171717] bg-[#A3E635] rounded"
              >
                <span>Get Started with Plug</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

