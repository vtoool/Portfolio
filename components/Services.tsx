import React from "react";
import { Database, Zap, Rocket } from "lucide-react";
import { Service } from "../types";

const services: Service[] = [
  {
    title: "Custom CRMs",
    description: "Stop using spreadsheets. I build internal tools that fit your specific sales process, reducing manual entry and data fragmentation.",
    icon: <Database className="w-6 h-6 text-indigo-400" />
  },
  {
    title: "API Integrations",
    description: "I connect your isolated tools (RingCentral, Meta, DocuSign) so data flows automatically. Real-time sync for better insights.",
    icon: <Zap className="w-6 h-6 text-amber-400" />
  },
  {
    title: "SaaS MVPs",
    description: "From idea to deployed product. I build fast, scalable Minimum Viable Products using modern tech stacks optimized for growth.",
    icon: <Rocket className="w-6 h-6 text-emerald-400" />
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100">Specialized Services</h2>
        <p className="text-zinc-400">
          I combine deep technical expertise with business acumen to deliver software that impacts your bottom line.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <div key={idx} className="p-8 rounded-3xl bento-card space-y-4 hover:scale-[1.02] transition-transform group">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center shadow-inner group-hover:border-indigo-500/30 transition-colors">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-zinc-100 group-hover:text-indigo-300 transition-colors">{service.title}</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;