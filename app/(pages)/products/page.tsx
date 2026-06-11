"use client";

import Link from "next/link";
import { useState } from "react";

interface DownloadUrls {
  win?: string;
  mac?: string;
  linux?: string;
}

interface Product {
  name: string;
  status: "STABLE" | "BETA" | "ACTIVE";
  description: string;
  techStack: string[];
  githubUrl?: string;
  downloads?: DownloadUrls;
}

const PRODUCTS_DATA: Product[] = [
  {
    name: "WCCT",
    status: "ACTIVE",
    description: "Sviluppato per gestire pipeline di dati critiche in ambienti isolati. Ottimizza i flussi di lavoro complessi riducendo al minimo l'allocazione di memoria e garantendo tempi di risposta inferiori ai 2 millisecondi.",
    techStack: ["Go"],
    githubUrl: "https://github.com/alphacops/wcct"
  },
];

export default function ProductsPage() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-mono selection:bg-[#ff0000]/30 selection:text-white pb-16 mt-20">
      <main className="max-w-7xl mx-auto px-6 pt-12 md:pt-16">
        
        <header className="mb-12">
          <h1 className="text-2xl font-bold tracking-[0.2em] text-white uppercase flex items-center gap-3">
            <span className="w-2 h-2 bg-[#ff0000] inline-block rounded-sm animate-pulse" />
            Software Ecosystem
          </h1>
          <Link href={"https://github.com/alphacops"} target="_black">Visit our GitHub</Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS_DATA.map((product, id) => (
            <article 
              key={id}
              className="group flex flex-col p-6 border border-white/10 bg-black/40 hover:border-white/20 transition-all duration-300 relative"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-white tracking-wide uppercase">
                  {product.name}
                </h2>
                <span className={`px-2 py-0.5 border text-[9px] font-bold ${
                  product.status === "ACTIVE" || product.status === "STABLE"
                    ? "border-green-500/30 text-green-400" 
                    : "border-yellow-500/30 text-yellow-400"
                }`}>
                  {product.status}
                </span>
              </div>

              <p className="text-sm text-white/60 font-light leading-relaxed mb-6 grow">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {product.techStack.map((tech, id) => (
                  <span key={id} className="text-[10px] border border-white/10 bg-black/60 px-2 py-1 text-white/40 tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="relative mt-6 pt-2">
                {product.downloads ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(id)}
                      className="w-full text-xs font-bold tracking-widest border border-white/10 bg-white/5 text-white/70 hover:bg-[#ff0000] hover:border-[#ff0000] hover:text-white py-3 transition-all text-center uppercase flex items-center justify-center gap-2"
                    >
                      Ottieni Software
                      <span className="text-[9px] text-white/40 group-hover:text-white">
                        {openDropdownId === id ? "▲" : "▼"}
                      </span>
                    </button>

                    {openDropdownId === id && (
                      <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#0a0a0a] border border-white/20 z-10 divide-y divide-white/5 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150">
                        {product.downloads.win && (
                          <a href={product.downloads.win} className="block px-4 py-3 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                            &gt; Scarica per Windows (.exe)
                          </a>
                        )}
                        {product.downloads.mac && (
                          <a href={product.downloads.mac} className="block px-4 py-3 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                            &gt; Scarica per macOS (.dmg)
                          </a>
                        )}
                        {product.downloads.linux && (
                          <a href={product.downloads.linux} className="block px-4 py-3 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                            &gt; Scarica per Linux (.tar.gz)
                          </a>
                        )}
                        {product.githubUrl && (
                          <a href={product.githubUrl} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-xs text-[#ff0000]/80 hover:text-[#ff0000] hover:bg-white/5 transition-colors font-bold border-t border-white/10">
                            &gt; Vedi Repository GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </>
                ) : product.githubUrl ? (
                  <a
                    href={product.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-xs font-bold tracking-widest border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white py-3 transition-all text-center uppercase"
                  >
                    Apri GitHub →
                  </a>
                ) : (
                  <button disabled className="w-full text-xs font-bold tracking-widest border border-white/5 bg-white/2 text-white/20 py-3 text-center uppercase cursor-not-allowed">
                    Non_Disponibile
                  </button>
                )}
              </div>

            </article>
          ))}
        </div>
        
      </main>
    </div>
  );
}