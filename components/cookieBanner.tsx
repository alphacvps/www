"use client";

import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookie_consent_status');
    
    if (!hasConsented) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent_status', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent_status', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 pointer-events-none flex justify-center">
      <style>{`
        @keyframes slide-up-fade {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div 
        className="pointer-events-auto relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 p-6 md:p-8 shadow-2xl font-mono text-white/80"
        style={{ animation: 'slide-up-fade 0.4s ease-out forwards' }}
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center justify-between">
          
          <div className="space-y-2 flex-1">
            <h3 className="text-xs tracking-widest uppercase font-semibold text-white">
              Cookie Policy
            </h3>
            <p className="text-sm text-white/50 font-light leading-relaxed">
              We use cookies to improve your browsing experience, analyze site traffic, and ensure the proper functioning of the website. You can choose to accept or decline non-essential cookies.
            </p>
          </div>

          <div className="flex flex-row gap-3 w-full md:w-auto shrink-0 text-xs tracking-wider uppercase">
            <button
              onClick={handleDecline}
              className="flex-1 md:flex-none px-6 py-3 border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-none px-6 py-3 bg-white text-black font-semibold hover:bg-white/90 transition-all duration-200"
            >
              Accept
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}