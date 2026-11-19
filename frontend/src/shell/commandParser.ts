/**
 * ARKA OS — Shell Command Parser
 * 
 * Parses raw terminal input into command tokens, flags, and arguments.
 * Handles single/double quotes, flag combinations, and path arguments.
 */

export interface ParsedCommand {
  raw: string;
  command: string;
  args: string[];
  flags: Record<string, boolean | string>;
}

export function parseCommandLine(rawInput: string): ParsedCommand {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { raw: '', command: '', args: [], flags: {} };
  }

  const tokens: string[] = [];
  let currentToken = '';
  let inDoubleQuote = false;
  let inSingleQuote = false;
  let escapeNext = false;

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];

    if (escapeNext) {
      currentToken += char;
      escapeNext = false;
      continue;
    }

    if (char === '\\') {
      escapeNext = true;
      continue;
    }

    if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
      continue;
    }

    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
      continue;
    }

    if (char === ' ' && !inDoubleQuote && !inSingleQuote) {
      if (currentToken.length > 0) {
        tokens.push(currentToken);
        currentToken = '';
      }
      continue;
    }

    currentToken += char;
  }

  if (currentToken.length > 0) {
    tokens.push(currentToken);
  }

  if (tokens.length === 0) {
    return { raw: trimmed, command: '', args: [], flags: {} };
  }

  const command = tokens[0].toLowerCase();
  const rawArgs = tokens.slice(1);
  const args: string[] = [];
  const flags: Record<string, boolean | string> = {};

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];

    if (arg.startsWith('--')) {
      const equalIndex = arg.indexOf('=');
      if (equalIndex !== -1) {
        const flagName = arg.substring(2, equalIndex);
        const flagValue = arg.substring(equalIndex + 1);
        flags[flagName] = flagValue;
      } else {
        const flagName = arg.substring(2);
        flags[flagName] = true;
      }
    } else if (arg.startsWith('-') && arg.length > 1) {
      // Short flags, could be combined like -la
      const letters = arg.substring(1);
      for (const char of letters) {
        flags[char] = true;
      }
    } else {
      args.push(arg);
    }
  }

  return {
    raw: trimmed,
    command,
    args,
    flags,
  };
}
