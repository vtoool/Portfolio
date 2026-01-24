import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';
import { Project } from '@/types';

// Mock TiltCard component
vi.mock('./TiltCard', () => ({
  TiltCard: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tilt-card">{children}</div>
  ),
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <a href="/test">{children}</a>
  ),
}));

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  tag: 'Enterprise Tool',
  description: 'A test project',
  shortDescription: 'Short description',
  techStack: ['React', 'TypeScript'],
  gridSize: 'medium',
  visual: '/test-image.jpg',
};

describe('ProjectCard', () => {
  it('renders project title', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project tag', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Enterprise Tool')).toBeInTheDocument();
  });

  it('renders tech stack', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});