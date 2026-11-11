import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plug — The Database-Agnostic Programming Language & Runtime",
  description:
    "Plug is a modern, developer-first, database-agnostic programming language and runtime that connects to different database systems through modular adapters.",
  icons: {
    icon: "/assets/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#171717] text-[#F8FAFC] selection:bg-[#A3E635] selection:text-[#171717]">
        {children}
      </body>
    </html>
  );
}
