/**
 * ARKA OS — Rhythmbox Music Player (VLSI Engineering Ambient Soundscapes)
 */

import React, { useState } from 'react';

export const MusicApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<number>(0);

  const tracks = [
    { title: 'Digital Logic Waves (Lo-Fi Study Beats)', artist: 'VLSI Workstation', duration: '3:45' },
    { title: 'SPI & UART Simulation Ambient', artist: 'Vivado Synth', duration: '4:12' },
    { title: 'Verilog FPGA Clock Midnight Stream', artist: 'GTKWave Audio', duration: '5:02' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1e1e1e] text-slate-100 font-ubuntu select-none overflow-hidden">
      {/* Player Header */}
      <div className="p-6 bg-gradient-to-r from-[#461236] to-[#1e1e1e] border-b border-black/40 flex items-center gap-4">
        <div className="w-20 h-20 rounded-xl bg-[#e95420] flex items-center justify-center text-3xl shadow-xl">
          🎵
        </div>
        <div>
          <h2 className="text-base font-bold text-white">{tracks[currentTrack].title}</h2>
          <p className="text-xs text-[#e95420] mt-0.5">{tracks[currentTrack].artist}</p>
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs hover:scale-105 transition-transform cursor-pointer"
            >
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <span className="text-xs text-slate-400 font-mono">
              {isPlaying ? '0:42' : '0:00'} / {tracks[currentTrack].duration}
            </span>
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="text-xs font-bold text-slate-400 uppercase mb-2">Playlist</div>
        <div className="space-y-1">
          {tracks.map((t, idx) => (
            <div
              key={t.title}
              onClick={() => {
                setCurrentTrack(idx);
                setIsPlaying(true);
              }}
              className={`p-2.5 rounded-lg flex justify-between items-center text-xs cursor-pointer transition-colors ${
                currentTrack === idx ? 'bg-[#e95420]/20 text-white font-medium border border-[#e95420]/40' : 'hover:bg-white/5 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{currentTrack === idx && isPlaying ? '🔊' : '▶'}</span>
                <span>{t.title}</span>
              </div>
              <span className="text-slate-500 font-mono text-[11px]">{t.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
