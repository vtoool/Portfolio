import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Services from "@/components/Services";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 linear-gradient-bg pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-x border-zinc-900/50 pointer-events-none z-0" />
      
      <div className="relative z-10 flex flex-col items-center">
        <Navbar />
        {/* CHANGED: Reduced pt-24 to pt-20 to pull content up */}
        <main className="w-full max-w-7xl px-6 md:px-12 lg:px-16 pt-20 pb-24 space-y-32">
          <Hero />
          <section id="portfolio" className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100">Featured Work</h2>
              <p className="text-zinc-400 max-w-2xl">
                A selection of internal tools, automation systems, and SaaS products I have built to solve complex business problems.
              </p>
            </div>
            <BentoGrid />
          </section>
          <Services />
          <TrustSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}