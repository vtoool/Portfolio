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
      className="h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase">
        {locale}
      </span>
    </button>
  );
}
