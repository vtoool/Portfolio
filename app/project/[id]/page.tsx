import React from "react";
import { projects } from "@/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, ExternalLink, ArrowRight, CheckCircle, Target, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectClient from "@/components/ProjectClient";

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return [
    { id: 'pfcrm' },
    { id: 'chef' },
    { id: 'faresnap' },
    { id: 'meta' },
    { id: 'cabin' },
    { id: 'gds' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return {
      title: 'Project Not Found | Victor Bujor',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} | Victor Bujor`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.visual ? [project.visual] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.shortDescription,
      images: project.visual ? [project.visual] : [],
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 linear-gradient-bg pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full border-x border-zinc-900/50 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center">
        <Navbar />
        <ProjectClient project={project} />
        <Footer />
      </div>
    </div>
  );
}
