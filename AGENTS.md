<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Plug Website

## Project Overview
This repository contains the official website for Plug, a database-agnostic programming language and runtime that connects to different database systems through adapters.

The website should communicate Plug's identity as a modern, developer-first, extensible and open-source project.

## Technology Stack
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Lucide React for icons
- Motion for animations when genuinely useful

## Design Identity

Follow the existing Plug brand assets. Do not redesign, replace or approximate the supplied logos.

### Colour Palette
- Graphite: `#171717`
- Plug Lime: `#A3E635`
- Slate: `#525252`
- Snow: `#F8FAFC`

### Typography
- Space Grotesk: headings
- Inter: body text
- JetBrains Mono: code and technical content

### Design Personality
- Minimalist
- Developer-focused
- Technical but approachable
- Modern and polished
- Open-source oriented

Avoid excessive gradients, unnecessary animations, generic AI-generated website aesthetics and excessive rounded cards.

## Development Guidelines

1. Use TypeScript throughout.
2. Prefer reusable, maintainable components.
3. Use the Next.js App Router conventions.
4. Keep components reasonably small and focused.
5. Use semantic HTML and accessible controls.
6. Ensure responsive layouts for desktop, tablet and mobile.
7. Optimise SVGs and other static assets.
8. Avoid unnecessary dependencies.
9. Do not introduce backend services unless explicitly required.
10. Never hardcode secrets, credentials or API keys.

## Content Accuracy

- Do not invent Plug features, capabilities, performance claims or database compatibility.
- Refer to the actual Plug language implementation and documentation when describing functionality.
- Clearly distinguish implemented features from planned features.
- Do not present Plug Studio or other future products as available until they actually exist.

## Working Instructions

- Inspect existing project files and assets before making changes.
- Preserve existing working implementations.
- Explain significant architectural decisions.
- Run linting and build checks after major changes.
- Do not install dependencies without a clear reason.
- Avoid unnecessary rewrites.