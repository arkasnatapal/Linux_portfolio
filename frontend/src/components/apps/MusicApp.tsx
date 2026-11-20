/**
 * ARKA OS — Rhythmbox Music Player (Ubuntu Yaru Workstation Edition)
 * 
 * Powered by global MusicPlayerContext:
 * - Keeps playing continuously in the background when minimized or closed
 * - Real-time HTML5 Canvas Music Visualizer connected to Web Audio Analyser
 * - Volume-sensitive reactivity: scales amplitude with volume, flattens on mute or pause
 * - 3 Visualizer Modes: Spectrum Bars, Neon Waveform, and Soundwave Pulse
 * - File uploader for custom user MP3s
 */

import React, { useState, useRef, useEffect } from 'react';
import { useMusicPlayer } from '../../context/MusicPlayerContext';

type VisualizerMode = 'spectrum' | 'wave' | 'pulse';

export const MusicApp: React.FC = () => {
  const {
    playlist,
    currentTrackIdx,
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    isShuffle,
    isRepeat,
    analyserNode,
    togglePlay,
    playTrack,
    nextTrack,
    prevTrack,
    setVolume,
    toggleMute,
    seek,
    setIsShuffle,
    setIsRepeat,
    addCustomTracks,
    formatTime,
  } = useMusicPlayer();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visualizerMode, setVisualizerMode] = useState<VisualizerMode>('spectrum');

  // DOM Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Visualizer Animation Refs
  const animFrameIdRef = useRef<number | null>(null);
  const smoothingBarsRef = useRef<number[]>(new Array(48).fill(0));

  // Volume slider change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  // Seek slider change
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  };

  // Custom audio file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addCustomTracks(e.target.files);
    }
  };

  // REAL-TIME AUDIO VISUALIZER ENGINE
  // Dynamic Sensitivity: Scales height & intensity based on volume, stops cleanly when volume is 0 or paused
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localPhase = 0;
    const barCount = 48;
    if (smoothingBarsRef.current.length !== barCount) {
      smoothingBarsRef.current = new Array(barCount).fill(0);
    }

    const renderVisualizer = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Effective volume multiplier (0.0 to 1.0)
      const effectiveVol = isMuted ? 0 : volume;

      // Extract frequency data from Web Audio Analyser if active
      let rawFrequencies: Uint8Array<ArrayBuffer> | null = null;
      let hasRealAudioSignal = false;

      if (analyserNode && isPlaying && effectiveVol > 0) {
        const bufferLen = analyserNode.frequencyBinCount;
        const dataArr = new Uint8Array(bufferLen);
        analyserNode.getByteFrequencyData(dataArr);
        rawFrequencies = dataArr;

        let sum = 0;
        for (let i = 0; i < dataArr.length; i++) sum += dataArr[i];
        if (sum > 50) hasRealAudioSignal = true;
      }

      localPhase += 0.08;

      // Update smoothed bars
      for (let i = 0; i < barCount; i++) {
        let target = 0;

        if (isPlaying && effectiveVol > 0) {
          if (hasRealAudioSignal && rawFrequencies) {
            const freqIdx = Math.floor((i / barCount) * (rawFrequencies.length * 0.75));
            const val = rawFrequencies[freqIdx] || 0;
            target = (val / 255) * effectiveVol;
          } else {
            // Procedural rhythmic wave fallback (dynamic based on volume and beat phase)
            const beat1 = Math.sin(localPhase * 1.5 + i * 0.28);
            const beat2 = Math.cos(localPhase * 0.8 - i * 0.18);
            const beat3 = Math.sin(localPhase * 2.8 + i * 0.45) * 0.4;
            const combined = Math.max(0, (beat1 + beat2 + beat3) / 2.2);
            target = combined * effectiveVol;
          }
        } else {
          // Resting flatline
          target = 0.02;
        }

        // Smooth easing interpolation
        smoothingBarsRef.current[i] += (target - smoothingBarsRef.current[i]) * 0.22;
      }

      // 1. SPECTRUM BARS MODE
      if (visualizerMode === 'spectrum') {
        const barWidth = Math.max(3, (width / barCount) - 2);
        const grad = ctx.createLinearGradient(0, height, 0, 0);
        grad.addColorStop(0, '#e95420'); // Ubuntu Orange
        grad.addColorStop(0.5, '#77216F'); // Canonical Purple
        grad.addColorStop(1, '#00e676'); // Peak Green Accent

        for (let i = 0; i < barCount; i++) {
          const x = i * (barWidth + 2);
          const barVal = smoothingBarsRef.current[i];
          const barH = Math.max(2, barVal * (height - 6));
          const y = height - barH;

          // Glowing bar
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barH, [2, 2, 0, 0]);
          ctx.fill();

          // Peak cap indicator on high volume
          if (barVal > 0.4 && effectiveVol > 0.3) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x, Math.max(0, y - 2), barWidth, 1.5);
          }
        }
      }

      // 2. NEON WAVEFORM MODE
      else if (visualizerMode === 'wave') {
        ctx.beginPath();
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, '#e95420');
        grad.addColorStop(0.5, '#00d26a');
        grad.addColorStop(1, '#1f9cf0');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#e95420';
        ctx.shadowBlur = effectiveVol > 0 && isPlaying ? 10 * effectiveVol : 0;

        const sliceWidth = width / (barCount - 1);
        let x = 0;

        for (let i = 0; i < barCount; i++) {
          const v = smoothingBarsRef.current[i];
          const y = (height / 2) - ((v - 0.5) * height * 0.8 * effectiveVol);

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 3. SOUNDWAVE PULSE MODE
      else {
        const centerY = height / 2;
        const barWidth = Math.max(3, (width / barCount) - 2);

        for (let i = 0; i < barCount; i++) {
          const x = i * (barWidth + 2);
          const barVal = smoothingBarsRef.current[i];
          const halfH = Math.max(1, (barVal * height * 0.45));

          const grad = ctx.createLinearGradient(0, centerY - halfH, 0, centerY + halfH);
          grad.addColorStop(0, '#00e5ff');
          grad.addColorStop(0.5, '#e95420');
          grad.addColorStop(1, '#77216F');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(x, centerY - halfH, barWidth, halfH * 2, [3, 3, 3, 3]);
          ctx.fill();
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderVisualizer);
    };

    animFrameIdRef.current = requestAnimationFrame(renderVisualizer);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isPlaying, visualizerMode, volume, isMuted, analyserNode]);

  // Filtered playlist based on search query
  const filteredPlaylist = playlist.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[#18181b] text-slate-100 font-ubuntu select-none overflow-hidden">
      {/* Hidden File Upload Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* 1. TOP PLAYER HERO & VISUALIZER */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-[#461236] via-[#2d122b] to-[#18181b] border-b border-black/50 flex flex-col gap-3 relative shadow-lg">
        {/* Track Info + Album Art Row */}
        <div className="flex items-center gap-3.5">
          {/* Album Artwork */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shadow-2xl bg-[#252528] shrink-0 border border-white/10 relative group">
            {currentTrack.artwork ? (
              <img
                src={currentTrack.artwork}
                alt={currentTrack.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#e95420] to-[#77216F] flex items-center justify-center text-3xl">
                🎵
              </div>
            )}
            {isPlaying && (
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center pointer-events-none">
                <span className="animate-pulse text-lg">🔊</span>
              </div>
            )}
          </div>

          {/* Title, Artist, & Album */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white truncate">
                {currentTrack.title}
              </h2>
              {currentTrack.isCustom && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-600/40 font-mono">
                  CUSTOM
                </span>
              )}
            </div>
            <p className="text-xs text-[#e95420] font-medium truncate mt-0.5">
              {currentTrack.artist}
            </p>
            <p className="text-[11px] text-slate-400 truncate mt-0.5 font-sans">
              {currentTrack.album}
            </p>

            {/* Visualizer Mode Switcher Pill */}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] text-slate-400 font-mono uppercase">Visualizer:</span>
              <button
                onClick={() => setVisualizerMode('spectrum')}
                className={`text-[10px] px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  visualizerMode === 'spectrum'
                    ? 'bg-[#e95420] text-white font-bold'
                    : 'bg-white/10 text-slate-300 hover:text-white'
                }`}
                title="Spectrum Bars"
              >
                Bars
              </button>
              <button
                onClick={() => setVisualizerMode('wave')}
                className={`text-[10px] px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  visualizerMode === 'wave'
                    ? 'bg-[#e95420] text-white font-bold'
                    : 'bg-white/10 text-slate-300 hover:text-white'
                }`}
                title="Neon Waveform"
              >
                Wave
              </button>
              <button
                onClick={() => setVisualizerMode('pulse')}
                className={`text-[10px] px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  visualizerMode === 'pulse'
                    ? 'bg-[#e95420] text-white font-bold'
                    : 'bg-white/10 text-slate-300 hover:text-white'
                }`}
                title="Soundwave Pulse"
              >
                Pulse
              </button>
            </div>
          </div>
        </div>

        {/* Real-Time Audio Spectrum Canvas Visualizer */}
        <div className="w-full h-12 bg-black/40 rounded-lg overflow-hidden border border-white/5 relative p-1 flex items-center">
          <canvas
            ref={canvasRef}
            width={600}
            height={48}
            className="w-full h-full block"
          />
          {(!isPlaying || volume === 0 || isMuted) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 pointer-events-none select-none">
              {volume === 0 || isMuted ? 'MUTED' : 'PAUSED'}
            </div>
          )}
        </div>

        {/* Seek Bar / Progress */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 30}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1.5 bg-black/50 rounded-lg appearance-none cursor-pointer accent-[#e95420]"
            />
            <span className="text-[10px] font-mono text-slate-400 w-8">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Primary Controls Row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {/* Left Controls: Shuffle, Prev, Play/Pause, Next, Repeat */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              title={isShuffle ? 'Shuffle On' : 'Shuffle Off'}
              className={`p-1.5 rounded hover:bg-white/10 text-xs transition-colors cursor-pointer ${
                isShuffle ? 'text-[#e95420] font-bold' : 'text-slate-400'
              }`}
            >
              🔀
            </button>
            <button
              onClick={prevTrack}
              title="Previous Track"
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-sm cursor-pointer transition-colors text-white"
            >
              ⏮
            </button>
            <button
              onClick={togglePlay}
              title={isPlaying ? 'Pause' : 'Play'}
              className="w-9 h-9 rounded-full bg-[#e95420] hover:bg-[#d84818] text-white flex items-center justify-center font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button
              onClick={nextTrack}
              title="Next Track"
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-sm cursor-pointer transition-colors text-white"
            >
              ⏭
            </button>
            <button
              onClick={() => setIsRepeat(!isRepeat)}
              title={isRepeat ? 'Repeat On' : 'Repeat Off'}
              className={`p-1.5 rounded hover:bg-white/10 text-xs transition-colors cursor-pointer ${
                isRepeat ? 'text-[#e95420] font-bold' : 'text-slate-400'
              }`}
            >
              🔁
            </button>
          </div>

          {/* Right Controls: Volume Slider & Add Music button */}
          <div className="flex items-center gap-2.5">
            {/* Volume Control */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                className="text-xs hover:text-white transition-colors cursor-pointer text-slate-300"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? '🔇' : volume < 0.4 ? '🔉' : '🔊'}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-20 h-1.5 bg-black/50 rounded-lg appearance-none cursor-pointer accent-[#e95420]"
                title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
              />
            </div>

            {/* + Add Songs Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/15 text-xs text-slate-200 hover:text-white border border-white/10 transition-colors cursor-pointer font-medium"
              title="Upload custom MP3 songs from computer"
            >
              <span>➕</span>
              <span className="hidden sm:inline">Add Music</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. PLAYLIST HEADER & SEARCH */}
      <div className="px-4 py-2.5 bg-[#202024] border-b border-black/30 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Playlist ({playlist.length})
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {isPlaying ? '• Playing' : '• Ready'}
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-[#18181b] border border-white/10 rounded-md px-2.5 py-1 text-xs w-48 sm:w-60">
          <span className="text-slate-400 mr-1.5 text-xs">🔍</span>
          <input
            type="text"
            placeholder="Search songs or artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white text-xs placeholder:text-slate-500 font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-white text-xs ml-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 3. SCROLLABLE PLAYLIST */}
      <div className="flex-1 p-3 overflow-y-auto space-y-1">
        {filteredPlaylist.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500 font-sans">
            No matching tracks found for "{searchQuery}".
          </div>
        ) : (
          filteredPlaylist.map((t) => {
            const actualIdx = playlist.findIndex(p => p.id === t.id);
            const isThisTrackActive = currentTrackIdx === actualIdx;

            return (
              <div
                key={t.id}
                onClick={() => playTrack(actualIdx)}
                className={`p-2 sm:p-2.5 rounded-lg flex items-center justify-between text-xs cursor-pointer transition-all duration-150 group ${
                  isThisTrackActive
                    ? 'bg-[#e95420]/25 text-white font-medium border border-[#e95420]/50 shadow-sm'
                    : 'hover:bg-white/5 text-slate-300 hover:text-white border border-transparent'
                }`}
              >
                {/* Left: Thumbnail & Name */}
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded-md overflow-hidden bg-black/40 shrink-0 flex items-center justify-center text-xs border border-white/10 relative">
                    {t.artwork ? (
                      <img src={t.artwork} alt={t.title} className="w-full h-full object-cover" />
                    ) : (
                      <span>🎵</span>
                    )}
                    {isThisTrackActive && isPlaying && (
                      <div className="absolute inset-0 bg-[#e95420]/70 flex items-center justify-center text-[10px]">
                        ▶
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 truncate">
                    <div className="flex items-center gap-2">
                      <span className={`truncate ${isThisTrackActive ? 'text-white font-bold' : 'group-hover:text-white'}`}>
                        {t.title}
                      </span>
                      {t.isCustom && (
                        <span className="text-[8px] px-1 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/40">
                          LOCAL
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 group-hover:text-slate-300 truncate">
                      {t.artist} &bull; <span className="text-slate-500">{t.album}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Duration & Equalizer Icon */}
                <div className="flex items-center gap-2 shrink-0">
                  {isThisTrackActive && isPlaying && (
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 h-3 bg-[#e95420] animate-bounce" />
                      <span className="w-0.5 h-2 bg-[#e95420] animate-pulse" />
                      <span className="w-0.5 h-3.5 bg-[#e95420] animate-bounce" />
                    </div>
                  )}
                  <span className="text-slate-400 font-mono text-[11px]">
                    {t.duration}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
