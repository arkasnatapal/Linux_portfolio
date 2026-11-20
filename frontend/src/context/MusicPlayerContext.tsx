/**
 * ARKA OS — Global Music Player Context & Background Audio Service
 * 
 * Provides background audio playback, Web Audio Analyser graph for visualizers,
 * track management, and state synchronization across Rhythmbox, GNOME Top Panel,
 * and the Calendar & Notifications Center.
 */

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

export interface TrackItem {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  localUrl: string;
  previewUrl: string;
  artwork?: string;
  isCustom?: boolean;
}

export const INITIAL_PLAYLIST: TrackItem[] = [
  {
    id: 'tera-yaar-hoon-main',
    title: 'Tera Yaar Hoon Main',
    artist: 'Arijit Singh & Rochak Kohli',
    album: 'Sonu Ke Titu Ki Sweety',
    duration: '4:42',
    localUrl: '/music/tera-yaar-hoon-main.mp3',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/44/26/50/442650b7-256e-034a-380a-4bbf16e59e53/mzaf_272051127111758324.plus.aac.p.m4a',
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/81/a5/b0/81a5b084-89f7-7ed8-372e-aefd67504922/8902894360074_cover.jpg/400x400bb.jpg',
  },
  {
    id: 'shape-of-you',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide Deluxe)',
    duration: '3:53',
    localUrl: '/music/shape-of-you.mp3',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/44/c7/4f/44c74f0d-72dc-6143-d4d0-ba14d661ca0d/mzaf_9566898362556366703.plus.aac.p.m4a',
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/15/e6/e8/15e6e8a4-4190-6a8b-86c3-ab4a51b88288/190295851286.jpg/400x400bb.jpg',
  },
  {
    id: 'maana-ke-hum-yaar-nahin',
    title: 'Maana Ke Hum Yaar Nahin',
    artist: 'Parineeti Chopra & Sachin-Jigar',
    album: 'Meri Pyaari Bindu',
    duration: '5:58',
    localUrl: '/music/maana-ke-hum-yaar-nahin.mp3',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4e/95/53/4e955354-6712-9138-4d4d-326b6705dea1/mzaf_1176393209859499890.plus.aac.p.m4a',
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ad/e9/99/ade999c7-ba3e-433a-baf2-9c4cf60ee9d8/849486085824_cover.jpg/400x400bb.jpg',
  },
  {
    id: 'hope',
    title: 'Hope',
    artist: 'XXXTENTACION',
    album: '? (Question Mark)',
    duration: '1:50',
    localUrl: '/music/hope.mp3',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/75/00/56/750056f0-03d3-b708-9409-10e92f9152ff/mzaf_2844963194115519688.plus.aac.p.m4a',
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/93/49/bb/9349bb3b-317d-57c3-966a-71fa25247dc2/19UMGIM41705.rgb.jpg/400x400bb.jpg',
  },
  {
    id: 'just-keep-watching',
    title: 'Just Keep Watching',
    artist: 'Tate McRae',
    album: 'F1 The Album',
    duration: '2:40',
    localUrl: '/music/just-keep-watching.mp3',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f1/29/27/f129275c-b8e8-e313-f3cd-a93ae234a6b5/mzaf_9933112702187355547.plus.aac.p.m4a',
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/a6/91/da/a691dac7-4cb7-82f5-0eda-e37b96f63f55/075679610720.jpg/400x400bb.jpg',
  },
  {
    id: 'thunder',
    title: 'Thunder',
    artist: 'Imagine Dragons',
    album: 'Evolve',
    duration: '3:07',
    localUrl: '/music/thunder.mp3',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/78/7d/8b/787d8b89-7b57-d3bc-1f9d-6378fad1b4f5/mzaf_5131352572683029126.plus.aac.p.m4a',
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/11/7a/b8/117ab805-6811-8929-18b9-0fad7baf0c25/17UMGIM98210.rgb.jpg/400x400bb.jpg',
  },
  {
    id: 'high',
    title: 'High',
    artist: 'The Chainsmokers',
    album: 'So Far So Good',
    duration: '2:55',
    localUrl: '/music/high.mp3',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b0/b1/4b/b0b14b2c-b7b8-b428-5e5c-58f831c359a8/mzaf_13292642331799361828.plus.aac.p.m4a',
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/1a/c4/d1/1ac4d105-c0b5-0108-7e53-e657a7186aaf/196589370242.jpg/400x400bb.jpg',
  },
  {
    id: 'theres-nothing-holdin-me-back',
    title: "There's Nothing Holdin' Me Back",
    artist: 'Shawn Mendes',
    album: 'Illuminate (Deluxe)',
    duration: '3:19',
    localUrl: '/music/theres-nothing-holdin-me-back.mp3',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/87/1c/bc/871cbc00-24a6-c95a-b9bb-49ff209c6777/mzaf_13131899989124950522.plus.aac.p.m4a',
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/5c/57/e4/5c57e46a-0950-7ebd-8010-28453c1c0055/16UMGIM51723.rgb.jpg/400x400bb.jpg',
  },
];

interface MusicPlayerContextType {
  playlist: TrackItem[];
  currentTrackIdx: number;
  currentTrack: TrackItem;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  isShuffle: boolean;
  isRepeat: boolean;
  analyserNode: AnalyserNode | null;
  togglePlay: () => void;
  playTrack: (idx: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  seek: (time: number) => void;
  setIsShuffle: (val: boolean) => void;
  setIsRepeat: (val: boolean) => void;
  addCustomTracks: (files: FileList) => void;
  formatTime: (secs: number) => string;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null);

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlist, setPlaylist] = useState<TrackItem[]>(INITIAL_PLAYLIST);
  const [currentTrackIdx, setCurrentTrackIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(30);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);

  // Global Audio Elements
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  const currentTrack = playlist[currentTrackIdx] || playlist[0];

  const formatTime = (secs: number): string => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const ensureAudioGraph = () => {
    if (!audioRef.current) return;
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.8;

      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceNodeRef.current = source;
    } catch {
      // Fallback gracefully if context is restricted
    }
  };

  const togglePlay = () => {
    ensureAudioGraph();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const playTrack = (idx: number) => {
    setCurrentTrackIdx(idx);
    setCurrentTime(0);
    setIsPlaying(true);
    ensureAudioGraph();

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }, 50);
  };

  const nextTrack = useCallback(() => {
    ensureAudioGraph();
    if (isShuffle) {
      const randomIdx = Math.floor(Math.random() * playlist.length);
      playTrack(randomIdx);
    } else {
      const nextIdx = (currentTrackIdx + 1) % playlist.length;
      playTrack(nextIdx);
    }
  }, [currentTrackIdx, isShuffle, playlist.length]);

  const prevTrack = () => {
    ensureAudioGraph();
    if (currentTime > 3) {
      if (audioRef.current) audioRef.current.currentTime = 0;
      return;
    }
    const pIdx = (currentTrackIdx - 1 + playlist.length) % playlist.length;
    playTrack(pIdx);
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
    if (v > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const seek = (time: number) => {
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const addCustomTracks = (files: FileList) => {
    if (!files || files.length === 0) return;
    const newTracks: TrackItem[] = Array.from(files).map((file, i) => {
      const url = URL.createObjectURL(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      return {
        id: `custom-${Date.now()}-${i}`,
        title: cleanName,
        artist: 'Local Music File',
        album: 'My Library',
        duration: 'Custom',
        localUrl: url,
        previewUrl: url,
        isCustom: true,
      };
    });

    setPlaylist(prev => [...newTracks, ...prev]);
    playTrack(0);
  };

  // Synchronize audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      if (!isNaN(audio.duration) && isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      } else {
        setDuration(30);
      }
    };
    const onEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [nextTrack, isRepeat]);

  return (
    <MusicPlayerContext.Provider
      value={{
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
        analyserNode: analyserRef.current,
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
      }}
    >
      {/* Background Audio Node Mounted Permanently at Desktop Root */}
      <audio
        ref={audioRef}
        src={currentTrack.localUrl || currentTrack.previewUrl}
        crossOrigin="anonymous"
        preload="auto"
        onError={() => {
          if (audioRef.current && currentTrack.previewUrl && !audioRef.current.src.endsWith(currentTrack.previewUrl)) {
            audioRef.current.src = currentTrack.previewUrl;
            if (isPlaying) {
              audioRef.current.play().catch(() => {});
            }
          }
        }}
      />
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
