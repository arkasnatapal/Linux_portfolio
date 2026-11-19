/**
 * ARKA OS — GNOME Text Editor (Gedit)
 * 
 * Includes:
 * - Read-only enforcement for protected system portfolio documents
 * - Instant warning badge & toast if user attempts modification
 * - Saving for custom user-created files
 */

import React, { useState } from 'react';
import { virtualFS } from '../../filesystem/virtualFS';

interface TextEditorAppProps {
  initialFile?: string;
  initialContent?: string;
}

export const TextEditorApp: React.FC<TextEditorAppProps> = ({
  initialFile = '/home/arka/README.md',
  initialContent,
}) => {
  const [filePath] = useState(initialFile);
  const [content, setContent] = useState(initialContent ?? (virtualFS.readFile(initialFile) || ''));
  const [isSaved, setIsSaved] = useState(true);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  // Protected system portfolio files are strictly read-only
  const isReadOnly =
    filePath.includes('/home/arka/README.md') ||
    filePath.includes('/home/arka/about.txt') ||
    filePath.includes('/home/arka/skills.txt') ||
    filePath.includes('/home/arka/experience.txt') ||
    filePath.includes('/home/arka/education.txt') ||
    filePath.includes('/home/arka/certifications.txt') ||
    filePath.includes('/home/arka/contact.txt') ||
    filePath.includes('/home/arka/achievements.txt') ||
    filePath.includes('/home/arka/projects/') ||
    filePath.startsWith('/etc') ||
    filePath.startsWith('/var');

  const triggerWarning = () => {
    setShowWarning(true);
    setTimeout(() => {
      setShowWarning(false);
    }, 3500);
  };

  const handleSave = () => {
    if (isReadOnly) {
      triggerWarning();
      return;
    }
    virtualFS.createFile(filePath, content);
    setIsSaved(true);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1e1e1e] text-slate-100 font-ubuntu select-none overflow-hidden relative">
      {/* Read-Only Protection Banner */}
      {isReadOnly && (
        <div className="bg-[#5c1d24] text-red-200 border-b border-red-700/60 px-3 py-1.5 flex items-center justify-between text-xs font-sans shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-base">🔒</span>
            <span className="font-semibold">Protected System File</span>
            <span className="text-red-300 hidden sm:inline">&bull; This document is view-only and cannot be modified or executed.</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-black/40 text-[10px] font-mono uppercase font-bold text-red-200 border border-red-600/40">
            Read-Only
          </span>
        </div>
      )}

      {/* Ephemeral Warning Notification Toast */}
      {showWarning && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-[#c7162b] text-white px-4 py-2 rounded-xl shadow-2xl border border-white/20 text-xs font-medium flex items-center gap-2 animate-bounce">
          <span>⛔</span>
          <span>Permission Denied: System portfolio documents are view-only and cannot be edited.</span>
        </div>
      )}

      {/* Header Toolbar */}
      <div className="h-10 bg-[#252525] px-3 flex items-center justify-between border-b border-black/40 text-xs shrink-0">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="font-medium text-white truncate max-w-xs">{filePath.split('/').pop()}</span>
          {isReadOnly ? (
            <span className="text-[11px] text-amber-400 font-mono flex items-center gap-1">
              <span>🔒</span> [Read-Only]
            </span>
          ) : (
            !isSaved && <span className="w-2 h-2 rounded-full bg-[#e95420]" title="Unsaved changes"></span>
          )}
        </div>

        <div>
          {isReadOnly ? (
            <button
              onClick={triggerWarning}
              className="px-3 py-1 bg-white/10 hover:bg-white/15 text-slate-400 font-medium rounded transition-colors cursor-not-allowed text-xs flex items-center gap-1"
            >
              <span>🔒</span> View Only
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-[#e95420] hover:bg-[#ff6e3a] text-white font-medium rounded transition-colors cursor-pointer text-xs"
            >
              Save
            </button>
          )}
        </div>
      </div>

      {/* Editor Textarea */}
      <div className="flex-1 p-4 bg-[#1e1e1e] overflow-hidden flex flex-col relative">
        <textarea
          value={content}
          readOnly={isReadOnly}
          onKeyDown={(e) => {
            if (isReadOnly && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
              triggerWarning();
            }
          }}
          onChange={(e) => {
            if (isReadOnly) {
              triggerWarning();
              return;
            }
            setContent(e.target.value);
            setIsSaved(false);
          }}
          spellCheck={false}
          className={`w-full flex-1 bg-transparent border-none outline-none font-mono text-xs leading-relaxed resize-none selection:bg-[#3584e4]/40 ${
            isReadOnly ? 'text-slate-300 cursor-default' : 'text-slate-100 cursor-text'
          }`}
        />
      </div>

      {/* Footer info */}
      <div className="h-6 bg-[#252525] px-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-black/30 font-mono shrink-0">
        <span className="truncate max-w-[60%]">{filePath}</span>
        <span>{content.length} chars &bull; {isReadOnly ? 'Locked' : 'UTF-8'}</span>
      </div>
    </div>
  );
};