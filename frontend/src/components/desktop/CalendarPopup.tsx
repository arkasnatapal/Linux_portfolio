/**
 * ARKA OS — GNOME Shell Calendar & Notification Center Popup
 * 
 * Authentic dropdown from top panel center clock:
 * - Left column: Notification list & live Rhythmbox Media Player card
 * - Right column: Interactive monthly calendar with current day highlighted
 */

import React, { useState } from 'react';
import { useMusicPlayer } from '../../context/MusicPlayerContext';

interface CalendarPopupProps {
  onClose: () => void;
  onOpenMusic?: () => void;
}

export const CalendarPopup: React.FC<CalendarPopupProps> = ({ onClose, onOpenMusic }) => {
  const [currentDate] = useState(new Date());
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    nextTrack,
    prevTrack,
    formatTime,
  } = useMusicPlayer();

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const todayDate = currentDate.getDate();

  // First day of current month
  const firstDay = new Date(year, month, 1).getDay();
  // Total days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }

  const progressPercent = Math.min(100, Math.max(0, (currentTime / (duration || 30)) * 100));

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed top-8 left-1/2 -translate-x-1/2 w-[calc(100vw-1rem)] max-w-lg bg-[#242424]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-3 sm:p-4 text-xs text-slate-200 font-ubuntu z-50 flex flex-col sm:flex-row gap-4 animate-fade-in"
    >
      {/* Left: Notifications / Rhythmbox Live Media Controller */}
      <div className="flex-1 space-y-3 sm:border-r border-white/10 sm:pr-4">
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
            Notifications
          </span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 cursor-pointer transition-colors"
            title="Close"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-2">
          {/* Active Rhythmbox Media Notification Card */}
          {currentTrack ? (
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#2a1226]/80 to-[#18181c] border border-white/10 shadow-lg space-y-2.5">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <span className="text-xs">🎵</span>
                  <span className="font-semibold text-white">Rhythmbox</span>
                  <span className="text-slate-600">&bull;</span>
                  <span className={isPlaying ? 'text-[#e95420] font-bold flex items-center gap-1' : 'text-slate-400'}>
                    {isPlaying && <span className="w-1.5 h-1.5 rounded-full bg-[#e95420] animate-ping" />}
                    {isPlaying ? 'Playing' : 'Paused'}
                  </span>
                </div>
                {onOpenMusic && (
                  <button
                    onClick={() => {
                      onOpenMusic();
                      onClose();
                    }}
                    className="text-[10px] text-[#e95420] hover:text-[#ff6e3a] hover:underline cursor-pointer font-medium"
                  >
                    Open App &rarr;
                  </button>
                )}
              </div>

              {/* Track Info (Click to restore Rhythmbox app) */}
              <div
                onClick={() => {
                  if (onOpenMusic) {
                    onOpenMusic();
                    onClose();
                  }
                }}
                className="flex items-center gap-3 cursor-pointer group"
                title="Click to open Rhythmbox"
              >
                <div className="w-11 h-11 rounded-lg overflow-hidden bg-black/60 border border-white/10 shrink-0 shadow">
                  {currentTrack.artwork ? (
                    <img
                      src={currentTrack.artwork}
                      alt={currentTrack.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#e95420] to-[#77216F] flex items-center justify-center text-lg">
                      🎵
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white truncate group-hover:text-[#e95420] transition-colors">
                    {currentTrack.title}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {currentTrack.artist}
                  </div>
                </div>
              </div>

              {/* Mini Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-1 bg-black/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#e95420] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-slate-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Media Controls */}
              <div className="flex items-center justify-center gap-3 pt-0.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevTrack();
                  }}
                  className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Previous Track"
                >
                  ⏮
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="w-8 h-8 rounded-full bg-[#e95420] hover:bg-[#d84818] text-white flex items-center justify-center font-bold text-xs shadow hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? '❚❚' : '▶'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextTrack();
                  }}
                  className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Next Track"
                >
                  ⏭
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-black/20 border border-white/5 flex flex-col items-center justify-center text-center space-y-1">
              <span className="text-xl text-slate-500">🔔</span>
              <span className="text-xs text-slate-400 font-medium">No Notifications</span>
              <span className="text-[10px] text-slate-500">All systems operational</span>
            </div>
          )}
        </div>
      </div>

      {/* Right: Calendar Month */}
      <div className="w-full sm:w-60 space-y-2">
        <div className="flex justify-between items-center font-bold text-white text-xs">
          <span>{monthNames[month]} {year}</span>
          <span className="text-slate-400 font-mono text-[11px]">Today: {todayDate}</span>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 text-center text-slate-400 font-medium text-[11px]">
          {daysOfWeek.map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Calendar Day Grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {calendarCells.map((d, idx) => (
            <div
              key={idx}
              className={`h-7 flex items-center justify-center rounded-full text-[11px] font-medium ${
                d === null
                  ? ''
                  : d === todayDate
                  ? 'bg-[#e95420] text-white font-bold shadow'
                  : 'hover:bg-white/10 text-slate-300'
              }`}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
