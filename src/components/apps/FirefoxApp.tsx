/**
 * ARKA OS — Mozilla Firefox Web Browser Application
 * 
 * Simulated browser window running inside Ubuntu GNOME:
 * - Tab bar with add tab
 * - Navigation toolbar (Back, Forward, Refresh, Home, Security Lock)
 * - URL address bar
 * - Bookmarks bar
 * - Embedded interactive web portfolio page
 */

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../config/portfolioData';

export const FirefoxApp: React.FC = () => {
  const [inputUrl, setInputUrl] = useState<string>('https://arka-vlsi.dev');
  const [page, setPage] = useState<'home' | 'projects' | 'docs' | 'github'>('home');

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.includes('projects')) setPage('projects');
    else if (inputUrl.includes('docs')) setPage('docs');
    else if (inputUrl.includes('github')) setPage('github');
    else setPage('home');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1c1b22] text-slate-100 font-ubuntu select-none overflow-hidden">
      {/* Firefox Top Tabs Bar */}
      <div className="h-9 bg-[#0c0c0d] px-2 flex items-center gap-1 shrink-0">
        <div className="flex items-center gap-2 px-3 h-8 bg-[#2b2a33] text-white text-xs font-medium rounded-t-lg shadow-sm border-t-2 border-[#e95420]">
          <span className="text-[#ff9400]">🦊</span>
          <span className="truncate max-w-[140px]">ARKA VLSI Portfolio</span>
          <span className="text-slate-400 hover:text-white cursor-pointer ml-1">✕</span>
        </div>
        <button className="w-6 h-6 rounded-full hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center text-sm cursor-pointer">
          +
        </button>
      </div>

      {/* Navigation Toolbar */}
      <div className="h-10 bg-[#2b2a33] px-3 flex items-center gap-2 border-b border-black/30 shrink-0">
        <div className="flex items-center gap-1 text-slate-300">
          <button className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer">
            ‹
          </button>
          <button className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer">
            ›
          </button>
          <button className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer">
            ↻
          </button>
        </div>

        {/* URL Bar */}
        <form onSubmit={handleNavigate} className="flex-1 flex items-center">
          <div className="w-full flex items-center bg-[#1c1b22] border border-white/10 focus-within:border-[#0060df] rounded-full px-3 py-1 text-xs text-white">
            <span className="text-emerald-400 mr-2 text-sm">🔒</span>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-slate-100 font-mono text-xs"
            />
          </div>
        </form>
      </div>

      {/* Bookmarks Bar */}
      <div className="h-7 bg-[#2b2a33] px-3 flex items-center gap-4 text-xs text-slate-300 border-b border-black/20 shrink-0">
        <button
          onClick={() => {
            setInputUrl('https://arka-vlsi.dev');
            setPage('home');
          }}
          className="flex items-center gap-1 hover:text-white cursor-pointer"
        >
          <span>⚡</span>
          <span>ARKA Overview</span>
        </button>
        <button
          onClick={() => {
            setInputUrl('https://arka-vlsi.dev/projects');
            setPage('projects');
          }}
          className="flex items-center gap-1 hover:text-white cursor-pointer"
        >
          <span>💾</span>
          <span>Tapeout Projects</span>
        </button>
        <button
          onClick={() => {
            setInputUrl('https://skywater-pdk.readthedocs.io');
            setPage('docs');
          }}
          className="flex items-center gap-1 hover:text-white cursor-pointer"
        >
          <span>📖</span>
          <span>Sky130 PDK Docs</span>
        </button>
      </div>

      {/* Web Page Viewport */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#18181b] text-slate-200">
        <div className="max-w-3xl mx-auto space-y-6">
          {page === 'home' && (
            <>
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 to-slate-900 border border-white/10 space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-[#e95420]/20 text-[#e95420] text-xs font-semibold">
                  Official Digital VLSI Engineering Portfolio
                </div>
                <h1 className="text-2xl font-bold text-white">
                  {PORTFOLIO_DATA.engineer.fullName}
                </h1>
                <p className="text-sm text-cyan-400 font-mono">
                  {PORTFOLIO_DATA.engineer.title} &bull; {PORTFOLIO_DATA.engineer.tagline}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {PORTFOLIO_DATA.engineer.summary}
                </p>
              </div>

              {/* Key Competencies */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                  <span className="text-xl">⚙️</span>
                  <div className="font-bold text-sm text-white">RTL Microarchitecture</div>
                  <p className="text-xs text-slate-400">Pipelined RV32I, dynamic branch predictor, AXI4 bus crossbar & FIFOs.</p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                  <span className="text-xl">🧪</span>
                  <div className="font-bold text-sm text-white">Functional Verification</div>
                  <p className="text-xs text-slate-400">99.4% coverage UVM environments, concurrent SVA protocol checkers.</p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                  <span className="text-xl">💎</span>
                  <div className="font-bold text-sm text-white">Physical Signoff</div>
                  <p className="text-xs text-slate-400">Zero-error Magic DRC & Netgen LVS tapeouts on SkyWater 130nm CMOS.</p>
                </div>
              </div>
            </>
          )}

          {page === 'projects' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-white/10 pb-2">
                Published Silicon Tapeouts & Designs
              </h2>
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-white">{proj.name}</span>
                    <span className="text-xs font-mono text-[#e95420] uppercase">{proj.category}</span>
                  </div>
                  <p className="text-xs text-slate-300">{proj.description}</p>
                </div>
              ))}
            </div>
          )}

          {page === 'docs' && (
            <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-3 font-mono text-xs">
              <h2 className="text-base font-bold text-cyan-400 font-sans">SkyWater 130nm Open PDK Documentation</h2>
              <p className="text-slate-300">
                The SkyWater Open Source PDK is a collaboration between Google and SkyWater Technology to provide a fully open source Process Design Kit (PDK).
              </p>
              <div className="bg-slate-900/60 p-3 rounded space-y-1 text-slate-400">
                <div>• Technology: 130nm CMOS 1P5M (1 Poly, 5 Metal)</div>
                <div>• Standard Cells: sky130_fd_sc_hd (High Density)</div>
                <div>• Supply Voltage: 1.8V Core / 3.3V I/O</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
