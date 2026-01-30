"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ArrowRight, Calendar, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { MagneticButton } from "./MagneticButton";
import FloatingAssets from "./FloatingAssets";
// import DebugControlPanel from "./DebugControlPanel"; // Debug panel hidden - uncomment to re-enable
import { useLanguage } from './LanguageContext';
import { useViewport } from '@/hooks/useViewport';

const Hero: React.FC = () => {
  const { t, locale } = useLanguage();
  const { breakpoint, mounted } = useViewport();
  const [isLayoutMode, setIsLayoutMode] = useState(false);
  const [assetValues, setAssetValues] = useState<{ [key: string]: any }>({});

  const safeBreakpoint = mounted ? breakpoint : 'desktop';

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const layoutMode = urlParams.get("layoutMode");
      setIsLayoutMode(layoutMode === "true");
    }
  }, []);

  const handleAssetValuesChange = useCallback((values: { [key: string]: any }) => {
    setAssetValues(values);
  }, []);

  const renderHeadline = () => {
    const headline = t('hero.headline');
    const highlight = t('hero.highlight');

    return headline.replace('{highlight}', highlight);
  };

  return (
    <section className="flex flex-col md:flex-row min-h-[95vh] md:min-h-[70vh] pt-24 md:pt-0 relative">
      <div className="absolute top-0 left-0 w-full h-full hero-glow pointer-events-none -z-10" />

      <div className="flex-1 flex flex-col justify-start pt-8 md:pt-16 px-6 lg:px-12 text-center lg:text-left">
        <ScrollReveal direction="down" duration={0.6}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-4 backdrop-blur-md mx-auto lg:mx-0">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            {t('hero.availability')}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <h1 className={`text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white max-w-2xl mx-auto lg:mx-0 leading-[1.2] ${locale === 'ro' ? 'lg:text-4xl' : 'lg:text-5xl'}`}>
            {renderHeadline().split('Revenue Engines.').map((part, i) => i === 0 ? part : (
              <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500 dark:from-indigo-400 dark:to-emerald-400">
                Revenue Engines.
              </span>
            ))}
          </h1>
        </ScrollReveal>

        {breakpoint === 'mobile' && (
          <div className="w-[90vw] aspect-square shrink-0 relative flex items-center justify-center overflow-visible my-4 mx-auto max-h-[90vw]">
            <FloatingAssets assetValues={assetValues} />
          </div>
        )}

        <ScrollReveal direction="up" delay={0.2}>
          <div className="max-w-2xl mx-auto lg:mx-0 bg-white/60 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 backdrop-blur-sm mt-6">
            <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-[1.6]">
              {t('hero.aboutMe')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.25}>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 justify-center lg:justify-start">
            <MagneticButton
              variant="primary"
              href="mailto:victor@cabin-story.com"
            >
              <Calendar className="w-4 h-4" />
              {t('hero.bookCall')}
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              variant="secondary"
              href="/#portfolio"
            >
              <Code2 className="w-4 h-4" />
              {t('hero.viewProjects')}
            </MagneticButton>
          </div>
        </ScrollReveal>

        <div id="cta-trigger" className="h-1 w-full" />
      </div>

        {breakpoint !== 'mobile' && (
        <div className="hidden md:flex flex-[1] items-center justify-end relative overflow-visible pr-8 h-[520px] pt-16">
          <FloatingAssets assetValues={assetValues} />
        </div>
      )}

      {/* <DebugControlPanel onValuesChange={handleAssetValuesChange} /> */}
    </section>
  );
};

export default Hero;
