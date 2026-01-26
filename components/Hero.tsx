"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Calendar, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { MagneticButton } from "./MagneticButton";
import FloatingAssets from "./FloatingAssets";
import LayoutModePanel from "./LayoutModePanel";
import PositionForm from "./PositionForm";
import { partnerLogos } from "@/lib/data";
import { useLanguage } from './LanguageContext';
import { useViewport } from '@/hooks/useViewport';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { breakpoint } = useViewport();
  const [isLayoutMode, setIsLayoutMode] = useState(false);
  const [editorMode, setEditorMode] = useState<'drag' | 'form'>('form');
  const [assetValues, setAssetValues] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const layoutMode = urlParams.get("layoutMode");
      setIsLayoutMode(layoutMode === "true");
    }
  }, []);

  const handleAssetValuesChange = (values: { [key: string]: any }) => {
    setAssetValues(values);
  };

  const renderHeadline = () => {
    const headline = t('hero.headline');
    const highlight = t('hero.highlight');

    return headline.replace('{highlight}', highlight);
  };

  return (
    <section className={`
      flex ${breakpoint === 'mobile' ? 'flex-col' : 'lg:flex-row'}
      min-h-[80vh] md:min-h-[70vh] pt-0 relative
    `}>
      <div className="absolute top-0 left-0 w-full h-full hero-glow pointer-events-none -z-10" />

      <div className={`
        ${breakpoint === 'mobile' ? 'flex-1 order-1' : 'flex-[1.5]'}
        flex flex-col justify-start pt-8 md:pt-16 px-6 lg:px-12 pb-8 text-center lg:text-left
      `}>
        <ScrollReveal direction="down" duration={0.6}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-300 mb-4 backdrop-blur-md mx-auto lg:mx-0">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            {t('hero.availability')}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-2xl mx-auto lg:mx-0 leading-[1.2]">
            {renderHeadline().split('Revenue Engines.').map((part, i) => i === 0 ? part : (
              <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
                Revenue Engines.
              </span>
            ))}
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="max-w-2xl mx-auto lg:mx-0 bg-zinc-900/20 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm mt-6">
            <p className="text-zinc-300 text-sm md:text-base leading-[1.6]">
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

      <div className={`
        ${breakpoint === 'mobile' ? 'flex-1 order-2 min-h-[70vh]' : 'flex-[1] lg:order-1 lg:min-h-[60vh]'}
        relative overflow-visible pl-8
      `}>
        <FloatingAssets assetValues={assetValues} onAssetValuesChange={handleAssetValuesChange} />
      </div>

      {isLayoutMode && (
        <div
          className="fixed bottom-6 left-6 z-[9999] max-w-md w-[calc(100%-3rem)]"
          style={{
            maxHeight: '85vh',
            overflow: 'hidden',
            touchAction: 'none'
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div
            className="h-full overflow-y-auto pr-2"
            style={{
              maxHeight: 'calc(85vh - 1.5rem)',
              touchAction: 'none'
            }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex gap-2">
            <button
              onClick={() => setEditorMode('form')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                editorMode === 'form'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-800/90 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              Form Mode
            </button>
            <button
              onClick={() => setEditorMode('drag')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                editorMode === 'drag'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-800/90 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              Drag Mode
            </button>
          </div>

          {editorMode === 'form' ? (
            <PositionForm onValuesChange={handleAssetValuesChange} />
          ) : (
            <LayoutModePanel
              isVisible={isLayoutMode}
              onClose={() => setIsLayoutMode(false)}
              assetValues={assetValues}
            />
          )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
