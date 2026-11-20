/**
 * ARKA OS — Complete Ubuntu GNOME Desktop Environment Coordinator
 * 
 * Manages:
 * - Window manager state (open, minimize, maximize, close, stacking order)
 * - Dock application launches & running indicators
 * - GNOME top bar, Activities overview, and Calendar dropdown
 * - Live volume & simulated display brightness
 * - Shared virtual filesystem synchronization across all apps
 */

import React, { useState } from 'react';
import type { AppId, WindowInstance } from '../../types/desktop';
import { GNOMETopBar } from '../GNOMETopBar';
import { UbuntuDock } from '../UbuntuDock';
import { DesktopWorkspace } from './DesktopWorkspace';
import { ApplicationWindow } from './ApplicationWindow';
import { ActivitiesOverview } from './ActivitiesOverview';
import { CalendarPopup } from './CalendarPopup';
import { WelcomeTourModal } from './WelcomeTourModal';

// Applications
import { AboutMeApp } from '../apps/AboutMeApp';
import { FilesApp } from '../apps/FilesApp';
import { TerminalWindow } from '../TerminalWindow';
import { VSCodeApp } from '../apps/VSCodeApp';
import { GoogleChromeApp } from '../apps/GoogleChromeApp';
import { SettingsApp } from '../apps/SettingsApp';
import { TextEditorApp } from '../apps/TextEditorApp';
import { ImageViewerApp } from '../apps/ImageViewerApp';
import { MusicApp } from '../apps/MusicApp';
import { PDFViewerModal } from '../apps/PDFViewerModal';
import { MusicPlayerProvider } from '../../context/MusicPlayerContext';

interface DesktopEnvironmentProps {
  onLogout: () => void;
  onRestart: () => void;
  onShutdown?: () => void;
}

export const DesktopEnvironment: React.FC<DesktopEnvironmentProps> = (props) => {
  return (
    <MusicPlayerProvider>
      <DesktopEnvironmentInner {...props} />
    </MusicPlayerProvider>
  );
};

const DesktopEnvironmentInner: React.FC<DesktopEnvironmentProps> = ({
  onLogout,
  onRestart,
  onShutdown,
}) => {
  // Window manager state: Clean desktop on login (so wallpaper & desktop icons are visible immediately)
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = useState<number>(10);

  // Ubuntu Theme state: 'dark' (Default Yaru) or 'light' (Yaru Light)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('ubuntu_theme') as 'dark' | 'light') || 'dark';
  });

  const handleToggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('ubuntu_theme', next);
      return next;
    });
  };

  const handleSetTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    localStorage.setItem('ubuntu_theme', newTheme);
  };

  // System UI state
  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(85);
  const [brightness, setBrightness] = useState<number>(100);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(() => {
    return localStorage.getItem('ubuntu_tour_completed') !== 'true';
  });

  // Listen for manual tour trigger & PDF viewer trigger
  React.useEffect(() => {
    const handleOpenTour = () => setIsTourOpen(true);
    const handleOpenPdf = () => setIsPdfModalOpen(true);

    window.addEventListener('open-ubuntu-tour', handleOpenTour);
    window.addEventListener('open-pdf-viewer', handleOpenPdf);

    return () => {
      window.removeEventListener('open-ubuntu-tour', handleOpenTour);
      window.removeEventListener('open-pdf-viewer', handleOpenPdf);
    };
  }, []);

  // Focus a window and bring it to the front
  const focusWindow = (id: string) => {
    setActiveWindowId(id);
    setWindows(prev =>
      prev.map(w => {
        if (w.id === id) {
          const nextZ = highestZIndex + 1;
          setHighestZIndex(nextZ);
          return { ...w, zIndex: nextZ, isMinimized: false };
        }
        return w;
      })
    );
  };

  // Launch an application or focus its existing instance
  const handleLaunchApp = (appId: AppId, params?: any) => {
    if (appId === 'pdfviewer') {
      setIsPdfModalOpen(true);
      return;
    }

    const existing = windows.find(w => w.appId === appId);
    if (existing) {
      if (existing.isMinimized) {
        setWindows(prev =>
          prev.map(w => (w.id === existing.id ? { ...w, isMinimized: false, params: params || w.params } : w))
        );
      }
      focusWindow(existing.id);
      return;
    }

    // Default window dimensions and titles per application
    const appDefaults: Record<AppId, { title: string; width: number; height: number }> = {
      about: { title: 'About Arka', width: 880, height: 580 },
      terminal: { title: 'Terminal', width: 860, height: 540 },
      files: { title: 'Files — /home/arka', width: 820, height: 520 },
      vscode: { title: 'Visual Studio Code — VLSI Workspace', width: 920, height: 580 },
      chrome: { title: 'Google Chrome', width: 940, height: 600 },
      firefox: { title: 'Google Chrome', width: 940, height: 600 },
      settings: { title: 'Settings', width: 720, height: 500 },
      textedit: { title: 'Text Editor', width: 700, height: 480 },
      imageviewer: { title: 'Image Viewer', width: 760, height: 520 },
      music: { title: 'Rhythmbox Music Player', width: 660, height: 490 },
      video: { title: 'Totem Video Player', width: 700, height: 460 },
      trash: { title: 'Trash — Files', width: 740, height: 480 },
      pdfviewer: { title: 'Document Viewer — Arkasnata_Pal_Resume.pdf', width: 850, height: 600 },
    };

    const def = appDefaults[appId] || { title: appId, width: 760, height: 500 };
    const nextZ = highestZIndex + 1;
    setHighestZIndex(nextZ);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const cascadeOffset = (windows.length % 6) * 30;
    const newWindow: WindowInstance = {
      id: `win-${appId}-${Date.now()}`,
      appId: appId === 'trash' ? 'files' : appId,
      title: def.title,
      isMinimized: false,
      isMaximized: isMobile ? true : false,
      zIndex: nextZ,
      x: isMobile ? 0 : Math.max(80, Math.min(window.innerWidth - def.width - 40, 80 + cascadeOffset)),
      y: isMobile ? 28 : Math.max(40, Math.min(window.innerHeight - def.height - 40, 50 + cascadeOffset)),
      width: isMobile ? window.innerWidth : Math.min(window.innerWidth - 90, def.width),
      height: isMobile ? window.innerHeight - 28 : Math.min(window.innerHeight - 80, def.height),
      params,
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
  };

  const handleCloseWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) {
      const remaining = windows.filter(w => w.id !== id);
      if (remaining.length > 0) {
        setActiveWindowId(remaining[remaining.length - 1].id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const handleMinimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isMinimized: true } : w)));
    if (activeWindowId === id) {
      const activeRest = windows.filter(w => w.id !== id && !w.isMinimized);
      if (activeRest.length > 0) {
        setActiveWindowId(activeRest[activeRest.length - 1].id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const handleToggleMaximize = (id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)));
  };

  const handleMoveWindow = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, x, y } : w)));
  };

  // Currently active window object
  const activeWindow = windows.find(w => w.id === activeWindowId && !w.isMinimized);
  const runningAppIds = Array.from(new Set(windows.map(w => w.appId)));

  return (
    <div
      style={{ filter: `brightness(${brightness}%)` }}
      className="flex-1 flex flex-col h-full w-full overflow-hidden font-ubuntu select-none transition-[filter]"
    >
      {/* Ubuntu GNOME Shell Top Panel */}
      <GNOMETopBar
        activeAppTitle={activeWindow ? activeWindow.title.split('—')[0].trim() : ''}
        onToggleOverview={() => {
          setIsCalendarOpen(false);
          setIsOverviewOpen(!isOverviewOpen);
        }}
        onToggleCalendar={() => {
          setIsOverviewOpen(false);
          setIsCalendarOpen(!isCalendarOpen);
        }}
        onLogout={onLogout}
        onRestart={onRestart}
        volume={volume}
        onVolumeChange={setVolume}
        brightness={brightness}
        onBrightnessChange={setBrightness}
        theme={theme}
        onThemeToggle={handleToggleTheme}
        onOpenSettings={() => handleLaunchApp('settings')}
        onShutdown={onShutdown}
      />

      {/* Desktop Body Canvas: Left Dock + Desktop Workspace */}
      <div className="flex-1 flex flex-row overflow-hidden relative w-full h-[calc(100dvh-1.75rem)]">
        {/* Ubuntu Application Dock — Permanently Pinned Left Panel (Hides on Mobile when Window Active) */}
        <UbuntuDock
          runningAppIds={runningAppIds}
          activeAppId={activeWindow?.appId || null}
          onLaunchApp={handleLaunchApp}
          onToggleOverview={() => setIsOverviewOpen(!isOverviewOpen)}
          theme={theme}
          hideOnMobile={windows.some(w => !w.isMinimized)}
        />

        {/* Desktop Workspace with Windows (Full Remaining Width & Height) */}
        <div className="flex-1 h-full w-full overflow-hidden relative">
          <DesktopWorkspace onOpenApp={handleLaunchApp} theme={theme}>
            {windows.map((win) => {
              const isActive = win.id === activeWindowId;

              return (
                <ApplicationWindow
                  key={win.id}
                  instance={win}
                  isActive={isActive}
                  onFocus={() => focusWindow(win.id)}
                  onMinimize={() => handleMinimizeWindow(win.id)}
                  onMaximize={() => handleToggleMaximize(win.id)}
                  onClose={() => handleCloseWindow(win.id)}
                  onMove={(x, y) => handleMoveWindow(win.id, x, y)}
                  theme={theme}
                >
                  {/* Render active application contents inside window */}
                  {win.appId === 'about' && (
                    <AboutMeApp theme={theme} />
                  )}

                  {win.appId === 'terminal' && (
                    <TerminalWindow
                      onLogout={onLogout}
                      onClose={() => handleCloseWindow(win.id)}
                      isMaximized={win.isMaximized}
                      onToggleMaximize={() => handleToggleMaximize(win.id)}
                      initialCwd={win.params?.cwd}
                    />
                  )}

                  {win.appId === 'files' && (
                    <FilesApp
                      initialPath={win.params?.path || '/home/arka'}
                      onOpenFile={(filePath) => {
                        if (filePath.toLowerCase().endsWith('.pdf')) {
                          handleLaunchApp('pdfviewer');
                        } else if (filePath.endsWith('.sv') || filePath.endsWith('.v')) {
                          handleLaunchApp('vscode', { file: filePath });
                        } else {
                          handleLaunchApp('textedit', { file: filePath });
                        }
                      }}
                      onOpenInTerminal={(path) => {
                        handleLaunchApp('terminal', { cwd: path });
                      }}
                    />
                  )}

                  {win.appId === 'vscode' && (
                    <VSCodeApp initialFile={win.params?.file} />
                  )}

                  {(win.appId === 'chrome' || win.appId === 'firefox') && (
                    <GoogleChromeApp />
                  )}

                  {win.appId === 'settings' && (
                    <SettingsApp
                      volume={volume}
                      onVolumeChange={setVolume}
                      brightness={brightness}
                      onBrightnessChange={setBrightness}
                      theme={theme}
                      onThemeChange={handleSetTheme}
                    />
                  )}

                  {win.appId === 'textedit' && (
                    <TextEditorApp initialFile={win.params?.file} />
                  )}

                  {win.appId === 'imageviewer' && (
                    <ImageViewerApp />
                  )}

                  {win.appId === 'music' && (
                    <MusicApp />
                  )}
                </ApplicationWindow>
              );
            })}
          </DesktopWorkspace>
        </div>
      </div>

      {/* Activities Overview Overlay */}
      {isOverviewOpen && (
        <ActivitiesOverview
          windows={windows}
          activeWindowId={activeWindowId}
          onSelectWindow={(id) => {
            focusWindow(id);
            setIsOverviewOpen(false);
          }}
          onCloseWindow={handleCloseWindow}
          onLaunchApp={(appId) => {
            handleLaunchApp(appId);
            setIsOverviewOpen(false);
          }}
          onCloseOverview={() => setIsOverviewOpen(false)}
        />
      )}

      {/* Calendar & Notifications Center Overlay */}
      {isCalendarOpen && (
        <CalendarPopup
          onClose={() => setIsCalendarOpen(false)}
          onOpenMusic={() => handleLaunchApp('music')}
        />
      )}

      {/* First-Time Welcome to Ubuntu Tour Guide Wizard */}
      <WelcomeTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
      />

      {/* GNOME Evince Resume PDF Viewer Modal */}
      <PDFViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        theme={theme}
      />
    </div>
  );
};
