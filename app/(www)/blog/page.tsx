import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { PostData } from "@/types/post";
import { BlogPost, PriorityFeed } from "@/components/carousel";
import { DecryptLink } from "@/components/decryptLink";

const CONFIG = {
  carouselInterval: 6000,
  sysName: "ALPHACOPS // INTEL_DATABASE",
};

const MANUAL_FEATURED_POSTS: BlogPost[] = [
  {
    id: "operazione-shadowfall",
    title: "OPERATION: SHADOWFALL",
    excerpt: "Dati di ricognizione iniziali rilevati nel Settore 7. Si consiglia massima discrezione.",
    date: "2026-06-04",
    category: "MISSION_BRIEF",
    classification: "TOP_SECRET"
  },
  {
    id: "breccia-di-sistema-rilevata",
    title: "BREACH_DETECTED // NODE_04",
    excerpt: "Analisi delle vulnerabilità riscontrate nel nodo di sicurezza perimetrale. Patch in corso.",
    date: "2026-06-02",
    category: "SYS_ALERT",
    classification: "CRITICAL"
  },
  {
    id: "aggiornamento-protocolli",
    title: "AGGIORNAMENTO PROTOCOLLI ALPHA",
    excerpt: "Nuove direttive operative per le unità di pattuglia nel distretto neon.",
    date: "2026-05-28",
    category: "DIRECTIVE",
    classification: "RESTRICTED"
  }
];

export default function BlogPage() {
  const dynamicGridPosts: PostData[] = getSortedPostsData();

  return (
    <div className="min-h-dvh bg-[#050505] text-[#e0e0e0] font-mono selection:bg-[#ff0000]/30 selection:text-white p-6 md:p-12 relative overflow-hidden mt-20">

      <main className="relative z-10 max-w-7xl mx-auto space-y-24">
        
        {MANUAL_FEATURED_POSTS.length > 0 && (
          <PriorityFeed posts={MANUAL_FEATURED_POSTS} intervalMs={CONFIG.carouselInterval} />
        )}

        {dynamicGridPosts.length > 0 && (
          <section className="space-y-6">
            <div className="flex justify-between items-end border-b border-white/10 pb-2 text-[10px] uppercase tracking-widest text-white/40">
              <div>POSTS:</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dynamicGridPosts.map((post) => (
                <Link 
                  href={`/blog/${post.id}`} 
                  key={post.id}
                  className="group relative border border-white/5 bg-black/40 p-6 hover:bg-white/3 hover:border-white/20 transition-all duration-500 flex flex-col justify-between h-full min-h-62.5"
                >
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/0 group-hover:border-[#ff0000] transition-all duration-300" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/0 group-hover:border-[#ff0000] transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/0 group-hover:border-[#ff0000] transition-all duration-300" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/0 group-hover:border-[#ff0000] transition-all duration-300" />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[9px] tracking-widest text-white/30">
                      <time>{post.date}</time>
                      <span className="uppercase text-[#ff0000]/60 border border-white/5 px-2 py-0.5 group-hover:border-[#ff0000]/30 transition-colors">
                        LOG_ARCHIVE
                      </span>
                    </div>
                    <h3 className="text-lg font-light text-white/80 group-hover:text-white transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-xs text-white/40 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <DecryptLink className="w-fit mt-8 text-[10px] tracking-[0.2em] text-[#ff0000] uppercase opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                    &gt; Read_Log
                  </DecryptLink>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}