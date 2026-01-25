"use client";

import { Globe } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const switchLocale = () => {
    setLocale(locale === 'en' ? 'ro' : 'en');
  };

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
      aria-label="Switch language"
    >
      <Globe className="w-3 h-3" />
      <span className="uppercase">{locale}</span>
    </button>
  );
}
