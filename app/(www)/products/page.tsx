"use client";

import Button from "@/components/button";
import { SOCIAL_URLS } from "@/config/config";
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

const PRODUCTS_DATA: Product[] = [];

export default function ProductsPage() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <div className="min-h-dvh bg-[#050505] text-[#e0e0e0] font-mono selection:bg-[#ff0000]/30 selection:text-white pb-16 mt-20">
      <main className="max-w-7xl mx-auto px-6 pt-12 md:pt-16">
        <section className="mb-16 flex flex-col items-center justify-center gap-6 text-center">
          <h1 className="text-sm md:text-base font-mono font-medium tracking-[0.3em] text-white/80 uppercase">
            Software Ecosystem
          </h1>

          <Button
            href={SOCIAL_URLS.GitHub}
            target="_blank"
            variant="secondary"
            leftIcon={
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            Visit our GitHub
          </Button>
        </section>

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
                <span
                  className={`px-2 py-0.5 border text-[9px] font-bold ${
                    product.status === "ACTIVE" || product.status === "STABLE"
                      ? "border-green-500/30 text-green-400"
                      : "border-yellow-500/30 text-yellow-400"
                  }`}
                >
                  {product.status}
                </span>
              </div>

              <p className="text-sm text-white/60 font-light leading-relaxed mb-6 grow">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {product.techStack.map((tech, id) => (
                  <span
                    key={id}
                    className="text-[10px] border border-white/10 bg-black/60 px-2 py-1 text-white/40 tracking-wider"
                  >
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
                          <a
                            href={product.downloads.win}
                            className="block px-4 py-3 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            &gt; Scarica per Windows (.exe)
                          </a>
                        )}
                        {product.downloads.mac && (
                          <a
                            href={product.downloads.mac}
                            className="block px-4 py-3 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            &gt; Scarica per macOS (.dmg)
                          </a>
                        )}
                        {product.downloads.linux && (
                          <a
                            href={product.downloads.linux}
                            className="block px-4 py-3 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            &gt; Scarica per Linux (.tar.gz)
                          </a>
                        )}
                        {product.githubUrl && (
                          <a
                            href={product.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-3 text-xs text-[#ff0000]/80 hover:text-[#ff0000] hover:bg-white/5 transition-colors font-bold border-t border-white/10"
                          >
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
                  <button
                    disabled
                    className="w-full text-xs font-bold tracking-widest border border-white/5 bg-white/2 text-white/20 py-3 text-center uppercase cursor-not-allowed"
                  >
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
