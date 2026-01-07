--- components\BentoGrid.tsx ---

import React from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 'pfcrm',
    title: 'PFCRM',
    tag: 'Enterprise Tool',
    description: 'A custom CRM handling high-volume sales. Features on-demand scraping, RingCentral telephony integration, and automated DocuSign workflows.',
    techStack: ['React', 'Node.js', 'Puppeteer', 'DocuSign'],
    visual: 'https://picsum.photos/800/600?random=1',
    gridSize: 'large'
  },
  {
    id: 'chef',
    title: 'Chef De Chef',
    tag: 'Full-Stack App',
    description: 'End-to-end reservation system for a dance group. Includes client booking & Admin Dashboard.',
    techStack: ['Next.js', 'Resend', 'Stripe'],
    visual: 'https://picsum.photos/600/800?random=2',
    gridSize: 'medium' // Intended to be vertical now
  },
  {
    id: 'cabin',
    title: 'CabinStory',
    tag: 'Travel Tech SaaS',
    description: 'Presentation tool for travel agents to build itineraries. Active waitlist.',
    techStack: ['React', 'PostgreSQL', 'AWS'],
    status: 'Live Beta',
    visual: 'https://picsum.photos/800/400?random=3',
    gridSize: 'medium' // Intended to be horizontal wide
  },
  {
    id: 'meta',
    title: 'Meta Graph Automator',
    tag: 'Automation',
    description: 'Inbox organizer using Meta Graph API to sort chats programmatically.',
    techStack: ['Python', 'FastAPI'],
    gridSize: 'small'
  },
  {
    id: 'faresnap',
    title: 'FareSnap',
    tag: 'Browser Extension',
    description: 'Chrome extension for travel agents. 100+ active weekly users.',
    techStack: ['React', 'Manifest V3'],
    gridSize: 'small'
  },
  {
    id: 'gds',
    title: 'GDS Micro-Tools',
    tag: 'Utilities',
    description: 'Random Name Generator & SeatMap Visualizer.',
    techStack: ['TypeScript', 'SVG'],
    gridSize: 'small'
  }
];

const BentoGrid: React.FC = () => {
  return (
    // 3 Column Grid for better masonry feel
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
      {/* 
        Layout Strategy:
        Row 1-2: 
           [ Large Card (2x2) ] [ Medium Vertical (1x2) ]
        Row 3:
           [ Medium Horizontal (2x1) ] [ Small (1x1) ]
        Row 4:
           [ Small (1x1) ] [ Wide/Small (2x1) or 1x1 ]
      */}
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};

export default BentoGrid;


--- components\Footer.tsx ---

import React from 'react';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

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
          <a href="https://github.com" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:hello@victorbujor.com" className="text-zinc-400 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


--- components\Hero.tsx ---

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


--- components\Navbar.tsx ---

import React from 'react';
import { Github, Mail } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 shadow-lg shadow-black/20">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-inner">
          <span className="font-bold text-white text-xs">VB</span>
        </div>
        <span className="font-semibold text-sm tracking-tight hidden sm:block text-zinc-100">VICTOR BUJOR</span>
      </div>
      
      <div className="flex items-center gap-8 text-sm font-medium text-zinc-400">
        <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
        <a href="#services" className="hover:text-white transition-colors">Services</a>
        <a href="#about" className="hover:text-white transition-colors">About</a>
      </div>

      <div className="flex items-center gap-3">
        <a href="https://github.com" target="_blank" className="p-2 text-zinc-400 hover:text-white transition-colors">
          <Github className="w-4 h-4" />
        </a>
        <a href="mailto:hello@victorbujor.com" className="bg-white text-zinc-950 px-4 py-2 rounded-full text-xs font-bold hover:bg-zinc-200 transition-colors">
          Let's Talk
        </a>
      </div>
    </nav>
  );
};

export default Navbar;


--- components\ProjectCard.tsx ---

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  // Manual Grid Logic for specific Bento Layout
  const getGridClasses = (id: string) => {
    switch (id) {
      case 'pfcrm':
        return 'md:col-span-2 md:row-span-2 min-h-[400px]';
      case 'chef':
        return 'md:col-span-1 md:row-span-2 min-h-[400px]';
      case 'cabin':
        return 'md:col-span-2 md:row-span-1 min-h-[200px]';
      case 'gds':
        return 'md:col-span-2 md:row-span-1 min-h-[200px]'; // Making GDS wide to fill
      default:
        return 'md:col-span-1 md:row-span-1 min-h-[200px]';
    }
  };

  return (
    <div className={`bento-card relative rounded-3xl overflow-hidden group p-6 flex flex-col justify-between ${getGridClasses(project.id)}`}>
      
      {/* Content Container */}
      <div className="space-y-4 z-20 relative h-full flex flex-col">
        <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/40 border border-white/10 text-[11px] font-semibold text-zinc-300 uppercase tracking-wider backdrop-blur-md">
            {project.tag}
            </div>
            {project.status && (
            <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 bg-emerald-950/30 rounded border border-emerald-500/20 uppercase shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                {project.status}
            </span>
            )}
        </div>
        
        <div className="mt-auto">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 group-hover:text-indigo-300 transition-colors">
            {project.title}
            <ExternalLink className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </h3>
          <p className="text-zinc-400 text-sm mt-2 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
            {project.techStack.map((tech) => (
            <span key={tech} className="text-[10px] font-medium text-zinc-500 px-2 py-1 rounded bg-zinc-900/50 group-hover:bg-indigo-900/20 group-hover:text-indigo-300 transition-colors">
                {tech}
            </span>
            ))}
          </div>
        </div>
      </div>

      {/* Background Image / Gradient */}
      {project.visual ? (
        <div className="absolute inset-0 z-0">
          <img 
            src={project.visual} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-30 grayscale group-hover:scale-105 group-hover:grayscale-[0.5] transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-900 to-zinc-950 group-hover:from-zinc-900 group-hover:to-indigo-950/30 transition-colors duration-500" />
      )}
    </div>
  );
};

export default ProjectCard;


--- components\Services.tsx ---

import React from 'react';
import { Database, Zap, Rocket } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    title: 'Custom CRMs',
    description: 'Stop using spreadsheets. I build internal tools that fit your specific sales process, reducing manual entry and data fragmentation.',
    icon: <Database className="w-6 h-6 text-indigo-400" />
  },
  {
    title: 'API Integrations',
    description: 'I connect your isolated tools (RingCentral, Meta, DocuSign) so data flows automatically. Real-time sync for better insights.',
    icon: <Zap className="w-6 h-6 text-amber-400" />
  },
  {
    title: 'SaaS MVPs',
    description: 'From idea to deployed product. I build fast, scalable Minimum Viable Products using modern tech stacks optimized for growth.',
    icon: <Rocket className="w-6 h-6 text-emerald-400" />
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100">Specialized Services</h2>
        <p className="text-zinc-400">
          I combine deep technical expertise with business acumen to deliver software that impacts your bottom line.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <div key={idx} className="p-8 rounded-3xl bento-card space-y-4 hover:scale-[1.02] transition-transform group">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center shadow-inner group-hover:border-indigo-500/30 transition-colors">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-zinc-100 group-hover:text-indigo-300 transition-colors">{service.title}</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;


--- components\TrustSection.tsx ---

import React from 'react';
import { Play } from 'lucide-react';

const TrustSection: React.FC = () => {
  return (
    <section id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 border-y border-zinc-900">
      <div className="space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400">
          THE ROI-FIRST APPROACH
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
          I’m not just a coder. I’m a business builder.
        </h2>
        <p className="text-lg text-zinc-400 leading-relaxed">
          With a background in B2B Sales, I understand that software needs to generate ROI, not just look pretty. Every line of code I write is focused on efficiency, conversion, or automation.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <img 
                key={i} 
                src={`https://picsum.photos/100/100?random=${i + 10}`} 
                className="w-10 h-10 rounded-full border-2 border-zinc-950" 
                alt="Client" 
              />
            ))}
          </div>
          <p className="text-sm text-zinc-500 font-medium">Joined by 20+ satisfied clients</p>
        </div>
      </div>

      <div className="relative group rounded-2xl overflow-hidden aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center cursor-pointer">
        <img 
          src="https://picsum.photos/1200/800?grayscale&blur=2" 
          alt="Video Thumbnail" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
        />
        <div className="z-10 bg-white text-zinc-950 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
          <Play className="w-6 h-6 fill-current" />
        </div>
        <div className="absolute bottom-6 left-6 text-left z-10">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Watch the demo</p>
          <p className="text-white font-medium">How I automated a $2M sales pipeline</p>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;


--- App.tsx ---

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Services from './components/Services';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 linear-gradient-bg pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-x border-zinc-900/50 pointer-events-none z-0" />
      
      <div className="relative z-10 flex flex-col items-center">
        <Navbar />
        <main className="w-full max-w-7xl px-6 md:px-12 lg:px-16 pt-32 pb-24 space-y-32">
          <Hero />
          <section id="portfolio" className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100">Featured Work</h2>
              <p className="text-zinc-400 max-w-2xl">
                A selection of internal tools, automation systems, and SaaS products I've built to solve complex business problems.
              </p>
            </div>
            <BentoGrid />
          </section>
          <Services />
          <TrustSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;


--- index.tsx ---

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


--- types.ts ---

import React from 'react';

export interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  techStack: string[];
  visual?: string;
  status?: string;
  gridSize: 'large' | 'medium' | 'small';
}

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}


