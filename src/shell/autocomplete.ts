/**
 * ARKA OS — Shell Autocomplete Engine
 * 
 * Provides bash-like Tab completion for commands, flags, and filesystem paths.
 */

import { VirtualFilesystem } from '../filesystem/virtualFS';
import { COMMAND_REGISTRY } from './commandRegistry';

export interface AutocompleteResult {
  completedLine: string;
  options: string[];
}

const KNOWN_FLAGS: Record<string, string[]> = {
  rtl: ['--list'],
  verification: ['--show'],
  synthesis: ['--report'],
  sta: ['--report'],
  'physical-design': ['--flow'],
  floorplan: ['--info'],
  placement: ['--info'],
  routing: ['--info'],
  gds: ['--info'],
  tools: ['--list'],
  uname: ['-a', '--all'],
  ls: ['-la', '-l', '-a', '-lh'],
};

export function getAutocomplete(currentLine: string, cwd: string, fs: VirtualFilesystem): AutocompleteResult {
  const line = currentLine;
  const trimmed = line.trimStart();

  // If empty line, suggest top commands
  if (!trimmed) {
    return {
      completedLine: line,
      options: ['help', 'neofetch', 'about', 'skills', 'projects', 'ls', 'cd', 'cat'],
    };
  }

  const tokens = trimmed.split(/\s+/);
  const isTrailingSpace = line.endsWith(' ');

  // 1. Completing the command name (first token)
  if (tokens.length === 1 && !isTrailingSpace) {
    const prefix = tokens[0].toLowerCase();
    const allCommands = Object.keys(COMMAND_REGISTRY);
    const matches = allCommands.filter(cmd => cmd.startsWith(prefix)).sort();

    if (matches.length === 1) {
      return {
        completedLine: matches[0] + ' ',
        options: [],
      };
    }
    return {
      completedLine: line,
      options: matches,
    };
  }

  // 2. Completing flags or arguments
  const command = tokens[0].toLowerCase();
  const currentToken = isTrailingSpace ? '' : tokens[tokens.length - 1];

  // Check if completing known flags
  if (currentToken.startsWith('-') || KNOWN_FLAGS[command]) {
    const flags = KNOWN_FLAGS[command] || [];
    const flagMatches = flags.filter(f => f.startsWith(currentToken));
    if (flagMatches.length === 1) {
      const newLine = line.substring(0, line.length - currentToken.length) + flagMatches[0] + ' ';
      return {
        completedLine: newLine,
        options: [],
      };
    }
    if (flagMatches.length > 1) {
      return {
        completedLine: line,
        options: flagMatches,
      };
    }
  }

  // 3. Completing filesystem paths (for cd, cat, ls, tree, find, etc.)
  const fsMatches = fs.getCompletions(currentToken, cwd);

  if (fsMatches.length === 1) {
    const match = fsMatches[0];
    let insertion = match;

    if (currentToken.includes('/')) {
      const lastSlash = currentToken.lastIndexOf('/');
      insertion = currentToken.substring(0, lastSlash + 1) + match;
    }

    // If it's a file, add trailing space. If directory, it already has trailing '/'
    const hasTrailingSlash = insertion.endsWith('/');
    const replacement = insertion + (hasTrailingSlash ? '' : ' ');
    const newLine = line.substring(0, line.length - currentToken.length) + replacement;

    return {
      completedLine: newLine,
      options: [],
    };
  }

  if (fsMatches.length > 1) {
    return {
      completedLine: line,
      options: fsMatches,
    };
  }

  return {
    completedLine: line,
    options: [],
  };
}
