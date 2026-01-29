import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Services from "@/components/Services";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";
import ToolsSection from "@/components/ToolsSection";
import { ScrollReveal } from "@/components/ScrollReveal";

// Simple section label - no purple, just clean
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.25em]">
        {children}
      </span>
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full border-x border-zinc-200 dark:border-zinc-900/50 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center">
        <Navbar />
        <main className="w-full max-w-6xl px-4 md:px-6 pt-8 pb-8 space-y-6">
          <Hero />
          <ToolsSection />

          {/* Portfolio Section */}
          <section id="portfolio" className="space-y-5 relative bg-white dark:bg-zinc-950 py-8 px-5 md:py-8 md:px-6 rounded-2xl border border-zinc-100 dark:border-zinc-900/50">
            <ScrollReveal direction="up">
              <SectionLabel>Portfolio</SectionLabel>
              <div className="space-y-4 text-center max-w-2xl mx-auto">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  Featured Work
                </h2>
                <p className="text-zinc-500 dark:text-zinc-500 text-sm">
                  A selection of internal tools, automation systems, and SaaS products.
                </p>
              </div>
            </ScrollReveal>
            <BentoGrid />
          </section>

          {/* Services Section */}
          <section id="services" className="space-y-6 relative bg-white dark:bg-zinc-950 py-8 rounded-2xl border border-zinc-100 dark:border-zinc-900/50">
            <ScrollReveal direction="up">
              <SectionLabel>Services</SectionLabel>
            </ScrollReveal>
            <Services />
          </section>

          {/* About Section */}
          <section id="about" className="relative bg-white dark:bg-zinc-950 py-8 rounded-2xl border border-zinc-100 dark:border-zinc-900/50">
            <ScrollReveal direction="up">
              <SectionLabel>About</SectionLabel>
            </ScrollReveal>
            <TrustSection />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
