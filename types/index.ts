// Core portfolio data types

export interface Project {
  id: string;
  title: string;
  tag: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  visual: string; // URL to project image
  status: string;
  gridSize: "large" | "medium" | "small";
  featured: boolean;
  liveUrl?: string;
  situation: string; // Business context
  task: string;      // What needed to be done
  action: string;    // Technical implementation
  result: string;    // Measurable outcomes
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconType: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating?: number;
  avatar?: string;
}

export interface TrustMetric {
  id: string;
  value: string;
  label: string;
  description?: string;
}

// Re-export all types for easy importing
export * from './animation';
export * from './database';