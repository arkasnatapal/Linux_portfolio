/**
 * ARKA OS — Visual Studio Code Desktop Application
 * 
 * Recreates the VS Code workstation experience on Ubuntu:
 * - Left Activity Bar
 * - Workspace Explorer with RTL files
 * - Multi-tab syntax highlighted code editor
 * - Live editing & file saving to virtual filesystem
 * - Status bar with branch, language, and line/column metrics
 */

import React, { useState, useEffect } from 'react';
import { virtualFS } from '../../filesystem/virtualFS';

interface VSCodeAppProps {
  initialFile?: string;
}

interface OpenTab {
  path: string;
  name: string;
  content: string;
  language: string;
  isDirty?: boolean;
}

export const VSCodeApp: React.FC<VSCodeAppProps> = ({ initialFile }) => {
  const [openTabs, setOpenTabs] = useState<OpenTab[]>([]);
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  // Check if a file is protected system portfolio file
  const isPathReadOnly = (path: string): boolean => {
    return (
      path.includes('/home/arka/projects/') ||
      path.includes('/home/arka/README.md') ||
      path.includes('/home/arka/about.txt') ||
      path.includes('/home/arka/skills.txt') ||
      path.includes('/home/arka/experience.txt') ||
      path.includes('/home/arka/education.txt') ||
      path.includes('/home/arka/certifications.txt') ||
      path.includes('/home/arka/contact.txt') ||
      path.includes('/home/arka/achievements.txt') ||
      path.startsWith('/etc') ||
      path.startsWith('/var')
    );
  };

  const triggerWarning = () => {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 3500);
  };

  // Default files to load if none specified
  useEffect(() => {
    const defaultPath = initialFile || '/home/arka/projects/rtl/riscv_core.sv';
    const content = virtualFS.readFile(defaultPath) || `// SystemVerilog module\nmodule riscv_core;\nendmodule\n`;
    const name = defaultPath.split('/').pop() || 'file.sv';
    const language = name.endsWith('.sv') || name.endsWith('.v') ? 'SystemVerilog' : name.endsWith('.sdc') || name.endsWith('.tcl') ? 'Tcl' : 'Markdown';

    setOpenTabs([
      {
        path: defaultPath,
        name,
        content,
        language,
      },
    ]);
  }, [initialFile]);

  const activeTab = openTabs[activeTabIdx];

  const handleOpenFromExplorer = (path: string) => {
    const existingIdx = openTabs.findIndex(t => t.path === path);
    if (existingIdx !== -1) {
      setActiveTabIdx(existingIdx);
      return;
    }

    const content = virtualFS.readFile(path) || '';
    const name = path.split('/').pop() || 'file.txt';
    const language = name.endsWith('.sv') || name.endsWith('.v') ? 'SystemVerilog' : name.endsWith('.sdc') || name.endsWith('.tcl') ? 'Tcl' : 'Markdown';

    setOpenTabs(prev => [...prev, { path, name, content, language }]);
    setActiveTabIdx(openTabs.length);
  };

  const handleCloseTab = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = openTabs.filter((_, i) => i !== idx);
    setOpenTabs(updated);
    if (activeTabIdx >= updated.length) {
      setActiveTabIdx(Math.max(0, updated.length - 1));
    }
  };

  const handleContentChange = (newContent: string) => {
    if (!activeTab) return;
    if (isPathReadOnly(activeTab.path)) {
      triggerWarning();
      return;
    }
    const updated = [...openTabs];
    updated[activeTabIdx] = {
      ...activeTab,
      content: newContent,
      isDirty: true,
    };
    setOpenTabs(updated);
  };

  const handleSave = () => {
    if (!activeTab) return;
    if (isPathReadOnly(activeTab.path)) {
      triggerWarning();
      return;
    }
    virtualFS.createFile(activeTab.path, activeTab.content);
    const updated = [...openTabs];
    updated[activeTabIdx] = {
      ...activeTab,
      isDirty: false,
    };
    setOpenTabs(updated);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1e1e1e] text-slate-300 font-mono text-xs select-none overflow-hidden">
      {/* Top Menu Line */}
      <div className="h-7 bg-[#252526] px-3 flex items-center justify-between border-b border-[#181818] text-[11px] text-slate-400 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[#007acc] font-bold">Code</span>
          <span className="hover:text-white cursor-pointer">File</span>
          <span className="hover:text-white cursor-pointer">Edit</span>
          <span className="hover:text-white cursor-pointer">Selection</span>
          <span className="hover:text-white cursor-pointer">View</span>
          <span className="hover:text-white cursor-pointer">Go</span>
          <span className="hover:text-white cursor-pointer">Run</span>
          <span className="hover:text-white cursor-pointer">Terminal</span>
        </div>
        <div className="text-[11px] text-slate-400 font-sans hidden sm:block">
          {activeTab ? `${activeTab.name} — ARKA VLSI Workspace` : 'ARKA VLSI Workspace'}
        </div>
      </div>

      {/* Main Workspace Body: Activity Bar + Sidebar + Editor */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Activity Bar */}
        <aside className="w-11 bg-[#333333] flex flex-col items-center justify-between py-2 text-slate-400 shrink-0">
          <div className="flex flex-col items-center gap-4 w-full">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded hover:text-white transition-colors cursor-pointer ${
                sidebarOpen ? 'text-white border-l-2 border-white' : ''
              }`}
              title="Explorer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
              </svg>
            </button>
            <button className="p-2 hover:text-white transition-colors cursor-pointer" title="Search">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button className="p-2 hover:text-white transition-colors cursor-pointer" title="Source Control">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="6" y1="9" x2="6" y2="15" />
                <path d="M18 9a3 3 0 0 0-3-3H6" />
              </svg>
            </button>
          </div>
          <button className="p-2 hover:text-white transition-colors cursor-pointer" title="Settings">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </aside>

        {/* Workspace Explorer Sidebar */}
        {sidebarOpen && (
          <div className="w-52 bg-[#252526] border-r border-[#181818] p-2 overflow-y-auto shrink-0 space-y-2">
            <div className="text-[10px] uppercase font-bold text-slate-400 px-2 flex justify-between items-center">
              <span>EXPLORER: VLSI-PROJECTS</span>
            </div>

            <div className="space-y-0.5 text-xs text-slate-300">
              <div className="font-semibold text-slate-400 px-1 py-0.5">📁 projects/rtl</div>
              {[
                { name: 'riscv_core.sv', path: '/home/arka/projects/rtl/riscv_core.sv', icon: '⚡' },
                { name: 'axi_dma_controller.v', path: '/home/arka/projects/rtl/axi_dma_controller.v', icon: '⚡' },
                { name: 'fifo_async.v', path: '/home/arka/projects/rtl/fifo_async.v', icon: '⚡' },
              ].map(f => (
                <button
                  key={f.path}
                  onClick={() => handleOpenFromExplorer(f.path)}
                  className={`w-full text-left px-3 py-1 rounded hover:bg-[#2a2d2e] flex items-center gap-1.5 cursor-pointer ${
                    activeTab?.path === f.path ? 'bg-[#37373d] text-white font-medium' : ''
                  }`}
                >
                  <span className="text-emerald-400">{f.icon}</span>
                  <span className="truncate">{f.name}</span>
                </button>
              ))}

              <div className="font-semibold text-slate-400 px-1 pt-2 py-0.5">📁 projects/synthesis</div>
              {[
                { name: 'timing_constraints.sdc', path: '/home/arka/projects/synthesis/timing_constraints.sdc', icon: '⏱️' },
                { name: 'yosys_synth_report.rpt', path: '/home/arka/projects/synthesis/yosys_synth_report.rpt', icon: '📊' },
              ].map(f => (
                <button
                  key={f.path}
                  onClick={() => handleOpenFromExplorer(f.path)}
                  className={`w-full text-left px-3 py-1 rounded hover:bg-[#2a2d2e] flex items-center gap-1.5 cursor-pointer ${
                    activeTab?.path === f.path ? 'bg-[#37373d] text-white font-medium' : ''
                  }`}
                >
                  <span>{f.icon}</span>
                  <span className="truncate">{f.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e]">
          {/* Tabs Bar */}
          <div className="h-9 bg-[#252526] flex items-center overflow-x-auto border-b border-[#181818]">
            {openTabs.map((tab, idx) => (
              <div
                key={tab.path}
                onClick={() => setActiveTabIdx(idx)}
                className={`flex items-center gap-2 px-3 h-full border-r border-[#181818] cursor-pointer text-xs ${
                  idx === activeTabIdx
                    ? 'bg-[#1e1e1e] text-white border-t-2 border-[#007acc]'
                    : 'bg-[#2d2d2d] text-slate-400 hover:text-slate-200'
                }`}
              >
                {isPathReadOnly(tab.path) && <span className="text-[10px] text-amber-400">🔒</span>}
                <span>{tab.name}</span>
                {tab.isDirty && <span className="w-2 h-2 rounded-full bg-white"></span>}
                <button
                  onClick={(e) => handleCloseTab(idx, e)}
                  className="hover:bg-white/20 rounded p-0.5"
                  title="Close Tab"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Active Editor Canvas */}
          {activeTab ? (
            <div className="flex-1 flex flex-col p-3 overflow-y-auto relative">
              {/* Ephemeral Warning Notification Toast */}
              {showWarning && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#c7162b] text-white px-3 py-1.5 rounded-lg shadow-2xl border border-white/20 text-xs font-sans font-medium flex items-center gap-2 animate-bounce">
                  <span>⛔</span>
                  <span>Permission Denied: System portfolio documents are view-only and cannot be modified.</span>
                </div>
              )}

              <div className="flex justify-between items-center pb-2 mb-2 border-b border-white/5 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span>File: {activeTab.path}</span>
                  {isPathReadOnly(activeTab.path) && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 font-sans border border-red-800/40">
                      🔒 Read-Only Document
                    </span>
                  )}
                </div>
                {isPathReadOnly(activeTab.path) ? (
                  <button
                    onClick={triggerWarning}
                    className="px-2.5 py-0.5 bg-white/10 hover:bg-white/15 text-slate-400 rounded font-medium transition-colors cursor-not-allowed text-xs flex items-center gap-1"
                  >
                    <span>🔒</span> View Only
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="px-2.5 py-0.5 bg-[#007acc] hover:bg-[#0062a3] text-white rounded font-medium transition-colors cursor-pointer text-xs"
                  >
                    Save (Ctrl+S)
                  </button>
                )}
              </div>

              <textarea
                value={activeTab.content}
                readOnly={isPathReadOnly(activeTab.path)}
                onKeyDown={(e) => {
                  if (isPathReadOnly(activeTab.path) && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
                    triggerWarning();
                  }
                }}
                onChange={(e) => handleContentChange(e.target.value)}
                spellCheck={false}
                className={`w-full flex-1 bg-transparent border-none outline-none font-mono text-xs leading-relaxed resize-none selection:bg-[#264f78] ${
                  isPathReadOnly(activeTab.path) ? 'text-slate-300 cursor-default' : 'text-slate-100 cursor-text'
                }`}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-xs">
              <span className="text-xl mb-2">⚡</span>
              <span>Select a file from the explorer to begin editing</span>
            </div>
          )}
        </div>
      </div>

      {/* VS Code Bottom Status Bar */}
      <footer className="h-6 bg-[#007acc] text-white px-3 flex items-center justify-between text-[11px] font-sans select-none shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-mono">
            <span>⎇</span> main*
          </span>
          <span>0 errors, 0 warnings</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln 24, Col 1</span>
          <span>Spaces: 4</span>
          <span>UTF-8</span>
          <span>{activeTab?.language || 'Plain Text'}</span>
          <span>VLSI Workstation</span>
        </div>
      </footer>
    </div>
  );
};
