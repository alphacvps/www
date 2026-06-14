"use client";

import Link from "next/link";
import React from "react";

interface LinkItem {
  title: string;
  subtitle?: string;
  url: string;
  bgImage?: string;
  isBanner?: boolean;
  icon?: React.ReactNode;
}

const LINKS_DATA: LinkItem[] = [
  {
    title: "Scarica WCCT v2.0",
    subtitle: "La nuova pipeline dati è ora disponibile in STABLE.",
    url: "/products",
    bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    isBanner: true,
  },
  {
    title: "GitHub Ufficiale",
    subtitle: "Repository ufficiali",
    url: "https://github.com/alphacops",
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: "Join the Network",
    subtitle: "Telegram community",
    url: "https://t.me/alphacvps",
    bgImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
  }
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-mono selection:bg-[#ff0000]/30 selection:text-white flex flex-col items-center py-10 sm:py-20 px-4 sm:px-6 relative overflow-x-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

      <header className="flex flex-col items-center text-center mb-8 sm:mb-12 relative z-10 w-full max-w-2xl">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black border border-white/20 flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)] relative group">
          <span className="absolute inset-0 bg-[#ff0000]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-xl sm:text-2xl font-bold tracking-widest text-white">AC</span>
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 border-2 border-[#050505]" />
        </div>
        
        <h1 className="text-lg sm:text-xl font-bold tracking-[0.2em] text-white uppercase mb-1 sm:mb-2">
          AlphaCops
        </h1>
      </header>

      <main className="w-full max-w-2xl flex flex-col gap-3 sm:gap-4 relative z-10">
        {LINKS_DATA.map((link, id) => {
          const isExternal = link.url.startsWith("http");

          return (
            <Link
              key={id}
              href={link.url}
              target={isExternal ? "_blank" : "_self"}
              rel={isExternal ? "noopener noreferrer" : ""}
              className={`
                group relative flex flex-col justify-center overflow-hidden border transition-all duration-300 ease-out w-full
                ${link.isBanner 
                  ? "min-h-32 sm:min-h-40 p-5 sm:p-8 border-[#ff0000]/40 hover:border-[#ff0000] hover:shadow-[0_0_30px_rgba(255,0,0,0.15)] bg-black/60" 
                  : "min-h-18 sm:min-h-20 p-4 sm:p-5 border-white/10 hover:border-white/30 bg-white/2 hover:bg-white/5"
                }
              `}
            >
              {link.bgImage && (
                <>
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-all duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${link.bgImage})` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/70 to-transparent" />
                </>
              )}

              <div className="relative z-10 flex items-center justify-between gap-3 w-full">
                <div className="flex flex-col gap-1 pr-4">
                  
                  {link.isBanner && (
                    <span className="text-[8px] sm:text-[9px] text-[#ff0000] font-bold tracking-[0.3em] uppercase mb-1 sm:mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#ff0000] animate-pulse rounded-full" />
                      Featured Release
                    </span>
                  )}

                  <h2 className={`font-bold tracking-widest uppercase flex items-center gap-2 sm:gap-3 transition-colors ${
                    link.isBanner ? "text-lg sm:text-2xl text-white" : "text-xs sm:text-sm text-white/80 group-hover:text-white"
                  }`}>
                    {link.icon && <span className="text-white/60 group-hover:text-white transition-colors">{link.icon}</span>}
                    <span className="wrap-break-word line-clamp-2">{link.title}</span>
                  </h2>
                  
                  {link.subtitle && (
                    <p className={`font-light mt-0.5 sm:mt-1 line-clamp-2 ${
                      link.isBanner ? "text-[11px] sm:text-sm text-white/70" : "text-[10px] sm:text-[11px] text-white/40"
                    }`}>
                      {link.subtitle}
                    </p>
                  )}
                </div>

                <span className={`transition-all duration-300 font-bold shrink-0 ${
                  link.isBanner ? "text-[#ff0000] text-xl group-hover:translate-x-2" : "text-white/20 group-hover:text-white/80 group-hover:translate-x-1 text-lg"
                }`}>
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </main>
    </div>
  );
}