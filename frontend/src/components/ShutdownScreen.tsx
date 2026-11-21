/**
 * ARKA OS — System Shutdown & Powered-Off Workstation State
 * 
 * Manages authentic Linux system shutdown sequence and turned-off machine state:
 * - Stage 1: Systemd service termination & filesystem unmount logs
 * - Stage 2: Complete power-down state with hardware power button to turn back on
 */

import React, { useState, useEffect } from 'react';

interface ShutdownScreenProps {
  onPowerOn: () => void;
}

export const ShutdownScreen: React.FC<ShutdownScreenProps> = ({ onPowerOn }) => {
  const [phase, setPhase] = useState<'powering-down' | 'powered-off'>('powering-down');
  const [logIndex, setLogIndex] = useState<number>(0);

  const shutdownLogs = [
    '[  OK  ] Stopping User Manager for UID 1000...',
    '[  OK  ] Stopped User Manager for UID 1000.',
    '[  OK  ] Stopped target Multi-User System.',
    '[  OK  ] Stopped Graphical Interface (GNOME Display Manager).',
    '[  OK  ] Stopping System Logging Service...',
    '[  OK  ] Stopped System Logging Service.',
    '[  OK  ] Deactivating swap /dev/dm-1...',
    '[  OK  ] Unmounting /home/arka virtual filesystem...',
    '[  OK  ] Unmounted /home/arka.',
    '[  OK  ] Reached target System Power Off.',
    'System halted. Powering down.',
  ];

  useEffect(() => {
    // Progressively print shutdown logs
    if (logIndex < shutdownLogs.length) {
      const timer = setTimeout(() => {
        setLogIndex(prev => prev + 1);
      }, 120);
      return () => clearTimeout(timer);
    } else {
      // Transition to completely powered-off screen
      const timer = setTimeout(() => {
        setPhase('powered-off');
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [logIndex, shutdownLogs.length]);

  if (phase === 'powering-down') {
    return (
      <div className="fixed inset-0 bg-black text-slate-300 font-mono text-xs p-6 select-none flex flex-col justify-end z-50 overflow-hidden">
        <div className="space-y-1">
          {shutdownLogs.slice(0, logIndex).map((log, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[#8ae234] font-bold">
                {log.includes('[  OK  ]') ? '[  OK  ]' : '        '}
              </span>
              <span className={log.includes('Powering down') ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                {log.replace('[  OK  ]', '').trim()}
              </span>
            </div>
          ))}
          <span className="inline-block w-2 h-4 bg-slate-400 terminal-cursor-block" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#050505] text-slate-400 font-ubuntu select-none flex flex-col items-center justify-center z-50 p-6">
      <div className="max-w-sm w-full flex flex-col items-center text-center space-y-7 animate-fade-in">
        {/* Hardware Tactile Power Button with Subtle Glow */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#e95420]/30 to-[#77216F]/30 opacity-70 group-hover:opacity-100 blur-md transition-opacity" />
          <button
            onClick={onPowerOn}
            title="Press Power Button to Turn On Workstation"
            className="relative w-24 h-24 rounded-full bg-[#141416] hover:bg-[#1c1c20] border-2 border-slate-700/80 hover:border-[#e95420] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[0_10px_35px_rgba(0,0,0,0.9)] active:scale-95"
          >
            <svg
              className="w-10 h-10 transition-colors text-slate-500 group-hover:text-[#e95420]"
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

        {/* Status Text */}
        <div className="space-y-1.5">
          <h2 className="text-base font-bold text-slate-200 tracking-wide">
            Arka's Ubuntu is Powered Off
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Click the power button to boot the OS
          </p>
        </div>

        {/* Minimal hardware specs reminder */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] text-slate-500 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
          <span>AC Power Standby &bull; 0.4W</span>
        </div>
      </div>
    </div>
  );
};
