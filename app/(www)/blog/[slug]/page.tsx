import ReactMarkdown, { Components } from "react-markdown";
import { getPostData } from "@/lib/posts";
import { PostData } from "@/types/post";
import { notFound } from "next/navigation";
import Link from "next/link";
import CodeBlock from "@/components/codeBlock";
import Image from "next/image";

interface PostProps {
  params: Promise<{ slug: string }>;
}

const MarkdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mb-6 mt-12 flex items-center gap-3 border-b border-white/10 pb-4 text-2xl font-light uppercase tracking-tight text-white/90">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="mb-4 mt-10 text-xl font-bold">{children}</h2>
  ),

  p: ({ children }) => (
    <p className="mb-6 text-sm font-light leading-relaxed text-white/60 last:mb-0">
      {children}
    </p>
  ),

  a: ({ children, href, ...props }) => {
    if (!href) {
      return <span>{children}</span>;
    }

    const className =
      "text-[#ff0000] underline decoration-[#ff0000]/30 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-white/50";

    if (/^(https?:\/\/|mailto:|tel:)/i.test(href)) {
      return (
        <a
          href={href}
          className={className}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  },

  ul: ({ children }) => <ul className="mb-6 ml-2 space-y-3">{children}</ul>,

  li: ({ children }) => (
    <li className="flex items-start text-sm font-light text-white/60">
      <span className="mr-3 mt-0.5 select-none text-xs text-[#ff0000]">
        &gt;
      </span>
      <div>{children}</div>
    </li>
  ),

  blockquote: ({ children }) => (
    <blockquote className="relative my-8 border-l-2 border-[#ff0000] bg-[#ff0000]/5 py-3 pl-4 pr-4 font-light italic text-white/50">
      <div className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-[#ff0000]/30" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#ff0000]/30" />
      {children}
    </blockquote>
  ),

  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") return null;

    return (
      <div className="group relative my-10 aspect-video overflow-hidden border border-white/10">
        <div className="pointer-events-none absolute inset-0 z-10 bg-[#ff0000]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <Image
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          className="h-full w-full object-cover opacity-80 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
        />

        <div className="pointer-events-none absolute left-0 top-0 z-20 h-3 w-3 border-l border-t border-[#ff0000] opacity-0 transition-all duration-300 group-hover:opacity-100" />

        <div className="pointer-events-none absolute bottom-0 right-0 z-20 h-3 w-3 border-b border-r border-[#ff0000] opacity-0 transition-all duration-300 group-hover:opacity-100" />
      </div>
    );
  },

  code: ({ className, children, ...props }) => {
    const match = /language-([\w-]+)/.exec(className || "");
    const codeContent = String(children).replace(/\n$/, "");

    if (match) {
      return <CodeBlock language={match[1]} value={codeContent} />;
    }

    return (
      <code
        className="rounded border border-[#ff0000]/20 bg-[#ff0000]/10 px-1.5 py-0.5 font-mono text-[0.9em] font-medium text-[#ff0000]"
        {...props}
      >
        {children}
      </code>
    );
  },
};

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params;
  let postData: PostData;

  try {
    postData = getPostData(slug);
  } catch {
    return notFound();
  }

  return (
    <div className="min-h-dvh bg-[#050505] text-[#e0e0e0] font-mono selection:bg-[#ff0000]/30 selection:text-white relative overflow-hidden pb-20">
      <article className="relative z-10 max-w-3xl mx-auto px-6 pt-20">
        <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-16 text-[10px] tracking-[0.2em] uppercase text-white/40">
          <Link
            href="/blog"
            className="hover:text-[#ff0000] transition-colors flex items-center gap-2"
          >
            &lt; Return_To_Feed
          </Link>
          <div>STATUS: DECRYPTED</div>
        </div>

        <header className="mb-16 space-y-6">
          <div className="flex items-center gap-4 text-[10px] tracking-widest text-[#ff0000]">
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
      </article>
    </div>
  );
}
