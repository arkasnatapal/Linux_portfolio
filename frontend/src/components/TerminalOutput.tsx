/**
 * ARKA OS — Terminal Output Display (Ubuntu Style)
 * 
 * Renders authentic Ubuntu MOTD (Message of the Day),
 * command prompt lines with official Ubuntu bash prompt coloring:
 * - Green user@host: #8ae234
 * - Blue directory: #729fcf
 * - White colon and dollar: #ffffff
 */

import React, { useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';

export interface TerminalEntry {
  id: string;
  command: string;
  cwd: string;
  timestamp: Date;
  output?: {
    text?: string;
    node?: React.ReactNode;
    isError?: boolean;
  };
}

interface TerminalOutputProps {
  entries: TerminalEntry[];
  onExecuteCommand?: (command: string) => void;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ entries }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [entries]);

  const formatCwd = (cwd: string) => {
    if (cwd === '/home/' + PORTFOLIO_DATA.engineer.handle) return '~';
    if (cwd.startsWith('/home/' + PORTFOLIO_DATA.engineer.handle)) {
      return '~' + cwd.slice('/home/'.length + PORTFOLIO_DATA.engineer.handle.length);
    }
    return cwd;
  };

  return (
    <div className="space-y-2 font-ubuntu-mono text-sm leading-relaxed text-slate-100">
      {/* Executed History Entries */}
      {entries.map(entry => (
        <div key={entry.id} className="space-y-1">
          {/* Shell Prompt Line with Exact Ubuntu Colors */}
          <div className="flex items-center flex-wrap">
            <span className="text-[#8ae234] font-bold">
              {PORTFOLIO_DATA.engineer.handle}@{PORTFOLIO_DATA.engineer.hostname}
            </span>
            <span className="text-white">:</span>
            <span className="text-[#729fcf] font-bold">
              {formatCwd(entry.cwd)}
            </span>
            <span className="text-white">$ </span>
            <span className="text-white font-medium pl-1.5">
              {entry.command}
            </span>
          </div>

          {/* Rendered Command Output */}
          {entry.output && (
            <div className="pl-0">
              {entry.output.node && <div>{entry.output.node}</div>}
              {entry.output.text && (
                <div
                  className={`whitespace-pre-wrap leading-relaxed ${
                    entry.output.isError ? 'text-red-400' : 'text-slate-200'
                  }`}
                >
                  {entry.output.text}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Auto-scroll anchor */}
      <div ref={scrollRef} />
    </div>
  );
};
