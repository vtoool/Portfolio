/**
 * Data Service Layer
 *
 * This module provides a unified interface for fetching data.
 * It can work with either static data (for development) or Supabase (for production).
 */

import { Project, Service, Testimonial, TrustMetric } from '@/types';
import { supabase } from '@/lib/supabase';
import { projects as staticProjects, services as staticServices, testimonials as staticTestimonials, trustMetrics as staticTrustMetrics } from './data';

// Configuration: Set USE_SUPABASE to true to use Supabase, false for static data
const USE_SUPABASE = process.env.NEXT_PUBLIC_USE_SUPABASE === 'true';

// Helper to transform database row to Project type
const transformProject = (dbProject: any): Project => ({
  id: dbProject.id,
  title: dbProject.title,
  tag: dbProject.tag,
  shortDescription: dbProject.short_description,
  description: dbProject.description,
  techStack: dbProject.tech_stack,
  visual: dbProject.visual,
  status: dbProject.status,
  gridSize: dbProject.grid_size,
  featured: dbProject.featured,
  liveUrl: dbProject.live_url,
  situation: dbProject.situation,
  task: dbProject.task,
  action: dbProject.action,
  result: dbProject.result,
});

// Helper to transform database row to Service type
const transformService = (dbService: any): Service => ({
  title: dbService.title,
  description: dbService.description,
  iconType: dbService.icon_type,
  features: dbService.features,
});

// Helper to transform database row to Testimonial type
const transformTestimonial = (dbTestimonial: any): Testimonial => ({
  id: dbTestimonial.id,
  name: dbTestimonial.name,
  role: dbTestimonial.role,
  company: dbTestimonial.company,
  content: dbTestimonial.content,
  rating: dbTestimonial.rating,
});

// Helper to transform database row to TrustMetric type
const transformTrustMetric = (dbMetric: any): TrustMetric => ({
  label: dbMetric.label,
  value: dbMetric.value,
  description: dbMetric.description,
});

// Project Services
export const projectService = {
  async getAll(): Promise<Project[]> {
    if (!USE_SUPABASE) {
      return staticProjects;
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return staticProjects; // Fallback to static data
    }

    return data.map(transformProject);
  },

  async getFeatured(): Promise<Project[]> {
    if (!USE_SUPABASE) {
      return staticProjects.filter(p => p.featured);
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured projects:', error);
      return staticProjects.filter(p => p.featured);
    }

    return data.map(transformProject);
  },

  async getById(id: string): Promise<Project | null> {
    if (!USE_SUPABASE) {
      return staticProjects.find(p => p.id === id) || null;
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching project:', error);
      return staticProjects.find(p => p.id === id) || null;
    }

    return transformProject(data);
  },
};

// Service Services
export const serviceService = {
  async getAll(): Promise<Service[]> {
    if (!USE_SUPABASE) {
      return staticServices;
    }

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
      return staticServices;
    }

    return data.map(transformService);
  },
};

// Testimonial Services
export const testimonialService = {
  async getAll(): Promise<Testimonial[]> {
    if (!USE_SUPABASE) {
      return staticTestimonials;
    }

    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error);
      return staticTestimonials;
    }

    return data.map(transformTestimonial);
  },
};

// Trust Metric Services
export const trustMetricService = {
  async getAll(): Promise<TrustMetric[]> {
    if (!USE_SUPABASE) {
      return staticTrustMetrics;
    }

    const { data, error } = await supabase
      .from('trust_metrics')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching trust metrics:', error);
      return staticTrustMetrics;
    }

    return data.map(transformTrustMetric);
  },
};

// Contact Message Service
export const contactService = {
  async submitMessage(name: string, email: string, message: string): Promise<boolean> {
    if (!USE_SUPABASE) {
      // For static mode, just log the message
      console.log('Contact message received:', { name, email, message });
      return true;
    }

    const { error } = await (supabase as any)
      .from('contact_messages')
      .insert({
        name,
        email,
        message,
        status: 'new',
      });

    if (error) {
      console.error('Error submitting message:', error);
      return false;
    }

    return true;
  },
};

// Default export with all services
export const dataService = {
  projects: projectService,
  services: serviceService,
  testimonials: testimonialService,
  trustMetrics: trustMetricService,
  contact: contactService,
};
