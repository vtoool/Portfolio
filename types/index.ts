import React from "react";

export interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  shortDescription: string; // For card preview
  techStack: string[];
  visual?: string;
  status?: string;
  gridSize: "large" | "medium" | "small";

  // STAR Method for project storytelling
  situation?: string;  // The problem/challenge
  task?: string;       // What was needed
  action?: string;     // What was built (technical)
  result?: string;     // Quantified outcome

  // Additional fields
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;  // Highlight on homepage
}

export interface Service {
  title: string;
  description: string;
  iconType: string;  // "database" | "zap" | "rocket"
  features: string[]; // List of what included
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating?: number;
}

export interface TrustMetric {
  label: string;
  value: string;
  description: string;
}
