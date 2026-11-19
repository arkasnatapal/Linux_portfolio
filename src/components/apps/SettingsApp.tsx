/**
 * ARKA OS — GNOME Settings Desktop Application
 * 
 * Recreates Ubuntu GNOME Control Center:
 * - Network (Ethernet, Wi-Fi toggle)
 * - Appearance (Theme, Wallpaper selector)
 * - Displays (Resolution, Night light)
 * - Sound (Interactive Volume Slider with audio feedback)
 * - About (Hardware Specs, Processor, OS version)
 */

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../config/portfolioData';

interface SettingsAppProps {
  volume: number;
  onVolumeChange: (vol: number) => void;
  brightness: number;
  onBrightnessChange: (b: number) => void;
  theme?: 'dark' | 'light';
  onThemeChange?: (theme: 'dark' | 'light') => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({
  volume,
  onVolumeChange,
  brightness,
  onBrightnessChange,
  theme = 'dark',
  onThemeChange,
}) => {
  const [activeSection, setActiveSection] = useState<'about' | 'appearance' | 'sound' | 'network' | 'displays'>('about');
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [nightLight, setNightLight] = useState(false);

  return (
    <div className={`flex-1 flex h-full font-ubuntu select-none overflow-hidden transition-colors ${
      theme === 'light' ? 'bg-[#f4f4f4] text-slate-800' : 'bg-[#1e1e1e] text-slate-100'
    }`}>
      {/* Settings Left Sidebar */}
      <aside className={`w-52 p-2 space-y-1 overflow-y-auto shrink-0 text-xs transition-colors ${
        theme === 'light' ? 'bg-[#e5e5e5] border-r border-slate-300 text-slate-700' : 'bg-[#252525] border-r border-black/40 text-slate-300'
      }`}>
        <div className={`px-3 py-1.5 text-[10px] uppercase font-bold ${
          theme === 'light' ? 'text-slate-500' : 'text-slate-500'
        }`}>System</div>
        {[
          { id: 'about', label: 'About', icon: 'ℹ️' },
          { id: 'appearance', label: 'Appearance', icon: '🎨' },
          { id: 'sound', label: 'Sound', icon: '🔊' },
          { id: 'displays', label: 'Displays', icon: '🖥️' },
          { id: 'network', label: 'Network', icon: '🌐' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id as any)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors cursor-pointer text-left ${
              activeSection === item.id
                ? 'bg-[#e95420] text-white font-medium shadow'
                : theme === 'light' ? 'hover:bg-black/5 text-slate-800' : 'hover:bg-white/10 text-slate-300'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </aside>

      {/* Main Settings Content */}
      <div className={`flex-1 p-6 overflow-y-auto text-xs transition-colors ${
        theme === 'light' ? 'bg-[#fbfbfb] text-slate-800' : 'bg-[#1e1e1e] text-slate-100'
      }`}>
        <div className="max-w-xl mx-auto space-y-6">
          {/* Section: About */}
          {activeSection === 'about' && (
            <div className="space-y-4">
              <h2 className={`text-base font-bold border-b pb-2 ${
                theme === 'light' ? 'text-slate-900 border-black/10' : 'text-white border-white/10'
              }`}>
                About ARKA OS
              </h2>

              <div className={`flex items-center gap-4 p-4 rounded-xl border ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/30 border-white/5'
              }`}>
                <div className="w-16 h-16 rounded-full bg-[#3e1335] border-2 border-[#e95420] flex items-center justify-center text-2xl font-bold">
                  ⚡
                </div>
                <div>
                  <div className={`text-base font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    {PORTFOLIO_DATA.system.osName}
                  </div>
                  <div className="text-slate-400 font-mono text-[11px]">{PORTFOLIO_DATA.system.kernel}</div>
                  <div className="text-[#e95420] text-xs mt-0.5">{PORTFOLIO_DATA.engineer.tagline}</div>
                </div>
              </div>

              <div className={`rounded-xl border divide-y ${
                theme === 'light' ? 'bg-white border-slate-200 divide-slate-100 shadow-sm' : 'bg-black/30 border-white/5 divide-white/5'
              }`}>
                <div className="p-3 flex justify-between">
                  <span className={theme === 'light' ? 'text-slate-600' : 'text-slate-400'}>Device Name:</span>
                  <span className={`font-mono ${theme === 'light' ? 'text-slate-900 font-semibold' : 'text-white'}`}>{PORTFOLIO_DATA.engineer.hostname}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className={theme === 'light' ? 'text-slate-600' : 'text-slate-400'}>Processor:</span>
                  <span className={`font-mono ${theme === 'light' ? 'text-slate-900 font-semibold' : 'text-white'}`}>AMD EPYC 9654 96-Core (192 vCPUs)</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className={theme === 'light' ? 'text-slate-600' : 'text-slate-400'}>Memory:</span>
                  <span className={`font-mono ${theme === 'light' ? 'text-slate-900 font-semibold' : 'text-white'}`}>128.0 GiB ECC DDR5</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className={theme === 'light' ? 'text-slate-600' : 'text-slate-400'}>EDA Silicon PDK:</span>
                  <span className="font-mono text-cyan-600 font-bold">SkyWater Sky130A</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className={theme === 'light' ? 'text-slate-600' : 'text-slate-400'}>Windowing System:</span>
                  <span className={`font-mono ${theme === 'light' ? 'text-slate-900 font-semibold' : 'text-white'}`}>Wayland / GNOME Shell 46</span>
                </div>
              </div>
            </div>
          )}

          {/* Section: Appearance */}
          {activeSection === 'appearance' && (
            <div className="space-y-4">
              <h2 className={`text-base font-bold border-b pb-2 ${
                theme === 'light' ? 'text-slate-900 border-black/10' : 'text-white border-white/10'
              }`}>
                Appearance
              </h2>

              <div className="space-y-2">
                <label className={theme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-400 font-medium'}>Desktop Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Ubuntu Dark Tile */}
                  <button
                    onClick={() => onThemeChange && onThemeChange('dark')}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      theme === 'dark'
                        ? 'bg-black/60 border-2 border-[#e95420] shadow-md ring-2 ring-[#e95420]/30'
                        : 'bg-black/20 border-black/20 hover:border-black/40 text-slate-400 opacity-70'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#2c001e] border-2 border-[#e95420] flex items-center justify-center">
                      {theme === 'dark' && <div className="w-2 h-2 rounded-full bg-[#e95420]" />}
                    </div>
                    <div className="text-left">
                      <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-400'}`}>Ubuntu Dark</div>
                      <div className="text-[10px] text-slate-400">Classic aubergine dark theme</div>
                    </div>
                  </button>

                  {/* Ubuntu Light Tile */}
                  <button
                    onClick={() => onThemeChange && onThemeChange('light')}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      theme === 'light'
                        ? 'bg-white border-2 border-[#e95420] shadow-md ring-2 ring-[#e95420]/30'
                        : 'bg-white/10 border-white/10 hover:border-white/30 text-slate-400 opacity-70'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#f4dbe8] border-2 border-[#e95420] flex items-center justify-center">
                      {theme === 'light' && <div className="w-2 h-2 rounded-full bg-[#e95420]" />}
                    </div>
                    <div className="text-left">
                      <div className={`font-medium ${theme === 'light' ? 'text-slate-900 font-semibold' : 'text-slate-300'}`}>Ubuntu Light</div>
                      <div className="text-[10px] text-slate-500">Official Yaru Light theme</div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className={theme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-400 font-medium'}>
                  Desktop Brightness: {brightness}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="120"
                  value={brightness}
                  onChange={(e) => onBrightnessChange(Number(e.target.value))}
                  className="w-full accent-[#e95420]"
                />
              </div>
            </div>
          )}

          {/* Section: Sound */}
          {activeSection === 'sound' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white border-b border-white/10 pb-2">
                Sound
              </h2>

              <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Output Volume</span>
                  <span className="font-mono text-[#e95420] font-bold">{volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                  className="w-full accent-[#e95420]"
                />
                <button
                  onClick={() => {
                    // Play subtle test beep using web audio
                    try {
                      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                      const osc = ctx.createOscillator();
                      const gain = ctx.createGain();
                      osc.type = 'sine';
                      osc.frequency.setValueAtTime(440, ctx.currentTime);
                      gain.gain.setValueAtTime((volume / 100) * 0.1, ctx.currentTime);
                      osc.connect(gain);
                      gain.connect(ctx.destination);
                      osc.start();
                      osc.stop(ctx.currentTime + 0.15);
                    } catch (e) {}
                  }}
                  className="px-3 py-1.5 bg-[#e95420] text-white rounded font-medium text-xs cursor-pointer hover:bg-[#ff6e3a]"
                >
                  Test Audio Feedback
                </button>
              </div>
            </div>
          )}

          {/* Section: Displays */}
          {activeSection === 'displays' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white border-b border-white/10 pb-2">
                Displays
              </h2>
              <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                  <span>Display Resolution</span>
                  <span className="font-mono text-cyan-300">1920 x 1080 (16:9) @ 60Hz</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span>Night Light</span>
                  <button
                    onClick={() => setNightLight(!nightLight)}
                    className={`px-3 py-1 rounded-full font-medium ${
                      nightLight ? 'bg-[#e95420] text-white' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {nightLight ? 'On' : 'Off'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Section: Network */}
          {activeSection === 'network' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white border-b border-white/10 pb-2">
                Network
              </h2>
              <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Wired Connection (eth0)</span>
                  <span className="text-[#8ae234] font-medium">Connected</span>
                </div>
                <div className="text-slate-400 font-mono text-[11px]">IPv4: 192.168.1.104 &bull; Speed: 10000 Mb/s (10GbE)</div>

                <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                  <span className="text-white font-medium">Wi-Fi Wireless</span>
                  <button
                    onClick={() => setWifiEnabled(!wifiEnabled)}
                    className={`px-3 py-1 rounded-full font-medium ${
                      wifiEnabled ? 'bg-[#e95420] text-white' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {wifiEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
