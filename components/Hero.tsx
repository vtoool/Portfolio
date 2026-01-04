
import React from 'react';
import { ArrowRight, Calendar, Code2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col items-center text-center space-y-8 pt-12 md:pt-24 relative">
        <div className="absolute top-0 left-0 w-full h-full hero-glow pointer-events-none -z-10" />
      
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-300 mb-4 animate-fade-in backdrop-blur-md">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
        Available for new projects
      </div>
      
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-5xl leading-[1.1]">
        Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">Revenue-Focused</span> Internal Tools & Automations.
      </h1>
      
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed">
        I bridge the gap between complex business logic and clean code. Specializing in custom CRMs, API Integrations, and SaaS MVPs.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
        <button className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-950 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-95 group shadow-xl shadow-indigo-500/10">
          <Calendar className="w-4 h-4" />
          Book a Discovery Call
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
        <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900/50 border border-zinc-800 text-zinc-100 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-900 hover:border-zinc-700 transition-all active:scale-95 backdrop-blur-sm">
          <Code2 className="w-4 h-4" />
          View Projects
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 pt-12 opacity-50 grayscale transition-all duration-500 hover:grayscale-0">
        <div className="text-xl font-bold tracking-tighter text-white">RINGCENTRAL</div>
        <div className="text-xl font-bold tracking-tighter text-white">DOCUSIGN</div>
        <div className="text-xl font-bold tracking-tighter text-white">METAGRAPH</div>
        <div className="text-xl font-bold tracking-tighter text-white">STRIPE</div>
        <div className="text-xl font-bold tracking-tighter text-white">AIRTABLE</div>
      </div>
    </section>
  );
};

export default Hero;
