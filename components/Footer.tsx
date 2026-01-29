"use client";

import React from "react";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { MagneticButton } from "./MagneticButton";
import { useLanguage } from "./LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="w-full max-w-5xl px-4 md:px-6 pt-12 pb-8 space-y-12 border-t border-zinc-200 dark:border-zinc-900/50 bg-gradient-to-b from-transparent to-zinc-100/50 dark:to-zinc-950/50">
      <ScrollReveal direction="up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {t('trust.readyToAutomate')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {t('trust.discussText')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
            <MagneticButton
              variant="primary"
              href="mailto:victor@cabin-story.com"
            >
              {t('trust.bookCall')}
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton variant="secondary" href="mailto:victor@cabin-story.com">
              {t('trust.hireMe')}
            </MagneticButton>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-900/50">
          <div className="text-zinc-500 dark:text-zinc-500 text-sm">
            © {new Date().getFullYear()} Victor Bujor. All rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/vtoool"
              target="_blank"
              className="text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:victor@cabin-story.com"
              className="text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
