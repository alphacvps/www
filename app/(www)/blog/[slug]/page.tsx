import ReactMarkdown, { Components } from "react-markdown";
import { getPostData } from "@/lib/posts";
import { PostData } from "@/types/post";
import { notFound } from "next/navigation";
import Link from "next/link";
import CodeBlock from "@/components/codeBlock";

const MarkdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mb-6 mt-12 flex items-center gap-3 text-2xl font-light tracking-tight text-white/90 uppercase border-b border-white/10 pb-4">
      {children}
    </h1>
  ),
  
  h2: ({ children }) => (
    <h2 className="mb-4 mt-10 text-xl font-bold">
      {children}
    </h2>
  ),

  p: ({ children }) => (
    <p className="mb-6 leading-relaxed text-sm text-white/60 font-light last:mb-0">
      {children}
    </p>
  ),

  a: ({ children, href }) => (
    <Link
      href={href || ""}
      className="text-[#ff0000] transition-colors duration-300 hover:text-white underline underline-offset-4 decoration-[#ff0000]/30 hover:decoration-white/50"
    >
      {children}
    </Link>
  ),

  ul: ({ children }) => <ul className="mb-6 ml-2 space-y-3">{children}</ul>,
  
  li: ({ children }) => (
    <li className="flex items-start text-sm text-white/60 font-light">
      <span className="mr-3 select-none text-[#ff0000] text-xs mt-0.5">
        &gt;
      </span>
      <div>{children}</div>
    </li>
  ),

  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-[#ff0000] bg-[#ff0000]/5 pl-4 pr-4 py-3 font-light italic text-white/50 relative">
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff0000]/30" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ff0000]/30" />
      {children}
    </blockquote>
  ),

  img: ({ src, alt }) => (
    <div className="my-10 relative group overflow-hidden border border-white/10">
      <div className="absolute inset-0 bg-[#ff0000]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
      <img
        src={src}
        alt={alt}
        className="w-full object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
      />
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#ff0000] opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#ff0000] opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none" />
    </div>
  ),

  code: ({ node, className, children, ...props }) => {
    const isBlock = /language-(\w+)/.exec(className || "");
    const language = isBlock ? isBlock[1] : "SYS_CODE";
    
    const codeContent = String(children).replace(/\n$/, "");

    if (isBlock) {
      return <CodeBlock language={language} value={codeContent} />;
    }

    return (
      <code
        className="bg-[#ff0000]/10 border border-[#ff0000]/20 px-1.5 py-0.5 text-[0.9em] font-mono font-medium text-[#ff0000] rounded"
        {...props}
      >
        {children}
      </code>
    );
  },
};

interface PostProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params;
  let postData: PostData;

  try { postData = getPostData(slug); }
  catch { return notFound(); }

  return (
    <div className="min-h-dvh bg-[#050505] text-[#e0e0e0] font-mono selection:bg-[#ff0000]/30 selection:text-white relative overflow-hidden pb-20">
      <article className="relative z-10 max-w-3xl mx-auto px-6 pt-20">
        <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-16 text-[10px] tracking-[0.2em] uppercase text-white/40">
          <Link href="/blog" className="hover:text-[#ff0000] transition-colors flex items-center gap-2">
            &lt; Return_To_Feed
          </Link>
          <div>STATUS: DECRYPTED</div>
        </div>

        <header className="mb-16 space-y-6">
          <div className="flex items-center gap-4 text-[10px] tracking-widest text-[#ff0000]">
            <span className="border border-[#ff0000]/20 bg-[#ff0000]/5 px-2 py-1">
              INTEL_LOG
            </span>
            <span>{postData.date}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white/90 leading-tight">
            {postData.title}
          </h1>
        </header>

        <section className="relative">
          <ReactMarkdown components={MarkdownComponents}>
            {postData.content || ""}
          </ReactMarkdown>
        </section>

        {postData.warning && (
          <div className="mt-16 border border-[#ff0000]/20 bg-[#ff0000]/[0.03] p-5 relative">
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#ff0000] font-semibold mb-3">
              &#x25B7; Warning
            </div>
            <p className="text-xs text-white/50 font-light leading-relaxed">
              This content is provided for educational and informational purposes only. 
              The techniques and tools described are intended to be used exclusively 
              within authorized environments and in compliance with applicable laws. 
              Any misuse of this information is solely the responsibility of the reader.
            </p>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff0000]/30" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ff0000]/30" />
          </div>
        )}
      </article>
    </div>
  );
}