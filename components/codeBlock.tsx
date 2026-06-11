"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language: string;
  value: string;
}

export default function CodeBlock({ language, value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Impossibile copiare il codice: ", err);
    }
  };

  return (
    <div className="my-8 relative border border-white/10 bg-[#0c0c0c] overflow-hidden rounded group font-mono">
      <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2.5 select-none">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff0000]">
          [ {language} ]
        </span>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleCopy}
            className="text-[10px] uppercase tracking-wider text-zinc-400 hover:text-white border border-transparent hover:border-[#ff0000]/40 bg-transparent px-2 py-0.5 rounded transition-all active:scale-95"
          >
            {copied ? "[ COPIED! ]" : "[ COPY_CODE ]"}
          </button>
          
          <span className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
          </span>
        </div>
      </div>

      <div className="p-1 text-[13px] md:text-sm leading-relaxed overflow-x-auto custom-scrollbar">
        <SyntaxHighlighter
          language={language}
          style={darcula}
          PreTag="div"
          customStyle={{
            margin: 0,
            background: "transparent",
            padding: "1rem",
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}