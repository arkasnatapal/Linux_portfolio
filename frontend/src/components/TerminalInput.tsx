/**
 * ARKA OS — Terminal Active Input Line (Ubuntu Style)
 * 
 * Interactive command prompt matching Ubuntu .bashrc colors:
 * - Green user@host: #8ae234
 * - Blue directory: #729fcf
 * - White colon and dollar: #ffffff
 * - Keyboard navigation (Tab, History Up/Down, Ctrl+C, Ctrl+L)
 * - Mobile Touch Toolbar with quick-access commands and smooth execution
 */

import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import { VirtualFilesystem } from '../filesystem/virtualFS';
import { getAutocomplete } from '../shell/autocomplete';

interface TerminalInputProps {
  cwd: string;
  fs: VirtualFilesystem;
  history: string[];
  onSubmit: (command: string) => void;
  onClear: () => void;
  onExit?: () => void;
}

export const TerminalInput: React.FC<TerminalInputProps> = ({
  cwd,
  fs,
  history,
  onSubmit,
  onClear,
  onExit,
}) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep input focused
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formatCwd = (cwdPath: string) => {
    if (cwdPath === '/home/' + PORTFOLIO_DATA.engineer.handle) return '~';
    if (cwdPath.startsWith('/home/' + PORTFOLIO_DATA.engineer.handle)) {
      return '~' + cwdPath.slice('/home/'.length + PORTFOLIO_DATA.engineer.handle.length);
    }
    return cwdPath;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Ctrl + L -> Clear screen
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      onClear();
      return;
    }

    // Ctrl + C -> Interrupt current command
    if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      onSubmit('^C');
      setInputVal('');
      setHistoryIndex(-1);
      setAutocompleteSuggestions([]);
      return;
    }

    // Tab -> Autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      const result = getAutocomplete(inputVal, cwd, fs);
      setInputVal(result.completedLine);
      setAutocompleteSuggestions(result.options);
      return;
    }

    // Arrow Up -> History Back
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;

      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(history[nextIndex]);
      setAutocompleteSuggestions([]);
      return;
    }

    // Arrow Down -> History Forward
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
      setAutocompleteSuggestions([]);
      return;
    }

    // Enter -> Execute
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = inputVal;
      setInputVal('');
      setHistoryIndex(-1);
      setAutocompleteSuggestions([]);
      onSubmit(cmd);
      return;
    }

    // Any other key clears suggestions
    if (autocompleteSuggestions.length > 0) {
      setAutocompleteSuggestions([]);
    }
  };

  const handleQuickCommand = (cmd: string) => {
    if (cmd === 'exit' && onExit) {
      onExit();
      return;
    }
    setInputVal('');
    setHistoryIndex(-1);
    setAutocompleteSuggestions([]);
    onSubmit(cmd);
  };

  return (
    <div className="space-y-2 font-ubuntu-mono text-sm mt-1 pb-2">
      {/* Autocomplete suggestions display */}
      {autocompleteSuggestions.length > 0 && (
        <div className="bg-black/50 border border-white/10 p-2 rounded text-xs">
          <div className="text-slate-400 mb-1 flex items-center justify-between">
            <span>Completions:</span>
            <span className="text-[10px] text-slate-500">Press Tab to complete or select</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {autocompleteSuggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const result = getAutocomplete(item, cwd, fs);
                  setInputVal(result.completedLine);
                  setAutocompleteSuggestions([]);
                  inputRef.current?.focus();
                }}
                className="px-2 py-0.5 rounded bg-[#4a1538] hover:bg-[#e95420] text-[#729fcf] hover:text-white font-ubuntu-mono transition-colors cursor-pointer touch-manipulation"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Shell Prompt & Input */}
      <div
        className="flex items-center flex-wrap cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <span className="text-[#8ae234] font-bold select-none">
          {PORTFOLIO_DATA.engineer.handle}@{PORTFOLIO_DATA.engineer.hostname}
        </span>
        <span className="text-white select-none">:</span>
        <span className="text-[#729fcf] font-bold select-none">
          {formatCwd(cwd)}
        </span>
        <span className="text-white select-none mr-2 font-bold">$</span>

        <div className="flex-1 min-w-[120px] relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            className="w-full bg-transparent border-none outline-none text-white font-ubuntu-mono text-base sm:text-sm p-0 m-0 focus:ring-0 caret-white"
          />
        </div>
      </div>

      {/* Mobile-Friendly Quick Accessory Bar */}
      <div className="flex sm:hidden items-center gap-1.5 pt-2 border-t border-white/10 overflow-x-auto no-scrollbar text-[11px] py-1 select-none">
        <button
          onClick={() => {
            const result = getAutocomplete(inputVal, cwd, fs);
            setInputVal(result.completedLine);
            setAutocompleteSuggestions(result.options);
          }}
          className="px-2.5 py-1 bg-black/40 text-slate-200 rounded border border-white/10 shrink-0 cursor-pointer touch-manipulation active:scale-95"
        >
          Tab ⇥
        </button>
        <button
          onClick={() => {
            if (history.length === 0) return;
            const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(nextIndex);
            setInputVal(history[nextIndex]);
          }}
          className="px-2.5 py-1 bg-black/40 text-slate-200 rounded border border-white/10 shrink-0 cursor-pointer touch-manipulation active:scale-95"
        >
          ↑ History
        </button>
        <button
          onClick={() => handleQuickCommand('ls -la')}
          className="px-2.5 py-1 bg-[#4a1538] text-white font-medium rounded border border-white/10 shrink-0 cursor-pointer touch-manipulation active:scale-95"
        >
          ls
        </button>
        <button
          onClick={() => handleQuickCommand('neofetch')}
          className="px-2.5 py-1 bg-[#4a1538] text-white font-medium rounded border border-white/10 shrink-0 cursor-pointer touch-manipulation active:scale-95"
        >
          neofetch
        </button>
        <button
          onClick={() => handleQuickCommand('about')}
          className="px-2.5 py-1 bg-[#4a1538] text-white font-medium rounded border border-white/10 shrink-0 cursor-pointer touch-manipulation active:scale-95"
        >
          about
        </button>
        <button
          onClick={() => handleQuickCommand('projects')}
          className="px-2.5 py-1 bg-[#4a1538] text-white font-medium rounded border border-white/10 shrink-0 cursor-pointer touch-manipulation active:scale-95"
        >
          projects
        </button>
        <button
          onClick={onClear}
          className="px-2.5 py-1 bg-black/40 text-slate-200 rounded border border-white/10 shrink-0 cursor-pointer touch-manipulation active:scale-95"
        >
          Clear
        </button>
        <button
          onClick={() => handleQuickCommand('exit')}
          className="px-2.5 py-1 bg-red-950/70 text-red-300 font-bold rounded border border-red-700/40 shrink-0 cursor-pointer touch-manipulation active:scale-95"
        >
          Exit ✕
        </button>
        <button
          onClick={() => {
            const cmd = inputVal;
            setInputVal('');
            onSubmit(cmd);
          }}
          className="px-3.5 py-1 bg-[#e95420] text-white font-bold rounded shrink-0 cursor-pointer touch-manipulation active:scale-95 ml-auto"
        >
          Enter ↵
        </button>
      </div>
    </div>
  );
};
