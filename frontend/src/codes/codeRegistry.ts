/**
 * ARKA OS — Code Registry & Virtual Codebase Provider
 * 
 * Automatically loads all Verilog and Markdown files from the /src/codes folder,
 * organizing them into structured projects with metadata, read-only protection,
 * and security flags.
 */

// Dynamically import all files inside /src/codes using Vite's raw glob import
const rawCodeFiles = import.meta.glob<string>([
  '/src/codes/**/*.v',
  '/src/codes/**/*.md',
  '/src/codes/**/*.out',
  '/src/codes/**/*.sv',
], {
  query: '?raw',
  import: 'default',
  eager: true,
});

export interface CodeFileItem {
  id: string;
  name: string;
  path: string; // e.g., '/home/arka/codes/SPI/master_adv.v'
  relativePath: string; // e.g., 'SPI/master_adv.v'
  folder: string; // e.g., 'SPI' or 'projects/8bit ALU'
  language: 'verilog' | 'markdown' | 'output';
  languageLabel: string;
  content: string;
  size: number;
  readOnly: boolean;
  description: string;
}

export interface CodeFolder {
  id: string;
  name: string;
  path: string;
  files: CodeFileItem[];
  subfolders?: CodeFolder[];
}

// Transform raw imported modules into structured CodeFileItems
const parsedFiles: CodeFileItem[] = Object.entries(rawCodeFiles).map(([importPath, content]) => {
  // importPath looks like '/src/codes/PWM/top.v' or '/src/codes/projects/8bit ALU/8bitAlu.v'
  const cleanPath = importPath.replace(/^\/src\/codes\//, '');
  const parts = cleanPath.split('/');
  const name = parts[parts.length - 1];
  const folder = parts.slice(0, -1).join('/');

  let language: 'verilog' | 'markdown' | 'output' = 'verilog';
  let languageLabel = 'Verilog HDL';

  if (name.endsWith('.md')) {
    language = 'markdown';
    languageLabel = 'Markdown';
  } else if (name.endsWith('.out')) {
    language = 'output';
    languageLabel = 'Simulation Output';
  } else if (name.endsWith('.sv')) {
    language = 'verilog';
    languageLabel = 'SystemVerilog';
  }

  let description = `${languageLabel} file in ${folder || 'root'}`;
  if (name === 'README.md') {
    if (folder === 'More_Projects_Private') {
      description = 'Additional RTL & VLSI Projects (Private Repositories on GitHub)';
    } else {
      description = `Documentation and architecture specification for ${folder}`;
    }
  } else if (name === 'master_adv.v') {
    description = 'Advanced Parameterizable SPI Master Controller (All 4 Modes, CPOL/CPHA)';
  } else if (name === 'UART.v') {
    description = 'Top-level UART Transceiver with Loopback';
  } else if (name === 'top.v') {
    description = 'Push-Button PWM Generator with Debounce Filtering';
  }

  const vfsPath = `/home/arka/codes/${cleanPath}`;

  return {
    id: cleanPath,
    name,
    path: vfsPath,
    relativePath: cleanPath,
    folder,
    language,
    languageLabel,
    content: content || '',
    size: (content || '').length,
    readOnly: true,
    description,
  };
});

// Sort files: README.md first, then main files, then testbenches, then outputs
parsedFiles.sort((a, b) => {
  if (a.folder !== b.folder) return a.folder.localeCompare(b.folder);
  if (a.name === 'README.md') return -1;
  if (b.name === 'README.md') return 1;
  return a.name.localeCompare(b.name);
});

// Filter files to showcase ONLY PWM, SPI, UART, and More_Projects_Private (exclude old projects folder)
const visibleFiles = parsedFiles.filter(f => !f.folder.startsWith('projects'));

export const ALL_CODE_FILES = visibleFiles;

// Hierarchical folders showcasing ONLY PWM, SPI, UART and Private Projects Notice
export const CODE_EXPLORER_FOLDERS: CodeFolder[] = [
  {
    id: 'PWM',
    name: 'PWM',
    path: '/home/arka/codes/PWM',
    files: visibleFiles.filter(f => f.folder === 'PWM'),
  },
  {
    id: 'SPI',
    name: 'SPI',
    path: '/home/arka/codes/SPI',
    files: visibleFiles.filter(f => f.folder === 'SPI'),
  },
  {
    id: 'UART',
    name: 'UART',
    path: '/home/arka/codes/UART',
    files: visibleFiles.filter(f => f.folder === 'UART'),
  },
  {
    id: 'more-projects',
    name: '🔒 And Many More Projects... (Private)',
    path: '/home/arka/codes/More_Projects_Private',
    files: visibleFiles.filter(f => f.folder === 'More_Projects_Private'),
  },
];

export function findCodeFileByPath(path: string): CodeFileItem | undefined {
  return ALL_CODE_FILES.find(f => f.path === path || f.relativePath === path || f.name === path);
}
