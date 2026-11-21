/**
 * ARKA OS — GNOME Desktop Panel / Ubuntu Top Bar
 * 
 * Recreates the exact Ubuntu 24.04 / GNOME Shell top panel:
 * - Left: "Activities" (toggles Activities Overview) + Active Application Title
 * - Center: Date and Time (toggles Calendar & Notification Center)
 * - Right: Combined Quick Settings Menu (Network, Volume, Power, Sliders)
 */

import React, { useState, useEffect } from 'react';
import { useMusicPlayer } from '../context/MusicPlayerContext';

interface GNOMETopBarProps {
  activeAppTitle: string;
  onToggleOverview: () => void;
  onToggleCalendar: () => void;
  onLogout: () => void;
  onRestart: () => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  brightness: number;
  onBrightnessChange: (b: number) => void;
  theme?: 'dark' | 'light';
  onThemeToggle?: () => void;
  onOpenSettings?: () => void;
  onShutdown?: () => void;
}

export const GNOMETopBar: React.FC<GNOMETopBarProps> = ({
  activeAppTitle,
  onToggleOverview,
  onToggleCalendar,
  onLogout,
  onRestart,
  volume,
  onVolumeChange,
  brightness,
  onBrightnessChange,
  theme = 'dark',
  onThemeToggle,
  onOpenSettings,
  onShutdown,
}) => {
  const { currentTrack, isPlaying } = useMusicPlayer();
  const [timeStr, setTimeStr] = useState<string>('');
  const [showQuickSettings, setShowQuickSettings] = useState<boolean>(false);
  const [networkInfo, setNetworkInfo] = useState<{ ssid: string; status: string; ip: string }>({
    ssid: 'Free Bird',
    status: 'Connected',
    ip: '192.168.1.104',
  });

  // Play subtle feedback beep on volume slide
  const playVolumeFeedback = (vol: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      gain.gain.setValueAtTime((vol / 100) * 0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  useEffect(() => {
    // Native browser online status listener
    const handleOnlineStatus = () => {
      const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
      setNetworkInfo(prev => ({
        ...prev,
        status: isOnline ? 'Connected' : 'Disconnected',
        ssid: isOnline ? (prev.ssid || 'Host Network') : 'Offline',
      }));
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    // Fetch live network telemetry (handled by Vite dev middleware or serverless api)
    fetch('/api/network')
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data && data.ssid) {
          setNetworkInfo({
            ssid: data.ssid || 'Host Network',
            status: 'Connected',
            ip: data.ip || '192.168.1.104',
          });
        }
      })
      .catch(() => {
        // Graceful fallback to default host network state
      });

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      setTimeStr(now.toLocaleDateString('en-US', options).replace(',', ''));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={`h-7 border-b font-ubuntu text-xs px-3 flex items-center justify-between select-none z-30 shadow-md shrink-0 transition-colors ${
      theme === 'light'
        ? 'bg-[#ebebeb]/95 border-black/15 text-slate-800'
        : 'bg-[#111111]/95 border-black/60 text-slate-200'
    }`}>
      {/* Left side: Activities & Active Window Title */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleOverview}
          className={`font-semibold cursor-pointer px-2 py-0.5 rounded transition-colors ${
            theme === 'light'
              ? 'text-slate-800 hover:text-black hover:bg-black/10'
              : 'text-slate-100 hover:text-white hover:bg-white/10'
          }`}
        >
          Activities
        </button>
        {activeAppTitle && (
          <>
            <span className={theme === 'light' ? 'text-slate-400 hidden sm:inline' : 'text-slate-600 hidden sm:inline'}>&bull;</span>
            <span className={`font-semibold hidden sm:inline text-xs truncate max-w-[200px] ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              {activeAppTitle}
            </span>
          </>
        )}
      </div>

      {/* Center: System Clock (Click opens Calendar Popup) */}
      <button
        onClick={onToggleCalendar}
        className={`font-medium text-xs tracking-wide px-2.5 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
          theme === 'light'
            ? 'text-slate-800 hover:text-black hover:bg-black/10'
            : 'text-slate-100 hover:text-white hover:bg-white/10'
        }`}
        title="Open Calendar & Notifications"
      >
        <span>{timeStr || 'Thu Nov 19 13:00'}</span>
        {isPlaying && (
          <span className="text-[11px] text-[#e95420] animate-pulse" title={`Playing: ${currentTrack?.title || 'Music'}`}>
            🎵
          </span>
        )}
      </button>

      {/* Right side: Combined Quick Settings Pill (GNOME 46 style) */}
      <div className="relative">
        <button
          onClick={() => setShowQuickSettings(!showQuickSettings)}
          className={`flex items-center gap-2 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
            theme === 'light'
              ? 'text-slate-700 hover:text-black hover:bg-black/10'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title="Quick Settings Menu"
        >
          {/* Network icon */}
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19H19.65l-.62-1.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/>
          </svg>
          {/* Volume icon */}
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
          {/* Power icon */}
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
          </svg>
        </button>

        {/* Quick Settings Dropdown Panel (Exact Official GNOME 45/46 Style matching Image 2) */}
        {showQuickSettings && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute right-0 mt-1 w-[calc(100vw-1rem)] max-w-[320px] sm:w-80 rounded-[22px] shadow-2xl p-3.5 text-xs z-50 space-y-3 font-ubuntu border select-none ${
              theme === 'light'
                ? 'bg-[#f4f4f4] border-black/15 text-slate-800 shadow-slate-900/30'
                : 'bg-[#292929] border-white/10 text-slate-200'
            }`}
          >
            {/* Top Toolbar: 4 Circular Buttons (Screenshot, Settings | Lock, Power) */}
            <div className="flex items-center justify-between px-0.5">
              {/* Left Group: Screenshot Tool & Settings */}
              <div className="flex items-center gap-2">
                {/* Screenshot Button (Unclickable) */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center select-none cursor-default ${
                    theme === 'light'
                      ? 'bg-black/10 text-slate-700'
                      : 'bg-[#3b3b3b] text-slate-200'
                  }`}
                  aria-hidden="true"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                </div>

                {/* Settings Gear Button */}
                <button
                  onClick={() => {
                    setShowQuickSettings(false);
                    if (onOpenSettings) onOpenSettings();
                  }}
                  title="Settings"
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    theme === 'light'
                      ? 'bg-black/10 hover:bg-black/15 text-slate-700 hover:text-black'
                      : 'bg-[#3b3b3b] hover:bg-[#4a4a4a] text-slate-200 hover:text-white'
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </button>
              </div>

              {/* Right Group: Lock & Power */}
              <div className="flex items-center gap-2">
                {/* Lock Button */}
                <button
                  onClick={() => {
                    setShowQuickSettings(false);
                    onLogout();
                  }}
                  title="Lock Session"
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    theme === 'light'
                      ? 'bg-black/10 hover:bg-black/15 text-slate-700 hover:text-black'
                      : 'bg-[#3b3b3b] hover:bg-[#4a4a4a] text-slate-200 hover:text-white'
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </button>

                {/* Power Button */}
                <button
                  onClick={() => {
                    setShowQuickSettings(false);
                    if (onShutdown) {
                      onShutdown();
                    } else {
                      onRestart();
                    }
                  }}
                  title="Shutdown / Power Off"
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    theme === 'light'
                      ? 'bg-black/10 hover:bg-black/15 text-slate-700 hover:text-black'
                      : 'bg-[#3b3b3b] hover:bg-[#4a4a4a] text-slate-200 hover:text-white'
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
                    <line x1="12" y1="2" x2="12" y2="12"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Sliders Section: Volume & Brightness */}
            <div className="space-y-3 pt-1 px-1">
              {/* Sound Volume Slider Row */}
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 flex items-center justify-center shrink-0 text-slate-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                  </svg>
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    onVolumeChange(val);
                    playVolumeFeedback(val);
                  }}
                  className="w-full ubuntu-quick-slider"
                  style={{
                    background: `linear-gradient(to right, #e95420 0%, #e95420 ${volume}%, ${theme === 'light' ? '#d0d0d0' : '#454545'} ${volume}%, ${theme === 'light' ? '#d0d0d0' : '#454545'} 100%)`
                  }}
                />
                <button
                  onClick={() => onOpenSettings && onOpenSettings()}
                  title="Sound Settings"
                  className="text-slate-400 hover:text-white cursor-pointer shrink-0"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>

              {/* Screen Brightness Slider Row */}
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 flex items-center justify-center shrink-0 text-slate-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
                  </svg>
                </span>
                <input
                  type="range"
                  min="50"
                  max="120"
                  value={brightness}
                  onChange={(e) => onBrightnessChange(Number(e.target.value))}
                  className="w-full ubuntu-quick-slider"
                  style={{
                    background: `linear-gradient(to right, #e95420 0%, #e95420 ${Math.round(((brightness - 50) / 70) * 100)}%, ${theme === 'light' ? '#d0d0d0' : '#454545'} ${Math.round(((brightness - 50) / 70) * 100)}%, ${theme === 'light' ? '#d0d0d0' : '#454545'} 100%)`
                  }}
                />
                <span className="w-3.5 shrink-0" />
              </div>
            </div>

            {/* Quick Toggle Grid: 2 Columns x 3 Rows */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Row 1, Col 1: Wi-Fi Tile (Unclickable) */}
              <div
                className="h-11 px-3 rounded-2xl flex items-center justify-between cursor-default select-none shadow-sm text-left bg-[#e95420] text-white"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.32c3.8 0 7.23 1.5 9.77 3.96L12 18.57 2.23 11.28C4.77 8.82 8.2 7.32 12 7.32z"/>
                  </svg>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-bold text-xs leading-tight">Wi-Fi</span>
                    <span className="text-[10px] leading-tight truncate opacity-85">{networkInfo.ssid || 'Offline'}</span>
                  </div>
                </div>
                <svg className="w-3.5 h-3.5 opacity-70 shrink-0 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>

              {/* Row 1, Col 2: Bluetooth Tile (Unclickable) */}
              <div
                className="h-11 px-3 rounded-2xl flex items-center justify-between cursor-default select-none shadow-sm text-left bg-[#e95420] text-white"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/>
                  </svg>
                  <span className="font-bold text-xs leading-tight">Bluetooth</span>
                </div>
                <svg className="w-3.5 h-3.5 opacity-70 shrink-0 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>

              {/* Row 2, Col 1: Power Mode Tile (Unclickable) */}
              <div
                className={`h-11 px-3 rounded-2xl flex items-center justify-between cursor-default select-none shadow-sm text-left ${
                  theme === 'light' ? 'bg-black/10 text-slate-700' : 'bg-[#3b3b3b] text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.28-10.43zM10.59 15.41a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z"/>
                  </svg>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-bold text-xs leading-tight">Power Mode</span>
                    <span className="text-[10px] leading-tight opacity-75">Balanced</span>
                  </div>
                </div>
                <svg className="w-3.5 h-3.5 opacity-70 shrink-0 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>

              {/* Row 2, Col 2: Night Light Tile (Unclickable) */}
              <div
                className={`h-11 px-3 rounded-2xl flex items-center gap-2.5 cursor-default select-none shadow-sm text-left ${
                  theme === 'light' ? 'bg-black/10 text-slate-700' : 'bg-[#3b3b3b] text-slate-200'
                }`}
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
                </svg>
                <span className="font-bold text-xs leading-tight">Night Light</span>
              </div>

              {/* Row 3, Col 1: Dark Style Tile (Active Orange in Image 2 - Clickable) */}
              <button
                onClick={onThemeToggle}
                className={`h-11 px-3 rounded-2xl flex items-center gap-2.5 cursor-pointer transition-colors shadow-sm text-left ${
                  theme === 'dark'
                    ? 'bg-[#e95420] text-white hover:bg-[#ff6530]'
                    : theme === 'light' ? 'bg-black/10 text-slate-700 hover:bg-black/15' : 'bg-[#3b3b3b] text-slate-200 hover:bg-[#484848]'
                }`}
                title="Toggle Dark / Light Style"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18V4c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/>
                </svg>
                <span className="font-bold text-xs leading-tight">
                  {theme === 'dark' ? 'Dark Style' : 'Light Style'}
                </span>
              </button>

              {/* Row 3, Col 2: Do Not Disturb Tile (Unclickable) */}
              <div
                className={`h-11 px-3 rounded-2xl flex items-center gap-2.5 cursor-default select-none shadow-sm text-left ${
                  theme === 'light' ? 'bg-black/10 text-slate-700' : 'bg-[#3b3b3b] text-slate-200'
                }`}
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                </svg>
                <span className="font-bold text-xs leading-tight">Do Not Disturb</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
