"use client";

import React, { useState, useEffect } from "react";
import { Github, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const scrollDirection = useScrollDirection(10);
  const t = useTranslations('navbar');
  const locale = useLocale();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !hasMounted) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMounted]);

  useEffect(() => {
    if (typeof window === 'undefined' || !hasMounted) return;

    const ctaTriggerElement = document.getElementById("cta-trigger");

    if (!ctaTriggerElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ctaTriggerAtTop = entry.boundingClientRect.top <= 0;
        // Only hide navbar if we're scrolling down and CTA trigger is at top
        const shouldHide = ctaTriggerAtTop && scrollDirection === "down";
        setNavbarVisible(!shouldHide);
      },
      { threshold: 0 }
    );

    observer.observe(ctaTriggerElement);

    return () => observer.disconnect();
  }, [scrollDirection, hasMounted]);

  const navLinks = [
    { href: `/${locale}/#portfolio`, label: t('portfolio') },
    { href: `/${locale}/#services`, label: t('services') },
    { href: `/${locale}/#about`, label: t('about') },
  ];

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl transition-transform duration-300 ease-in-out ${
          isScrolled
            ? "bg-zinc-950/90 backdrop-blur-xl border border-white/10 py-3"
            : "bg-zinc-950/80 border border-white/10 backdrop-blur-xl py-3"
        } rounded-full px-6 flex items-center justify-between shadow-lg shadow-black/20 ${
          navbarVisible ? "translate-y-0" : "-translate-y-[150%]"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-500 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
            <span className="font-bold text-white text-xs">VB</span>
          </div>
          <span className="font-semibold text-sm tracking-tight hidden sm:block text-zinc-100">
            VICTOR BUJOR
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/vtoool"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>

          <LanguageSwitcher />

          <a
            href="mailto:victor@cabin-story.com"
            className="hidden sm:flex bg-white text-zinc-950 px-4 py-2 rounded-full text-xs font-bold hover:bg-zinc-200 transition-colors items-center gap-2"
          >
            <Mail className="w-3 h-3" />
            {t('letsTalk')}
          </a>
          <button
            className="md:hidden p-2 text-zinc-400"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <button
                className="absolute top-6 right-6 p-2 text-zinc-400"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <X className="w-6 h-6" />
              </button>

              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-bold text-zinc-100 hover:text-indigo-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a
                  href="mailto:victor@cabin-story.com"
                  className="inline-flex items-center gap-2 bg-white text-zinc-950 px-6 py-3 rounded-full text-sm font-bold"
                >
                  <Mail className="w-4 h-4" />
                  {t('letsTalk')}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
