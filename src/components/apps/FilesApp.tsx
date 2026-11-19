/**
 * ARKA OS — GNOME Files Application (Nautilus File Manager)
 * 
 * Fully functional file manager synchronized with the shared virtual filesystem:
 * - Sidebar navigation (Home, Desktop, Documents, Downloads, Projects, Tools)
 * - Breadcrumb path navigation
 * - Grid / List view toggle
 * - Search filter
 * - File / Directory selection
 * - Double-click folder navigation
 * - Double-click file open in Text Editor / VS Code
 * - Create new folder
 * - Rename & Delete files
 * - Right-click context menu
 */

import React, { useState, useEffect } from 'react';
import { virtualFS } from '../../filesystem/virtualFS';
import type { FSNode } from '../../filesystem/virtualFS';

interface FilesAppProps {
  initialPath?: string;
  onOpenFile?: (path: string, content?: string) => void;
  onOpenInTerminal?: (path: string) => void;
}

export const FilesApp: React.FC<FilesAppProps> = ({
  initialPath = '/home/arka',
  onOpenFile,
  onOpenInTerminal,
}) => {
  const [currentPath, setCurrentPath] = useState<string>(initialPath);
  const [history, setHistory] = useState<string[]>([initialPath]);
  const [historyIdx, setHistoryIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [, setFsVersion] = useState<number>(0);

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    targetNode?: FSNode;
  }>({ visible: false, x: 0, y: 0 });

  // Dialog state for new folder / rename
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    type: 'newFolder' | 'rename';
    initialValue: string;
    targetPath?: string;
  }>({ open: false, type: 'newFolder', initialValue: '' });

  // Subscribe to VirtualFilesystem mutations
  useEffect(() => {
    const unsubscribe = virtualFS.subscribe(() => {
      setFsVersion((v) => v + 1);
    });
    return unsubscribe;
  }, []);

  // Fetch current directory contents
  const items = virtualFS.listDir(currentPath) || [];

  // Filter with search query
  const filteredItems = items.filter((item) =>
    searchQuery ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  const navigateTo = (path: string) => {
    const resolved = virtualFS.resolvePath(path, currentPath);
    const node = virtualFS.getNode(resolved);
    if (!node || node.type !== 'dir') return;

    const newHistory = history.slice(0, historyIdx + 1);
    newHistory.push(resolved);
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
    setCurrentPath(resolved);
    setSelectedNode(null);
    setSearchQuery('');
  };

  const handleBack = () => {
    if (historyIdx > 0) {
      setHistoryIdx(historyIdx - 1);
      setCurrentPath(history[historyIdx - 1]);
      setSelectedNode(null);
    }
  };

  const handleForward = () => {
    if (historyIdx < history.length - 1) {
      setHistoryIdx(historyIdx + 1);
      setCurrentPath(history[historyIdx + 1]);
      setSelectedNode(null);
    }
  };

  const handleItemDoubleClick = (item: { name: string; node: FSNode }) => {
    if (item.node.type === 'dir') {
      navigateTo(`${currentPath}/${item.name}`);
    } else {
      const fullPath = `${currentPath}/${item.name}`;
      if (onOpenFile) {
        onOpenFile(fullPath, item.node.content);
      }
    }
  };

  const handleContextMenu = (e: React.MouseEvent, node?: FSNode) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      targetNode: node,
    });
  };

  const handleConfirmDialog = (val: string) => {
    if (!val.trim()) {
      setDialogState({ open: false, type: 'newFolder', initialValue: '' });
      return;
    }

    if (dialogState.type === 'newFolder') {
      virtualFS.createDirectory(`${currentPath}/${val.trim()}`);
    } else if (dialogState.type === 'rename' && dialogState.targetPath) {
      virtualFS.renameNode(dialogState.targetPath, val.trim());
    }

    setDialogState({ open: false, type: 'newFolder', initialValue: '' });
  };

  // Build breadcrumb segments
  const pathSegments = currentPath.split('/').filter(Boolean);

  return (
    <div
      onClick={() => {
        if (contextMenu.visible) setContextMenu({ visible: false, x: 0, y: 0 });
      }}
      className="flex-1 flex flex-col h-full bg-[#1e1e1e] text-slate-200 font-ubuntu select-none overflow-hidden"
    >
      {/* Nautilus Headerbar Toolbar */}
      <div className="h-11 bg-[#252525] border-b border-black/40 px-3 flex items-center justify-between gap-3 shrink-0">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center gap-2 flex-1 overflow-hidden">
          {/* Back/Forward buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleBack}
              disabled={historyIdx === 0}
              className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 transition-colors cursor-pointer"
              title="Back"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button
              onClick={handleForward}
              disabled={historyIdx >= history.length - 1}
              className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 transition-colors cursor-pointer"
              title="Forward"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>

          {/* Breadcrumb Path Bar */}
          <div className="flex items-center bg-[#1e1e1e] rounded-md px-2.5 py-1 text-xs border border-white/5 overflow-x-auto max-w-md">
            <button
              onClick={() => navigateTo('/')}
              className="text-slate-400 hover:text-white font-medium cursor-pointer"
            >
              /
            </button>
            {pathSegments.map((segment, idx) => {
              const segmentPath = '/' + pathSegments.slice(0, idx + 1).join('/');
              return (
                <React.Fragment key={segmentPath}>
                  <span className="text-slate-600 mx-1">/</span>
                  <button
                    onClick={() => navigateTo(segmentPath)}
                    className={`hover:text-white font-medium cursor-pointer ${
                      idx === pathSegments.length - 1 ? 'text-[#e95420] font-bold' : 'text-slate-300'
                    }`}
                  >
                    {segment}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2">
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-[#1e1e1e] text-xs text-white placeholder-slate-500 pl-7 pr-3 py-1 rounded-md border border-white/10 focus:border-[#e95420] outline-none w-32 focus:w-48 transition-all"
            />
            <svg
              className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2 pointer-events-none"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>

          {/* New Folder Button */}
          <button
            onClick={() => setDialogState({ open: true, type: 'newFolder', initialValue: 'New Folder' })}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/15 text-xs text-slate-200 rounded font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            title="Create New Folder"
          >
            <span>+ Folder</span>
          </button>

          {/* Grid/List Toggle */}
          <div className="flex bg-[#1e1e1e] rounded p-0.5 border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-[#e95420] text-white' : 'text-slate-400 hover:text-white'} transition-colors cursor-pointer`}
              title="Grid View"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-[#e95420] text-white' : 'text-slate-400 hover:text-white'} transition-colors cursor-pointer`}
              title="List View"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Files Area: Sidebar + File Grid/List */}
      <div className="flex-1 flex overflow-hidden">
        {/* Nautilus Left Sidebar */}
        <aside className="w-44 bg-[#232323] border-r border-black/30 p-2 space-y-1 overflow-y-auto shrink-0 text-xs text-slate-300">
          <div className="px-2 py-1 text-[10px] uppercase font-bold text-slate-500">Places</div>
          {[
            { label: 'Home', path: '/home/arka', icon: '🏠' },
            { label: 'Desktop', path: '/home/arka/Desktop', icon: '🖥️' },
            { label: 'Documents', path: '/home/arka/Documents', icon: '📄' },
            { label: 'Downloads', path: '/home/arka/Downloads', icon: '📥' },
            { label: 'Pictures', path: '/home/arka/Pictures', icon: '🖼️' },
            { label: 'Music', path: '/home/arka/Music', icon: '🎵' },
            { label: 'Videos', path: '/home/arka/Videos', icon: '🎬' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors cursor-pointer text-left ${
                currentPath === item.path ? 'bg-[#e95420] text-white font-medium' : 'hover:bg-white/10'
              }`}
            >
              <span>{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </button>
          ))}

          <div className="px-2 pt-3 py-1 text-[10px] uppercase font-bold text-slate-500">Engineering</div>
          {[
            { label: 'Projects', path: '/home/arka/projects', icon: '⚡' },
            { label: 'EDA Tools', path: '/home/arka/tools', icon: '🛠️' },
            { label: 'Contact', path: '/home/arka/contact', icon: '📬' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors cursor-pointer text-left ${
                currentPath === item.path ? 'bg-[#e95420] text-white font-medium' : 'hover:bg-white/10'
              }`}
            >
              <span>{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Main File Viewport */}
        <div
          onContextMenu={(e) => handleContextMenu(e)}
          className="flex-1 p-4 overflow-y-auto bg-[#1e1e1e]"
        >
          {filteredItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs">
              <svg className="w-12 h-12 mb-2 stroke-current opacity-40" viewBox="0 0 24 24" fill="none">
                <path d="M20 7H12L10 5H4C2.9 5 2 5.9 2 7V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z" strokeWidth="1.5" />
              </svg>
              <span>Folder is empty</span>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {filteredItems.map((item) => {
                const isDir = item.node.type === 'dir';
                const isSelected = selectedNode === item.name;

                return (
                  <div
                    key={item.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNode(item.name);
                    }}
                    onDoubleClick={() => handleItemDoubleClick(item)}
                    onContextMenu={(e) => handleContextMenu(e, item.node)}
                    className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#3584e4]/30 ring-1 ring-[#3584e4]'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 flex items-center justify-center mb-1">
                      {isDir ? (
                        <svg className="w-12 h-12 text-[#3584e4]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                        </svg>
                      ) : item.name.endsWith('.sv') || item.name.endsWith('.v') ? (
                        <div className="w-10 h-11 bg-[#26a269] rounded p-1 text-[9px] font-mono font-bold text-white flex flex-col justify-between shadow">
                          <span>HDL</span>
                          <span className="text-[8px] text-emerald-200">.sv</span>
                        </div>
                      ) : item.name.endsWith('.pdf') ? (
                        <div className="w-10 h-11 bg-[#c7162b] rounded p-1 text-[9px] font-mono font-bold text-white flex flex-col justify-between shadow">
                          <span>PDF</span>
                          <span className="text-[8px] text-red-200">doc</span>
                        </div>
                      ) : (
                        <div className="w-10 h-11 bg-[#5e5c64] rounded p-1 text-[9px] font-mono font-bold text-white flex flex-col justify-between shadow">
                          <span>TXT</span>
                          <span className="text-[8px] text-slate-300">file</span>
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <span className="text-xs text-center break-all line-clamp-2 text-slate-200 font-medium">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <table className="w-full text-left text-xs text-slate-300 font-ubuntu">
              <thead className="border-b border-white/10 text-slate-400 font-medium">
                <tr>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Size</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Modified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredItems.map((item) => {
                  const isDir = item.node.type === 'dir';
                  const isSelected = selectedNode === item.name;

                  return (
                    <tr
                      key={item.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNode(item.name);
                      }}
                      onDoubleClick={() => handleItemDoubleClick(item)}
                      onContextMenu={(e) => handleContextMenu(e, item.node)}
                      className={`hover:bg-white/5 cursor-pointer ${
                        isSelected ? 'bg-[#3584e4]/30' : ''
                      }`}
                    >
                      <td className="py-2 flex items-center gap-2">
                        <span>{isDir ? '📁' : '📄'}</span>
                        <span className={isDir ? 'text-[#3584e4] font-medium' : 'text-slate-200'}>
                          {item.name}
                        </span>
                      </td>
                      <td className="py-2 text-slate-400 font-mono text-[11px]">
                        {isDir ? '--' : `${item.node.size} B`}
                      </td>
                      <td className="py-2 text-slate-400">
                        {isDir ? 'Folder' : item.name.split('.').pop()?.toUpperCase() || 'File'}
                      </td>
                      <td className="py-2 text-slate-400 text-[11px]">{item.node.modified}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Right-Click Context Menu */}
      {contextMenu.visible && (
        <div
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="fixed bg-[#2d2d2d] border border-white/10 rounded-lg shadow-2xl py-1 text-xs text-slate-200 z-50 w-48 font-ubuntu"
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.targetNode ? (
            <>
              <button
                onClick={() => {
                  if (contextMenu.targetNode) {
                    const fullPath = `${currentPath}/${contextMenu.targetNode.name}`;
                    if (contextMenu.targetNode.type === 'dir') {
                      navigateTo(fullPath);
                    } else if (onOpenFile) {
                      onOpenFile(fullPath, contextMenu.targetNode.content);
                    }
                  }
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#e95420] hover:text-white transition-colors cursor-pointer"
              >
                Open
              </button>
              <button
                onClick={() => {
                  if (contextMenu.targetNode && onOpenInTerminal) {
                    onOpenInTerminal(
                      contextMenu.targetNode.type === 'dir'
                        ? `${currentPath}/${contextMenu.targetNode.name}`
                        : currentPath
                    );
                  }
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#e95420] hover:text-white transition-colors cursor-pointer"
              >
                Open in Terminal
              </button>
              <button
                onClick={() => {
                  if (contextMenu.targetNode) {
                    setDialogState({
                      open: true,
                      type: 'rename',
                      initialValue: contextMenu.targetNode.name,
                      targetPath: `${currentPath}/${contextMenu.targetNode.name}`,
                    });
                  }
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#e95420] hover:text-white transition-colors cursor-pointer"
              >
                Rename...
              </button>
              <div className="border-t border-white/10 my-1"></div>
              <button
                onClick={() => {
                  if (contextMenu.targetNode) {
                    virtualFS.deleteNode(`${currentPath}/${contextMenu.targetNode.name}`);
                  }
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#c7162b] hover:text-white text-red-400 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setDialogState({ open: true, type: 'newFolder', initialValue: 'New Folder' });
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#e95420] hover:text-white transition-colors cursor-pointer"
              >
                New Folder
              </button>
              <button
                onClick={() => {
                  if (onOpenInTerminal) onOpenInTerminal(currentPath);
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#e95420] hover:text-white transition-colors cursor-pointer"
              >
                Open in Terminal
              </button>
            </>
          )}
        </div>
      )}

      {/* Modal Dialog for New Folder / Rename */}
      {dialogState.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 w-80 shadow-2xl space-y-4">
            <h3 className="font-bold text-sm text-white">
              {dialogState.type === 'newFolder' ? 'Create New Folder' : 'Rename Item'}
            </h3>
            <input
              type="text"
              defaultValue={dialogState.initialValue}
              autoFocus
              id="dialogInput"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleConfirmDialog((e.target as HTMLInputElement).value);
                } else if (e.key === 'Escape') {
                  setDialogState({ open: false, type: 'newFolder', initialValue: '' });
                }
              }}
              className="w-full bg-[#1e1e1e] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#e95420] outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDialogState({ open: false, type: 'newFolder', initialValue: '' })}
                className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs text-slate-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const input = document.getElementById('dialogInput') as HTMLInputElement;
                  handleConfirmDialog(input?.value || '');
                }}
                className="px-3 py-1.5 rounded bg-[#e95420] hover:bg-[#ff6e3a] text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
