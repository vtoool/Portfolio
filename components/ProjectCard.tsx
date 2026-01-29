"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types";
import Link from "next/link";
import { TiltCard } from "./TiltCard";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

const getProjectClasses = (id: string) => {
  switch (id) {
    case "pfcrm":
      // Flagship: Mobile full width tall, Tablet 2x1, Desktop 2x2
      return {
        gridClass: "col-span-1 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
        padding: "p-4 md:p-6",
        textSize: "text-base md:text-lg lg:text-xl",
      };
    case "cabin":
      // CabinStory: Mobile full width tall, Tablet 2x1, Desktop 2x2
      return {
        gridClass: "col-span-1 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
        padding: "p-4 md:p-6",
        textSize: "text-sm md:text-base lg:text-lg",
      };
    case "chef":
      // Chef De Chef: Mobile full width medium, Tablet 1x2, Desktop 1x2
      return {
        gridClass: "col-span-1 row-span-2 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2",
        padding: "p-4 md:p-5",
        textSize: "text-sm md:text-sm lg:text-base",
      };
    case "faresnap":
      // FareSnap: Mobile half width, Tablet half width, Desktop 1x1
      return {
        gridClass: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
        padding: "p-4",
        textSize: "text-xs md:text-xs lg:text-sm",
      };
    case "meta":
      // Meta: Mobile half width, Tablet half width, Desktop 1x1
      return {
        gridClass: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
        padding: "p-4",
        textSize: "text-xs md:text-xs lg:text-sm",
      };
    case "gds":
      // GDS: Mobile full width tall, Tablet 2x1, Desktop 2x2
      return {
        gridClass: "col-span-1 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
        padding: "p-4 md:p-6",
        textSize: "text-sm md:text-sm lg:text-base",
      };
    default:
      return {
        gridClass: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
        padding: "p-4",
        textSize: "text-xs md:text-xs lg:text-sm",
      };
  }
};

const ProjectCard = React.memo<ProjectCardProps>(({ project }) => {
  const { gridClass, padding, textSize } = getProjectClasses(project.id);

  return (
    <Link href={`/project/${project.id}`} className={cn(gridClass, "block h-full")}>
      <TiltCard
        className="bento-card relative rounded-3xl overflow-hidden group cursor-pointer w-full h-full"
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
              <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/30 rounded border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 uppercase">
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
                <span key={tech} className="text-[9px] font-medium text-zinc-500 dark:text-zinc-500 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900/50 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-[9px] font-medium text-zinc-400 dark:text-zinc-600 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900/50">
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
    </Link>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
