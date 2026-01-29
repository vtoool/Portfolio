"use client";

import React from "react";
import { projects } from "@/lib/data";
import { roProjects } from "@/lib/data.projects.ro";
import ProjectCard from "./ProjectCard";
import { ScrollReveal } from "./ScrollReveal";
import { useLanguage } from "./LanguageContext";

const BentoGrid: React.FC = () => {
  const { locale } = useLanguage();
  const displayedProjects = locale === 'ro' ? roProjects : projects;

  return (
    <ScrollReveal direction="up" className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-4 md:gap-3 grid-flow-dense px-1">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </ScrollReveal>
  );
};

export default BentoGrid;
