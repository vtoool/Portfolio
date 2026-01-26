"use client";

import React from "react";
import { ScrollReveal } from "./ScrollReveal";
import { partnerLogos } from "@/lib/data";
import { useLanguage } from "./LanguageContext";

const ToolsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 bg-zinc-950/50">
      <ScrollReveal direction="up" delay={0.3}>
        <div className="w-full max-w-4xl mx-auto px-6">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-8 text-center">
            {t('hero.toolsSection')}
          </p>
          <div className="marquee-container overflow-hidden relative">
            <div className="marquee-content flex gap-8">
              {partnerLogos.map((logo, index) => (
                <span
                  key={`first-${logo.name}-${index}`}
                  className={`text-lg font-bold tracking-tighter text-white opacity-70 hover:opacity-100 transition-all duration-300 whitespace-nowrap ${logo.color}`}
                >
                  {logo.name}
                </span>
              ))}
              {partnerLogos.map((logo, index) => (
                <span
                  key={`second-${logo.name}-${index}`}
                  className={`text-lg font-bold tracking-tighter text-white opacity-70 hover:opacity-100 transition-all duration-300 whitespace-nowrap ${logo.color}`}
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

export default ToolsSection;
