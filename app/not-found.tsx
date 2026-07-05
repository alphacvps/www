"use client";

import Button from '@/components/button';

export default function NotFound() {
  return (
    <div 
      className="relative w-full h-dvh bg-[#050505] text-[#e0e0e0] font-mono overflow-hidden flex justify-between items-center p-8 select-none"
    >
      <div className="max-w-md md:ml-12 space-y-6 z-10">
        <div className="space-y-1">
          <div className="text-[10px] uppercase text-[#ff0000] font-bold tracking-[0.2em] flex items-center gap-2">
            <span className="w-1 h-1 bg-[#ff0000] animate-ping" />
            [ status: sector_unmapped ]
          </div>
          <h1 className="text-3xl font-light text-white/90 tracking-tighter">
            No signal detected at this vector.
          </h1>
        </div>
        
        <p className="text-xs text-white/50 font-light leading-relaxed max-w-xs">
          The path you requested does not match any active deployment grid, drone route, or tactical asset. You are idling in unassigned airspace.
        </p>

        <div className="pt-2">
          <Button
            href="/"
          >
            &gt; re_route_to_base
          </Button>
        </div>
      </div>
    </div>
  );
}