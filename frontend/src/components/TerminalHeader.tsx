/**
 * ARKA OS — Ubuntu GNOME Terminal Header (Yaru Dark Theme)
 * 
 * Recreates the authentic Ubuntu GNOME Terminal header bar:
 * - Ubuntu Yaru dark header background (#2a2a2a / #242424)
 * - Tabs / Title: "arka@vlsi-workstation: ~"
 * - Window controls on the RIGHT: Minimize (—), Maximize (□), Close (✕)
 * - Authentic GNOME action icons: New Tab (+), Search, Menu
 */

import React from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';

interface TerminalHeaderProps {
  cwd: string;
  isMaximized: boolean;
  onToggleMaximize: () => void;
  onMinimize: () => void;
  onClose: () => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  cwd,
  isMaximized,
  onToggleMaximize,
  onMinimize,
  onClose,
}) => {
  const displayDir = cwd.startsWith(PORTFOLIO_DATA.engineer.handle)
    ? '~' + cwd.slice(PORTFOLIO_DATA.engineer.handle.length)
    : cwd === '/home/' + PORTFOLIO_DATA.engineer.handle
    ? '~'
    : cwd.replace('/home/' + PORTFOLIO_DATA.engineer.handle, '~');

  return (
    <div className="h-9 bg-[#262626] border-b border-black/40 px-3 flex items-center justify-between select-none shrink-0 font-ubuntu">
      {/* Left: Ubuntu Terminal Tab / App Indicator */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#300a24]/80 border-t-2 border-[#e95420] text-xs text-white font-medium rounded-t shadow-sm">
          <span className="text-[#8ae234] font-bold">{PORTFOLIO_DATA.engineer.handle}@{PORTFOLIO_DATA.engineer.hostname}</span>
          <span className="text-slate-400">:</span>
          <span className="text-[#729fcf] font-bold">{displayDir}</span>
        </div>
        <button
          title="New Tab"
          className="w-6 h-6 rounded hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Center: Search & Options */}
      <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400">
        <span className="hover:text-slate-200 cursor-pointer">File</span>
        <span className="hover:text-slate-200 cursor-pointer">Edit</span>
        <span className="hover:text-slate-200 cursor-pointer">View</span>
        <span className="hover:text-slate-200 cursor-pointer">Terminal</span>
        <span className="hover:text-slate-200 cursor-pointer">Help</span>
      </div>

      {/* Right: Ubuntu Yaru Window Controls (Minimize, Maximize, Close) */}
      <div className="flex items-center gap-1">
        {/* Minimize */}
        <button
          onClick={onMinimize}
          title="Minimize"
          className="w-7 h-7 rounded-full hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <svg className="w-3 h-3 fill-current" viewBox="0 0 16 16">
            <path d="M3 8h10v1H3z" />
          </svg>
        </button>

        {/* Maximize / Restore */}
        <button
          onClick={onToggleMaximize}
          title={isMaximized ? "Restore" : "Maximize"}
          className="w-7 h-7 rounded-full hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          {isMaximized ? (
            <svg className="w-3 h-3 fill-current" viewBox="0 0 16 16">
              <path d="M4 2v2H2v10h10v-2h2V2H4zm8 10H3V5h9v7zm2-2h-1V4H5V3h9v7z" />
            </svg>
          ) : (
            <svg className="w-3 h-3 fill-current" viewBox="0 0 16 16">
              <path d="M3 3v10h10V3H3zm9 9H4V4h8v8z" />
            </svg>
          )}
        </button>

        {/* Close Button (Ubuntu Yaru red highlight on hover) */}
        <button
          onClick={onClose}
          title="Close"
          className="w-7 h-7 rounded-full hover:bg-[#c7162b] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer ml-0.5"
        >
          <svg className="w-3 h-3 fill-current" viewBox="0 0 16 16">
            <path d="M4.146 3.146a.5.5 0 0 0-.708.708L7.293 8l-3.855 3.846a.5.5 0 0 0 .708.708L8 8.707l3.846 3.847a.5.5 0 0 0 .708-.708L8.707 8l3.847-3.846a.5.5 0 0 0-.708-.708L8 7.293 4.146 3.146z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
