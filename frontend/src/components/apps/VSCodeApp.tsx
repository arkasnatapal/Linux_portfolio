/**
 * ARKA OS — Visual Studio Code Desktop Application (Ubuntu Edition)
 * 
 * Recreates the complete professional VS Code workstation experience:
 * - Activity Bar with Explorer, Search, Source Control, and Extensions
 * - Workspace Explorer showcasing the authentic /src/codes folder:
 *   - PWM: README.md, top.v, toptb.v, top_prac.v
 *   - SPI: README.md, master.v, master_adv.v, spi_slave_model.v, test.v, adv.out
 *   - UART: README.md, UART.v, transmitter_module.v, receiver_module.v, baudrate_generator.v, UART_TB.v
 *   - projects: 8bit ALU (8bitAlu.v), Traffic_Controller (traffic_controller.v)
 * - Anti-Copy, Anti-Inspection (HTML5 Canvas Engine with 0 DOM code nodes)
 * - Screenshot blocking & security watermark protection
 * - Rich Markdown Preview toggle for README.md files
 * - Breadcrumbs, multi-tab switching, and status bar metrics
 */

import React, { useState, useEffect } from 'react';
import {
  ALL_CODE_FILES,
  CODE_EXPLORER_FOLDERS,
  findCodeFileByPath,
  type CodeFileItem,
} from '../../codes/codeRegistry';
import { SecureCanvasCodeViewer } from './SecureCanvasCodeViewer';
import { MarkdownDocumentViewer } from './MarkdownDocumentViewer';

interface VSCodeAppProps {
  initialFile?: string;
}

interface OpenTab {
  file: CodeFileItem;
  viewMode: 'canvas' | 'preview';
}

export const VSCodeApp: React.FC<VSCodeAppProps> = ({ initialFile }) => {
  // Activity Bar View: 'explorer' | 'search' | 'git' | 'extensions'
  const [activeSideView, setActiveSideView] = useState<'explorer' | 'search' | 'git' | 'extensions'>('explorer');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 768 : true;
  });

  // Folder collapse states
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'PWM': true,
    'SPI': true,
    'UART': true,
    'more-projects': true,
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Open tabs initialized directly from initialFile or default
  const [openTabs, setOpenTabs] = useState<OpenTab[]>(() => {
    let targetFile: CodeFileItem | undefined;
    if (initialFile) {
      targetFile = findCodeFileByPath(initialFile);
    }
    if (!targetFile) {
      targetFile = ALL_CODE_FILES.find(f => f.name === 'master_adv.v') || ALL_CODE_FILES[0];
    }
    if (targetFile) {
      return [
        {
          file: targetFile,
          viewMode: targetFile.language === 'markdown' ? 'preview' : 'canvas',
        },
      ];
    }
    return [];
  });
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);

  // Security Toast
  const [showSecurityToast, setShowSecurityToast] = useState<boolean>(false);

  // Switch tab if initialFile changes externally
  useEffect(() => {
    if (!initialFile) return;
    const targetFile = findCodeFileByPath(initialFile);
    if (!targetFile) return;

    setOpenTabs(prev => {
      const idx = prev.findIndex(t => t.file.id === targetFile.id);
      if (idx !== -1) {
        setActiveTabIdx(idx);
        return prev;
      }
      const newTabs = [
        ...prev,
        {
          file: targetFile,
          viewMode: targetFile.language === 'markdown' ? ('preview' as const) : ('canvas' as const),
        },
      ];
      setActiveTabIdx(prev.length);
      return newTabs;
    });
  }, [initialFile]);

  const activeTab = openTabs[activeTabIdx];

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const handleOpenFile = (file: CodeFileItem) => {
    const existingIdx = openTabs.findIndex(t => t.file.id === file.id);
    if (existingIdx !== -1) {
      setActiveTabIdx(existingIdx);
      return;
    }

    setOpenTabs(prev => [
      ...prev,
      {
        file,
        viewMode: file.language === 'markdown' ? 'preview' : 'canvas',
      },
    ]);
    setActiveTabIdx(openTabs.length);

    // On mobile, collapse sidebar automatically once file is opened
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleCloseTab = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = openTabs.filter((_, i) => i !== idx);
    setOpenTabs(updated);
    if (activeTabIdx >= updated.length) {
      setActiveTabIdx(Math.max(0, updated.length - 1));
    }
  };

  const toggleViewMode = () => {
    if (!activeTab) return;
    const nextMode = activeTab.viewMode === 'preview' ? 'canvas' : 'preview';
    const updated = [...openTabs];
    updated[activeTabIdx] = {
      ...activeTab,
      viewMode: nextMode,
    };
    setOpenTabs(updated);
  };

  // Search matching files
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return ALL_CODE_FILES.filter(
      f =>
        f.name.toLowerCase().includes(q) ||
        f.folder.toLowerCase().includes(q) ||
        f.content.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="flex-1 flex flex-col h-full w-full bg-[#1e1e1e] text-slate-300 font-ubuntu select-none overflow-hidden">
      {/* 1. VS Code Menu Bar */}
      <div className="h-7 bg-[#252526] px-3 flex items-center justify-between border-b border-[#181818] text-[11px] text-slate-400 shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-4 overflow-x-auto">
          <span className="text-[#007acc] font-bold flex items-center gap-1 shrink-0">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .32 8.704l4.135 3.3-4.135 3.301a1 1 0 0 0 .007 1.442l1.322 1.203c.376.342.94.364 1.276.057l4.12-3.128 9.46 8.63c.47.43 1.157.545 1.705.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352z" />
            </svg>
            <span>Code</span>
          </span>
          <span className="hover:text-white cursor-pointer hidden sm:inline">File</span>
          <span className="hover:text-white cursor-pointer hidden sm:inline">Edit</span>
          <span className="hover:text-white cursor-pointer hidden sm:inline">Selection</span>
          <span className="hover:text-white cursor-pointer hidden sm:inline">View</span>
          <span className="hover:text-white cursor-pointer hidden sm:inline">Go</span>
          <span className="hover:text-white cursor-pointer hidden sm:inline">Run</span>
          <span className="hover:text-white cursor-pointer hidden sm:inline">Terminal</span>
          <span className="hover:text-white cursor-pointer hidden sm:inline">Help</span>
        </div>

        {/* Center / Right Title */}
        <div className="flex items-center gap-3">
          <div className="text-[11px] text-slate-400 font-sans truncate max-w-[200px] sm:max-w-md">
            {activeTab ? `${activeTab.file.name} — ARKA VLSI Workstation` : 'ARKA VLSI Workstation'}
          </div>

          {/* Security Indicator Pill */}
          <button
            onClick={() => {
              setShowSecurityToast(true);
              setTimeout(() => setShowSecurityToast(false), 3000);
            }}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-[10px] cursor-pointer hover:bg-emerald-900/60"
            title="Anti-Copy & Canvas Shield Enabled"
          >
            <span>🔒</span>
            <span className="hidden sm:inline">Protected Source</span>
          </button>
        </div>
      </div>

      {/* Ephemeral Security Toast */}
      {showSecurityToast && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 bg-[#252526] border border-[#e95420] text-white px-4 py-2 rounded-xl shadow-2xl text-xs flex items-center gap-2.5 animate-bounce">
          <span className="text-base">🛡️</span>
          <div>
            <div className="font-bold text-emerald-400">Security Engine Active</div>
            <div className="text-[11px] text-slate-300">
              Files are rendered on an HTML5 Canvas with 0 DOM code nodes. Copying, editing, and screenshot capture are restricted.
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Workspace Body: Activity Bar + Sidebar + Editor */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Activity Bar */}
        <aside className="w-11 bg-[#333333] flex flex-col items-center justify-between py-2 text-slate-400 shrink-0 z-20">
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Explorer Icon */}
            <button
              onClick={() => {
                if (activeSideView === 'explorer') {
                  setSidebarOpen(!sidebarOpen);
                } else {
                  setActiveSideView('explorer');
                  setSidebarOpen(true);
                }
              }}
              className={`p-2 rounded hover:text-white transition-colors cursor-pointer w-full flex justify-center relative ${
                sidebarOpen && activeSideView === 'explorer'
                  ? 'text-white border-l-2 border-white'
                  : ''
              }`}
              title="Explorer: ARKA-VLSI-CODES"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
              </svg>
            </button>

            {/* Search Icon */}
            <button
              onClick={() => {
                if (activeSideView === 'search') {
                  setSidebarOpen(!sidebarOpen);
                } else {
                  setActiveSideView('search');
                  setSidebarOpen(true);
                }
              }}
              className={`p-2 rounded hover:text-white transition-colors cursor-pointer w-full flex justify-center ${
                sidebarOpen && activeSideView === 'search'
                  ? 'text-white border-l-2 border-white'
                  : ''
              }`}
              title="Search in Codebase"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Source Control Icon */}
            <button
              onClick={() => {
                if (activeSideView === 'git') {
                  setSidebarOpen(!sidebarOpen);
                } else {
                  setActiveSideView('git');
                  setSidebarOpen(true);
                }
              }}
              className={`p-2 rounded hover:text-white transition-colors cursor-pointer w-full flex justify-center ${
                sidebarOpen && activeSideView === 'git'
                  ? 'text-white border-l-2 border-white'
                  : ''
              }`}
              title="Source Control: Git"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="6" y1="9" x2="6" y2="15" />
                <path d="M18 9a3 3 0 0 0-3-3H6" />
              </svg>
            </button>

            {/* Extensions Icon */}
            <button
              onClick={() => {
                if (activeSideView === 'extensions') {
                  setSidebarOpen(!sidebarOpen);
                } else {
                  setActiveSideView('extensions');
                  setSidebarOpen(true);
                }
              }}
              className={`p-2 rounded hover:text-white transition-colors cursor-pointer w-full flex justify-center ${
                sidebarOpen && activeSideView === 'extensions'
                  ? 'text-white border-l-2 border-white'
                  : ''
              }`}
              title="Extensions (Verilog HDL, Yaru Theme)"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 8V4h4" />
                <path d="M8 4l-4 4" />
                <path d="M20 16v4h-4" />
                <path d="M16 20l4-4" />
                <rect x="9" y="9" width="6" height="6" rx="1" />
              </svg>
            </button>
          </div>

          {/* Bottom Settings Icon */}
          <button
            onClick={() => setShowSecurityToast(true)}
            className="p-2 hover:text-white transition-colors cursor-pointer"
            title="Workstation Security Settings"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </aside>

        {/* Workspace Sidebar */}
        {sidebarOpen && (
          <div className="w-60 md:w-64 bg-[#252526] border-r border-[#181818] flex flex-col shrink-0 z-10 overflow-hidden font-ubuntu">
            {/* VIEW 1: EXPLORER */}
            {activeSideView === 'explorer' && (
              <div className="flex-1 flex flex-col overflow-y-auto p-2">
                <div className="text-[11px] uppercase font-bold text-slate-400 px-2 py-1 flex justify-between items-center tracking-wider border-b border-white/5">
                  <span>EXPLORER: CODES</span>
                  <span className="text-[10px] text-slate-500 font-mono">{ALL_CODE_FILES.length} files</span>
                </div>

                <div className="space-y-1 mt-2 text-xs">
                  {CODE_EXPLORER_FOLDERS.map(folder => (
                    <div key={folder.id} className="space-y-0.5">
                      {/* Main Folder Row */}
                      <button
                        onClick={() => toggleFolder(folder.id)}
                        className="w-full flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[#2a2d2e] text-left text-slate-300 font-semibold cursor-pointer group"
                      >
                        <span className="text-slate-400 text-[10px] w-3">
                          {expandedFolders[folder.id] ? '▼' : '▶'}
                        </span>
                        <span className="text-amber-400 text-sm">📁</span>
                        <span className="truncate">{folder.name}</span>
                        <span className="ml-auto text-[10px] text-slate-500 group-hover:text-slate-300">
                          {folder.files.length + (folder.subfolders?.reduce((acc, sf) => acc + sf.files.length, 0) || 0)}
                        </span>
                      </button>

                      {/* Folder Children Files */}
                      {expandedFolders[folder.id] && (
                        <div className="pl-4 space-y-0.5 border-l border-white/5 ml-3">
                          {folder.files.map(file => (
                            <button
                              key={file.id}
                              onClick={() => handleOpenFile(file)}
                              className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left text-xs cursor-pointer transition-colors ${
                                activeTab?.file.id === file.id
                                  ? 'bg-[#37373d] text-white font-medium shadow-sm'
                                  : 'text-slate-300 hover:bg-[#2a2d2e] hover:text-white'
                              }`}
                            >
                              <span className="shrink-0 text-xs">
                                {file.name.endsWith('.md')
                                  ? '📄'
                                  : file.name.endsWith('.out')
                                  ? '📊'
                                  : '⚡'}
                              </span>
                              <span className="truncate">{file.name}</span>
                              {file.name === 'README.md' && (
                                <span className="ml-auto text-[9px] px-1 py-0.2 rounded bg-purple-900/50 text-purple-200 border border-purple-700/40">
                                  DOC
                                </span>
                              )}
                            </button>
                          ))}

                          {/* Subfolders (e.g. projects/8bit ALU, Traffic_Controller) */}
                          {folder.subfolders?.map(subfolder => (
                            <div key={subfolder.id} className="space-y-0.5 mt-1">
                              <button
                                onClick={() => toggleFolder(subfolder.id)}
                                className="w-full flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[#2a2d2e] text-left text-slate-300 font-medium cursor-pointer"
                              >
                                <span className="text-slate-400 text-[9px] w-2.5">
                                  {expandedFolders[subfolder.id] ? '▼' : '▶'}
                                </span>
                                <span className="text-amber-300 text-xs">📂</span>
                                <span className="truncate">{subfolder.name}</span>
                              </button>

                              {expandedFolders[subfolder.id] && (
                                <div className="pl-4 space-y-0.5 border-l border-white/5 ml-3">
                                  {subfolder.files.map(file => (
                                    <button
                                      key={file.id}
                                      onClick={() => handleOpenFile(file)}
                                      className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left text-xs cursor-pointer transition-colors ${
                                        activeTab?.file.id === file.id
                                          ? 'bg-[#37373d] text-white font-medium shadow-sm'
                                          : 'text-slate-300 hover:bg-[#2a2d2e] hover:text-white'
                                      }`}
                                    >
                                      <span className="text-emerald-400 text-xs">⚡</span>
                                      <span className="truncate">{file.name}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 2: SEARCH */}
            {activeSideView === 'search' && (
              <div className="flex-1 flex flex-col p-3 space-y-3 overflow-y-auto">
                <div className="text-[11px] uppercase font-bold text-slate-400">SEARCH CODEBASE</div>
                <div className="bg-[#1e1e1e] border border-white/10 rounded px-2.5 py-1.5 flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search keywords, modules..."
                    className="w-full bg-transparent border-none outline-none text-white text-xs"
                    autoFocus
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="text-[10px] text-slate-500 uppercase">
                    {searchQuery ? `${searchResults.length} matches found` : 'Type to search across all files'}
                  </div>
                  {searchResults.map(f => (
                    <button
                      key={f.id}
                      onClick={() => handleOpenFile(f)}
                      className="w-full p-2 rounded bg-black/20 hover:bg-[#2a2d2e] text-left border border-white/5 cursor-pointer"
                    >
                      <div className="font-bold text-white text-xs truncate flex items-center gap-1.5">
                        <span>{f.name.endsWith('.md') ? '📄' : '⚡'}</span>
                        <span>{f.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{f.folder}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 3: SOURCE CONTROL */}
            {activeSideView === 'git' && (
              <div className="flex-1 flex flex-col p-3 space-y-3">
                <div className="text-[11px] uppercase font-bold text-slate-400">SOURCE CONTROL: GIT</div>
                <div className="p-3 bg-black/20 rounded border border-white/5 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold">
                    <span>✓</span>
                    <span>Working tree clean</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Branch: <strong className="text-white">main</strong> synced with{' '}
                    <a
                      href="https://github.com/arkasnatapal"
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:underline"
                    >
                      github.com/arkasnatapal
                    </a>
                  </p>
                  <div className="text-[10px] text-slate-500 font-mono">
                    All Verilog & Markdown designs committed.
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 4: EXTENSIONS */}
            {activeSideView === 'extensions' && (
              <div className="flex-1 flex flex-col p-3 space-y-3 overflow-y-auto text-xs">
                <div className="text-[11px] uppercase font-bold text-slate-400">INSTALLED EXTENSIONS</div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded bg-black/20 border border-white/5">
                    <div className="font-bold text-white">Verilog-HDL / SystemVerilog</div>
                    <div className="text-[10px] text-slate-400">Hardware description language support</div>
                    <span className="text-[9px] text-emerald-400 mt-1 inline-block">✓ Active</span>
                  </div>

                  <div className="p-2.5 rounded bg-black/20 border border-white/5">
                    <div className="font-bold text-white">Yaru Dark Theme</div>
                    <div className="text-[10px] text-slate-400">Ubuntu 24.04 official desktop aesthetic</div>
                    <span className="text-[9px] text-emerald-400 mt-1 inline-block">✓ Active</span>
                  </div>

                  <div className="p-2.5 rounded bg-black/20 border border-white/5">
                    <div className="font-bold text-white">Markdown Preview Enhanced</div>
                    <div className="text-[10px] text-slate-400">Architecture & documentation rendering</div>
                    <span className="text-[9px] text-emerald-400 mt-1 inline-block">✓ Active</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. Editor Viewport */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e]">
          {/* Editor Tabs Bar */}
          <div className="h-9 bg-[#252526] flex items-center justify-between border-b border-[#181818] overflow-hidden shrink-0">
            {/* Tabs List */}
            <div className="flex items-center h-full overflow-x-auto no-scrollbar">
              {openTabs.map((tab, idx) => (
                <div
                  key={tab.file.id}
                  onClick={() => setActiveTabIdx(idx)}
                  className={`flex items-center gap-2 px-3 h-full border-r border-[#181818] cursor-pointer text-xs shrink-0 select-none ${
                    idx === activeTabIdx
                      ? 'bg-[#1e1e1e] text-white border-t-2 border-[#007acc]'
                      : 'bg-[#2d2d2d] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs">
                    {tab.file.name.endsWith('.md') ? '📄' : tab.file.name.endsWith('.out') ? '📊' : '⚡'}
                  </span>
                  <span className="truncate max-w-[140px] sm:max-w-[200px]">{tab.file.name}</span>
                  <span className="text-[9px] text-amber-400" title="Read-Only Protected">
                    🔒
                  </span>
                  <button
                    onClick={(e) => handleCloseTab(idx, e)}
                    className="hover:bg-white/20 rounded p-0.5 ml-1 text-slate-400 hover:text-white"
                    title="Close Tab"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Actions (Right of Tab Bar) */}
            <div className="flex items-center gap-1.5 px-3 shrink-0">
              {activeTab?.file.language === 'markdown' && (
                <button
                  onClick={toggleViewMode}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] font-sans font-medium flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                  title="Toggle Markdown Preview / Raw View"
                >
                  <span>{activeTab.viewMode === 'preview' ? '⚡ Raw Canvas' : '📖 Preview'}</span>
                </button>
              )}

              {/* Sidebar toggle button (Mobile & Desktop) */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white text-xs cursor-pointer"
                title={sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
              >
                {sidebarOpen ? '◀' : '▶'}
              </button>
            </div>
          </div>

          {/* Breadcrumbs Bar */}
          {activeTab && (
            <div className="h-6 bg-[#1e1e1e] px-4 flex items-center gap-1.5 border-b border-[#252526] text-[11px] text-slate-400 font-mono shrink-0 select-none overflow-x-auto">
              <span>codes</span>
              <span>&gt;</span>
              <span className="text-amber-400">{activeTab.file.folder}</span>
              <span>&gt;</span>
              <span className="text-white font-medium">{activeTab.file.name}</span>
              {activeTab.file.language === 'verilog' && (
                <>
                  <span>&gt;</span>
                  <span className="text-purple-400">module</span>
                </>
              )}
            </div>
          )}

          {/* Active File Content Engine */}
          {activeTab ? (
            <div className="flex-1 overflow-hidden relative">
              {activeTab.viewMode === 'preview' && activeTab.file.language === 'markdown' ? (
                <MarkdownDocumentViewer
                  content={activeTab.file.content}
                  fileName={activeTab.file.name}
                />
              ) : (
                <SecureCanvasCodeViewer
                  content={activeTab.file.content}
                  language={activeTab.file.language}
                  fileName={activeTab.file.name}
                />
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-xs p-6 text-center">
              <span className="text-3xl mb-3">💻</span>
              <span className="text-base font-bold text-slate-300">ARKA VLSI Workspace</span>
              <span className="mt-1 text-slate-400 max-w-sm">
                Select a Verilog HDL module or Markdown specification from the explorer to inspect the hardware design.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 4. VS Code Status Bar */}
      <footer className="h-6 bg-[#007acc] text-white px-3 flex items-center justify-between text-[11px] font-sans select-none shrink-0 z-20">
        <div className="flex items-center gap-2.5 sm:gap-4 overflow-hidden">
          <span className="flex items-center gap-1 font-mono truncate">
            <span>⎇</span> main*
          </span>
          <span className="hidden sm:inline">0 errors, 0 warnings</span>
          <span className="flex items-center gap-1 text-sky-100 font-mono text-[10px]">
            <span>🔒</span>
            <span className="truncate">Proprietary RTL (Read-Only)</span>
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 font-mono shrink-0">
          <span className="hidden sm:inline">
            Ln {activeTab?.file.content.split('\n').length || 0}, Col 1
          </span>
          <span className="hidden sm:inline">Spaces: 4</span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="font-semibold text-white">{activeTab?.file.languageLabel || 'Plain Text'}</span>
          <span className="hidden md:inline">VLSI Workstation</span>
        </div>
      </footer>
    </div>
  );
};
