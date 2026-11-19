/**
 * ARKA OS — GNOME Desktop Application Window (Yaru Theme)
 * 
 * Manages window dragging, minimize, maximize, restore, close,
 * z-index stacking, and active focus state.
 */

import React, { useRef, useState, useEffect } from 'react';
import type { WindowInstance } from '../../types/desktop';

interface ApplicationWindowProps {
  instance: WindowInstance;
  isActive: boolean;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  onMove: (x: number, y: number) => void;
  theme?: 'dark' | 'light';
  children: React.ReactNode;
}

export const ApplicationWindow: React.FC<ApplicationWindowProps> = ({
  instance,
  isActive,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  onMove,
  theme = 'dark',
  children,
}) => {
  const isDraggingRef = useRef(false);
  const dragStartPos = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 });
  const [currentPos, setCurrentPos] = useState({ x: instance.x, y: instance.y });

  // Sync position if instance props update externally
  useEffect(() => {
    setCurrentPos({ x: instance.x, y: instance.y });
  }, [instance.x, instance.y]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag with left mouse button on header
    if (e.button !== 0 || instance.isMaximized) return;

    onFocus();
    isDraggingRef.current = true;
    dragStartPos.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      winX: currentPos.x,
      winY: currentPos.y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - dragStartPos.current.mouseX;
    const deltaY = e.clientY - dragStartPos.current.mouseY;

    // Bounds checking: Dock is 56px wide, Top bar is 28px high
    const newX = Math.max(56, Math.min(window.innerWidth - 120, dragStartPos.current.winX + deltaX));
    const newY = Math.max(28, Math.min(window.innerHeight - 80, dragStartPos.current.winY + deltaY));

    setCurrentPos({ x: newX, y: newY });
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    onMove(Math.max(56, currentPos.x), Math.max(28, currentPos.y));
  };

  if (instance.isMinimized) {
    return null;
  }

  return (
    <div
      onMouseDown={onFocus}
      className={`fixed transition-shadow rounded-lg overflow-hidden flex flex-col font-ubuntu select-none ${
        theme === 'light'
          ? (isActive
              ? 'shadow-2xl shadow-slate-950/30 ring-1 ring-black/20'
              : 'shadow-lg shadow-slate-950/20 ring-1 ring-black/10 opacity-95')
          : (isActive
              ? 'shadow-2xl shadow-black/80 ring-1 ring-white/15'
              : 'shadow-lg shadow-black/60 ring-1 ring-black/40 opacity-95')
      } ${
        instance.isMaximized
          ? 'left-[56px] right-0 bottom-0 top-7 rounded-none ring-0 w-[calc(100vw-56px)] h-[calc(100vh-1.75rem)]'
          : ''
      }`}
      style={{
        zIndex: Math.min(instance.zIndex, 35),
        ...(instance.isMaximized
          ? {}
          : {
              left: Math.max(56, currentPos.x),
              top: Math.max(28, currentPos.y),
              width: instance.width,
              height: instance.height,
            }),
      }}
    >
      {/* Ubuntu Yaru Window Headerbar */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={onMaximize}
        className={`h-9 px-3 relative flex items-center justify-between cursor-move select-none shrink-0 transition-colors ${
          theme === 'light'
            ? (isActive ? 'bg-[#dfdbd2] text-slate-800 border-b border-black/15 shadow-sm' : 'bg-[#e8e5dc] text-slate-500 border-b border-black/10')
            : (isActive ? 'bg-[#242424] text-white border-b border-black/50' : 'bg-[#1c1c1c] text-slate-400 border-b border-black/50')
        }`}
      >
        {/* Left: Optional icon spacer */}
        <div className="w-8 shrink-0" />

        {/* Center: Window Title (Ubuntu GNOME Centered Title) */}
        <div className={`absolute inset-0 flex items-center justify-center font-bold text-xs pointer-events-none truncate px-20 ${
          theme === 'light' ? 'text-slate-900' : 'text-slate-200'
        }`}>
          <span className="truncate">{instance.title}</span>
        </div>

        {/* Right: Window Controls (Exact Ubuntu Yaru Style: - , □ , ✕ in orange-red circle) */}
        <div className="flex items-center gap-1.5 shrink-0 z-10" onPointerDown={(e) => e.stopPropagation()}>
          {/* Minimize button: clean minus */}
          <button
            onClick={onMinimize}
            title="Minimize"
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              theme === 'light' ? 'hover:bg-black/10 text-slate-700 hover:text-black' : 'hover:bg-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <span className="text-sm font-bold leading-none mb-1">−</span>
          </button>

          {/* Maximize button: clean square box */}
          <button
            onClick={onMaximize}
            title={instance.isMaximized ? 'Restore' : 'Maximize'}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              theme === 'light' ? 'hover:bg-black/10 text-slate-700 hover:text-black' : 'hover:bg-white/10 text-slate-300 hover:text-white'
            }`}
          >
            {instance.isMaximized ? (
              <span className="text-xs leading-none">❐</span>
            ) : (
              <span className="text-xs leading-none font-bold">□</span>
            )}
          </button>

          {/* Close button: Official Ubuntu Orange-Red Circular Badge with White X */}
          <button
            onClick={onClose}
            title="Close"
            className="w-5 h-5 rounded-full bg-[#e95420] hover:bg-[#ff6e3a] text-white flex items-center justify-center text-[11px] font-bold shadow transition-transform active:scale-90 cursor-pointer ml-1"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Body Viewport */}
      <div className={`flex-1 overflow-hidden flex flex-col ${
        theme === 'light' ? 'bg-[#fafafa] text-slate-800' : 'bg-[#1e1e1e] text-slate-100'
      }`}>
        {children}
      </div>
    </div>
  );
};
