/**
 * ARKA OS — Ubuntu-Styled GDM (GNOME Display Manager) Login Screen
 * 
 * Recreates the authentic Ubuntu 24.04/22.04 GDM login experience:
 * - Rich Ubuntu aubergine desktop wallpaper backdrop
 * - Centered user profile with avatar and Ubuntu orange accents
 * - Sleek pill-shaped GDM password input with arrow action button
 * - Lower right shutdown icon button to power down the workstation
 */

import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onShutdown?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onShutdown,
}) => {
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAuthenticating) return;

    setIsAuthenticating(true);

    setTimeout(() => {
      onLoginSuccess();
    }, 450);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen ubuntu-gdm-wallpaper text-slate-100 font-ubuntu select-none flex flex-col items-center justify-center z-40 overflow-hidden">
      {/* Main GDM Centered User Card */}
      <div className="w-full max-w-xs flex flex-col items-center animate-fade-in -translate-y-4">
        {/* User Avatar Circle (Ubuntu style with subtle orange border) */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-[#3e1335] border-2 border-[#e95420] flex items-center justify-center shadow-2xl">
            <svg className="w-12 h-12 text-slate-200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          {/* VLSI active indicator */}
          <span
            title="Workstation Status: Ready"
            className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#2c0b26]"
          />
        </div>

        {/* User Name & Details */}
        <h2 className="text-xl font-bold text-white tracking-wide text-center">
          {PORTFOLIO_DATA.engineer.fullName}
        </h2>
        <div className="flex items-center gap-2 mt-1 mb-6 text-xs text-slate-300">
          <span className="text-[#e95420] font-medium">{PORTFOLIO_DATA.engineer.handle}</span>
          <span>&bull;</span>
          <span className="text-slate-400">{PORTFOLIO_DATA.engineer.title}</span>
        </div>

        {/* Ubuntu GDM Pill Password Input */}
        <form onSubmit={handleLogin} className="w-full relative">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              disabled={isAuthenticating}
              className="w-full bg-black/40 hover:bg-black/50 focus:bg-black/60 text-white placeholder-slate-400 text-sm px-4 py-2.5 rounded-full border border-slate-700/80 focus:border-[#e95420] focus:ring-1 focus:ring-[#e95420] outline-none transition-all pr-11 shadow-inner font-ubuntu"
            />
            {/* Arrow / Submit button inside pill (Ubuntu GDM icon) */}
            <button
              type="submit"
              disabled={isAuthenticating}
              className="absolute right-1.5 w-7 h-7 rounded-full bg-[#e95420] hover:bg-[#ff6e3a] text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95 disabled:opacity-50"
              title="Log In"
            >
              {isAuthenticating ? (
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              )}
            </button>
          </div>

          <div className="text-center mt-3 text-[11px] text-slate-400">
            Press <kbd className="px-1.5 py-0.5 bg-black/40 rounded text-slate-300 border border-slate-700 font-mono text-[10px]">Enter</kbd> to unlock workstation
          </div>
        </form>
      </div>

      {/* Lower Right Corner: Shutdown Icon to shutdown the website */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
        <button
          onClick={onShutdown}
          title="Shutdown / Power Off Workstation"
          className="w-12 h-12 rounded-full bg-black/40 hover:bg-[#c7162b] text-slate-300 hover:text-white border border-white/10 hover:border-red-500/60 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xl active:scale-90 group"
        >
          <svg
            className="w-6 h-6 transition-transform group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
            <line x1="12" y1="2" x2="12" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
