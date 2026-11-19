/**
 * ARKA OS — GNOME Shell Calendar & Notification Center Popup
 * 
 * Authentic dropdown from top panel center clock:
 * - Left column: Notification list & system reminders
 * - Right column: Interactive monthly calendar with current day highlighted
 */

import React, { useState } from 'react';

interface CalendarPopupProps {
  onClose: () => void;
}

export const CalendarPopup: React.FC<CalendarPopupProps> = ({ onClose }) => {
  const [currentDate] = useState(new Date());

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

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed top-8 left-1/2 -translate-x-1/2 w-full max-w-lg bg-[#242424]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-4 text-xs text-slate-200 font-ubuntu z-50 flex flex-col sm:flex-row gap-4"
    >
      {/* Left: Notifications / Reminders */}
      <div className="flex-1 space-y-3 sm:border-r border-white/10 sm:pr-4">
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-bold uppercase text-slate-400">Notifications</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 cursor-pointer"
            title="Close"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-2">
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>VLSI Workstation Active</span>
            </div>
            <p className="text-[11px] text-slate-400">
              SkyWater 130nm PDK and RTL synthesis pipelines ready.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <span className="w-2 h-2 rounded-full bg-[#e95420]"></span>
              <span>Tapeout Review</span>
            </div>
            <p className="text-[11px] text-slate-400">
              RISC-V 32-bit core timing closed with WNS +0.42ns.
            </p>
          </div>
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
