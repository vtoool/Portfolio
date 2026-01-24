"use client";

import React from "react";
import { Database, Zap, Rocket, Check } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { services } from "@/lib/data";
import { TiltCard } from "./TiltCard";

const iconMap: Record<string, React.ReactNode> = {
  database: <Database className="w-5 h-5 text-indigo-400" />,
  zap: <Zap className="w-5 h-5 text-amber-400" />,
  rocket: <Rocket className="w-5 h-5 text-emerald-400" />,
};

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

const ServiceCard = React.memo<ServiceCardProps>(({ service, index }) => {
  return (
    <ScrollReveal key={index} direction="up" delay={index * 0.1}>
      <TiltCard className="bento-card p-5 group h-full" intensity={4}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center">
            {iconMap[service.iconType] || iconMap.database}
          </div>
          <h3 className="font-semibold text-zinc-100 text-sm">
            {service.title}
          </h3>
        </div>

        <p className="text-zinc-500 text-xs leading-relaxed mb-4">
          {service.description}
        </p>

        <div className="space-y-1.5">
          {service.features.slice(0, 4).map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-zinc-400">
              <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </TiltCard>
    </ScrollReveal>
  );
});

ServiceCard.displayName = 'ServiceCard';

const Services: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {services.map((service, idx) => (
        <ServiceCard key={service.title} service={service} index={idx} />
      ))}
    </div>
  );
};

export default Services;
