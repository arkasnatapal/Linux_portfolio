/**
 * ARKA OS — In-Terminal Interactive Editor (GNU nano & VIM)
 * 
 * Allows users to edit or author files inside the terminal:
 * - Real interactive multi-line text editor
 * - Saves file directly to virtualFS (/home/arka/Desktop/<filename>)
 * - Automatically triggers physical browser download to the user's host PC
 * - Supports GNU nano and VIM visual layouts
 */

import React, { useState } from 'react';
import type { VirtualFilesystem } from '../filesystem/virtualFS';

interface TerminalEditorProps {
  editorType: 'nano' | 'vim';
  filename: string;
  initialContent?: string;
  fs: VirtualFilesystem;
  cwd: string;
}

export const TerminalEditor: React.FC<TerminalEditorProps> = ({
  editorType,
  filename,
  initialContent = '',
  fs,
  cwd,
}) => {
  const [content, setContent] = useState<string>(initialContent);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Compute file path
  const targetDir = cwd.includes('/Desktop') ? cwd : '/home/arka/Desktop';
  const cleanFilename = filename.split('/').pop() || 'untitled.txt';
  const fullPath = `${targetDir}/${cleanFilename}`;

  const handleSaveAndDownload = () => {
    // 1. Save to Virtual Filesystem (desktop directory)
    fs.createFile(fullPath, content);

    // 2. Trigger real download to the user's local machine
    try {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = cleanFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsSaved(true);
      setSaveStatus(`[ ✔ Saved to ${fullPath} & downloaded to your PC's local storage ]`);
    } catch (err: any) {
      setSaveStatus(`[ Error downloading file: ${err.message} ]`);
    }
  };

  return (
    <div className="my-2 border border-slate-700 rounded-lg overflow-hidden bg-[#181818] shadow-2xl font-ubuntu-mono text-xs max-w-full">
      {/* Editor Header */}
      <div className="bg-[#282828] text-white px-3 py-1.5 flex items-center justify-between border-b border-black/40">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#e95420]">
            {editorType === 'nano' ? 'GNU nano 7.2' : 'VIM 9.0 (Vi IMproved)'}
          </span>
          <span className="text-slate-400">&bull;</span>
          <span className="text-cyan-300 font-semibold">{cleanFilename}</span>
          {!isSaved && content.length > 0 && (
            <span className="text-amber-400 text-[10px]">[Modified]</span>
          )}
        </div>

        <button
          onClick={handleSaveAndDownload}
          className="px-2.5 py-0.5 bg-[#e95420] hover:bg-[#ff6e3a] text-white font-medium rounded transition-colors cursor-pointer text-xs flex items-center gap-1 shadow"
        >
          <span>💾</span>
          <span>Save & Download to PC</span>
        </button>
      </div>

      {/* Editor Body */}
      <div className="p-3 bg-[#111111] relative">
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setIsSaved(false);
          }}
          placeholder={`// Write your Verilog code or notes here...\n// Clicking "Save & Download" will save to ~/Desktop and download directly to your computer.`}
          rows={10}
          spellCheck={false}
          className="w-full bg-transparent text-slate-100 font-ubuntu-mono text-xs leading-relaxed outline-none border-none resize-y selection:bg-[#e95420]/30"
          autoFocus
        />

        {/* Save feedback indicator */}
        {saveStatus && (
          <div className="mt-2 text-emerald-400 font-bold text-xs bg-emerald-950/40 border border-emerald-800/40 px-2 py-1 rounded">
            {saveStatus}
          </div>
        )}
      </div>

      {/* Editor Footer / Shortcuts */}
      <div className="bg-[#222222] text-slate-400 px-3 py-1.5 flex flex-wrap items-center justify-between text-[11px] border-t border-black/30">
        {editorType === 'nano' ? (
          <div className="flex flex-wrap gap-4 text-slate-300">
            <span><span className="bg-white/20 text-white px-1 rounded">^O</span> WriteOut</span>
            <span><span className="bg-white/20 text-white px-1 rounded">^R</span> Read File</span>
            <span><span className="bg-white/20 text-white px-1 rounded">^W</span> Where Is</span>
            <span><span className="bg-white/20 text-white px-1 rounded">^X</span> Exit</span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 text-slate-300">
            <span><span className="text-cyan-400 font-bold">:w</span> write file</span>
            <span><span className="text-cyan-400 font-bold">:q</span> quit</span>
            <span><span className="text-cyan-400 font-bold">:wq</span> save & quit</span>
            <span className="text-slate-500">-- INSERT --</span>
          </div>
        )}
        <span className="text-slate-500 font-mono">
          {content.split('\n').length} lines &bull; {content.length} chars
        </span>
      </div>
    </div>
  );
};