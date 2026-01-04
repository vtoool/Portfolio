
import React from 'react';
import { Play } from 'lucide-react';

const TrustSection: React.FC = () => {
  return (
    <section id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 border-y border-zinc-900">
      <div className="space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400">
          THE ROI-FIRST APPROACH
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
          I’m not just a coder. I’m a business builder.
        </h2>
        <p className="text-lg text-zinc-400 leading-relaxed">
          With a background in B2B Sales, I understand that software needs to generate ROI, not just look pretty. Every line of code I write is focused on efficiency, conversion, or automation.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <img 
                key={i} 
                src={`https://picsum.photos/100/100?random=${i + 10}`} 
                className="w-10 h-10 rounded-full border-2 border-zinc-950" 
                alt="Client" 
              />
            ))}
          </div>
          <p className="text-sm text-zinc-500 font-medium">Joined by 20+ satisfied clients</p>
        </div>
      </div>

      <div className="relative group rounded-2xl overflow-hidden aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center cursor-pointer">
        <img 
          src="https://picsum.photos/1200/800?grayscale&blur=2" 
          alt="Video Thumbnail" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
        />
        <div className="z-10 bg-white text-zinc-950 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
          <Play className="w-6 h-6 fill-current" />
        </div>
        <div className="absolute bottom-6 left-6 text-left z-10">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Watch the demo</p>
          <p className="text-white font-medium">How I automated a $2M sales pipeline</p>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
