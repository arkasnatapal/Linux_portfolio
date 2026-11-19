/**
 * ARKA OS — Eye of GNOME Image Viewer
 */

import React, { useState } from 'react';
import { ASCII_SILICON_DIE, ASCII_LOGIC_GATES, ASCII_VLSI_PIPELINE } from '../../utils/asciiArt';

export const ImageViewerApp: React.FC = () => {
  const [activeDiagram, setActiveDiagram] = useState<'die' | 'gates' | 'flow'>('die');

  return (
    <div className="flex-1 flex flex-col h-full bg-[#181818] text-slate-100 font-ubuntu select-none overflow-hidden">
      {/* Header Toolbar */}
      <div className="h-10 bg-[#252525] px-3 flex items-center justify-between border-b border-black/40 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveDiagram('die')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeDiagram === 'die' ? 'bg-[#e95420] text-white font-medium' : 'hover:bg-white/10 text-slate-300'
            }`}
          >
            Silicon Die
          </button>
          <button
            onClick={() => setActiveDiagram('gates')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeDiagram === 'gates' ? 'bg-[#e95420] text-white font-medium' : 'hover:bg-white/10 text-slate-300'
            }`}
          >
            Logic Gates
          </button>
          <button
            onClick={() => setActiveDiagram('flow')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeDiagram === 'flow' ? 'bg-[#e95420] text-white font-medium' : 'hover:bg-white/10 text-slate-300'
            }`}
          >
            VLSI Flow
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 p-6 flex items-center justify-center overflow-auto bg-[#121212]">
        <div className="bg-black/60 p-6 rounded-xl border border-white/10 font-mono text-xs whitespace-pre text-cyan-300 shadow-2xl leading-relaxed">
          {activeDiagram === 'die' && ASCII_SILICON_DIE}
          {activeDiagram === 'gates' && ASCII_LOGIC_GATES}
          {activeDiagram === 'flow' && ASCII_VLSI_PIPELINE}
        </div>
      </div>
    </div>
  );
};
