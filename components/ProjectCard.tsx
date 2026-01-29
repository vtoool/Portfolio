"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types";
import { TiltCard } from "./TiltCard";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: Project;
}

const getProjectClasses = (id: string) => {
  switch (id) {
    case "pfcrm":
      return {
        gridClass: "col-span-1 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
        padding: "p-5 md:p-6 lg:p-7",
        textSize: "text-base md:text-lg lg:text-xl",
      };
    case "cabin":
      return {
        gridClass: "col-span-1 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
        padding: "p-5 md:p-6 lg:p-7",
        textSize: "text-sm md:text-base lg:text-lg",
      };
    case "chef":
      return {
        gridClass: "col-span-1 row-span-2 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2",
        padding: "p-5 md:p-5 lg:p-6",
        textSize: "text-sm md:text-sm lg:text-base",
      };
    case "faresnap":
      return {
        gridClass: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
        padding: "p-5 md:p-5 lg:p-5",
        textSize: "text-sm md:text-xs lg:text-sm",
      };
    case "meta":
      return {
        gridClass: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
        padding: "p-5 md:p-5 lg:p-5",
        textSize: "text-sm md:text-xs lg:text-sm",
      };
    case "gds":
      return {
        gridClass: "col-span-1 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
        padding: "p-5 md:p-6 lg:p-7",
        textSize: "text-sm md:text-sm lg:text-base",
      };
    default:
      return {
        gridClass: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
        padding: "p-5 md:p-5 lg:p-5",
        textSize: "text-sm md:text-xs lg:text-sm",
      };
  }
};

const ProjectCard = React.memo<ProjectCardProps>(({ project }) => {
  const { gridClass, padding, textSize } = getProjectClasses(project.id);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/project/${project.id}`);
  };

  return (
    <div className={cn(gridClass, "block h-full")}>
      <TiltCard
        onClick={handleClick}
        className="bento-card relative rounded-3xl overflow-hidden group cursor-pointer w-full h-full bg-white dark:bg-zinc-950 shadow-sm dark:shadow-none shadow-zinc-200/50 dark:shadow-black/20 border border-zinc-200 dark:border-white/10 hover:shadow-xl dark:hover:shadow-2xl hover:shadow-zinc-300/50 dark:hover:shadow-black/40 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-500"
        intensity={15}
        speed={1000}
      >
        <div className={cn("flex flex-col h-full z-20 relative", padding)}>
          {/* Header */}
          <div className="flex items-center gap-2 flex-wrap flex-shrink-0 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100/60 dark:bg-zinc-950/40 border border-zinc-200 dark:border-white/10 text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider backdrop-blur-md">
              {project.tag}
            </span>
            {project.status && (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                {project.status}
              </span>
            )}
          </div>

          {/* Title & Desc */}
          <div className="flex-1 min-h-0">
            <h3 className={cn("font-bold text-zinc-900 dark:text-white flex items-center gap-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors", textSize)}>
              {project.title}
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-3 leading-relaxed line-clamp-2">
              {project.shortDescription}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex-shrink-0 pt-4 border-t border-zinc-200 dark:border-white/5 mt-2">
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((tech) => (
                <span key={tech} className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 px-2.5 py-1 rounded-lg bg-zinc-200 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 group-hover:border-indigo-300 dark:group-hover:border-indigo-700 transition-all duration-300">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 px-2.5 py-1 rounded-lg bg-zinc-200 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Background */}
        {project.visual ? (
          <div className="absolute inset-0 z-0">
            <Image
              src={project.visual}
              alt={project.title}
              fill
              className="object-cover opacity-20 grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              priority={project.featured}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-white/60 dark:via-zinc-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-50 dark:from-zinc-900 to-zinc-100 dark:to-zinc-950 group-hover:to-indigo-50 dark:group-hover:to-indigo-950/20 transition-colors duration-500" />
        )}
      </TiltCard>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
