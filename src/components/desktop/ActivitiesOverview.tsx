/**
 * ARKA OS — GNOME Shell Activities Overview
 * 
 * Full-screen overview displaying:
 * - Search bar (apps, files, commands)
 * - Running window tiles
 * - Application launcher grid
 * - Workspaces switcher rail
 */

import React, { useState } from 'react';
import type { WindowInstance, AppId } from '../../types/desktop';
import {
  YaruHomeFolderIcon,
  YaruTerminalIcon,
  YaruFilesIcon,
  YaruVSCodeIcon,
  YaruChromeIcon,
  YaruSettingsIcon,
  YaruTextEditorIcon,
  YaruImageViewerIcon,
  YaruMusicIcon,
} from './YaruIcons';

interface ActivitiesOverviewProps {
  windows: WindowInstance[];
  activeWindowId: string | null;
  onSelectWindow: (id: string) => void;
  onCloseWindow: (id: string) => void;
  onLaunchApp: (appId: AppId) => void;
  onCloseOverview: () => void;
}

export const ActivitiesOverview: React.FC<ActivitiesOverviewProps> = ({
  windows,
  onSelectWindow,
  onCloseWindow,
  onLaunchApp,
  onCloseOverview,
}) => {
  const [search, setSearch] = useState('');

  const allApps: { id: AppId; name: string; icon: React.ReactNode }[] = [
    { id: 'about', name: 'About Arka', icon: <YaruHomeFolderIcon className="w-12 h-12" /> },
    { id: 'terminal', name: 'Terminal', icon: <YaruTerminalIcon className="w-12 h-12" /> },
    { id: 'files', name: 'Files', icon: <YaruFilesIcon className="w-12 h-12" /> },
    { id: 'vscode', name: 'VS Code', icon: <YaruVSCodeIcon className="w-12 h-12" /> },
    { id: 'chrome', name: 'Google Chrome', icon: <YaruChromeIcon className="w-12 h-12" /> },
    { id: 'settings', name: 'Settings', icon: <YaruSettingsIcon className="w-12 h-12" /> },
    { id: 'textedit', name: 'Text Editor', icon: <YaruTextEditorIcon className="w-12 h-12" /> },
    { id: 'imageviewer', name: 'Image Viewer', icon: <YaruImageViewerIcon className="w-12 h-12" /> },
    { id: 'music', name: 'Music', icon: <YaruMusicIcon className="w-12 h-12" /> },
  ];

  const filteredApps = allApps.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div
      onClick={onCloseOverview}
      className="fixed inset-0 top-7 bg-black/80 backdrop-blur-md z-40 flex flex-col items-center p-6 text-slate-100 font-ubuntu select-none animate-fade-in overflow-y-auto"
    >
      {/* Top Search Input */}
      <div className="w-full max-w-md my-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center bg-[#252525]/90 border border-white/10 rounded-full px-4 py-2 shadow-xl focus-within:border-[#e95420] transition-colors">
          <svg className="w-4 h-4 text-slate-400 mr-2.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type to search..."
            autoFocus
            className="w-full bg-transparent border-none outline-none text-white text-sm"
          />
        </div>
      </div>

      {/* Running Windows Showcase */}
      {windows.length > 0 && (
        <div className="w-full max-w-4xl my-6" onClick={(e) => e.stopPropagation()}>
          <div className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-wider">
            Active Windows ({windows.length})
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {windows.map((win) => (
              <div
                key={win.id}
                onClick={() => {
                  onSelectWindow(win.id);
                  onCloseOverview();
                }}
                className="bg-[#242424] hover:bg-[#2e2e2e] border border-white/10 hover:border-[#e95420] rounded-xl p-3 shadow-xl transition-all cursor-pointer group flex flex-col justify-between h-40"
              >
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="font-bold text-xs text-white truncate max-w-[80%]">{win.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseWindow(win.id);
                    }}
                    className="w-5 h-5 rounded-full hover:bg-[#c7162b] text-slate-400 hover:text-white flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center text-slate-600">
                  <span className="text-3xl">🪟</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono text-center">
                  Click to switch to window
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Applications Grid */}
      <div className="w-full max-w-3xl my-6" onClick={(e) => e.stopPropagation()}>
        <div className="text-xs uppercase font-bold text-slate-400 mb-4 tracking-wider text-center">
          Applications
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-6 justify-items-center">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                onLaunchApp(app.id);
                onCloseOverview();
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/10 transition-transform active:scale-95 cursor-pointer w-24 group"
            >
              <div className="group-hover:scale-105 transition-transform">
                {app.icon}
              </div>
              <span className="text-xs text-slate-200 font-medium text-center truncate w-full">
                {app.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
