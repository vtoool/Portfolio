"use client";

import React from 'react';
import { useLanguage } from './LanguageContext';

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.25em]">
        {children}
      </span>
    </div>
  );
}

export function PortfolioSection() {
  const { t } = useLanguage();

  return (
    <>
      <SectionLabel>{t('portfolio.sectionLabel')}</SectionLabel>
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-100">
          {t('portfolio.featuredWork')}
        </h2>
        <p className="text-zinc-500 text-sm">
          {t('portfolio.featuredWorkDesc')}
        </p>
      </div>
    </>
  );
}

export function ServicesSection() {
  const { t } = useLanguage();

  return <SectionLabel>{t('services.sectionLabel')}</SectionLabel>;
}

export function AboutSection() {
  const { t } = useLanguage();

  return <SectionLabel>{t('about.sectionLabel')}</SectionLabel>;
}
