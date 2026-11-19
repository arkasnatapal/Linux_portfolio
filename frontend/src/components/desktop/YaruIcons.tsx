/**
 * ARKA OS — Official Ubuntu Yaru Icon Collection
 * 
 * Scalable vector graphics modeled after the official Canonical Ubuntu Yaru Theme:
 * - Ubuntu Circle of Friends (CoF) Logo
 * - Google Chrome (Multi-color official web browser icon)
 * - Nautilus File Manager (Yaru Files)
 * - GNOME Terminal (Yaru Aubergine)
 * - Visual Studio Code
 * - GNOME Settings (Dual interlocking gears)
 * - Text Editor (Gedit)
 * - Eye of GNOME (Image Viewer)
 * - Rhythmbox (Music Player)
 * - Trash (Empty/Filled wire wastebasket)
 * - Show Applications (9-dots grid)
 */

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Official Ubuntu Circle of Friends (CoF) Emblem
export const YaruUbuntuIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="-142.5 -142.5 285 285"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    {/* Canonical Ubuntu Orange Roundel */}
    <circle cx="0" cy="0" r="141.732" fill="#E95420" />

    {/* White Circle of Friends 120-degree Rotational Symmetry */}
    <g fill="#FFFFFF">
      {/* Friend 1 (0 deg) */}
      <circle cx="-96.3772" cy="0" r="18.9215" />
      <path d="M-45.6059,68.395C-62.1655,57.3316-74.4844,40.4175-79.6011,20.6065-73.623,15.7354-69.8047,8.3164-69.8047,0-69.8047-8.3164-73.623-15.7354-79.6011-20.6065-74.4844-40.4175-62.1655-57.3316-45.6059-68.395L-31.7715-45.2212C-45.9824-35.2197-55.2754-18.7026-55.2754,0-55.2754,18.7026-45.9824,35.2197-31.7715,45.2212Z" />

      {/* Friend 2 (120 deg) */}
      <g transform="rotate(120)">
        <circle cx="-96.3772" cy="0" r="18.9215" />
        <path d="M-45.6059,68.395C-62.1655,57.3316-74.4844,40.4175-79.6011,20.6065-73.623,15.7354-69.8047,8.3164-69.8047,0-69.8047-8.3164-73.623-15.7354-79.6011-20.6065-74.4844-40.4175-62.1655-57.3316-45.6059-68.395L-31.7715-45.2212C-45.9824-35.2197-55.2754-18.7026-55.2754,0-55.2754,18.7026-45.9824,35.2197-31.7715,45.2212Z" />
      </g>

      {/* Friend 3 (240 deg) */}
      <g transform="rotate(240)">
        <circle cx="-96.3772" cy="0" r="18.9215" />
        <path d="M-45.6059,68.395C-62.1655,57.3316-74.4844,40.4175-79.6011,20.6065-73.623,15.7354-69.8047,8.3164-69.8047,0-69.8047-8.3164-73.623-15.7354-79.6011-20.6065-74.4844-40.4175-62.1655-57.3316-45.6059-68.395L-31.7715-45.2212C-45.9824-35.2197-55.2754-18.7026-55.2754,0-55.2754,18.7026-45.9824,35.2197-31.7715,45.2212Z" />
      </g>
    </g>
  </svg>
);

// 2. Official Google Chrome Icon
export const YaruChromeIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <defs>
      <linearGradient id="chrome-red" x1="3.2" y1="15" x2="44.8" y2="15" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#d93025" />
        <stop offset="1" stopColor="#ea4335" />
      </linearGradient>
      <linearGradient id="chrome-yellow" x1="20.7" y1="47.7" x2="41.5" y2="11.7" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fcc934" />
        <stop offset="1" stopColor="#fbbc04" />
      </linearGradient>
      <linearGradient id="chrome-green" x1="26.6" y1="46.5" x2="5.8" y2="10.5" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#1e8e3e" />
        <stop offset="1" stopColor="#34a853" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="12" fill="#ffffff" />
    <path d="M24 12H44.8a24 24 0 0 0-41.6 0L13.6 30a12 12 0 0 1 10.4-18Z" fill="url(#chrome-red)" />
    <circle cx="24" cy="24" r="9.5" fill="#1a73e8" />
    <path d="M34.4 30L24 48a24 24 0 0 0 20.8-36H24a12 12 0 0 1 10.4 18Z" fill="url(#chrome-yellow)" />
    <path d="M13.6 30L3.2 12A24 24 0 0 0 24 48l10.4-18a12 12 0 0 1-20.8 0Z" fill="url(#chrome-green)" />
  </svg>
);

// 3. Official Yaru Terminal Icon
export const YaruTerminalIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect x="4" y="6" width="56" height="52" rx="12" fill="url(#termGrad)" />
    <rect x="4" y="6" width="56" height="52" rx="12" stroke="#4a1538" strokeWidth="1.5" />
    <path d="M16 22L28 32L16 42" stroke="#8ae234" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="32" y1="42" x2="48" y2="42" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="termGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4a1038" />
        <stop offset="60%" stopColor="#300a24" />
        <stop offset="100%" stopColor="#1e0516" />
      </linearGradient>
    </defs>
  </svg>
);

// 4. Official Yaru Files (Nautilus) Icon
export const YaruFilesIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect x="6" y="14" width="52" height="42" rx="8" fill="#1b4975" />
    <path d="M6 20C6 15.6 9.6 12 14 12H26L32 18H52C55.3 18 58 20.7 58 24V50C58 53.3 55.3 56 52 56H12C8.7 56 6 53.3 6 50V20Z" fill="url(#yaruFolderGrad)" />
    <rect x="12" y="24" width="40" height="24" rx="4" fill="#0d2b48" opacity="0.35" />
    <defs>
      <linearGradient id="yaruFolderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3584e4" />
        <stop offset="100%" stopColor="#1c71d8" />
      </linearGradient>
    </defs>
  </svg>
);

// 5. Official VS Code Icon
export const YaruVSCodeIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M47.2 4.8L35.4 16.4L18.6 3.6L12.4 8.2V55.8L18.6 60.4L35.4 47.6L47.2 59.2L55.8 55V9L47.2 4.8Z" fill="#0065a9" />
    <path d="M47.2 4.8L35.4 16.4L24.8 24.8L35.4 32.8L47.2 4.8Z" fill="#007acc" opacity="0.85" />
    <path d="M12.4 8.2L35.4 32L12.4 55.8V8.2Z" fill="#1f9cf0" />
    <path d="M47.2 59.2L35.4 47.6L24.8 39.2L35.4 32.8L47.2 59.2Z" fill="#007acc" opacity="0.85" />
    <path d="M55.8 9V55L47.2 59.2L35.4 47.6L47.2 4.8L55.8 9Z" fill="#005a9e" />
  </svg>
);

// 6. Official Yaru Settings Icon
export const YaruSettingsIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect x="6" y="6" width="52" height="52" rx="14" fill="#383838" />
    <circle cx="32" cy="32" r="9" fill="none" stroke="#e0e0e0" strokeWidth="5" />
    <path d="M30 13H34V18H30V13ZM30 46H34V51H30V46ZM13 30H18V34H13V30ZM46 30H51V34H46V30ZM18.5 18.5L22 22L19.5 24.5L16 21L18.5 18.5ZM43 43L46.5 46.5L44 49L40.5 45.5L43 43ZM44.5 19.5L48 23L45.5 25.5L42 22L44.5 19.5ZM20 44L23.5 47.5L21 50L17.5 46.5L20 44Z" fill="#e0e0e0" />
  </svg>
);

// 7. Official Yaru Text Editor (Gedit) Icon
export const YaruTextEditorIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect x="10" y="8" width="44" height="48" rx="6" fill="#f6f6f6" />
    <path d="M18 20H46M18 28H46M18 36H36M18 44H42" stroke="#4a4a4a" strokeWidth="3" strokeLinecap="round" />
    <path d="M48 38L38 48L34 50L36 46L46 36L48 38Z" fill="#e95420" />
  </svg>
);

// 8. Official Yaru Eye of GNOME (Image Viewer) Icon
export const YaruImageViewerIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect x="8" y="10" width="48" height="44" rx="8" fill="#26a269" />
    <circle cx="22" cy="24" r="6" fill="#f6d32d" />
    <path d="M14 46L26 32L34 40L42 28L50 46H14Z" fill="#ffffff" />
  </svg>
);

// 9. Official Yaru Rhythmbox Music Icon
export const YaruMusicIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect x="8" y="8" width="48" height="48" rx="12" fill="#e95420" />
    <path d="M26 38C26 41.3 23.3 44 20 44C16.7 44 14 41.3 14 38C14 34.7 16.7 32 20 32C21.6 32 23 32.6 24 33.6V20C24 18.9 24.9 18 26 18H42C43.1 18 44 18.9 44 20V24H26V38Z" fill="#ffffff" />
  </svg>
);

// 10. Official Yaru Trash Icon
export const YaruTrashIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect x="16" y="18" width="32" height="38" rx="4" fill="#5e5c64" />
    <path d="M12 14H52V18H12V14Z" fill="#77767b" />
    <path d="M26 10H38V14H26V10Z" fill="#77767b" />
    <line x1="24" y1="26" x2="24" y2="48" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
    <line x1="32" y1="26" x2="32" y2="48" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
    <line x1="40" y1="26" x2="40" y2="48" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// 11. Official Ubuntu Yaru Home Folder Icon (as shown in user Image 2)
export const YaruHomeFolderIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <defs>
      <linearGradient id="homeFolderTab" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7a1f46" />
        <stop offset="60%" stopColor="#ad2d36" />
        <stop offset="100%" stopColor="#e95420" />
      </linearGradient>
      <linearGradient id="homeFolderBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#58585c" />
        <stop offset="100%" stopColor="#3d3d42" />
      </linearGradient>
    </defs>
    {/* Folder Back Tab (Aubergine/Orange Accent) */}
    <path
      d="M8 18C8 14.6863 10.6863 12 14 12H26C28.5 12 30.5 13.5 32 15L35 18H50C53.3137 18 56 20.6863 56 24V28H8V18Z"
      fill="url(#homeFolderTab)"
    />
    {/* Folder Front Main Body (Dark Charcoal/Grey) */}
    <rect
      x="8"
      y="20"
      width="48"
      height="34"
      rx="7"
      fill="url(#homeFolderBody)"
      stroke="#2d2d30"
      strokeWidth="1"
    />
    {/* Subtle highlight line on folder rim */}
    <line x1="12" y1="21" x2="52" y2="21" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
    {/* Centered White House Glyph (Line Art Roof & Doorway) */}
    <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Roof Gable */}
      <path d="M24 38L32 30L40 38" />
      {/* House Body */}
      <path d="M26 36V45C26 45.5523 26.4477 46 27 46H37C37.5523 46 38 45.5523 38 45V36" />
      {/* Door */}
      <path d="M33 46V41C33 40.4477 33.4477 40 34 40H35C35.5523 40 36 40.4477 36 41V46" fill="#ffffff" />
    </g>
  </svg>
);

// 12. Official GitHub Desktop Icon
export const YaruGithubIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect x="6" y="6" width="52" height="52" rx="14" fill="#181717" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32 16C23.16 16 16 23.16 16 32C16 39.08 20.58 45.06 26.94 47.18C27.74 47.32 28.04 46.84 28.04 46.42C28.04 46.04 28.02 44.8 28.02 43.46C24 44.2 22.94 42.26 22.62 41.36C22.44 40.9 21.66 39.48 20.98 39.1C20.42 38.8 19.62 38.06 20.96 38.04C22.22 38.02 23.12 39.2 23.42 39.68C24.86 42.1 27.16 41.42 28.08 41C28.22 39.96 28.64 39.26 29.1 38.86C25.54 38.46 21.8 37.08 21.8 30.96C21.8 29.22 22.42 27.78 23.44 26.66C23.28 26.26 22.72 24.62 23.6 22.42C23.6 22.42 24.94 22 28.04 24.08C29.32 23.72 30.68 23.54 32.04 23.54C33.4 23.54 34.76 23.72 36.04 24.08C39.14 21.98 40.48 22.42 40.48 22.42C41.36 24.62 40.8 26.26 40.64 26.66C41.66 27.78 42.28 29.2 42.28 30.96C42.28 37.1 38.52 38.46 34.96 38.86C35.54 39.36 36.04 40.32 36.04 41.82C36.04 43.98 36.02 45.72 36.02 46.42C36.02 46.84 36.32 47.34 37.12 47.18C43.42 45.06 48 39.06 48 32C48 23.16 40.84 16 32 16Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 13. Official LinkedIn Desktop Icon
export const YaruLinkedinIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect x="6" y="6" width="52" height="52" rx="14" fill="#0A66C2" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    <path
      d="M21.5 25H16.5V44H21.5V25ZM19 17C17.34 17 16 18.34 16 20C16 21.66 17.34 23 19 23C20.66 23 22 21.66 22 20C22 18.34 20.66 17 19 17ZM47 33.5C47 27.5 43.5 24.7 39 24.7C35.5 24.7 33.8 26.6 33 27.8V25H28V44H33V34.5C33 32 33.5 29.5 36.6 29.5C39.7 29.5 39.8 32.4 39.8 34.7V44H44.8V44H47V33.5Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 11. Official Yaru Show Applications 9-Dots Grid Icon
export const YaruGridIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <circle cx="16" cy="16" r="6" fill="#e6edf3" />
    <circle cx="32" cy="16" r="6" fill="#e6edf3" />
    <circle cx="48" cy="16" r="6" fill="#e6edf3" />
    <circle cx="16" cy="32" r="6" fill="#e6edf3" />
    <circle cx="32" cy="32" r="6" fill="#e95420" />
    <circle cx="48" cy="32" r="6" fill="#e6edf3" />
    <circle cx="16" cy="48" r="6" fill="#e6edf3" />
    <circle cx="32" cy="48" r="6" fill="#e6edf3" />
    <circle cx="48" cy="48" r="6" fill="#e6edf3" />
  </svg>
);
