import React from "react";
import { projects } from "@/lib/data";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-x-hidden text-zinc-100">
        <div className="fixed inset-0 linear-gradient-bg pointer-events-none z-0" />
        <Navbar />

        <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Portfolio
            </Link>

            <div className="space-y-6">
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

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    {project.title}
                </h1>
                
                <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
                    {project.description}
                </p>
            </div>

            <div className="mt-12 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50 aspect-video relative shadow-2xl shadow-indigo-500/10">
                {project.visual ? (
                    <img src={project.visual} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-700">No Preview</div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest mb-4">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <div key={tech} className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm">{tech}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-6 text-zinc-300 leading-relaxed text-lg font-light">
                    <p>This project was built to address specific challenges in the {project.tag.toLowerCase()} space.</p>
                    <div className="pt-8">
                        <button className="px-6 py-3 bg-white text-zinc-950 rounded-lg font-bold hover:bg-zinc-200 transition-all flex items-center gap-2">
                            Visit Live Site <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
  );
}