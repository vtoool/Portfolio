"use client";

import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  return (
    <button
      className="h-9 w-9 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center cursor-pointer"
      aria-label="Toggle theme"
      onClick={() => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
      }}
    >
      <Sun className="w-4 h-4 text-amber-500 dark:block hidden" />
      <Moon className="w-4 h-4 text-zinc-700 dark:hidden block" />
    </button>
  );
}
