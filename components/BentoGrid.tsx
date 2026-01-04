
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
