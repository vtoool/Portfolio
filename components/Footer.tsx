import React from "react";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-7xl px-6 md:px-12 lg:px-16 pt-24 pb-12 space-y-24 border-t border-zinc-900/50 bg-gradient-to-b from-transparent to-zinc-950/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100">Ready to automate your growth?</h2>
          <p className="text-zinc-400">Let's discuss how we can streamline your operations and build tools that scale with your business.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
          <button className="px-8 py-4 bg-white text-zinc-950 rounded-xl font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/20">
            Book a Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-transparent border border-zinc-800 text-white rounded-xl font-bold hover:bg-zinc-900 transition-all">
            Hire Me
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-zinc-900/50">
        <div className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} Victor Bujor. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6">
          <a href="https://github.com/vtoool" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:victor@cabin-story.com" className="text-zinc-400 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
