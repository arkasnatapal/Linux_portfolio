/**
 * ARKA OS — Terminal Window Container (Ubuntu Yaru Style)
 * 
 * Orchestrates the terminal window viewport, output log, active input prompt,
 * and command execution lifecycle within the iconic Ubuntu aubergine terminal canvas.
 * Optimized for mobile touch, smooth scrolling, and instant window closure.
 */

import React, { useState, useRef, useEffect } from 'react';
import { TerminalOutput } from './TerminalOutput';
import type { TerminalEntry } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import { virtualFS } from '../filesystem/virtualFS';
import { parseCommandLine } from '../shell/commandParser';
import { COMMAND_REGISTRY } from '../shell/commandRegistry';

interface TerminalWindowProps {
  onLogout: () => void;
  onClose?: () => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
  initialCwd?: string;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  onLogout,
  onClose,
  initialCwd,
}) => {
  const [cwd, setCwd] = useState<string>(initialCwd || virtualFS.defaultHome);
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const viewportRef = useRef<HTMLDivElement>(null);

  const handleClear = () => {
    setEntries([]);
  };

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [entries]);

  const handleExecute = (rawInput: string) => {
    const trimmed = rawInput.trim();

    // If Ctrl+C cancellation
    if (rawInput === '^C') {
      setEntries(prev => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2),
          command: '^C',
          cwd,
          timestamp: new Date(),
        },
      ]);
      return;
    }

    // If empty input (just hit Enter)
    if (!trimmed) {
      setEntries(prev => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2),
          command: '',
          cwd,
          timestamp: new Date(),
        },
      ]);
      return;
    }

    // Add to history
    setHistory(prev => [...prev, trimmed]);

    // Parse command
    const parsed = parseCommandLine(trimmed);
    const commandName = parsed.command;

    let outputResult;

    if (commandName in COMMAND_REGISTRY) {
      const handler = COMMAND_REGISTRY[commandName];
      outputResult = handler(parsed, {
        cwd,
        setCwd,
        fs: virtualFS,
        history,
        clearTerminal: handleClear,
        exitToLogin: onLogout,
        exitTerminal: onClose || onLogout,
      });
    } else {
      // Command not found - authentic Linux error
      outputResult = {
        text: `bash: ${commandName}: command not found\nType 'help' to inspect the available VLSI and system commands.`,
        isError: true,
      };
    }

    // Add execution entry
    setEntries(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2),
        command: trimmed,
        cwd,
        timestamp: new Date(),
        output: outputResult,
      },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full bg-[#300a24] overflow-hidden font-ubuntu-mono select-none">
      {/* Terminal Viewport (Direct Ubuntu Aubergine Canvas) */}
      <div
        ref={viewportRef}
        className="flex-1 p-2 sm:p-4 md:p-5 overflow-y-auto font-ubuntu-mono select-text bg-[#300a24] touch-pan-y overscroll-contain"
        tabIndex={0}
      >
        <TerminalOutput entries={entries} />
        <TerminalInput
          cwd={cwd}
          fs={virtualFS}
          history={history}
          onSubmit={handleExecute}
          onClear={handleClear}
          onExit={onClose || onLogout}
        />
      </div>
    </div>
  );
};
