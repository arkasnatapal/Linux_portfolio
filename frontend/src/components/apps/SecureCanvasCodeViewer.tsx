/**
 * ARKA OS — Secure Canvas Code Viewer (Anti-Copy & Anti-Inspection Engine)
 * 
 * Features:
 * 1. Zero DOM Text Nodes: Renders syntax-highlighted code directly onto HTML5 <canvas>.
 *    Inspecting element in DevTools yields only <canvas>, preventing DOM tree copying.
 * 2. Verilog & Hardware HDL Syntax Tokenizer (keywords, ports, registers, numbers, strings, comments).
 * 3. Non-Editable & Read-Only: Pure visualization, no cursor mutation.
 * 4. Anti-Copy Protection: Intercepts keyboard copy (Ctrl+C), context menu, and text drag.
 * 5. Screenshot Defense: Screen flash on PrintScreen, blur on window unfocus / snipping tool,
 *    and subtle diagonal security watermark.
 * 6. Responsive & Touch-friendly: Supports smooth mouse wheel and touch-drag panning on mobile.
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface SecureCanvasCodeViewerProps {
  content: string;
  language: 'verilog' | 'markdown' | 'output';
  fileName: string;
  className?: string;
}

interface Token {
  text: string;
  color: string;
}

// Verilog HDL Syntax Keywords
const VERILOG_KEYWORDS = new Set([
  'module', 'endmodule', 'input', 'output', 'inout', 'reg', 'wire',
  'parameter', 'localparam', 'defparam', 'always', 'initial', 'assign',
  'begin', 'end', 'case', 'endcase', 'casex', 'casez', 'default',
  'if', 'else', 'for', 'while', 'repeat', 'forever',
  'posedge', 'negedge', 'or', 'and', 'nand', 'nor', 'xor', 'xnor', 'not',
  'function', 'endfunction', 'task', 'endtask', 'timescale', 'integer',
  'genvar', 'generate', 'endgenerate', 'include', 'signed', 'unsigned'
]);

const VERILOG_SYSTEM_TASKS = new Set([
  '$display', '$monitor', '$write', '$finish', '$stop', '$time',
  '$dumpfile', '$dumpvars', '$random', '$readmemb', '$readmemh'
]);

export const SecureCanvasCodeViewer: React.FC<SecureCanvasCodeViewerProps> = ({
  content,
  language,
  fileName,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollTop, setScrollTop] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [isWindowFocused, setIsWindowFocused] = useState<boolean>(true);
  const [screenshotBlockedFlash, setScreenshotBlockedFlash] = useState<boolean>(false);
  const [securityToast, setSecurityToast] = useState<string | null>(null);

  const lines = React.useMemo(() => content.split('\n'), [content]);
  const totalLines = lines.length;

  const LINE_HEIGHT = 20;
  const FONT_SIZE = 13;
  const GUTTER_WIDTH = Math.max(48, String(totalLines).length * 9 + 20);

  // Tokenize a single line of Verilog
  const tokenizeLine = useCallback((line: string): Token[] => {
    if (language !== 'verilog') {
      return [{ text: line, color: '#d4d4d4' }];
    }

    const tokens: Token[] = [];
    let i = 0;
    const len = line.length;

    while (i < len) {
      // Check for line comment //
      if (line[i] === '/' && i + 1 < len && line[i + 1] === '/') {
        tokens.push({ text: line.slice(i), color: '#6a9955' }); // Green comments
        break;
      }

      // Check for block comment start /*
      if (line[i] === '/' && i + 1 < len && line[i + 1] === '*') {
        const endIdx = line.indexOf('*/', i + 2);
        if (endIdx !== -1) {
          tokens.push({ text: line.slice(i, endIdx + 2), color: '#6a9955' });
          i = endIdx + 2;
          continue;
        } else {
          tokens.push({ text: line.slice(i), color: '#6a9955' });
          break;
        }
      }

      // Check for string literal "..."
      if (line[i] === '"') {
        let strEnd = i + 1;
        while (strEnd < len && line[strEnd] !== '"') {
          if (line[strEnd] === '\\') strEnd++; // skip escaped char
          strEnd++;
        }
        strEnd = Math.min(len, strEnd + 1);
        tokens.push({ text: line.slice(i, strEnd), color: '#ce9178' }); // Salmon string
        i = strEnd;
        continue;
      }

      // Check for numbers: e.g. 16'd0, 4'b1010, 8'hFF, 32'd10, 50, etc.
      if (/[0-9']/.test(line[i])) {
        let numEnd = i;
        while (numEnd < len && /[0-9a-fA-F'bBdhDHoxOX_]/.test(line[numEnd])) {
          numEnd++;
        }
        tokens.push({ text: line.slice(i, numEnd), color: '#b5cea8' }); // Mint number
        i = numEnd;
        continue;
      }

      // Check for identifiers or keywords
      if (/[a-zA-Z_$`]/.test(line[i])) {
        let idEnd = i;
        while (idEnd < len && /[a-zA-Z0-9_$]/.test(line[idEnd])) {
          idEnd++;
        }
        const word = line.slice(i, idEnd);

        if (VERILOG_KEYWORDS.has(word) || word.startsWith('`')) {
          tokens.push({ text: word, color: '#c586c0' }); // Keyword Purple / Magenta
        } else if (VERILOG_SYSTEM_TASKS.has(word)) {
          tokens.push({ text: word, color: '#4ec9b0' }); // System task teal
        } else if (word === 'clk' || word === 'rst' || word === 'reset' || word === 'rst_n') {
          tokens.push({ text: word, color: '#4fc1ff' }); // Clock/Reset blue
        } else {
          tokens.push({ text: word, color: '#9cdcfe' }); // Identifier cyan/blue
        }
        i = idEnd;
        continue;
      }

      // Operators and punctuation
      const ch = line[i];
      if (/[:=<>+*/&|^~?!%-]/.test(ch)) {
        tokens.push({ text: ch, color: '#d4d4d4' });
      } else {
        tokens.push({ text: ch, color: '#d4d4d4' });
      }
      i++;
    }

    return tokens;
  }, [language]);

  // Main Canvas Rendering Loop
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = container.clientWidth;
    const height = container.clientHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    // Background: VS Code Dark
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, width, height);

    // Subtle Anti-Theft Watermark Pattern (Diagonal)
    ctx.save();
    ctx.font = '12px "Ubuntu Mono", monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.rotate(-Math.PI / 12);
    const watermarkText = 'ARKASNATA PAL • PROPRIETARY RTL CODE • github.com/arkasnatapal';
    for (let x = -width; x < width * 2; x += 380) {
      for (let y = -height; y < height * 2; y += 120) {
        ctx.fillText(watermarkText, x, y);
      }
    }
    ctx.restore();

    // Calculate visible lines based on scrollTop
    const startLine = Math.max(0, Math.floor(scrollTop / LINE_HEIGHT));
    const endLine = Math.min(totalLines, Math.ceil((scrollTop + height) / LINE_HEIGHT) + 1);

    ctx.font = `${FONT_SIZE}px "Ubuntu Mono", "Consolas", "Courier New", monospace`;
    ctx.textBaseline = 'top';

    // 1. Draw Code Lines
    for (let lineIdx = startLine; lineIdx < endLine; lineIdx++) {
      const lineStr = lines[lineIdx] || '';
      const yPos = lineIdx * LINE_HEIGHT - scrollTop;

      // Draw Line Content with Syntax Highlighting
      const tokens = tokenizeLine(lineStr);
      let currentX = GUTTER_WIDTH + 14 - scrollLeft;

      for (const token of tokens) {
        ctx.fillStyle = token.color;
        ctx.fillText(token.text, currentX, yPos + 3);
        currentX += ctx.measureText(token.text).width;
      }
    }

    // 2. Draw Left Line Number Gutter (Fixed over scrolled content)
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, GUTTER_WIDTH, height);

    // Gutter border line
    ctx.strokeStyle = '#2d2d2d';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(GUTTER_WIDTH, 0);
    ctx.lineTo(GUTTER_WIDTH, height);
    ctx.stroke();

    // Gutter line numbers
    for (let lineIdx = startLine; lineIdx < endLine; lineIdx++) {
      const yPos = lineIdx * LINE_HEIGHT - scrollTop;
      ctx.fillStyle = '#858585';
      const lineNumStr = String(lineIdx + 1);
      ctx.textAlign = 'right';
      ctx.fillText(lineNumStr, GUTTER_WIDTH - 12, yPos + 3);
    }
    ctx.textAlign = 'left';

  }, [lines, scrollTop, scrollLeft, totalLines, GUTTER_WIDTH, tokenizeLine]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Window resize observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      renderCanvas();
    });
    ro.observe(container);

    return () => ro.disconnect();
  }, [renderCanvas]);

  // Handle Mouse Wheel Scrolling
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const maxScrollTop = Math.max(0, totalLines * LINE_HEIGHT - (containerRef.current?.clientHeight || 0) + 100);
    const maxScrollLeft = 1200; // max horizontal code width

    setScrollTop(prev => Math.max(0, Math.min(maxScrollTop, prev + e.deltaY)));
    if (Math.abs(e.deltaX) > 0) {
      setScrollLeft(prev => Math.max(0, Math.min(maxScrollLeft, prev + e.deltaX)));
    }
  };

  // Handle Mobile Touch Drag Scrolling
  const touchStartRef = useRef<{ y: number; x: number; sTop: number; sLeft: number }>({ y: 0, x: 0, sTop: 0, sLeft: 0 });

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        y: e.touches[0].clientY,
        x: e.touches[0].clientX,
        sTop: scrollTop,
        sLeft: scrollLeft,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const deltaY = touchStartRef.current.y - e.touches[0].clientY;
      const deltaX = touchStartRef.current.x - e.touches[0].clientX;

      const maxScrollTop = Math.max(0, totalLines * LINE_HEIGHT - (containerRef.current?.clientHeight || 0) + 80);
      const maxScrollLeft = 1000;

      setScrollTop(Math.max(0, Math.min(maxScrollTop, touchStartRef.current.sTop + deltaY)));
      setScrollLeft(Math.max(0, Math.min(maxScrollLeft, touchStartRef.current.sLeft + deltaX)));
    }
  };

  // Anti-Copy & Screenshot Interceptor
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Block PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        setScreenshotBlockedFlash(true);
        setSecurityToast('📸 Screenshot Blocked: Proprietary Hardware IP');
        try {
          navigator.clipboard?.writeText('Arkasnata Pal Portfolio — Protected Source Code (Reproduction Prohibited).');
        } catch {
          // ignore clipboard security
        }
        setTimeout(() => setScreenshotBlockedFlash(false), 1400);
        setTimeout(() => setSecurityToast(null), 3500);
        return;
      }

      // 2. Block Copy & Cut shortcuts (Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+U, Ctrl+S)
      if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'a', 'u', 's', 'p'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        setSecurityToast('🔒 Protected Code: Copying and modification are restricted.');
        setTimeout(() => setSecurityToast(null), 3000);
        return;
      }

      // 3. Block Developer Tools shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C)
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
        setSecurityToast('🛡️ Developer Inspection Shield Active: Code is rendered on Canvas.');
        setTimeout(() => setSecurityToast(null), 3000);
        return;
      }
    };

    // 4. Window focus loss detection (triggers when user opens Snipping Tool or screenshot software)
    const handleWindowBlur = () => {
      setIsWindowFocused(false);
    };

    const handleWindowFocus = () => {
      setIsWindowFocused(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  // Prevent Right-Click Context Menu & Copy Events on Canvas Container
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setSecurityToast('🔒 Proprietary Verilog IP: Right-click options disabled.');
    setTimeout(() => setSecurityToast(null), 2500);
  };

  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    e.clipboardData.setData('text/plain', 'Arkasnata Pal Portfolio — Proprietary RTL Design (github.com/arkasnatapal)');
    setSecurityToast('🔒 Code clipboard export disabled.');
    setTimeout(() => setSecurityToast(null), 2500);
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onContextMenu={handleContextMenu}
      onCopy={handleCopy}
      className={`relative w-full h-full overflow-hidden select-none bg-[#1e1e1e] font-ubuntu-mono cursor-default ${className}`}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* 1. HTML5 Canvas: ZERO DOM TEXT NODES (Anti-Inspect) */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-filter duration-200 ${
          !isWindowFocused ? 'filter blur-[10px] opacity-40' : ''
        }`}
      />

      {/* 2. Window Unfocused Blur Overlay (Deters Snipping Tool & Background Screenshot) */}
      {!isWindowFocused && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md text-slate-300 pointer-events-none p-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#e95420]/20 flex items-center justify-center text-2xl mb-2 border border-[#e95420]/30">
            🛡️
          </div>
          <p className="text-sm font-bold text-white tracking-wide">Security Shield Active</p>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Canvas protection enabled. Focus window to inspect {fileName}.
          </p>
        </div>
      )}

      {/* 3. Screenshot Blocked Flash Effect */}
      {screenshotBlockedFlash && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center text-white text-center p-6 animate-pulse">
          <span className="text-4xl mb-2">📸</span>
          <p className="text-lg font-bold text-red-500">SCREENSHOT CAPTURE BLOCKED</p>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Proprietary Verilog HDL Intellectual Property — Arkasnata Pal
          </p>
        </div>
      )}

      {/* 4. Security Action Toast */}
      {securityToast && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#252526] border border-[#e95420] text-white px-3.5 py-1.5 rounded-lg shadow-2xl text-xs flex items-center gap-2 animate-bounce">
          <span>{securityToast}</span>
        </div>
      )}

      {/* 5. Read-Only Protection Watermark Badge (Top Right) */}
      <div className="absolute top-2 right-4 z-20 pointer-events-none flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/50 border border-white/10 text-[10px] text-slate-400 backdrop-blur-sm">
        <span className="text-emerald-400">●</span>
        <span>Canvas Protected (Read-Only)</span>
      </div>
    </div>
  );
};
