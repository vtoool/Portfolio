
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
