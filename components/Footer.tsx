"use client";

import React from "react";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { MagneticButton } from "./MagneticButton";

const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-5xl px-4 md:px-6 pt-12 pb-8 space-y-12 border-t border-zinc-900/50 bg-gradient-to-b from-transparent to-zinc-950/50">
      <ScrollReveal direction="up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-zinc-100">
              Ready to automate your growth?
            </h2>
            <p className="text-zinc-400">
              Let's discuss how we can streamline your operations and build tools that scale with your business.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
            <MagneticButton
              variant="primary"
              href="mailto:victor@cabin-story.com"
            >
              Book a Call
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton variant="secondary" href="mailto:victor@cabin-story.com">
              Hire Me
            </MagneticButton>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-zinc-900/50">
          <div className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Victor Bujor. All rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/vtoool"
              target="_blank"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:victor@cabin-story.com"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
