"use client";

import React from "react";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import { ScrollReveal } from "./ScrollReveal";

const BentoGrid: React.FC = () => {
  return (
    <ScrollReveal direction="up" className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-3 grid-flow-dense">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </ScrollReveal>
  );
};

export default BentoGrid;
