"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  classification: string;
}

interface PriorityFeedProps {
  posts: BlogPost[];
  intervalMs?: number;
}

export function PriorityFeed({ posts, intervalMs = 5000 }: PriorityFeedProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (posts.length === 0) return;

    const tickRate = 50;
    const step = (tickRate / intervalMs) * 100;

    const timer = setInterval(() => {
      if (!isHovered) {
        setProgress((prev) => {
          if (prev >= 100) {
            setActiveIndex((current) => (current + 1) % posts.length);
            return 0;
          }
          return prev + step;
        });
      }
    }, tickRate);

    return () => clearInterval(timer);
  }, [posts.length, intervalMs, isHovered]);

  const handleManualChange = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  if (!posts || posts.length === 0) return null;

  const activePost = posts[activeIndex];

  return (
    <section className="space-y-4">
      <style>{`
        @keyframes local-tactical-fade {
          0% { opacity: 0; transform: translateY(5px) scale(0.99); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div className="flex justify-between items-center text-[10px] tracking-[0.3em] uppercase font-bold">
        <div className="text-[#ff0000]">
          [ Priority_Feed ]
        </div>
        <div className={`transition-opacity duration-300 text-white/40 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          [ sys_paused ]
        </div>
      </div>
      
      <div 
        className="relative border border-white/10 bg-black/50 overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-700"
          style={{ 
            backgroundImage: 'linear-gradient(to right, #ff0000 1px, transparent 1px), linear-gradient(to bottom, #ff0000 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />

        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 justify-between relative z-10">
          
          <div 
            key={activeIndex} 
            className="max-w-2xl space-y-6"
            style={{ animation: 'local-tactical-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            <div className="flex items-center gap-4 text-[10px] tracking-widest text-white/50">
              <span className="border border-white/20 px-2 py-1 text-[#ff0000]/80">
                {activePost.classification}
              </span>
              <span>{activePost.date}</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white/90">
              {activePost.title}
            </h2>
            
            <p className="text-sm text-white/50 font-light leading-relaxed min-h-16">
              {activePost.excerpt}
            </p>
            
            <div className="pt-4">
              <Link 
                href={`/blog/${activePost.id}`} 
                className="text-[11px] text-[#ff0000] uppercase tracking-[0.2em] hover:text-white transition-colors duration-300 flex items-center gap-2 w-fit bg-[#ff0000]/5 px-4 py-2 border border-[#ff0000]/20 hover:border-[#ff0000]"
              >
                &gt; Decrypt_File
              </Link>
            </div>
          </div>
          
          <div className="flex flex-row md:flex-col justify-end gap-2 text-[10px] tracking-widest">
            {posts.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => handleManualChange(idx)}
                className={`px-4 py-2 border transition-all duration-300 w-12 md:w-16 text-center ${
                  activeIndex === idx 
                    ? 'border-[#ff0000] text-[#ff0000] bg-[#ff0000]/10 shadow-[0_0_15px_rgba(255,0,0,0.2)]' 
                    : 'border-white/10 text-white/30 hover:border-white/30'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-0.5 bg-white/10 w-full z-10">
          <div 
            className={`h-full bg-[#ff0000] transition-all duration-75 ease-linear ${isHovered ? 'opacity-50' : 'opacity-100'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}