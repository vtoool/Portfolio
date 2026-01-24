"use client";

import React from "react";
import { ArrowRight, Calendar, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { MagneticButton } from "./MagneticButton";
import { partnerLogos } from "@/lib/data";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col items-center text-center space-y-8 pt-0 md:pt-12 relative">
      <div className="absolute top-0 left-0 w-full h-full hero-glow pointer-events-none -z-10" />

      <ScrollReveal direction="down" duration={0.6}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-300 mb-4 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          Available for new projects
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-[1.1]">
          Turn Manual Operations Into{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
            Revenue Engines.
          </span>
        </h1>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <p className="text-sm md:text-base text-zinc-400 max-w-lg font-light leading-relaxed">
          I replace spreadsheets and busywork with intelligent software. Specializing in custom CRMs, API Integrations, and SaaS MVPs.
        </p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.3}>
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
          <MagneticButton
            variant="primary"
            href="mailto:victor@cabin-story.com"
          >
            <Calendar className="w-4 h-4" />
            Book a Discovery Call
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton
            variant="secondary"
            href="#portfolio"
          >
            <Code2 className="w-4 h-4" />
            View Projects
          </MagneticButton>
        </div>
      </ScrollReveal>

      {/* Trigger element - hide navbar when CTAs disappear */}
      <div id="cta-trigger" className="h-1 w-full" />

      {/* Partner Logos - Infinite marquee effect */}
      <ScrollReveal direction="up" delay={0.4}>
        <div id="tools-section" className="pt-16 w-full max-w-4xl mx-auto">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-8 text-center">
            Tools I Work With
          </p>
          <div className="marquee-container overflow-hidden relative">
            <div className="marquee-content flex gap-8">
              {/* First set */}
              {partnerLogos.map((logo, index) => (
                <span
                  key={`first-${logo.name}-${index}`}
                  className={`text-lg font-bold tracking-tighter text-white opacity-40 hover:opacity-100 transition-all duration-300 whitespace-nowrap ${logo.color}`}
                >
                  {logo.name}
                </span>
              ))}
              {/* Duplicate set for seamless loop */}
              {partnerLogos.map((logo, index) => (
                <span
                  key={`second-${logo.name}-${index}`}
                  className={`text-lg font-bold tracking-tighter text-white opacity-40 hover:opacity-100 transition-all duration-300 whitespace-nowrap ${logo.color}`}
                >
                  {logo.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Hero;
