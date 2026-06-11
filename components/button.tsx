"use client";

import Link, { LinkProps } from 'next/link';
import React, { useRef, AnchorHTMLAttributes } from 'react';

interface TacticalButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}

export default function TacticalButton({
  children,
  href,
  className = '',
  accentColor = '255, 0, 0',
  ...props
}: TacticalButtonProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    linkRef.current.style.setProperty('--mouse-x', `${x}px`);
    linkRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden bg-[#050505] border border-white/10 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-white hover:border-white/20 select-none block w-fit ${className}`}
      style={{
        '--btn-color': accentColor,
        '--mouse-x': '-100px',
        '--mouse-y': '-100px',
      } as React.CSSProperties}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      <div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 80px at var(--mouse-x) var(--mouse-y), rgba(var(--btn-color), 0.15), transparent 100%)`,
        }}
      />

      <div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(var(--btn-color), 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--btn-color), 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '4px 4px',
          WebkitMaskImage: `radial-gradient(circle 60px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 60px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)`,
        }}
      />

      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/20 group-hover:border-[rgb(var(--btn-color))] transition-colors duration-300" />
      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-[rgb(var(--btn-color))] transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-[rgb(var(--btn-color))] transition-colors duration-300" />
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/20 group-hover:border-[rgb(var(--btn-color))] transition-colors duration-300" />
    </Link>
  );
}