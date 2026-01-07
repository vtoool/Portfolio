import React from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data";

const BentoGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};

export default BentoGrid;
