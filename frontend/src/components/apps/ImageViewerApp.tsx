/**
 * ARKA OS — Ubuntu Gallery & Eye of GNOME Image Viewer
 * 
 * Features:
 * - Real photo gallery loaded from /photos/*.png (SIH 2024, Lucknow, College, Friends)
 * - Category filter pills: All, Smart India Hackathon, Lucknow Journey, College Life
 * - High-fidelity Zoom & Lightbox View:
 *   - Interactive Zoom In / Zoom Out with smooth scale
 *   - Double-click / Double-tap zoom toggle
 *   - Pan / Drag image when zoomed in
 *   - 90° Clockwise Rotation
 *   - Fullscreen mode toggle
 *   - Next / Previous navigation with keyboard arrows (← / → / Esc)
 *   - Bottom thumbnail carousel strip
 *   - Download button to save the photo
 *   - "+ Add Photos" button allowing users to drop custom images
 * - Fully responsive for both phones (touch gestures, full width) and desktop/laptops
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'hackathon' | 'travel' | 'college' | 'personal' | 'custom';
  categoryLabel: string;
  src: string;
  date: string;
  description: string;
}

export const INITIAL_PHOTOS: GalleryPhoto[] = [
  {
    id: 'sih1',
    title: 'SIH 2024 — National Finalists',
    category: 'hackathon',
    categoryLabel: 'Smart India Hackathon',
    src: '/photos/sih1.png',
    date: 'Dec 2024',
    description: 'Smart India Hackathon 2024 National Grand Finale with team members',
  },
  {
    id: 'sih2',
    title: 'SIH 2024 — Project Presentation',
    category: 'hackathon',
    categoryLabel: 'Smart India Hackathon',
    src: '/photos/sih2.png',
    date: 'Dec 2024',
    description: 'Technical evaluation and jury demonstration at SIH Grand Finale',
  },
  {
    id: 'sih3',
    title: 'SIH 2024 — Hackathon Workstation',
    category: 'hackathon',
    categoryLabel: 'Smart India Hackathon',
    src: '/photos/sih3.png',
    date: 'Dec 2024',
    description: '36-hour non-stop prototyping and engineering session',
  },
  {
    id: 'lucknow2',
    title: 'Lucknow Journey — Team Event',
    category: 'travel',
    categoryLabel: 'Lucknow Journey',
    src: '/photos/lucknow2.png',
    date: '2024',
    description: 'Hackathon journey and networking with participants in Lucknow',
  },
  {
    id: 'lucknow3',
    title: 'Lucknow Heritage & Culture',
    category: 'travel',
    categoryLabel: 'Lucknow Journey',
    src: '/photos/lucknow3.png',
    date: '2024',
    description: 'Exploring historic monuments and city architecture',
  },
  {
    id: 'lucknow4',
    title: 'Lucknow Exploration',
    category: 'travel',
    categoryLabel: 'Lucknow Journey',
    src: '/photos/lucknow4.png',
    date: '2024',
    description: 'Memorable travel highlights with team members',
  },
  {
    id: 'lucknow5',
    title: 'Lucknow City Vibes',
    category: 'travel',
    categoryLabel: 'Lucknow Journey',
    src: '/photos/lucknow5.png',
    date: '2024',
    description: 'Evening moments after hackathon presentation rounds',
  },
  {
    id: 'ccd1',
    title: 'CCD — Coffee & Tech Talk',
    category: 'college',
    categoryLabel: 'College & Friends',
    src: '/photos/ccd1.png',
    date: '2024',
    description: 'Cafe Coffee Day meetups with friends and batchmates',
  },
  {
    id: 'ccd2',
    title: 'CCD — Celebration Hangout',
    category: 'college',
    categoryLabel: 'College & Friends',
    src: '/photos/ccd2.png',
    date: '2024',
    description: 'Celebrating project milestones and coding sprints',
  },
  {
    id: 'highsec1',
    title: 'School Days — Academic Milestone',
    category: 'personal',
    categoryLabel: 'Milestones',
    src: '/photos/highsec1.png',
    date: '2024',
    description: 'Higher Secondary graduation and academic memories',
  },
  {
    id: 'pe1',
    title: 'JGEC — Campus Life & Sports',
    category: 'college',
    categoryLabel: 'College & Friends',
    src: '/photos/pe1.png',
    date: '2024 - 2025',
    description: 'Jalpaiguri Government Engineering College campus life',
  },
  {
    id: 'pe2',
    title: 'JGEC — Fest & Group Memories',
    category: 'college',
    categoryLabel: 'College & Friends',
    src: '/photos/pe2.png',
    date: '2024 - 2025',
    description: 'Annual college fest and extracurricular activities',
  },
];

type CategoryFilter = 'all' | 'hackathon' | 'travel' | 'college' | 'personal';

export const ImageViewerApp: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(INITIAL_PHOTOS);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Zoom & Pan state for the lightbox view
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const panStartRef = useRef<{ x: number; y: number; panX: number; panY: number }>({ x: 0, y: 0, panX: 0, panY: 0 });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredPhotos = photos.filter(p =>
    activeCategory === 'all' ? true : p.category === activeCategory
  );

  const selectedPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  // Reset zoom & transform when changing selected photo
  const resetZoom = useCallback(() => {
    setZoomScale(1);
    setRotation(0);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    resetZoom();
  };

  const closeLightbox = useCallback(() => {
    setSelectedPhotoIndex(null);
    resetZoom();
  }, [resetZoom]);

  const handleNext = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    const nextIdx = (selectedPhotoIndex + 1) % filteredPhotos.length;
    setSelectedPhotoIndex(nextIdx);
    resetZoom();
  }, [selectedPhotoIndex, filteredPhotos.length, resetZoom]);

  const handlePrev = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    const prevIdx = (selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhotoIndex(prevIdx);
    resetZoom();
  }, [selectedPhotoIndex, filteredPhotos.length, resetZoom]);

  // Zoom controls
  const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.35, 4));
  const handleZoomOut = () => {
    setZoomScale(prev => {
      const next = Math.max(prev - 0.35, 0.5);
      if (next <= 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  // Double click to toggle 1x / 2.5x zoom
  const handleDoubleClick = () => {
    if (zoomScale > 1) {
      resetZoom();
    } else {
      setZoomScale(2.2);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-' || e.key === '_') handleZoomOut();
      if (e.key === '0') resetZoom();
      if (e.key === 'r' || e.key === 'R') handleRotate();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, closeLightbox, handleNext, handlePrev, resetZoom]);

  // Mouse wheel zoom in lightbox
  const handleWheel = (e: React.WheelEvent) => {
    if (selectedPhotoIndex === null) return;
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Touch handlers for mobile pan & double-tap
  const lastTapRef = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      handleDoubleClick();
    }
    lastTapRef.current = now;

    if (e.touches.length === 1 && zoomScale > 1) {
      setIsPanning(true);
      panStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        panX: panOffset.x,
        panY: panOffset.y,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPanning || zoomScale <= 1 || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - panStartRef.current.x;
    const dy = e.touches[0].clientY - panStartRef.current.y;
    setPanOffset({
      x: panStartRef.current.panX + dx,
      y: panStartRef.current.panY + dy,
    });
  };

  const handleTouchEnd = () => setIsPanning(false);

  // Mouse Drag / Pan handlers when zoomed in
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: panOffset.x,
      panY: panOffset.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || zoomScale <= 1) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    setPanOffset({
      x: panStartRef.current.panX + dx,
      y: panStartRef.current.panY + dy,
    });
  };

  const handleMouseUp = () => setIsPanning(false);

  // Custom User Photo Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotos: GalleryPhoto[] = Array.from(files).map((file, i) => {
      const url = URL.createObjectURL(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      return {
        id: `custom-photo-${Date.now()}-${i}`,
        title: cleanName,
        category: 'custom' as const,
        categoryLabel: 'User Upload',
        src: url,
        date: 'Today',
        description: `Imported local photo (${file.name})`,
      };
    });

    setPhotos(prev => [...newPhotos, ...prev]);
    setActiveCategory('all');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#18181b] text-slate-100 font-ubuntu select-none overflow-hidden relative">
      {/* Hidden File Upload Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* TOP UBUNTU HEADERBAR */}
      <div className="h-11 bg-[#242426] px-3 sm:px-4 flex items-center justify-between border-b border-black/40 text-xs shrink-0 shadow-md">
        {/* Left: App Title / Category Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="font-bold text-white text-xs sm:text-sm mr-1 hidden sm:inline">
            📸 Gallery
          </span>

          <button
            onClick={() => {
              setActiveCategory('all');
              setSelectedPhotoIndex(null);
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer text-xs shrink-0 ${
              activeCategory === 'all'
                ? 'bg-[#e95420] text-white font-bold shadow-sm'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            All ({photos.length})
          </button>

          <button
            onClick={() => {
              setActiveCategory('hackathon');
              setSelectedPhotoIndex(null);
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer text-xs shrink-0 ${
              activeCategory === 'hackathon'
                ? 'bg-[#e95420] text-white font-bold shadow-sm'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            SIH 2024
          </button>

          <button
            onClick={() => {
              setActiveCategory('travel');
              setSelectedPhotoIndex(null);
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer text-xs shrink-0 ${
              activeCategory === 'travel'
                ? 'bg-[#e95420] text-white font-bold shadow-sm'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Lucknow
          </button>

          <button
            onClick={() => {
              setActiveCategory('college');
              setSelectedPhotoIndex(null);
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer text-xs shrink-0 ${
              activeCategory === 'college'
                ? 'bg-[#e95420] text-white font-bold shadow-sm'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            College & Friends
          </button>
        </div>

        {/* Right: + Add Photos Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-medium cursor-pointer transition-colors shrink-0"
            title="Import custom photos from your device"
          >
            <span className="text-sm font-bold text-[#ff7748]">+</span>
            <span className="hidden sm:inline">Add Photos</span>
          </button>
        </div>
      </div>

      {/* MAIN GALLERY GRID VIEW */}
      <div className="flex-1 p-3 sm:p-5 overflow-y-auto bg-[#141416]">
        <div className="max-w-6xl mx-auto">
          {/* Photos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {filteredPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => openLightbox(idx)}
                className="group relative bg-[#1f1f23] rounded-xl overflow-hidden border border-white/5 hover:border-[#e95420]/50 shadow-md hover:shadow-2xl transition-all duration-200 cursor-pointer flex flex-col aspect-[4/3]"
              >
                {/* Photo Image Thumbnail */}
                <div className="relative w-full h-full overflow-hidden bg-black/40">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Gradient Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2.5 text-left">
                    <span className="text-white font-bold text-xs truncate">
                      {photo.title}
                    </span>
                    <span className="text-[10px] text-[#ff7748] font-medium">
                      {photo.categoryLabel} &bull; {photo.date}
                    </span>
                  </div>

                  {/* Top-Right Zoom Hint Badge */}
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
                    🔍
                  </div>
                </div>

                {/* Mobile Caption Bar (Always visible on phone) */}
                <div className="p-1.5 sm:hidden bg-[#1a1a1e] border-t border-white/5 truncate text-[11px] text-slate-300">
                  {photo.title}
                </div>
              </div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="py-24 text-center text-slate-500 text-xs">
              No photos found in this category.
            </div>
          )}
        </div>
      </div>

      {/* FULLSCREEN ZOOM / LIGHTBOX VIEWER */}
      {selectedPhoto && (
        <div
          onWheel={handleWheel}
          className="absolute inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col select-none animate-fade-in"
        >
          {/* Lightbox Top Control Bar */}
          <div className="h-12 bg-black/70 px-3 sm:px-5 flex items-center justify-between border-b border-white/10 shrink-0 z-20">
            {/* Left: Photo Title & Counter */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                onClick={closeLightbox}
                className="flex items-center gap-1 text-slate-300 hover:text-white px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors cursor-pointer text-xs"
                title="Back to gallery (Esc)"
              >
                <span>✕</span>
                <span className="hidden sm:inline">Close</span>
              </button>
              <div className="min-w-0 truncate">
                <span className="text-white font-bold text-xs sm:text-sm truncate block">
                  {selectedPhoto.title}
                </span>
                <span className="text-[10px] text-slate-400 font-mono hidden sm:block">
                  Photo {selectedPhotoIndex! + 1} of {filteredPhotos.length} &bull; {selectedPhoto.date}
                </span>
              </div>
            </div>

            {/* Center / Right: Interactive Zoom & Transform Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Zoom Out */}
              <button
                onClick={handleZoomOut}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
                title="Zoom Out (-)"
              >
                &minus;
              </button>

              {/* Reset Zoom / Scale Pill */}
              <button
                onClick={resetZoom}
                className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Reset Zoom (0)"
              >
                {Math.round(zoomScale * 100)}%
              </button>

              {/* Zoom In */}
              <button
                onClick={handleZoomIn}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
                title="Zoom In (+)"
              >
                +
              </button>

              {/* Rotate 90° */}
              <button
                onClick={handleRotate}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-base cursor-pointer transition-colors"
                title="Rotate 90° (R)"
              >
                ⟳
              </button>

              {/* Download Photo */}
              <a
                href={selectedPhoto.src}
                download={`${selectedPhoto.id}.png`}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs cursor-pointer transition-colors"
                title="Download Photo"
              >
                ⬇
              </a>
            </div>
          </div>

          {/* Lightbox Center Image Viewport */}
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleDoubleClick}
            className={`flex-1 relative flex items-center justify-center overflow-hidden p-2 sm:p-6 ${
              zoomScale > 1 ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
            }`}
          >
            {/* The Scaled Photo */}
            <div
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale}) rotate(${rotation}deg)`,
                transition: isPanning ? 'none' : 'transform 0.15s ease-out',
              }}
              className="max-w-full max-h-full flex items-center justify-center select-none"
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                draggable={false}
                className="max-h-[calc(100vh-160px)] max-w-[calc(100vw-40px)] object-contain shadow-2xl rounded-md pointer-events-none"
              />
            </div>

            {/* Previous Button (Left Arrow) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#e95420] text-white flex items-center justify-center text-lg shadow-xl border border-white/10 transition-all cursor-pointer z-30"
              title="Previous photo (←)"
            >
              &#10094;
            </button>

            {/* Next Button (Right Arrow) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#e95420] text-white flex items-center justify-center text-lg shadow-xl border border-white/10 transition-all cursor-pointer z-30"
              title="Next photo (→)"
            >
              &#10095;
            </button>
          </div>

          {/* Lightbox Bottom Strip: Thumbnails Carousel & Description */}
          <div className="h-16 sm:h-20 bg-black/80 border-t border-white/10 px-3 flex items-center justify-between gap-3 shrink-0 z-20">
            {/* Photo description */}
            <div className="hidden md:block max-w-xs truncate text-[11px] text-slate-300">
              <span className="font-semibold text-white block truncate">{selectedPhoto.title}</span>
              <span className="text-slate-400 block truncate">{selectedPhoto.description}</span>
            </div>

            {/* Thumbnails Carousel */}
            <div className="flex-1 flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {filteredPhotos.map((photo, i) => (
                <button
                  key={photo.id}
                  onClick={() => openLightbox(i)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    i === selectedPhotoIndex
                      ? 'border-[#e95420] scale-105 shadow-md'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/40'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Mobile counter indicator */}
            <div className="text-[10px] font-mono text-slate-400 shrink-0 sm:hidden">
              {selectedPhotoIndex! + 1}/{filteredPhotos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
