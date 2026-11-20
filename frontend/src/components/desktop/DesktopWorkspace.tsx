/**
 * ARKA OS — Ubuntu Desktop Workspace Canvas
 * 
 * Manages:
 * - Ubuntu Desktop Wallpaper with geometric aubergine gradients
 * - Desktop Icons (Home, Trash, README.md, riscv_core.sv, projects)
 * - Desktop Right-Click Context Menu
 * - Application Windows Layer
 */

import React, { useState } from 'react';
import type { AppId } from '../../types/desktop';
import {
  YaruHomeFolderIcon,
  YaruGithubIcon,
  YaruLinkedinIcon,
  YaruTerminalIcon,
} from './YaruIcons';

interface DesktopWorkspaceProps {
  onOpenApp: (appId: AppId, params?: any) => void;
  theme?: 'dark' | 'light';
  children: React.ReactNode;
}

export const DesktopWorkspace: React.FC<DesktopWorkspaceProps> = ({
  onOpenApp,
  theme = 'dark',
  children,
}) => {
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ visible: false, x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent) => {
    // Only open if clicking directly on the desktop canvas
    if ((e.target as HTMLElement).closest('.desktop-window')) return;

    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const desktopIcons = [
    {
      id: 'home',
      name: 'Home',
      icon: <YaruHomeFolderIcon className="w-11 h-11" />,
      action: () => onOpenApp('about'),
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: <YaruGithubIcon className="w-11 h-11" />,
      action: () => {
        window.open('https://github.com/arkasnatapal', '_blank');
      },
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <YaruLinkedinIcon className="w-11 h-11" />,
      action: () => {
        window.open('https://linkedin.com/in/arkasnata-pal-6a3682276', '_blank');
      },
    },
    {
      id: 'resume',
      name: 'Resume.pdf',
      icon: (
        <div className="w-10 h-11 bg-[#e01b24] rounded p-1 text-[9px] font-mono font-bold text-white flex flex-col justify-between shadow">
          <span>PDF</span>
          <span className="text-[8px] text-red-200">.pdf</span>
        </div>
      ),
      action: () => onOpenApp('pdfviewer'),
    },
    {
      id: 'terminal',
      name: 'Terminal',
      icon: <YaruTerminalIcon className="w-11 h-11" />,
      action: () => onOpenApp('terminal'),
    },
    {
      id: 'readme',
      name: 'README.md',
      icon: (
        <div className="w-10 h-11 bg-[#5e5c64] rounded p-1 text-[9px] font-mono font-bold text-white flex flex-col justify-between shadow">
          <span>DOC</span>
          <span className="text-[8px] text-slate-300">.md</span>
        </div>
      ),
      action: () => onOpenApp('textedit', { file: '/home/arka/README.md' }),
    },
    {
      id: 'master_adv',
      name: 'master_adv.v',
      icon: (
        <div className="w-10 h-11 bg-[#26a269] rounded p-1 text-[9px] font-mono font-bold text-white flex flex-col justify-between shadow">
          <span>HDL</span>
          <span className="text-[8px] text-emerald-200">.v</span>
        </div>
      ),
      action: () => onOpenApp('vscode', { file: '/home/arka/codes/SPI/master_adv.v' }),
    },
  ];

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={() => {
        if (contextMenu.visible) setContextMenu({ visible: false, x: 0, y: 0 });
      }}
      className={`w-full h-full relative overflow-hidden font-ubuntu select-none transition-colors duration-300 ${
        theme === 'light' ? 'ubuntu-wallpaper-light' : 'ubuntu-wallpaper'
      }`}
    >
      {/* Subtle Ubuntu Geometric Mascot / Circle Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <svg
          viewBox="-142.5 -142.5 285 285"
          className={`w-[680px] h-[680px] transition-opacity duration-500 translate-x-20 translate-y-6 ${
            theme === 'light' ? 'opacity-[0.07]' : 'opacity-[0.05]'
          }`}
          fill={theme === 'light' ? '#77216F' : '#ffffff'}
        >
          <g id="cof-mark">
            <circle cx="106.2" cy="0" r="23" />
            <path d="M 0 0 M 64.9 23.6 A 69 69 0 0 1 23.6 64.9 L 34.2 95.8 A 101.5 101.5 0 0 0 95.8 34.2 Z" />
            <path d="M 0 0 M 97.4 34.7 A 103.5 103.5 0 0 0 97.4 -34.7 L 66 -23.5 A 71 71 0 0 1 66 23.5 Z" />
          </g>
          <use href="#cof-mark" transform="rotate(120)" />
          <use href="#cof-mark" transform="rotate(240)" />
        </svg>
      </div>

      {/* Desktop Icons Column (Wraps nicely if height is constrained) */}
      <div className="absolute top-4 left-4 flex flex-col flex-wrap max-h-[calc(100vh-4.5rem)] gap-3 z-10">
        {desktopIcons.map((item) => (
          <div
            key={item.id}
            onClick={item.action}
            onDoubleClick={item.action}
            className={`w-20 flex flex-col items-center gap-1 p-1.5 rounded-xl cursor-pointer active:scale-95 transition-all text-center group ${
              theme === 'light'
                ? 'hover:bg-black/10 active:bg-black/20'
                : 'hover:bg-white/10 active:bg-white/20'
            }`}
          >
            <div className="group-hover:scale-105 transition-transform drop-shadow-md">
              {item.icon}
            </div>
            <span
              className={`text-xs font-medium truncate w-full px-1 ${
                theme === 'light'
                  ? 'text-slate-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)] font-bold'
                  : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]'
              }`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Render Open Application Windows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="pointer-events-auto h-full w-full">
          {children}
        </div>
      </div>

      {/* Desktop Right-Click Context Menu */}
      {contextMenu.visible && (
        <div
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className={`fixed border rounded-xl shadow-2xl py-1 text-xs z-50 w-52 font-ubuntu ${
            theme === 'light'
              ? 'bg-[#f8f8f8] border-slate-300 text-slate-800 shadow-slate-900/20'
              : 'bg-[#2d2d2d] border-white/10 text-slate-200'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              onOpenApp('terminal');
              setContextMenu({ visible: false, x: 0, y: 0 });
            }}
            className="w-full text-left px-3.5 py-2 hover:bg-[#e95420] hover:text-white transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>&gt;_</span>
            <span>Open in Terminal</span>
          </button>
          <button
            onClick={() => {
              onOpenApp('files');
              setContextMenu({ visible: false, x: 0, y: 0 });
            }}
            className="w-full text-left px-3.5 py-2 hover:bg-[#e95420] hover:text-white transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>📁</span>
            <span>Open Files Manager</span>
          </button>
          <div className={`border-t my-1 ${theme === 'light' ? 'border-black/10' : 'border-white/10'}`} />
          <button
            onClick={() => {
              onOpenApp('settings');
              setContextMenu({ visible: false, x: 0, y: 0 });
            }}
            className="w-full text-left px-3.5 py-2 hover:bg-[#e95420] hover:text-white transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>🎨</span>
            <span>Change Background / Theme...</span>
          </button>
          <button
            onClick={() => {
              onOpenApp('settings');
              setContextMenu({ visible: false, x: 0, y: 0 });
            }}
            className="w-full text-left px-3.5 py-2 hover:bg-[#e95420] hover:text-white transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>⚙️</span>
            <span>Display Settings</span>
          </button>
        </div>
      )}
    </div>
  );
};
