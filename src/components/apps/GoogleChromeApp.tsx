/**
 * ARKA OS — Google Chrome Web Browser Application
 * 
 * Recreates the Google Chrome experience on Ubuntu GNOME:
 * - Multi-tab Chrome tab bar with favicon, close tab, and new tab (+) button
 * - Omnibox address bar with live navigation & search via backend proxy (/api/proxy)
 * - Navigation controls: Back, Forward, Reload, Home
 * - Bookmarks bar with quick links to Google, VLSI Portfolio, GitHub, and Open PDK
 * - Embedded iframe backed by Express proxy to bypass X-Frame-Options
 * - Responsive Fallbacks: New Tab Page with Google Search, Offline Dinosaur screen
 */

import React, { useState, useRef } from 'react';
import { PORTFOLIO_DATA } from '../../config/portfolioData';

interface Tab {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  isLoading?: boolean;
}

export const GoogleChromeApp: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'tab-1',
      title: 'Google',
      url: 'chrome://newtab',
      displayUrl: 'https://www.google.com',
      isLoading: false,
    },
    {
      id: 'tab-2',
      title: 'ARKA VLSI Portfolio',
      url: 'https://arka-vlsi.dev',
      displayUrl: 'https://arka-vlsi.dev',
      isLoading: false,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');
  const [inputUrl, setInputUrl] = useState<string>('https://www.google.com');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [iframeError, setIframeError] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  // Helper to switch active tab
  const handleSelectTab = (tab: Tab) => {
    setActiveTabId(tab.id);
    setInputUrl(tab.url === 'chrome://newtab' ? 'https://www.google.com' : tab.url);
    setIframeError(false);
  };

  // Add new tab
  const handleNewTab = () => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      title: 'New Tab',
      url: 'chrome://newtab',
      displayUrl: '',
      isLoading: false,
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
    setInputUrl('');
    setIframeError(false);
  };

  // Close tab
  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) {
      // Don't close last tab, just reset to new tab
      setTabs([{ id: 'tab-1', title: 'New Tab', url: 'chrome://newtab', displayUrl: '' }]);
      setActiveTabId('tab-1');
      setInputUrl('');
      return;
    }
    const updated = tabs.filter(t => t.id !== tabId);
    setTabs(updated);
    if (activeTabId === tabId) {
      setActiveTabId(updated[updated.length - 1].id);
      setInputUrl(updated[updated.length - 1].url === 'chrome://newtab' ? '' : updated[updated.length - 1].url);
    }
  };

  // Format URL or search query
  const resolveTargetUrl = (input: string): { url: string; title: string } => {
    const trimmed = input.trim();
    if (!trimmed) {
      return { url: 'chrome://newtab', title: 'New Tab' };
    }

    if (trimmed.startsWith('chrome://')) {
      return { url: trimmed, title: 'Google Chrome' };
    }

    // Check if it's already a full URL or domain name
    const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/i;
    if (domainRegex.test(trimmed)) {
      const fullUrl = trimmed.startsWith('http://') || trimmed.startsWith('https://')
        ? trimmed
        : `https://${trimmed}`;
      let title = trimmed.replace(/^https?:\/\//, '').split('/')[0];
      return { url: fullUrl, title };
    }

    // Otherwise treat as a Google Search query
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
    return { url: searchUrl, title: `${trimmed} - Google Search` };
  };

  // Handle address bar navigation
  const handleNavigate = (targetString: string) => {
    const { url, title } = resolveTargetUrl(targetString);
    setIframeError(false);

    setTabs(prev =>
      prev.map(t => {
        if (t.id === activeTabId) {
          return {
            ...t,
            url,
            title,
            displayUrl: url === 'chrome://newtab' ? '' : url,
            isLoading: url !== 'chrome://newtab',
          };
        }
        return t;
      })
    );

    setInputUrl(url === 'chrome://newtab' ? '' : url);

    // Turn off loading after a short timeout if iframe loads
    setTimeout(() => {
      setTabs(prev =>
        prev.map(t => (t.id === activeTabId ? { ...t, isLoading: false } : t))
      );
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNavigate(inputUrl);
  };

  const handleReload = () => {
    if (iframeRef.current && activeTab.url !== 'chrome://newtab') {
      setTabs(prev =>
        prev.map(t => (t.id === activeTabId ? { ...t, isLoading: true } : t))
      );
      iframeRef.current.src = `/api/proxy?url=${encodeURIComponent(activeTab.url)}`;
      setTimeout(() => {
        setTabs(prev =>
          prev.map(t => (t.id === activeTabId ? { ...t, isLoading: false } : t))
        );
      }, 1000);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#202124] text-slate-100 font-ubuntu select-none overflow-hidden">
      {/* Chrome Top Tabs Bar */}
      <div className="h-10 bg-[#1f1f23] px-2 flex items-end gap-1 shrink-0 pt-1 border-b border-black/40">
        <div className="flex items-center gap-1 overflow-x-auto max-w-full flex-1">
          {tabs.map(tab => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => handleSelectTab(tab)}
                className={`flex items-center gap-2 px-3 py-1.5 h-8 text-xs font-sans rounded-t-lg cursor-pointer transition-all min-w-[130px] max-w-[200px] group ${
                  isActive
                    ? 'bg-[#292a2d] text-white shadow-sm font-medium border-t-2 border-[#1a73e8]'
                    : 'bg-[#18181b]/70 hover:bg-[#252528] text-slate-400 hover:text-slate-200'
                }`}
              >
                {/* Chrome / Site Favicon */}
                <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                  {tab.url.includes('google') ? (
                    <span className="text-sm">🔍</span>
                  ) : tab.url.includes('arka') ? (
                    <span className="text-sm">⚡</span>
                  ) : tab.url.includes('github') ? (
                    <span className="text-sm">🐙</span>
                  ) : (
                    <span className="text-sm">🌐</span>
                  )}
                </div>

                <span className="truncate flex-1 text-xs">{tab.title}</span>

                <button
                  onClick={(e) => handleCloseTab(tab.id, e)}
                  className="w-4 h-4 rounded-full hover:bg-white/20 text-slate-400 hover:text-white flex items-center justify-center text-[10px] opacity-70 group-hover:opacity-100 transition-opacity"
                  title="Close tab"
                >
                  ✕
                </button>
              </div>
            );
          })}

          {/* New Tab Button */}
          <button
            onClick={handleNewTab}
            className="w-7 h-7 rounded-full hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center text-base cursor-pointer shrink-0 transition-colors ml-1"
            title="New tab"
          >
            +
          </button>
        </div>

        {/* Top Window controls spacer */}
        <div className="w-6 shrink-0" />
      </div>

      {/* Chrome Navigation Toolbar (Omnibox, Back, Forward, Refresh, Home) */}
      <div className="h-11 bg-[#292a2d] px-3 flex items-center gap-2 border-b border-black/30 shrink-0">
        <div className="flex items-center gap-0.5 text-slate-300">
          <button
            onClick={() => window.history.back()}
            className="w-7 h-7 rounded-full hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center text-sm cursor-pointer transition-colors"
            title="Click to go back"
          >
            ←
          </button>
          <button
            onClick={() => window.history.forward()}
            className="w-7 h-7 rounded-full hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center text-sm cursor-pointer transition-colors"
            title="Click to go forward"
          >
            →
          </button>
          <button
            onClick={handleReload}
            className="w-7 h-7 rounded-full hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center text-sm cursor-pointer transition-colors"
            title="Reload this page"
          >
            ↻
          </button>
          <button
            onClick={() => handleNavigate('chrome://newtab')}
            className="w-7 h-7 rounded-full hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center text-sm cursor-pointer transition-colors"
            title="Open Home page"
          >
            🏠
          </button>
        </div>

        {/* Omnibox / URL Search Bar */}
        <form onSubmit={handleFormSubmit} className="flex-1 flex items-center">
          <div className="w-full flex items-center bg-[#202124] border border-transparent focus-within:border-[#1a73e8] rounded-full px-3.5 py-1.5 text-xs text-white shadow-inner transition-colors">
            <span className="text-emerald-400 mr-2 text-xs">🔒</span>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Search Google or type a URL"
              className="w-full bg-transparent border-none outline-none text-slate-100 font-sans text-xs selection:bg-[#1a73e8]/40"
            />
            {inputUrl && (
              <button
                type="button"
                onClick={() => setInputUrl('')}
                className="text-slate-400 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            )}
          </div>
        </form>

        {/* Right Toolbar: Extensions, User Avatar, Kebab Menu */}
        <div className="flex items-center gap-2 pl-1 text-slate-300">
          <button
            onClick={() => {
              if (activeTab.url !== 'chrome://newtab') {
                window.open(activeTab.url, '_blank');
              }
            }}
            className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-sans flex items-center gap-1 cursor-pointer transition-colors"
            title="Open in real browser tab"
          >
            <span>↗</span>
            <span className="hidden sm:inline">External</span>
          </button>
          <div className="w-6 h-6 rounded-full bg-[#1a73e8] flex items-center justify-center text-white text-[11px] font-bold shadow">
            A
          </div>
          <button className="text-slate-400 hover:text-white px-1 text-sm cursor-pointer font-bold">
            ⋮
          </button>
        </div>
      </div>

      {/* Bookmarks Bar */}
      <div className="h-7 bg-[#292a2d] px-3 flex items-center gap-4 text-xs text-slate-300 border-b border-black/20 shrink-0 overflow-x-auto">
        <button
          onClick={() => handleNavigate('chrome://newtab')}
          className="flex items-center gap-1 hover:text-white cursor-pointer hover:bg-white/5 px-2 py-0.5 rounded transition-colors shrink-0"
        >
          <span>🔍</span>
          <span>Google Search</span>
        </button>
        <button
          onClick={() => handleNavigate('https://arka-vlsi.dev')}
          className="flex items-center gap-1 hover:text-white cursor-pointer hover:bg-white/5 px-2 py-0.5 rounded transition-colors shrink-0"
        >
          <span>⚡</span>
          <span>ARKA Overview</span>
        </button>
        <button
          onClick={() => handleNavigate('https://github.com/arka-vlsi')}
          className="flex items-center gap-1 hover:text-white cursor-pointer hover:bg-white/5 px-2 py-0.5 rounded transition-colors shrink-0"
        >
          <span>🐙</span>
          <span>GitHub</span>
        </button>
        <button
          onClick={() => handleNavigate('https://linkedin.com/in/arkasnata-pal-6a3682276')}
          className="flex items-center gap-1 hover:text-white cursor-pointer hover:bg-white/5 px-2 py-0.5 rounded transition-colors shrink-0"
        >
          <span>💼</span>
          <span>LinkedIn</span>
        </button>
        <button
          onClick={() => handleNavigate('https://docs.xilinx.com')}
          className="flex items-center gap-1 hover:text-white cursor-pointer hover:bg-white/5 px-2 py-0.5 rounded transition-colors shrink-0"
        >
          <span>📘</span>
          <span>Vivado Docs</span>
        </button>
        <button
          onClick={() => handleNavigate('https://en.wikipedia.org/wiki/Very_Large_Scale_Integration')}
          className="flex items-center gap-1 hover:text-white cursor-pointer hover:bg-white/5 px-2 py-0.5 rounded transition-colors shrink-0"
        >
          <span>🌐</span>
          <span>VLSI Wikipedia</span>
        </button>
      </div>

      {/* Loading Progress Bar */}
      {activeTab.isLoading && (
        <div className="h-0.5 w-full bg-[#1a73e8] animate-pulse shrink-0" />
      )}

      {/* Web Viewport */}
      <div className="flex-1 relative bg-[#202124] overflow-hidden flex flex-col">
        {/* Case 1: Google Chrome New Tab / Google Search Landing */}
        {activeTab.url === 'chrome://newtab' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#202124] text-white overflow-y-auto">
            {/* Google Logo */}
            <div className="flex items-center gap-1 text-5xl md:text-6xl font-sans font-bold tracking-tight mb-8 select-none">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </div>

            {/* Google Centered Search Input */}
            <div className="w-full max-w-xl mb-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    handleNavigate(searchQuery.trim());
                  }
                }}
                className="flex items-center bg-[#303134] hover:bg-[#3c4043] focus-within:bg-[#303134] border border-[#5f6368]/30 focus-within:border-transparent focus-within:shadow-[0_1px_6px_rgba(255,255,255,0.2)] rounded-full px-4 py-3 transition-all"
              >
                <span className="text-slate-400 mr-3 text-base">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Google or enter URL (e.g. wikipedia.org, github.com)..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-sm"
                  autoFocus
                />
                <button
                  type="submit"
                  className="text-xs bg-[#4285F4] hover:bg-[#3367d6] text-white px-3 py-1 rounded-full font-medium ml-2 cursor-pointer transition-colors"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Quick Shortcut Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-lg justify-items-center">
              {[
                { name: 'ARKA Portfolio', url: 'https://arka-vlsi.dev', icon: '⚡', color: 'bg-purple-900/60' },
                { name: 'GitHub', url: 'https://github.com/arka-vlsi', icon: '🐙', color: 'bg-zinc-800' },
                { name: 'LinkedIn', url: 'https://linkedin.com/in/arkasnata-pal-6a3682276', icon: '💼', color: 'bg-blue-900/60' },
                { name: 'VLSI Wiki', url: 'https://en.wikipedia.org/wiki/Very_Large_Scale_Integration', icon: '🌐', color: 'bg-emerald-900/60' },
              ].map(tile => (
                <button
                  key={tile.name}
                  onClick={() => handleNavigate(tile.url)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[#303134] transition-all cursor-pointer w-24 group"
                >
                  <div className={`w-12 h-12 rounded-full ${tile.color} flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform`}>
                    {tile.icon}
                  </div>
                  <span className="text-xs text-slate-300 font-sans truncate w-full text-center">
                    {tile.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Google Bottom Footer */}
            <div className="mt-12 text-xs text-slate-500 font-sans">
              Google Chrome Workstation Edition &bull; Ubuntu 24.04 LTS
            </div>
          </div>
        ) : activeTab.url === 'https://arka-vlsi.dev' ? (
          /* Case 2: Embedded ARKA VLSI Portfolio Hub */
          <div className="flex-1 p-6 overflow-y-auto bg-[#18181b] text-slate-200">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 to-slate-900 border border-white/10 space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-[#1a73e8]/20 text-[#8ab4f8] text-xs font-semibold">
                  Official Digital VLSI Engineering Portfolio
                </div>
                <h1 className="text-2xl font-bold text-white">
                  {PORTFOLIO_DATA.engineer.fullName}
                </h1>
                <p className="text-sm text-cyan-400 font-mono">
                  {PORTFOLIO_DATA.engineer.title} &bull; {PORTFOLIO_DATA.engineer.tagline}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {PORTFOLIO_DATA.engineer.summary}
                </p>
              </div>

              {/* Real Verilog Projects Showcase */}
              <div className="space-y-3">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Verilog HDL Hardware Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {PORTFOLIO_DATA.projects.map(p => (
                    <div key={p.id} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-white text-sm">{p.name}</span>
                        <span className="text-[11px] font-mono text-[#8ab4f8] uppercase">{p.category}</span>
                      </div>
                      <p className="text-xs text-slate-300">{p.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {p.technologies?.slice(0, 3).map((t: string) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Case 3: Live Proxy Web Page via Express Backend */
          <div className="flex-1 w-full h-full relative bg-white">
            <iframe
              ref={iframeRef}
              src={`/api/proxy?url=${encodeURIComponent(activeTab.url)}`}
              onError={() => setIframeError(true)}
              className="w-full h-full border-none"
              title={activeTab.title}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />

            {/* Error or Fallback Overlay */}
            {iframeError && (
              <div className="absolute inset-0 bg-[#202124] flex flex-col items-center justify-center p-6 text-white text-center">
                <div className="text-5xl mb-4">🦖</div>
                <h2 className="text-xl font-bold mb-2">Unable to connect to the Internet</h2>
                <p className="text-xs text-slate-400 max-w-md mb-6">
                  Chrome was unable to connect to <span className="font-mono text-white">{activeTab.url}</span>. Verify that the ARKA OS backend proxy is online.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleReload}
                    className="px-4 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-lg text-xs font-medium cursor-pointer"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => window.open(activeTab.url, '_blank')}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium cursor-pointer"
                  >
                    Open in External Browser
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};