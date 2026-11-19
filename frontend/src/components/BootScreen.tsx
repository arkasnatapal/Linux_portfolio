/**
 * Official Ubuntu Plymouth Boot Splash Screen
 * 
 * Recreates the authentic Ubuntu 24.04/22.04 OEM boot splash:
 * - Pure black background
 * - Official Ubuntu "Circle of Friends" emblem in center
 * - Plymouth circular rotating loading spinner
 * - Canonical "ubuntu" wordmark at bottom center
 * - Fully skippable via ESC, Space, or Skip button
 */

import React, { useState, useEffect, useRef } from 'react';
import { YaruUbuntuIcon } from './desktop/YaruIcons';

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [logoVisible, setLogoVisible] = useState<boolean>(false);
  const [spinnerVisible, setSpinnerVisible] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const isTerminatedRef = useRef<boolean>(false);

  // Trigger smooth exit to login
  const triggerExit = () => {
    if (isTerminatedRef.current) return;
    isTerminatedRef.current = true;
    setIsFadingOut(true);
    setTimeout(() => {
      onBootComplete();
    }, 500);
  };

  // Keyboard shortcut to skip (Escape, Space, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape' || e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        triggerExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Ubuntu Plymouth Timeline
  useEffect(() => {
    // Reveal Ubuntu emblem
    const tLogo = setTimeout(() => {
      setLogoVisible(true);
    }, 300);

    // Start Plymouth spinner
    const tSpinner = setTimeout(() => {
      setSpinnerVisible(true);
    }, 600);

    // Boot duration ~3.2 seconds then smooth transition
    const tComplete = setTimeout(() => {
      triggerExit();
    }, 3400);

    return () => {
      clearTimeout(tLogo);
      clearTimeout(tSpinner);
      clearTimeout(tComplete);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-black text-slate-100 font-ubuntu select-none overflow-hidden flex flex-col justify-between items-center p-6 md:p-12 z-50 transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
      }`}
    >
      {/* Top right discreet Skip button */}
      <div className="w-full flex justify-end items-center">
        <button
          onClick={triggerExit}
          className="text-slate-600 hover:text-slate-400 bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full text-[11px] font-sans tracking-wide transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span>Skip</span>
          <span className="text-[9px] text-slate-500 font-mono px-1 py-0.5 rounded bg-black/40 border border-white/10">
            ESC
          </span>
        </button>
      </div>

      {/* Center: Official Ubuntu Circle of Friends Emblem & Plymouth Spinner */}
      <div className="flex flex-col items-center justify-center my-auto">
        {/* Official Ubuntu Circle of Friends (CoF) Logo */}
        <div
          className={`w-24 h-24 md:w-28 md:h-28 transition-all duration-700 ease-out transform ${
            logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <YaruUbuntuIcon className="w-full h-full drop-shadow-[0_0_24px_rgba(233,84,32,0.4)]" />
        </div>

        {/* Ubuntu Plymouth Circular Rotating Spinner */}
        <div
          className={`mt-14 transition-opacity duration-500 ${
            spinnerVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-9 h-9 flex items-center justify-center">
            {/* Plymouth rotating gradient arc */}
            <svg
              className="w-9 h-9 animate-plymouth-spin"
              viewBox="0 0 50 50"
            >
              <circle
                cx="25"
                cy="25"
                r="19"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="3"
              />
              <circle
                cx="25"
                cy="25"
                r="19"
                fill="none"
                stroke="url(#ubuntuSpin)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="32 100"
              />
              <defs>
                <linearGradient id="ubuntuSpin" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="70%" stopColor="#e95420" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#e95420" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Center: Official "ubuntu" wordmark */}
      <div className="w-full flex justify-center items-center pb-4">
        <span className="text-white font-ubuntu font-normal tracking-[0.05em] text-2xl lowercase select-none">
          ubuntu
        </span>
      </div>
    </div>
  );
};
