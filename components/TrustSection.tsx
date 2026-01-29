"use client";

import React from "react";
import { Star, Play } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { testimonials, trustMetrics } from "@/lib/data";

interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
  index: number;
}

const TestimonialCard = React.memo<TestimonialCardProps>(({ testimonial, index }) => {
  return (
    <ScrollReveal key={testimonial.id} direction="up" delay={index * 0.1}>
      <div className="bento-card p-5 relative group">
        <div className="flex gap-1 mb-3">
          {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
          "{testimonial.content}"
        </p>

        <div className="flex items-center gap-2 pt-3 border-t border-zinc-200 dark:border-white/5">
          <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 text-xs font-bold">
            {testimonial.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="font-medium text-zinc-900 dark:text-zinc-200 text-xs">
              {testimonial.name}
            </div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-500">
              {testimonial.role}
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

const TrustSection: React.FC = () => {
  return (
    <section className="relative">
      {/* Trust Metrics */}
      <ScrollReveal direction="up" className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustMetrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                {metric.value}
              </div>
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Testimonials Header */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            What Clients Say
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
        ))}
      </div>

      {/* Video placeholder */}
      <ScrollReveal direction="up" delay={0.2} className="mt-10">
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white dark:bg-white/5 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Play className="w-6 h-6 text-zinc-900 dark:text-white ml-0.5" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-zinc-950/60 via-transparent to-transparent" />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default TrustSection;
