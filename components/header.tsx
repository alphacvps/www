"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { DecryptLink } from "./decryptLink";

import { searchPosts } from "@/lib/search"; 
import { HeaderProps } from "@/types/header";
import { SearchResult } from "@/types/search";
import { headerItems, headerSuggestedItems } from "@/config/config";

export default function Header({className}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null); 

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery(""); 
    setSearchResults([]);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const closeAll = () => {
    closeSearch();
    closeMenu();
  };

  const toggleSearch = () => {
    if (isSearchOpen) {
      closeSearch();
    } else {
      setIsSearchOpen(true);
      setIsMenuOpen(false); 
    }
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
      closeSearch(); 
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAll();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeAll();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-white/20 text-white font-bold px-0.5 rounded-sm">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const debounceTimer = setTimeout(async () => {
      try {
        const results = await searchPosts(searchQuery); 
        setSearchResults(results);
      } catch (error) {
        console.error("UPLINK_ERROR: Server fetch failed", error);
        setSearchResults([]); 
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const displayResults = searchQuery.trim() ? searchResults : headerSuggestedItems;

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  return (
    <header ref={headerRef} className={`absolute top-0 left-0 w-full z-50 font-mono text-white ${className}`}>
      <div className="w-full flex items-center justify-between px-4 md:px-6 h-14 bg-black/90 backdrop-blur-md border-b border-white/10 relative z-20">
        
        <Link 
          href="/" 
          onClick={closeAll}
          className="group flex items-center gap-3 text-[11px] font-bold tracking-[0.3em] uppercase transition-colors shrink-0"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-white/50 group-hover:bg-white transition-colors duration-300 rounded-sm" />
            <span className="w-1.5 h-1.5 bg-white/20 group-hover:bg-white/70 transition-colors duration-300 delay-75 rounded-sm" />
          </div>
          <span className="text-white/80 group-hover:text-white transition-colors duration-300">ALPHA_COPS</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-8 text-[10px] tracking-[0.2em] uppercase font-semibold">
          
          <nav className="hidden md:flex items-center gap-8">
            {headerItems.map((item, index) => (
              <DecryptLink 
                key={index} 
                href={item.href} 
                className="text-white/50 hover:text-white transition-colors"
              >
                {item.label}
              </DecryptLink>
            ))}
          </nav>

          <span className="hidden md:block text-white/10">|</span>

          <DecryptLink
            href="https://t.me/alphacvps" 
            className="hidden md:block text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            UPLINK
          </DecryptLink>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMenu}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className={`absolute w-5 h-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="square" strokeLinejoin="miter" d="M3 12h18M3 6h18M3 18h18" />
              </svg>
              <svg className={`absolute w-5 h-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={toggleSearch}
              className="relative w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300 focus:outline-none"
              aria-label="Toggle Search"
            >
              <svg className={`absolute w-4 h-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSearchOpen ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="square" strokeLinejoin="miter" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <svg className={`absolute w-4 h-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSearchOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      <div className="absolute top-14 left-0 w-full z-10">
        
        <div 
          className={`w-full bg-black/95 backdrop-blur-xl transition-[grid-template-rows,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] grid ${
            isMenuOpen 
              ? "grid-rows-[1fr] border-b border-white/10 shadow-2xl pointer-events-auto" 
              : "grid-rows-[0fr] border-transparent pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <div className={`p-6 transition-opacity duration-300 ease-out ${isMenuOpen ? "opacity-100 delay-200" : "opacity-0 delay-0"}`}>
              <div className="flex flex-col gap-1">
                {headerItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={closeAll}
                    className="text-[12px] font-bold text-white/60 hover:text-white py-4 border-b border-white/5 uppercase tracking-widest transition-colors flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <span className="text-white/20 group-hover:text-white/50 transition-colors">&gt;</span>
                  </Link>
                ))}
                <Link
                  href="https://t.me/alphacvps"
                  target="_blank"
                  onClick={closeAll}
                  className="text-[12px] font-bold text-white/60 hover:text-white py-4 uppercase tracking-widest transition-colors flex items-center justify-between group mt-2"
                >
                  <span>UPLINK</span>
                  <span className="w-1.5 h-1.5 bg-white/20 group-hover:bg-white transition-colors duration-300 rounded-sm" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div 
          className={`w-full bg-black/95 backdrop-blur-xl transition-[grid-template-rows,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] grid absolute top-0 left-0 ${
            isSearchOpen 
              ? "grid-rows-[1fr] border-b border-white/10 shadow-2xl pointer-events-auto" 
              : "grid-rows-[0fr] border-transparent pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <div className={`p-5 md:p-8 max-w-5xl mx-auto transition-opacity duration-300 ease-out ${isSearchOpen ? "opacity-100 delay-200" : "opacity-0 delay-0"}`}>
              
              <div className="relative mb-6 md:mb-8 flex items-center justify-between group">
                <div className="relative w-full">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30 text-sm font-bold transition-colors duration-300 group-focus-within:text-white">
                    &gt;
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="ENTER_QUERY..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="peer w-full bg-transparent border-none outline-none text-xs md:text-sm text-white placeholder-white/20 uppercase tracking-widest pl-6 md:pl-8 pb-3"
                    tabIndex={isSearchOpen ? 0 : -1} 
                  />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:w-full" />
                </div>
                
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pb-3 pointer-events-none">
                  {isSearching && <span className="text-[9px] text-white/40 tracking-[0.2em] animate-pulse">SCANNING_DB...</span>}
                </div>
              </div>

              <div className="text-[9px] text-white/30 tracking-widest mb-4 border-b border-white/5 pb-2">
                {searchQuery.trim() ? "QUERY_RESULTS" : "SUGGESTED_LOGS"}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-1">
                {!isSearching && displayResults.length > 0 ? (
                  displayResults.map((log, index) => (
                    <Link
                      key={index}
                      href={`/blog/${log.slug}`}
                      onClick={closeAll}
                      className="group flex flex-col justify-center text-[10px] md:text-[11px] text-white/50 py-3 border-b border-white/5 last:border-b-0 cursor-pointer overflow-hidden"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start min-w-0 pr-4">
                          <span className="text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out mr-2 md:mr-3 shrink-0 mt-0.5">
                            ↳
                          </span>
                          <div className="flex flex-col group-hover:translate-x-1 transition-all duration-300">
                            <span className="uppercase tracking-wider font-semibold text-white/70 group-hover:text-white truncate">
                              {highlightText(log.title, searchQuery)}
                            </span>
                            {log.excerpt && (
                              <span className="text-[9px] text-white/30 mt-1 line-clamp-2 tracking-wide leading-relaxed">
                                {highlightText(log.excerpt, searchQuery)}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-white/10 group-hover:text-white/30 transition-colors shrink-0 font-mono mt-0.5">
                          LOG_{String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : !isSearching && displayResults.length === 0 ? (
                  <div className="text-[10px] md:text-[11px] text-white/30 py-3 uppercase tracking-wider flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-red-500/50 rounded-full animate-pulse shrink-0" />
                    <span className="truncate">NULL_RESULT : &quot;{searchQuery}&quot;</span>
                  </div>
                ) : null}
              </div>

            </div>
          </div>
        </div>

      </div>
    </header>
  );
}