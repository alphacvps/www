"use client";

import React, { useState, useEffect } from "react";
import { Crosshair } from "@/components/crosshair";
import { MousePosition } from "@/types/landing";

export default function Home() {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [isCursorVisible, setIsCursorVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full font-sans overflow-x-hidden">
      <section
        className="relative h-dvh w-dvw flex flex-col justify-center px-12 transition-all duration-500 overflow-hidden"
        onMouseEnter={() => setIsCursorVisible(true)}
        onMouseLeave={() => setIsCursorVisible(false)}
      >
        <video
          src="/alphacops-intro-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-dvw h-dvh object-cover z-0 opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#060606] z-10" />

        <Crosshair mousePos={mousePos} isVisible={isCursorVisible} />

        <div className="absolute bottom-10 z-20 pointer-events-none select-none max-w-7xl">
          <h1 className="text-[clamp(3rem,10vw,110px)] font-medium leading-[0.85] uppercase tracking-tighter">
            Preparing for Tomorrow,
            <br />
            <div className="flex items-center gap-6">
              <span>Together</span>
            </div>
          </h1>
        </div>
      </section>
    </div>
  );
}
