"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import { DecryptLink } from "./decryptLink";
import { footerItems, socialLinks } from "@/config/config";

const rulerNumbers: number[] = [90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145]

const CONFIG = {
  grid: { rows: 15, cols: 25 },
  colors: {
    base: "#060606",
    text: "#060606",
    pixel: "#ff0000",
  },
  contact: {
    title: "SUPPORT",
    email: "ALPHACOPS@GMAIL.COM",
  },
};

const Footer = () => {
  const [percentVisible, setPercentVisible] = useState(0);
  const [localTime, setLocalTime] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const TOTAL_PIXELS = CONFIG.grid.rows * CONFIG.grid.cols;

  const pixelIndices = useMemo(() => {
    const indices = Array.from({ length: TOTAL_PIXELS }, (_, i) => i);

    indices.sort((a, b) => {
      const colA = a % CONFIG.grid.cols;
      const rowA = Math.floor(a / CONFIG.grid.cols);
      const colB = b % CONFIG.grid.cols;
      const rowB = Math.floor(b / CONFIG.grid.cols);

      const noiseA = Math.abs(
        (Math.sin(rowA * 12.9898 + colA * 78.233) * 43758.5453) % 1,
      );
      const noiseB = Math.abs(
        (Math.sin(rowB * 12.9898 + colB * 78.233) * 43758.5453) % 1,
      );

      return -rowA + noiseA * 6 - (-rowB + noiseB * 6);
    });

    return indices;
  }, [TOTAL_PIXELS]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let visibilityPercentage = 1 - rect.top / window.innerHeight;

      if (visibilityPercentage > 0.98) visibilityPercentage = 1;
      setPercentVisible(Math.max(0, Math.min(1, visibilityPercentage)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const numPixelsToShow = Math.ceil(TOTAL_PIXELS * percentVisible);
  const visiblePixelsSet = useMemo(() => {
    return new Set(pixelIndices.slice(0, numPixelsToShow));
  }, [pixelIndices, numPixelsToShow]);

  useEffect(() => {
    setIsMounted(true);

    const updateClock = () => {
      const now = new Date();
      const day = now
        .toLocaleDateString("en-US", {
          weekday: "short",
          timeZone: "Europe/Rome",
        })
        .toUpperCase();
      const time = now.toLocaleTimeString("it-IT", {
        timeZone: "Europe/Rome",
        hour12: false,
      });

      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Rome",
        timeZoneName: "short",
      });
      const tzName =
        formatter.formatToParts(now).find((p) => p.type === "timeZoneName")
          ?.value || "CET";

      setLocalTime(`${day} ${time} (${tzName})`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative w-full h-dvh overflow-hidden font-sans select-none"
      style={{ backgroundColor: CONFIG.colors.base }}
    >
      <div
        className="absolute inset-0 z-0 grid"
        style={{
          gridTemplateRows: `repeat(${CONFIG.grid.rows}, 1fr)`,
          gridTemplateColumns: `repeat(${CONFIG.grid.cols}, 1fr)`,
        }}
      >
        {Array.from({ length: TOTAL_PIXELS }).map((_, i) => {
          const isVisible = visiblePixelsSet.has(i);
          return (
            <div
              key={i}
              className="w-full h-full transition-all duration-500 origin-center"
              style={{
                backgroundColor: CONFIG.colors.pixel,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1)" : "scale(0.4)",
                transitionTimingFunction:
                  "cubic-bezier(0.175, 0.885, 0.32, 1.1)",
              }}
            />
          );
        })}
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">
        {Array.from({ length: CONFIG.grid.rows }).map((_, i) => (
          <div
            key={i}
            className="w-full flex-1 border-b"
            style={{ borderColor: CONFIG.colors.base }}
          />
        ))}
      </div>

      <div
        className="relative z-20 h-full w-full flex flex-col justify-between p-4 md:p-8"
        style={{ color: CONFIG.colors.text }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 uppercase font-bold text-xs md:text-sm tracking-tight">
          <div className="flex flex-col space-y-4 col-span-2">
            <div>
              <p className="text-[10px] opacity-70">{CONFIG.contact.title}</p>
              <Link
                href={`mailto:` + CONFIG.contact.email.toLowerCase()}
                className="border-b-[1.5px] border-current inline-block"
              >
                {CONFIG.contact.email}
              </Link>
            </div>
          </div>

          <div className="flex flex-col space-y-1 text-lg md:text-2xl font-black tracking-tighter">
            {footerItems.map((link, idx) => (
              <DecryptLink key={idx} href={link.href} className="w-fit">
                {link.label}
              </DecryptLink>
            ))}
          </div>

          <div className="flex flex-col items-end text-xs space-y-1">
            {socialLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                target="_blank"
                className="flex items-center space-x-1 hover:opacity-70"
              >
                <DecryptLink>{link.title}</DecryptLink> <span>↗</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full pb-4">
          <div className="w-full flex justify-between items-end mb-2 overflow-hidden">
            <svg
              className="w-full h-auto block"
              viewBox="0 0 1000 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text
                x="0"
                y="135"
                fill="currentColor"
                fontSize="150"
                fontWeight="900"
                letterSpacing="-0.04em"
                textLength="980"
                lengthAdjust="spacingAndGlyphs"
              >
                ALPHACOPS
              </text>
            </svg>
          </div>

          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest pt-2">
            <p>©{new Date().getFullYear()} ALPHACOPS. ALL RIGHTS RESERVED.</p>
            <p className="tabular-nums">
              {isMounted ? localTime : "LOADING..."}
            </p>
          </div>

          <style>{`
            @keyframes slide-ruler {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-100%); }
            }
            .animate-ruler {
              animation: slide-ruler 20s linear infinite;
            }
          `}</style>

          <div className="w-full mt-2 overflow-hidden flex text-[8px] opacity-70">
            <div className="flex animate-ruler min-w-full shrink-0">
              {rulerNumbers.map((num, i) => (
                <div
                  key={i}
                  className="flex-1 border-l border-current pl-1 h-4 flex items-end min-w-10 md:min-w-15"
                >
                  <span>{num}</span>
                </div>
              ))}
            </div>

            <div
              className="flex animate-ruler min-w-full shrink-0"
              aria-hidden="true"
            >
              {rulerNumbers.map((num, i) => (
                <div
                  key={`dup-${i}`}
                  className="flex-1 border-l border-current pl-1 h-4 flex items-end min-w-10 md:min-w-15"
                >
                  <span>{num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
