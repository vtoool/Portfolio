import React from "react";
import { Github, Mail } from "lucide-react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 shadow-lg shadow-black/20">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
          <span className="font-bold text-white text-xs">VB</span>
        </div>
        <span className="font-semibold text-sm tracking-tight hidden sm:block text-zinc-100">VICTOR BUJOR</span>
      </Link>
      
      <div className="flex items-center gap-8 text-sm font-medium text-zinc-400">
        <Link href="/#portfolio" className="hover:text-white transition-colors">Portfolio</Link>
        <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
        <Link href="/#about" className="hover:text-white transition-colors">About</Link>
      </div>

      <div className="flex items-center gap-3">
        <a href="https://github.com/vtoool" target="_blank" className="p-2 text-zinc-400 hover:text-white transition-colors">
          <Github className="w-4 h-4" />
        </a>
        <a href="mailto:victor@cabin-story.com" className="bg-white text-zinc-950 px-4 py-2 rounded-full text-xs font-bold hover:bg-zinc-200 transition-colors">
          Let's Talk
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
