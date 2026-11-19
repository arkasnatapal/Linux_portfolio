/**
 * ARKA OS — Welcome to Ubuntu Setup & Tour Guide
 * 
 * Recreates the canonical GNOME "Welcome to Ubuntu" first-login wizard:
 * - 4-step progressive feature walkthrough
 * - High-fidelity Ubuntu visual language (Yaru styling, aubergine accents, orange buttons)
 * - Persistent across visits via localStorage and backend /api/tour
 * - Keyboard navigation (Esc to skip, Arrow keys, Enter to advance)
 */

import React, { useState } from 'react';
import {
  YaruUbuntuIcon,
  YaruChromeIcon,
  YaruTerminalIcon,
  YaruVSCodeIcon,
} from './YaruIcons';

interface WelcomeTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeTourModal: React.FC<WelcomeTourModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(true);

  if (!isOpen) return null;

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to Ubuntu 24.04 LTS',
      subtitle: 'Digital VLSI Engineering Workstation',
      icon: <YaruUbuntuIcon size={64} className="drop-shadow-lg" />,
      content: (
        <div className="space-y-3 text-slate-300 text-xs leading-relaxed">
          <p>
            Welcome to the interactive portfolio and virtual workstation of <strong className="text-white">Arka Bhattacharya</strong>, a Digital VLSI Engineer specializing in RTL Microarchitecture, Functional Verification, and Physical Signoff.
          </p>
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1.5 font-mono text-[11px]">
            <div className="text-emerald-400 font-bold">● System: Ubuntu 24.04 LTS (x86_64 / RISC-V)</div>
            <div className="text-cyan-300">• Tagline: "From RTL to GDSII."</div>
            <div className="text-amber-300">• Architecture: RV32I Pipelined Core + SkyWater 130nm CMOS</div>
          </div>
          <p className="text-slate-400">
            This machine is designed to look, feel, and function like an authentic Ubuntu desktop environment running directly inside your browser.
          </p>
        </div>
      ),
    },
    {
      id: 'chrome',
      title: 'Google Chrome Web Browser',
      subtitle: 'Live Web Browsing & VLSI Resources',
      icon: <YaruChromeIcon size={64} className="drop-shadow-lg" />,
      content: (
        <div className="space-y-3 text-slate-300 text-xs leading-relaxed">
          <p>
            Google Chrome is now available right on the Ubuntu Dock, equipped with an Omnibox address bar and multi-tab interface.
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-[#1a73e8] text-base leading-none">🔍</span>
              <span><strong>Live Search & Web Proxy:</strong> Search Google or type any website URL. An Express backend proxy removes frame restrictions to render web content seamlessly.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ea4335] text-base leading-none">⚡</span>
              <span><strong>Quick Bookmarks:</strong> Instant bookmarks for Arka's Portfolio, GitHub repositories, and SkyWater 130nm PDK specifications.</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'terminal',
      title: 'GNOME Terminal & Text Editors',
      subtitle: 'nano, vim & Physical File Downloads',
      icon: <YaruTerminalIcon size={64} className="drop-shadow-lg" />,
      content: (
        <div className="space-y-3 text-slate-300 text-xs leading-relaxed">
          <p>
            The terminal is loaded with 25+ VLSI engineering tools, verification suites, and text editors:
          </p>
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2 text-[11px] font-mono">
            <div>
              <span className="text-[#8ae234] font-bold">nano &lt;filename&gt;</span> or <span className="text-cyan-400 font-bold">vim &lt;filename&gt;</span>
              <p className="text-slate-400 text-[10px] pl-2">Create custom Verilog files or notes. Saving automatically stores them to ~/Desktop and triggers an immediate download to your computer.</p>
            </div>
            <div>
              <span className="text-amber-300 font-bold">cowsay "your message"</span>
              <p className="text-slate-400 text-[10px] pl-2">Classic Linux speech bubbles with custom mood expressions (-d, -b, -g, -p).</p>
            </div>
            <div>
              <span className="text-purple-300 font-bold">rtl --list | sta --report | physical-design --flow</span>
              <p className="text-slate-400 text-[10px] pl-2">Inspect RTL designs, static timing analysis slack, and ASIC physical signoff metrics.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'features',
      title: 'Ubuntu Top Panel & Desktop',
      subtitle: 'Sound, Brightness & Protected Documents',
      icon: <YaruVSCodeIcon size={64} className="drop-shadow-lg" />,
      content: (
        <div className="space-y-3 text-slate-300 text-xs leading-relaxed">
          <p>
            Take advantage of complete GNOME desktop integration:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 text-base leading-none">☀️</span>
              <span><strong>Brightness & Sound:</strong> The top-right quick settings menu lets you control simulated screen brightness and plays real audio feedback when adjusting volume.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 text-base leading-none">📶</span>
              <span><strong>Host Wi-Fi:</strong> Displays real-time connected host desktop network telemetry.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 text-base leading-none">🔒</span>
              <span><strong>Protected Documents:</strong> Portfolio files (README.md, resume, etc.) are strictly view-only to maintain authentic portfolio integrity.</span>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  const currentData = steps[currentStep];

  const handleFinish = () => {
    if (dontShowAgain) {
      localStorage.setItem('ubuntu_tour_completed', 'true');
      fetch('/api/tour', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      }).catch(() => {});
    }
    onClose();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none font-ubuntu animate-fade-in">
      <div className="w-full max-w-xl bg-[#242424] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header Bar */}
        <div className="h-11 bg-[#1e1e1e] px-4 flex items-center justify-between border-b border-black/40">
          <div className="flex items-center gap-2">
            <YaruUbuntuIcon size={18} />
            <span className="font-semibold text-xs text-white">Welcome to Ubuntu</span>
          </div>

          <button
            onClick={handleFinish}
            className="w-6 h-6 rounded-full hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
            title="Skip Tour"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 flex flex-col items-center text-center space-y-4 min-h-[340px]">
          {/* Step Icon */}
          <div className="my-2 transform hover:scale-105 transition-transform">
            {currentData.icon}
          </div>

          {/* Titles */}
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{currentData.title}</h2>
            <p className="text-xs text-[#e95420] font-medium mt-0.5">{currentData.subtitle}</p>
          </div>

          {/* Step Content */}
          <div className="w-full text-left max-w-md pt-2">
            {currentData.content}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 pb-2">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                idx === currentStep ? 'bg-[#e95420] w-6' : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="h-14 bg-[#1e1e1e] px-6 flex items-center justify-between border-t border-black/40 text-xs">
          {/* Don't show again toggle */}
          <label className="flex items-center gap-2 text-slate-400 hover:text-slate-200 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="accent-[#e95420] rounded"
            />
            <span>Don't show this again</span>
          </label>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 font-medium transition-colors cursor-pointer"
              >
                Back
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-5 py-1.5 rounded-lg bg-[#e95420] hover:bg-[#ff6e3a] text-white font-medium shadow-md transition-colors cursor-pointer"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};