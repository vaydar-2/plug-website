import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CodeShowcase } from "@/components/CodeShowcase";
import { ProblemSolution } from "@/components/ProblemSolution";
import { Architecture } from "@/components/Architecture";
import { Adapters } from "@/components/Adapters";
import { CliExperience } from "@/components/CliExperience";
import { GettingStarted } from "@/components/GettingStarted";
import { Community } from "@/components/Community";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#171717] text-[#F8FAFC]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CodeShowcase />
        <ProblemSolution />
        <Architecture />
        <Adapters />
        <CliExperience />
        <GettingStarted />
        <Community />
      </main>
      <Footer />
    </div>
  );
}
