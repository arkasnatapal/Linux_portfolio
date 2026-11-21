/**
 * ARKA OS — Ubuntu Application Dock (Ubuntu Dash)
 * 
 * Authentic Ubuntu left vertical launcher dock:
 * - Files (Nautilus)
 * - Terminal
 * - Visual Studio Code
 * - Firefox
 * - Settings
 * - Music
 * - Image Viewer
 * - Text Editor
 * - Trash
 * - 9-dot Show Applications (Activities launcher)
 * - Running application indicators (Ubuntu orange pip on left)
 */

import React from 'react';
import type { AppId } from '../types/desktop';
import {
  YaruHomeFolderIcon,
  YaruFilesIcon,
  YaruTerminalIcon,
  YaruVSCodeIcon,
  YaruChromeIcon,
  YaruSettingsIcon,
  YaruMusicIcon,
  YaruImageViewerIcon,
  YaruTextEditorIcon,
  YaruUbuntuIcon,
} from './desktop/YaruIcons';

interface UbuntuDockProps {
  runningAppIds: AppId[];
  activeAppId: AppId | null;
  onLaunchApp: (appId: AppId) => void;
  onToggleOverview: () => void;
  theme?: 'dark' | 'light';
  hideOnMobile?: boolean;
}

export const UbuntuDock: React.FC<UbuntuDockProps> = ({
  runningAppIds,
  activeAppId,
  onLaunchApp,
  onToggleOverview,
  theme = 'dark',
  hideOnMobile = false,
}) => {
  const dockApps: { id: AppId; name: string; icon: React.ReactNode }[] = [
    { id: 'about', name: 'About Arka (Home)', icon: <YaruHomeFolderIcon className="w-8 h-8" /> },
    { id: 'files', name: 'Files', icon: <YaruFilesIcon className="w-8 h-8" /> },
    { id: 'terminal', name: 'Terminal', icon: <YaruTerminalIcon className="w-8 h-8" /> },
    { id: 'vscode', name: 'Visual Studio Code', icon: <YaruVSCodeIcon className="w-8 h-8" /> },
    { id: 'chrome', name: 'Google Chrome', icon: <YaruChromeIcon className="w-8 h-8" /> },
    { id: 'textedit', name: 'Text Editor', icon: <YaruTextEditorIcon className="w-8 h-8" /> },
    { id: 'imageviewer', name: 'Gallery (Photos)', icon: <YaruImageViewerIcon className="w-8 h-8" /> },
    { id: 'music', name: 'Music', icon: <YaruMusicIcon className="w-8 h-8" /> },
    { id: 'settings', name: 'Settings', icon: <YaruSettingsIcon className="w-8 h-8" /> },
  ];

  return (
    <aside
      className={`w-[56px] h-full flex flex-col items-center justify-between py-2 select-none z-40 shrink-0 font-ubuntu shadow-xl backdrop-blur-md transition-all duration-300 ${
        hideOnMobile ? 'hidden sm:flex -translate-x-full sm:translate-x-0' : 'flex translate-x-0'
      } ${
        theme === 'light'
          ? 'bg-[#eaeaea]/95 border-r border-black/15 text-slate-800 shadow-slate-900/10'
          : 'bg-black/75 border-r border-white/10 text-white'
      }`}
    >
      {/* Top Main Application Launchers */}
      <div className="flex flex-col items-center gap-2 w-full pt-1">
        {dockApps.map((app) => {
          const isRunning = runningAppIds.includes(app.id);
          const isActive = activeAppId === app.id;

          return (
            <div key={app.id} className="relative group flex items-center justify-center w-full">
              {/* Ubuntu Running Indicator Pip */}
              {isRunning && (
                <span
                  className={`absolute left-0.5 w-1 h-3 rounded-r-full transition-all ${
                    isActive ? 'bg-[#e95420] shadow-[0_0_6px_#e95420]' : theme === 'light' ? 'bg-slate-500' : 'bg-white/60'
                  }`}
                />
              )}

              <button
                onClick={() => onLaunchApp(app.id)}
                title={app.name}
                className={`w-9 h-9 rounded-xl flex items-center justify-center shadow transition-all duration-150 cursor-pointer group-hover:scale-105 ${
                  isActive
                    ? theme === 'light' ? 'bg-black/10' : 'bg-white/15'
                    : theme === 'light' ? 'hover:bg-black/5' : 'hover:bg-white/10'
                }`}
              >
                {app.icon}
              </button>

              {/* Tooltip on hover */}
              <div className="absolute left-14 px-2 py-1 bg-[#1e1e1e] text-white text-[11px] font-medium rounded shadow-xl border border-white/10 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                {app.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Launcher: Ubuntu Show Applications */}
      <div className="flex flex-col items-center gap-2 w-full">
        {/* Ubuntu Logo Show Applications Button (Activities Launcher) */}
        <div className="relative group flex items-center justify-center w-full">
          <button
            onClick={onToggleOverview}
            title="Show Applications (Ubuntu)"
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer group-hover:scale-110 active:scale-95 shadow-md ${
              theme === 'light' ? 'hover:bg-black/10' : 'hover:bg-white/15'
            }`}
          >
            <YaruUbuntuIcon className="w-7 h-7" />
          </button>
          <div className="absolute left-14 px-2 py-1 bg-[#1e1e1e] text-white text-[11px] font-medium rounded shadow-xl border border-white/10 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
            Show Applications
          </div>
        </div>
      </div>
    </aside>
  );
};
