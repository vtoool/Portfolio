"use client";

import React from "react";
import Image from "next/image";
import { Project } from "@/types";
import { ArrowLeft, ExternalLink, ArrowRight, CheckCircle, Target, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticButton } from "@/components/MagneticButton";

interface ProjectClientProps {
  project: Project;
}

const starSteps = [
  { key: "situation", label: "Situation", icon: Target, color: "text-red-400" },
  { key: "task", label: "Task", icon: CheckCircle, color: "text-amber-400" },
  { key: "action", label: "Action", icon: Zap, color: "text-indigo-400" },
  { key: "result", label: "Result", icon: TrendingUp, color: "text-emerald-400" },
];

const ProjectClient: React.FC<ProjectClientProps> = ({ project }) => {
  return (
    <main className="pt-20 pb-12 px-4 max-w-3xl mx-auto text-zinc-100">
        <ScrollReveal direction="up">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                {project.tag}
              </span>
              {project.status && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  {project.status}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {project.title}
            </h1>

            <p className="text-sm md:text-base text-zinc-400 max-w-lg leading-relaxed">
              {project.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Visual Preview */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mt-12 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50 aspect-video relative shadow-2xl shadow-indigo-500/10 group">
            {project.visual ? (
              <Image
                src={project.visual}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-700">
                No Preview
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent pointer-events-none" />
          </div>
        </ScrollReveal>

        {/* Tech Stack */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-12">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest mb-4">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <div
                  key={tech}
                  className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm hover:border-indigo-500/30 hover:text-indigo-300 transition-colors"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* STAR Method Storytelling */}
        {project.situation && (
          <ScrollReveal direction="up" delay={0.4} className="mt-16">
            <h3 className="text-2xl font-bold text-zinc-100 mb-8">
              The Story
            </h3>
            <div className="space-y-6">
              {starSteps.map((step) => {
                const content = project[step.key as keyof typeof project];
                if (!content) return null;

                const Icon = step.icon;
                return (
                  <div
                    key={step.key}
                    className="relative pl-8 md:pl-12 border-l-2 border-zinc-800 hover:border-zinc-600 transition-colors group"
                  >
                    <div
                      className={`absolute left-0 -translate-x-1/2 w-8 h-8 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center ${step.color} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="pb-6 last:pb-0">
                      <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-2">
                        {step.label}
                      </h4>
                      <p className="text-zinc-400 leading-relaxed text-lg font-light">
                        {content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        )}

        {/* CTA Section */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="mt-12 p-5 md:p-6 rounded-xl bg-gradient-to-br from-indigo-950/30 to-emerald-950/30 border border-zinc-800 text-center">
            <h3 className="text-lg md:text-xl font-bold text-zinc-100 mb-2">
              Ready to build something similar?
            </h3>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Let&apos;s discuss how we can apply these principles to your business and create a revenue engine tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                variant="primary"
                href="mailto:victor@cabin-story.com"
              >
                Book a Discovery Call
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              {project.liveUrl && (
                <MagneticButton
                  variant="secondary"
                  href={project.liveUrl}
                >
                  Visit Live Site
                  <ExternalLink className="w-4 h-4" />
                </MagneticButton>
              )}
            </div>
          </div>
        </ScrollReveal>
    </main>
  );
};

export default ProjectClient;
