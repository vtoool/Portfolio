
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