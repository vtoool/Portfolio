"use client";

import React from "react";
import { ScrollReveal } from "./ScrollReveal";
import { partnerLogos } from "@/lib/data";
import { useLanguage } from "./LanguageContext";

const ToolsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 bg-zinc-50 dark:bg-zinc-950/50">
      <ScrollReveal direction="up" delay={0.3}>
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-6 sm:mb-8 text-center">
            {t('hero.toolsSection')}
          </p>
          <div className="marquee-container overflow-hidden relative -mx-4 sm:mx-0">
            <div className="marquee-content flex gap-6 sm:gap-8 lg:gap-12">
              {partnerLogos.map((logo, index) => (
                <span
                  key={`first-${logo.name}-${index}`}
                  className={`text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-white opacity-70 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ${logo.color}`}
                >
                  {logo.name}
                </span>
              ))}
              {partnerLogos.map((logo, index) => (
                <span
                  key={`second-${logo.name}-${index}`}
                  className={`text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-white opacity-70 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ${logo.color}`}
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
