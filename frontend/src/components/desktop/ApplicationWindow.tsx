/**
 * ARKA OS — GNOME Desktop Application Window (Yaru Theme)
 * 
 * Manages window dragging, minimize, maximize, restore, close,
 * z-index stacking, touch responsiveness, and mobile optimization.
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

  // Mobile viewport detection
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync position if instance props update externally
  useEffect(() => {
    setCurrentPos({ x: instance.x, y: instance.y });
  }, [instance.x, instance.y]);

  const isFullscreen = instance.isMaximized || isMobile;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Disable dragging on mobile devices or when maximized
    if (e.button !== 0 || isFullscreen) return;

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
    if (!isDraggingRef.current || isFullscreen) return;

    const deltaX = e.clientX - dragStartPos.current.mouseX;
    const deltaY = e.clientY - dragStartPos.current.mouseY;

    // Bounds checking: Dock is 56px wide, Top bar is 28px high
    const minX = isMobile ? 0 : 56;
    const newX = Math.max(minX, Math.min(window.innerWidth - 120, dragStartPos.current.winX + deltaX));
    const newY = Math.max(28, Math.min(window.innerHeight - 80, dragStartPos.current.winY + deltaY));

    setCurrentPos({ x: newX, y: newY });
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const minX = isMobile ? 0 : 56;
    onMove(Math.max(minX, currentPos.x), Math.max(28, currentPos.y));
  };

  return (
    <div
      onMouseDown={onFocus}
      className={`fixed transition-shadow rounded-none sm:rounded-lg overflow-hidden flex flex-col font-ubuntu select-none ${
        instance.isMinimized ? 'hidden' : ''
      } ${
        theme === 'light'
          ? (isActive
              ? 'shadow-2xl shadow-slate-950/30 ring-1 ring-black/20'
              : 'shadow-lg shadow-slate-950/20 ring-1 ring-black/10 opacity-95')
          : (isActive
              ? 'shadow-2xl shadow-black/80 ring-1 ring-white/15'
              : 'shadow-lg shadow-black/60 ring-1 ring-black/40 opacity-95')
      } ${
        isFullscreen
          ? 'left-0 sm:left-[56px] right-0 bottom-0 top-7 rounded-none ring-0 w-full sm:w-[calc(100vw-56px)] h-[calc(100dvh-1.75rem)]'
          : ''
      }`}
      style={{
        zIndex: Math.min(instance.zIndex, 35),
        ...(isFullscreen
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
        className={`h-9 px-2 sm:px-3 relative flex items-center justify-between select-none shrink-0 transition-colors ${
          isFullscreen ? 'cursor-default' : 'cursor-move'
        } ${
          theme === 'light'
            ? (isActive ? 'bg-[#dfdbd2] text-slate-800 border-b border-black/15 shadow-sm' : 'bg-[#e8e5dc] text-slate-500 border-b border-black/10')
            : (isActive ? 'bg-[#242424] text-white border-b border-black/50' : 'bg-[#1c1c1c] text-slate-400 border-b border-black/50')
        }`}
      >
        {/* Left: Optional icon spacer or mobile back button */}
        <div className="w-6 sm:w-8 shrink-0 flex items-center">
          {isMobile && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClose();
              }}
              className="p-1 rounded text-slate-400 hover:text-white cursor-pointer touch-manipulation sm:hidden"
              title="Close and return to desktop"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* Center: Window Title (Ubuntu GNOME Centered Title) */}
        <div className={`absolute inset-0 flex items-center justify-center font-bold text-xs pointer-events-none truncate px-16 sm:px-20 ${
          theme === 'light' ? 'text-slate-900' : 'text-slate-200'
        }`}>
          <span className="truncate">{instance.title}</span>
        </div>

        {/* Right: Window Controls (Exact Ubuntu Yaru Style with touch-friendly hit areas) */}
        <div
          className="flex items-center gap-0.5 sm:gap-1.5 shrink-0 z-10"
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {/* Minimize button: clean minus */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onMinimize();
            }}
            title="Minimize"
            className={`w-8 h-8 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer touch-manipulation ${
              theme === 'light' ? 'hover:bg-black/10 text-slate-700 hover:text-black' : 'hover:bg-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <span className="text-sm font-bold leading-none mb-1">−</span>
          </button>

          {/* Maximize button: hidden on mobile since mobile is always fullscreen */}
          {!isMobile && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMaximize();
              }}
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
          )}

          {/* Close button: Official Ubuntu Orange-Red Circular Badge with White X */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClose();
            }}
            title="Close"
            className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center cursor-pointer touch-manipulation group active:scale-90 transition-transform"
          >
            <span className="w-5 h-5 rounded-full bg-[#e95420] group-hover:bg-[#ff6e3a] text-white flex items-center justify-center text-[11px] font-bold shadow">
              ✕
            </span>
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
