/**
 * ARKA OS — Shell Command Registry
 * 
 * Implements execution handlers for all System, Filesystem, Portfolio,
 * and VLSI-specific commands with authentic Linux outputs and formatting.
 */

import React from 'react';
import type { ParsedCommand } from './commandParser';
import type { VirtualFilesystem, FSNode } from '../filesystem/virtualFS';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import { TerminalEditor } from '../components/TerminalEditor';
import {
  ASCII_NEOFETCH_LOGO,
  ASCII_ARKA_LOGO,
  ASCII_VLSI_PIPELINE,
  ASCII_SILICON_DIE,
  ASCII_LOGIC_GATES,
  ASCII_FSM_DIAGRAM,
} from '../utils/asciiArt';

export interface CommandContext {
  cwd: string;
  setCwd: (path: string) => void;
  fs: VirtualFilesystem;
  history: string[];
  clearTerminal: () => void;
  exitToLogin: () => void;
  exitTerminal?: () => void;
}

export interface CommandOutput {
  text?: string;
  node?: React.ReactNode;
  isError?: boolean;
}

export type CommandHandler = (cmd: ParsedCommand, ctx: CommandContext) => CommandOutput;

export const COMMAND_REGISTRY: Record<string, CommandHandler> = {
  // ==========================================
  // SYSTEM COMMANDS
  // ==========================================

  help: () => {
    return {
      node: (
        <div className="space-y-4 my-2 text-sm leading-relaxed">
          <div className="text-emerald-400 font-semibold border-b border-emerald-500/30 pb-1">
            ARKA OS (v6.0 LTS) — DIGITAL VLSI WORKSTATION SHELL REFERENCE
          </div>
          <p className="text-slate-300">
            Welcome to the custom command line interface. Enter any command below to inspect engineering designs, physical flows, and professional qualifications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* System */}
            <div className="bg-slate-900/40 p-3 rounded border border-slate-800">
              <div className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
                <span>[SYSTEM COMMANDS]</span>
              </div>
              <div className="grid grid-cols-3 gap-y-1 text-xs">
                <span className="text-amber-300 font-mono">help</span>
                <span className="text-slate-400 col-span-2">Display this reference manual</span>
                <span className="text-amber-300 font-mono">neofetch</span>
                <span className="text-slate-400 col-span-2">System & VLSI specs summary</span>
                <span className="text-amber-300 font-mono">uname -a</span>
                <span className="text-slate-400 col-span-2">Print kernel & architecture info</span>
                <span className="text-amber-300 font-mono">whoami</span>
                <span className="text-slate-400 col-span-2">Print active username</span>
                <span className="text-amber-300 font-mono">uptime</span>
                <span className="text-slate-400 col-span-2">Show system running time & load</span>
                <span className="text-amber-300 font-mono">clear</span>
                <span className="text-slate-400 col-span-2">Clear terminal screen (or Ctrl+L)</span>
                <span className="text-amber-300 font-mono">history</span>
                <span className="text-slate-400 col-span-2">Display command execution history</span>
                <span className="text-amber-300 font-mono">exit</span>
                <span className="text-slate-400 col-span-2">Log out and return to boot/login</span>
              </div>
            </div>

            {/* Filesystem */}
            <div className="bg-slate-900/40 p-3 rounded border border-slate-800">
              <div className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                <span>[FILESYSTEM COMMANDS]</span>
              </div>
              <div className="grid grid-cols-3 gap-y-1 text-xs">
                <span className="text-amber-300 font-mono">pwd</span>
                <span className="text-slate-400 col-span-2">Print current working directory</span>
                <span className="text-amber-300 font-mono">ls [-la]</span>
                <span className="text-slate-400 col-span-2">List directory contents & metadata</span>
                <span className="text-amber-300 font-mono">cd &lt;dir&gt;</span>
                <span className="text-slate-400 col-span-2">Change directory (.., ~, /path)</span>
                <span className="text-amber-300 font-mono">cat &lt;file&gt;</span>
                <span className="text-slate-400 col-span-2">Concatenate and display file contents</span>
                <span className="text-amber-300 font-mono">tree</span>
                <span className="text-slate-400 col-span-2">Display visual directory hierarchy</span>
                <span className="text-amber-300 font-mono">find [query]</span>
                <span className="text-slate-400 col-span-2">Search files across filesystem</span>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-slate-900/40 p-3 rounded border border-slate-800">
              <div className="text-emerald-400 font-bold mb-2 flex items-center gap-2">
                <span>[PORTFOLIO COMMANDS]</span>
              </div>
              <div className="grid grid-cols-3 gap-y-1 text-xs">
                <span className="text-amber-300 font-mono">about</span>
                <span className="text-slate-400 col-span-2">Engineer profile & background</span>
                <span className="text-amber-300 font-mono">skills</span>
                <span className="text-slate-400 col-span-2">HDL, UVM, EDA tools & scripting</span>
                <span className="text-amber-300 font-mono">projects</span>
                <span className="text-slate-400 col-span-2">SPI Master, UART, PWM & Sync FIFO Verilog IP</span>
                <span className="text-amber-300 font-mono">experience</span>
                <span className="text-slate-400 col-span-2">Work experience & contributions</span>
                <span className="text-amber-300 font-mono">education</span>
                <span className="text-slate-400 col-span-2">Academic background & coursework</span>
                <span className="text-amber-300 font-mono">certifications</span>
                <span className="text-slate-400 col-span-2">Industry certifications & licenses</span>
                <span className="text-amber-300 font-mono">contact</span>
                <span className="text-slate-400 col-span-2">Email, GitHub, LinkedIn & SSH</span>
                <span className="text-amber-300 font-mono">resume</span>
                <span className="text-slate-400 col-span-2">Curriculum Vitae review & download</span>
              </div>
            </div>

            {/* VLSI */}
            <div className="bg-slate-900/40 p-3 rounded border border-slate-800">
              <div className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                <span>[VLSI SPECIALIZED COMMANDS]</span>
              </div>
              <div className="grid grid-cols-3 gap-y-1 text-xs">
                <span className="text-amber-300 font-mono">rtl --list</span>
                <span className="text-slate-400 col-span-2">List synthesizable RTL designs</span>
                <span className="text-amber-300 font-mono">verification --show</span>
                <span className="text-slate-400 col-span-2">UVM testbench & coverage metrics</span>
                <span className="text-amber-300 font-mono">synthesis --report</span>
                <span className="text-slate-400 col-span-2">Yosys cell area & gate breakdown</span>
                <span className="text-amber-300 font-mono">sta --report</span>
                <span className="text-slate-400 col-span-2">Timing slack (WNS/TNS) & critical path</span>
                <span className="text-amber-300 font-mono">physical-design --flow</span>
                <span className="text-slate-400 col-span-2">RTL to GDSII ASIC pipeline</span>
                <span className="text-amber-300 font-mono">floorplan --info</span>
                <span className="text-slate-400 col-span-2">Die dimension, core util & PDN grid</span>
                <span className="text-amber-300 font-mono">placement --info</span>
                <span className="text-slate-400 col-span-2">Standard cell density & wirelength</span>
                <span className="text-amber-300 font-mono">routing --info</span>
                <span className="text-slate-400 col-span-2">Metal layers & DRC antenna check</span>
                <span className="text-amber-300 font-mono">gds --info</span>
                <span className="text-slate-400 col-span-2">Tapeout binary & LVS signoff</span>
                <span className="text-amber-300 font-mono">tools --list</span>
                <span className="text-slate-400 col-span-2">EDA toolchain matrix (Yosys, etc.)</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 pt-1">
            <span className="text-cyan-400 font-semibold">Tip:</span> Use <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-amber-300 border border-slate-700">Tab</kbd> for auto-complete and <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-amber-300 border border-slate-700">↑</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-amber-300 border border-slate-700">↓</kbd> to cycle command history.
          </div>
        </div>
      ),
    };
  },

  neofetch: () => {
    const elapsedMinutes = Math.floor((Date.now() - PORTFOLIO_DATA.system.uptimeStart) / (1000 * 60));
    const hours = Math.floor(elapsedMinutes / 60);
    const mins = elapsedMinutes % 60;
    const uptimeStr = `${hours} hours, ${mins} mins`;

    return {
      node: (
        <div className="my-2 font-mono text-xs md:text-sm">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            {/* Left Column: ASCII Silicon Logo */}
            <div className="text-cyan-400 whitespace-pre leading-none select-none font-bold shrink-0">
              {ASCII_NEOFETCH_LOGO}
            </div>

            {/* Right Column: System Specs */}
            <div className="space-y-1 text-slate-200">
              <div className="text-emerald-400 font-bold text-base">
                {PORTFOLIO_DATA.engineer.handle}@{PORTFOLIO_DATA.engineer.hostname}
              </div>
              <div className="text-slate-600 select-none">------------------------------------</div>
              
              <div className="flex gap-2">
                <span className="text-cyan-300 font-bold w-36">OS:</span>
                <span>{PORTFOLIO_DATA.system.osName}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-cyan-300 font-bold w-36">Host:</span>
                <span>{PORTFOLIO_DATA.system.host}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-cyan-300 font-bold w-36">Kernel:</span>
                <span>{PORTFOLIO_DATA.system.kernel}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-cyan-300 font-bold w-36">Uptime:</span>
                <span>{uptimeStr}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-cyan-300 font-bold w-36">Shell:</span>
                <span>{PORTFOLIO_DATA.system.shell}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-cyan-300 font-bold w-36">Terminal:</span>
                <span>{PORTFOLIO_DATA.system.terminal}</span>
              </div>
              
              <div className="text-slate-600 select-none my-1">------------------------------------</div>
              
              <div className="flex gap-2">
                <span className="text-purple-300 font-bold w-36">Architecture:</span>
                <span className="text-emerald-300">Digital VLSI / ASIC</span>
              </div>
              <div className="flex gap-2">
                <span className="text-purple-300 font-bold w-36">Design Flow:</span>
                <span className="text-amber-300">{PORTFOLIO_DATA.system.designFlow}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-purple-300 font-bold w-36">Foundry PDK:</span>
                <span className="text-cyan-300">{PORTFOLIO_DATA.system.pdk}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-purple-300 font-bold w-36">Specialization:</span>
                <span>{PORTFOLIO_DATA.engineer.specialization}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-purple-300 font-bold w-36">EDA Suite:</span>
                <span>Yosys, OpenROAD, OpenSTA, Verilator, GTKWave, Magic</span>
              </div>

              {/* 16-color ANSI Palette Test */}
              <div className="pt-3 flex gap-1 select-none">
                <span className="w-5 h-3 bg-black inline-block border border-slate-700"></span>
                <span className="w-5 h-3 bg-red-600 inline-block"></span>
                <span className="w-5 h-3 bg-green-500 inline-block"></span>
                <span className="w-5 h-3 bg-yellow-500 inline-block"></span>
                <span className="w-5 h-3 bg-blue-500 inline-block"></span>
                <span className="w-5 h-3 bg-purple-500 inline-block"></span>
                <span className="w-5 h-3 bg-cyan-500 inline-block"></span>
                <span className="w-5 h-3 bg-slate-200 inline-block"></span>
                <span className="w-5 h-3 bg-slate-600 inline-block"></span>
                <span className="w-5 h-3 bg-red-400 inline-block"></span>
                <span className="w-5 h-3 bg-green-400 inline-block"></span>
                <span className="w-5 h-3 bg-yellow-300 inline-block"></span>
                <span className="w-5 h-3 bg-blue-400 inline-block"></span>
                <span className="w-5 h-3 bg-purple-400 inline-block"></span>
                <span className="w-5 h-3 bg-cyan-300 inline-block"></span>
                <span className="w-5 h-3 bg-white inline-block"></span>
              </div>
            </div>
          </div>
        </div>
      ),
    };
  },

  uname: (cmd) => {
    if (cmd.flags['a'] || cmd.flags['all'] || cmd.args.includes('-a')) {
      return {
        text: `Linux ${PORTFOLIO_DATA.engineer.hostname} 6.8.0-45-generic-vlsi-rt #47-ARKA SMP PREEMPT_DYNAMIC SMP x86_64 GNU/Linux`,
      };
    }
    return { text: 'Linux' };
  },

  whoami: () => {
    return { text: PORTFOLIO_DATA.engineer.handle };
  },

  hostname: () => {
    return { text: PORTFOLIO_DATA.engineer.hostname };
  },

  uptime: () => {
    const elapsedMinutes = Math.floor((Date.now() - PORTFOLIO_DATA.system.uptimeStart) / (1000 * 60));
    const hours = Math.floor(elapsedMinutes / 60);
    const mins = elapsedMinutes % 60;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    return {
      text: ` ${timeStr} up ${hours}:${mins.toString().padStart(2, '0')}, 1 user, load average: 0.14, 0.21, 0.18`,
    };
  },

  date: () => {
    return { text: new Date().toString() };
  },

  clear: (_, ctx) => {
    ctx.clearTerminal();
    return {};
  },

  history: (_, ctx) => {
    const lines = ctx.history.map((cmd, idx) => `  ${(idx + 1).toString().padStart(4, ' ')}  ${cmd}`);
    return { text: lines.join('\n') };
  },

  exit: (_, ctx) => {
    if (ctx.exitTerminal) {
      ctx.exitTerminal();
      return { text: 'logout\n[Process completed]' };
    }
    ctx.exitToLogin();
    return { text: 'Session terminated. Logging out of ARKA OS...' };
  },

  echo: (cmd) => {
    return { text: cmd.args.join(' ') };
  },

  // ==========================================
  // FILESYSTEM COMMANDS
  // ==========================================

  pwd: (_, ctx) => {
    return { text: ctx.cwd };
  },

  ls: (cmd, ctx) => {
    const showHidden = Boolean(cmd.flags['a'] || cmd.flags['all']);
    const showLong = Boolean(cmd.flags['l'] || cmd.flags['lh'] || cmd.flags['la'] || cmd.flags['al']);
    const targetPath = cmd.args[0] || ctx.cwd;
    const resolved = ctx.fs.resolvePath(targetPath, ctx.cwd);
    const targetNode = ctx.fs.getNode(resolved);

    if (!targetNode) {
      return {
        text: `ls: cannot access '${targetPath}': No such file or directory`,
        isError: true,
      };
    }

    if (targetNode.type === 'file') {
      if (showLong) {
        return {
          text: `${targetNode.permissions} 1 ${targetNode.owner} ${targetNode.group} ${targetNode.size.toString().padStart(6, ' ')} ${targetNode.modified} ${targetNode.name}`,
        };
      }
      return { text: targetNode.name };
    }

    const items = ctx.fs.listDir(resolved);
    if (!items) {
      return { text: '' };
    }

    // Add . and .. if -a
    const displayItems: { name: string; node: FSNode }[] = [];
    if (showHidden) {
      displayItems.push({
        name: '.',
        node: {
          name: '.',
          type: 'dir',
          permissions: 'drwxr-xr-x',
          owner: targetNode.owner,
          group: targetNode.group,
          size: 4096,
          modified: targetNode.modified,
        },
      });
      displayItems.push({
        name: '..',
        node: {
          name: '..',
          type: 'dir',
          permissions: 'drwxr-xr-x',
          owner: 'root',
          group: 'root',
          size: 4096,
          modified: targetNode.modified,
        },
      });
    }

    displayItems.push(...items.filter(item => showHidden || !item.name.startsWith('.')));

    if (showLong) {
      const totalBlocks = displayItems.reduce((acc, curr) => acc + (curr.node.type === 'dir' ? 4 : Math.ceil(curr.node.size / 1024) || 1), 0);
      const lines = [
        `total ${totalBlocks}`,
        ...displayItems.map(item => {
          const sizeStr = item.node.size.toString().padStart(6, ' ');
          const isDir = item.node.type === 'dir';
          return (
            <div key={item.name} className="flex gap-3 font-mono text-xs md:text-sm">
              <span className="text-slate-400">{item.node.permissions}</span>
              <span className="text-slate-500 w-3 text-right">1</span>
              <span className="text-amber-400/90 w-12">{item.node.owner}</span>
              <span className="text-amber-400/90 w-12">{item.node.group}</span>
              <span className="text-slate-300 w-16 text-right">{sizeStr}</span>
              <span className="text-slate-400 w-24">{item.node.modified}</span>
              <span className={isDir ? 'text-blue-400 font-bold' : item.name.endsWith('.pdf') ? 'text-red-400' : 'text-slate-200'}>
                {item.name}{isDir ? '/' : ''}
              </span>
            </div>
          );
        }),
      ];

      return {
        node: <div className="space-y-0.5 my-1">{lines}</div>,
      };
    }

    // Short format (grid)
    return {
      node: (
        <div className="flex flex-wrap gap-x-6 gap-y-1 my-1 font-mono text-xs md:text-sm">
          {displayItems.map(item => {
            const isDir = item.node.type === 'dir';
            return (
              <span
                key={item.name}
                className={isDir ? 'text-blue-400 font-bold' : item.name.endsWith('.pdf') ? 'text-red-400' : 'text-slate-200'}
              >
                {item.name}{isDir ? '/' : ''}
              </span>
            );
          })}
        </div>
      ),
    };
  },

  cd: (cmd, ctx) => {
    const target = cmd.args[0] || '~';
    const resolved = ctx.fs.resolvePath(target, ctx.cwd);
    const node = ctx.fs.getNode(resolved);

    if (!node) {
      return {
        text: `bash: cd: ${target}: No such file or directory`,
        isError: true,
      };
    }

    if (node.type !== 'dir') {
      return {
        text: `bash: cd: ${target}: Not a directory`,
        isError: true,
      };
    }

    ctx.setCwd(resolved);
    return {};
  },

  cat: (cmd, ctx) => {
    if (cmd.args.length === 0) {
      return {
        text: 'cat: missing operand\nTry \'cat --help\' or specify a file.',
        isError: true,
      };
    }

    const outputs: string[] = [];
    for (const filename of cmd.args) {
      const content = ctx.fs.readFile(filename, ctx.cwd);
      if (content === null) {
        return {
          text: `cat: ${filename}: No such file or directory`,
          isError: true,
        };
      }
      outputs.push(content);
    }

    return { text: outputs.join('\n') };
  },

  tree: (cmd, ctx) => {
    const target = cmd.args[0] || '.';
    const treeText = ctx.fs.renderTree(target, ctx.cwd, 4);
    return { text: treeText };
  },

  find: (cmd, ctx) => {
    const startPath = cmd.args[0] || '.';
    const query = cmd.args[1];
    const results = ctx.fs.find(startPath, ctx.cwd, query);
    return { text: results.join('\n') };
  },

  mkdir: (cmd, ctx) => {
    if (cmd.args.length === 0) {
      return { text: 'mkdir: missing operand', isError: true };
    }
    const target = cmd.args[0];
    const success = ctx.fs.createDirectory(target, ctx.cwd);
    if (!success) {
      return { text: `mkdir: cannot create directory '${target}': File exists or invalid path`, isError: true };
    }
    return {};
  },

  touch: (cmd, ctx) => {
    if (cmd.args.length === 0) {
      return { text: 'touch: missing file operand', isError: true };
    }
    const target = cmd.args[0];
    const success = ctx.fs.createFile(target, '', ctx.cwd);
    if (!success) {
      return { text: `touch: cannot touch '${target}': No such file or directory`, isError: true };
    }
    return {};
  },

  rm: (cmd, ctx) => {
    if (cmd.args.length === 0) {
      return { text: 'rm: missing operand', isError: true };
    }
    const target = cmd.args[0];
    const success = ctx.fs.deleteNode(target, ctx.cwd);
    if (!success) {
      return { text: `rm: cannot remove '${target}': No such file or directory`, isError: true };
    }
    return {};
  },

  mv: (cmd, ctx) => {
    if (cmd.args.length < 2) {
      return { text: 'mv: missing file operand', isError: true };
    }
    const src = cmd.args[0];
    const dest = cmd.args[1];
    const success = ctx.fs.renameNode(src, dest, ctx.cwd);
    if (!success) {
      return { text: `mv: cannot move '${src}' to '${dest}'`, isError: true };
    }
    return {};
  },

  // ==========================================
  // PORTFOLIO COMMANDS
  // ==========================================

  about: () => {
    return {
      node: (
        <div className="space-y-4 my-2 text-xs md:text-sm">
          <div className="border border-emerald-500/30 bg-emerald-950/20 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h2 className="text-lg font-bold text-emerald-400">{PORTFOLIO_DATA.engineer.fullName}</h2>
                <div className="text-amber-300 font-mono">{PORTFOLIO_DATA.engineer.title} — {PORTFOLIO_DATA.engineer.tagline}</div>
              </div>
            </div>
            <div className="mt-3 text-slate-300 leading-relaxed border-t border-emerald-500/20 pt-3">
              {PORTFOLIO_DATA.engineer.summary}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-slate-900/60 p-3 rounded border border-slate-800">
              <div className="text-cyan-400 font-bold mb-1">[CORE SPECIALIZATION]</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>Verilog HDL Synthesizable Modeling & RTL Microarchitecture</li>
                <li>Multi-Mode Parameterized SPI Master Controller (All 4 SPI Modes)</li>
                <li>UART Serial Transceiver (9600 Baud, Dedicated Baud Generator)</li>
                <li>PWM Generator with Variable Duty Cycle & Switch Debouncing</li>
                <li>Parameterized Synchronous FIFO Design & Pointer Flags</li>
                <li>FPGA Implementation & Verification with Xilinx Vivado & GTKWave</li>
              </ul>
            </div>

            <div className="bg-slate-900/60 p-3 rounded border border-slate-800">
              <div className="text-purple-400 font-bold mb-1">[WORKSTATION CHANNELS]</div>
              <div className="space-y-2 text-slate-300">
                <div>
                  <span className="text-slate-400">Email:</span>{' '}
                  <a href={`mailto:${PORTFOLIO_DATA.engineer.email}`} className="text-cyan-400 hover:underline">
                    {PORTFOLIO_DATA.engineer.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400">GitHub:</span>{' '}
                  <a href={PORTFOLIO_DATA.engineer.github} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                    {PORTFOLIO_DATA.engineer.github}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400">LinkedIn:</span>{' '}
                  <a href={PORTFOLIO_DATA.engineer.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {PORTFOLIO_DATA.engineer.linkedin}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400">Location:</span> {PORTFOLIO_DATA.engineer.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    };
  },

  skills: () => {
    return {
      node: (
        <div className="space-y-4 my-2 text-xs md:text-sm">
          <div className="text-cyan-400 font-bold border-b border-cyan-500/30 pb-1 text-base">
            HARDWARE DESIGN & VERIFICATION SKILL MATRIX
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* HDL */}
            <div className="bg-slate-900/40 p-3 rounded border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-bold">1. Hardware Description Languages</div>
              {PORTFOLIO_DATA.skills.hardwareDescriptionLanguages.map(item => (
                <div key={item.name} className="border-l-2 border-emerald-500 pl-2">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-200 font-semibold">{item.name}</span>
                    <span className="text-amber-300 text-xs">{item.level}</span>
                  </div>
                  <div className="text-slate-400 text-xs">{item.usage}</div>
                </div>
              ))}
            </div>

            {/* Verification */}
            <div className="bg-slate-900/40 p-3 rounded border border-slate-800 space-y-2">
              <div className="text-purple-400 font-bold">2. Verification Methodology</div>
              {PORTFOLIO_DATA.skills.verification.map(item => (
                <div key={item.name} className="border-l-2 border-purple-500 pl-2">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-200 font-semibold">{item.name}</span>
                    <span className="text-amber-300 text-xs">{item.level}</span>
                  </div>
                  <div className="text-slate-400 text-xs">{item.usage}</div>
                </div>
              ))}
            </div>

            {/* Protocols */}
            <div className="bg-slate-900/40 p-3 rounded border border-slate-800 space-y-2">
              <div className="text-blue-400 font-bold">3. Computer Architecture & Protocols</div>
              {PORTFOLIO_DATA.skills.architectureAndProtocols.map(item => (
                <div key={item.name} className="border-l-2 border-blue-500 pl-2">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-200 font-semibold">{item.name}</span>
                    <span className="text-amber-300 text-xs">{item.level}</span>
                  </div>
                  <div className="text-slate-400 text-xs">{item.usage}</div>
                </div>
              ))}
            </div>

            {/* EDA Tools */}
            <div className="bg-slate-900/40 p-3 rounded border border-slate-800 space-y-2">
              <div className="text-yellow-400 font-bold">4. EDA Tools & CAD Environments</div>
              {PORTFOLIO_DATA.skills.edaTools.map(item => (
                <div key={item.name} className="border-l-2 border-yellow-500 pl-2">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-200 font-semibold">{item.name}</span>
                    <span className="text-cyan-300 text-xs">{item.category}</span>
                  </div>
                  <div className="text-slate-400 text-xs">{item.usage}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    };
  },

  projects: () => {
    return {
      node: (
        <div className="space-y-4 my-2 text-xs md:text-sm">
          <div className="text-emerald-400 font-bold border-b border-emerald-500/30 pb-1 text-base">
            DIGITAL VLSI & ASIC IMPLEMENTATION PROJECTS
          </div>
          <div className="grid grid-cols-1 gap-4">
            {PORTFOLIO_DATA.projects.map((proj, idx) => (
              <div key={proj.id} className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-mono font-bold">[{idx + 1}]</span>
                    <span className="text-slate-100 font-bold text-sm md:text-base">{proj.name}</span>
                  </div>
                  <span className="text-xs uppercase px-2 py-0.5 rounded font-mono font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/50 self-start sm:self-auto">
                    {proj.category}
                  </span>
                </div>

                <div className="text-amber-300/90 text-xs font-mono">{proj.tagline}</div>
                <p className="text-slate-300 text-xs leading-relaxed">{proj.description}</p>

                {/* Key Metrics */}
                <div className="bg-black/40 p-2.5 rounded border border-slate-800 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs">
                  {Object.entries(proj.metrics).map(([key, val]) => (
                    <div key={key}>
                      <span className="text-slate-400 block text-[10px] uppercase">{key}:</span>
                      <span className="text-cyan-300 font-mono font-semibold">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.technologies.map(t => (
                    <span key={t} className="text-[11px] bg-slate-800/90 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    };
  },

  experience: () => {
    return {
      node: (
        <div className="space-y-4 my-2 text-xs md:text-sm">
          <div className="text-purple-400 font-bold border-b border-purple-500/30 pb-1 text-base">
            PROFESSIONAL EXPERIENCE & SILICON TRACK RECORD
          </div>
          <div className="space-y-4">
            {PORTFOLIO_DATA.experience.map(exp => (
              <div key={exp.role + exp.organization} className="border-l-2 border-purple-500 pl-4 py-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div className="text-slate-100 font-bold text-sm md:text-base">{exp.role}</div>
                  <div className="text-amber-300 font-mono text-xs">{exp.period}</div>
                </div>
                <div className="text-cyan-400 text-xs font-mono">{exp.organization} — {exp.location}</div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs leading-relaxed">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ),
    };
  },

  education: () => {
    return {
      node: (
        <div className="space-y-4 my-2 text-xs md:text-sm">
          <div className="text-blue-400 font-bold border-b border-blue-500/30 pb-1 text-base">
            ACADEMIC QUALIFICATIONS
          </div>
          {PORTFOLIO_DATA.education.map(edu => (
            <div key={edu.degree} className="bg-slate-900/50 p-4 rounded border border-slate-800 space-y-2">
              <div className="text-slate-100 font-bold text-sm md:text-base">{edu.degree}</div>
              <div className="text-cyan-300 font-mono text-xs">{edu.institution} | {edu.period}</div>
              <div className="text-emerald-400 font-mono font-semibold text-xs">{edu.score}</div>
              <div className="text-slate-400 text-xs font-semibold pt-1">Advanced Coursework:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-300">
                {edu.coursework.map(c => (
                  <div key={c} className="flex items-center gap-1.5">
                    <span className="text-cyan-400">▹</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    };
  },

  certifications: () => {
    return {
      node: (
        <div className="space-y-4 my-2 text-xs md:text-sm">
          <div className="text-amber-400 font-bold border-b border-amber-500/30 pb-1 text-base">
            PROFESSIONAL CERTIFICATIONS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PORTFOLIO_DATA.certifications.map(c => (
              <div key={c.name} className="bg-slate-900/50 p-3 rounded border border-slate-800 space-y-1">
                <div className="text-slate-200 font-bold text-xs md:text-sm">{c.name}</div>
                <div className="text-cyan-400 text-xs font-mono">{c.issuer}</div>
                <div className="flex justify-between text-xs text-slate-400 pt-1">
                  <span>Issued: {c.date}</span>
                  <span className="font-mono text-emerald-300">{c.credentialId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    };
  },

  contact: () => {
    return {
      node: (
        <div className="space-y-3 my-2 text-xs md:text-sm">
          <div className="text-emerald-400 font-bold border-b border-emerald-500/30 pb-1 text-base">
            CONTACT & NETWORKING CHANNELS
          </div>
          <div className="bg-slate-900/60 p-4 rounded border border-slate-800 space-y-3 font-mono">
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 w-24">Email:</span>
              <a href={`mailto:${PORTFOLIO_DATA.engineer.email}`} className="text-slate-200 hover:text-emerald-400 underline">
                {PORTFOLIO_DATA.engineer.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 w-24">GitHub:</span>
              <a href={PORTFOLIO_DATA.engineer.github} target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-emerald-400 underline">
                {PORTFOLIO_DATA.engineer.github}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 w-24">LinkedIn:</span>
              <a href={PORTFOLIO_DATA.engineer.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-emerald-400 underline">
                {PORTFOLIO_DATA.engineer.linkedin}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 w-24">Location:</span>
              <span className="text-slate-300">{PORTFOLIO_DATA.engineer.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 w-24">SSH Access:</span>
              <span className="text-amber-300">ssh {PORTFOLIO_DATA.engineer.handle}@{PORTFOLIO_DATA.engineer.hostname}</span>
            </div>
          </div>
        </div>
      ),
    };
  },

  resume: () => {
    return {
      node: (
        <div className="space-y-3 my-2 text-xs md:text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/30 pb-2">
            <span className="text-cyan-400 font-bold text-base">CURRICULUM VITAE — {PORTFOLIO_DATA.engineer.fullName.toUpperCase()}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-pdf-viewer'));
                }}
                className="px-3 py-1 bg-[#e95420] hover:bg-[#ff6e3a] text-white rounded text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>🔍</span>
                <span>Open in PDF Viewer</span>
              </button>
              <a
                href="/Arkasnata_Pal_Resume.pdf"
                download="Arkasnata_Pal_Resume.pdf"
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>📥</span>
                <span>Download PDF</span>
              </a>
            </div>
          </div>
          <div className="bg-black/60 p-4 rounded border border-slate-800 font-mono text-xs whitespace-pre-wrap leading-relaxed text-slate-300">
            {`================================================================================
ENGINEER: ${PORTFOLIO_DATA.engineer.fullName.toUpperCase()} | ${PORTFOLIO_DATA.engineer.title}
TAGLINE:  ${PORTFOLIO_DATA.engineer.tagline}
CONTACT:  ${PORTFOLIO_DATA.engineer.email} | ${PORTFOLIO_DATA.engineer.location}
================================================================================

SUMMARY:
${PORTFOLIO_DATA.engineer.summary}

TECHNICAL PROFILE:
- Hardware Description Languages: Verilog HDL
- Programming Languages: C, C++, Python
- Core Subjects: Digital Electronics, Logic Design, Electronic Devices, Signals and Systems
- EDA Tools: Xilinx Vivado, Icarus Verilog, GTKWave
- Projects: SPI Master Controller (All 4 Modes), UART Transceiver (9600 Baud), PWM Generator, Synchronous FIFO
- Achievements: Smart India Hackathon 2024 Finalist, NPTEL Elite Certification (IIT Guwahati)`}
          </div>
        </div>
      ),
    };
  },

  evince: () => {
    window.dispatchEvent(new CustomEvent('open-pdf-viewer'));
    return {
      node: (
        <div className="text-emerald-400 font-mono text-xs my-1">
          [OK] Opening GNOME Document Viewer (Evince): Arkasnata_Pal_Resume.pdf
        </div>
      ),
    };
  },

  pdf: () => {
    window.dispatchEvent(new CustomEvent('open-pdf-viewer'));
    return {
      node: (
        <div className="text-emerald-400 font-mono text-xs my-1">
          [OK] Opening GNOME Document Viewer (Evince): Arkasnata_Pal_Resume.pdf
        </div>
      ),
    };
  },

  // ==========================================
  // VLSI SPECIALIZED COMMANDS
  // ==========================================

  rtl: (_cmd) => {
    return {
      node: (
        <div className="space-y-3 my-2 text-xs md:text-sm">
          <div className="text-emerald-400 font-bold border-b border-emerald-500/30 pb-1 text-base">
            SYNTHESIZABLE RTL DESIGNS & MICROARCHITECTURE REPOSITORY
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border border-slate-800">
              <thead className="bg-slate-900 text-cyan-300">
                <tr>
                  <th className="p-2 border-b border-slate-800">Module Top</th>
                  <th className="p-2 border-b border-slate-800">Standard</th>
                  <th className="p-2 border-b border-slate-800">Target Freq</th>
                  <th className="p-2 border-b border-slate-800">Gate Count</th>
                  <th className="p-2 border-b border-slate-800">Pipeline Stages</th>
                  <th className="p-2 border-b border-slate-800">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/30">
                  <td className="p-2 font-bold text-amber-300">spi_master</td>
                  <td className="p-2">Verilog HDL (IEEE 1364)</td>
                  <td className="p-2 text-cyan-300">50 MHz</td>
                  <td className="p-2">Parameterized</td>
                  <td className="p-2">All 4 SPI Modes</td>
                  <td className="p-2 text-emerald-400 font-bold">VERIFIED (Vivado Simulation)</td>
                </tr>
                <tr className="hover:bg-slate-900/30">
                  <td className="p-2 font-bold text-amber-300">uart_top</td>
                  <td className="p-2">Verilog HDL</td>
                  <td className="p-2 text-cyan-300">50 MHz</td>
                  <td className="p-2">9600 Baud</td>
                  <td className="p-2">FSM Tx / Rx</td>
                  <td className="p-2 text-emerald-400 font-bold">VERIFIED (Vivado Simulation)</td>
                </tr>
                <tr className="hover:bg-slate-900/30">
                  <td className="p-2 font-bold text-amber-300">pwm_generator</td>
                  <td className="p-2">Verilog HDL</td>
                  <td className="p-2 text-cyan-300">50 MHz</td>
                  <td className="p-2">Variable Duty</td>
                  <td className="p-2">Button & Debouncer</td>
                  <td className="p-2 text-emerald-400 font-bold">VERIFIED (Vivado Waveform)</td>
                </tr>
                <tr className="hover:bg-slate-900/30">
                  <td className="p-2 font-bold text-amber-300">sync_fifo</td>
                  <td className="p-2">Verilog HDL</td>
                  <td className="p-2 text-cyan-300">100 MHz</td>
                  <td className="p-2">Parameterized</td>
                  <td className="p-2">Full / Empty Flags</td>
                  <td className="p-2 text-purple-400 font-bold">VERIFIED (Timing Clean)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-xs text-slate-400">
            Design files located in <span className="text-amber-300 font-mono">/home/arka/projects/rtl/</span>. Inspect with <span className="text-cyan-300 font-mono">cat /home/arka/projects/rtl/spi_master.v</span>.
          </div>
        </div>
      ),
    };
  },

  verification: () => {
    return {
      node: (
        <div className="space-y-4 my-2 text-xs md:text-sm">
          <div className="text-purple-400 font-bold border-b border-purple-500/30 pb-1 text-base">
            FUNCTIONAL VERIFICATION & UVM TESTBENCH DASHBOARD
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-900/60 p-3 rounded border border-slate-800 text-center">
              <div className="text-slate-400 text-xs">Functional Coverage</div>
              <div className="text-emerald-400 font-bold font-mono text-xl">99.4%</div>
              <div className="text-[10px] text-slate-500">Cross-bins & transitions</div>
            </div>
            <div className="bg-slate-900/60 p-3 rounded border border-slate-800 text-center">
              <div className="text-slate-400 text-xs">Statement Coverage</div>
              <div className="text-emerald-400 font-bold font-mono text-xl">98.8%</div>
              <div className="text-[10px] text-slate-500">Line execution metric</div>
            </div>
            <div className="bg-slate-900/60 p-3 rounded border border-slate-800 text-center">
              <div className="text-slate-400 text-xs">Branch Coverage</div>
              <div className="text-cyan-400 font-bold font-mono text-xl">96.5%</div>
              <div className="text-[10px] text-slate-500">Decision paths tested</div>
            </div>
            <div className="bg-slate-900/60 p-3 rounded border border-slate-800 text-center">
              <div className="text-slate-400 text-xs">Concurrent SVA</div>
              <div className="text-purple-400 font-bold font-mono text-xl">96 Active</div>
              <div className="text-[10px] text-emerald-400">0 Violations Detected</div>
            </div>
          </div>

          <div className="bg-black/40 p-3 rounded border border-slate-800 space-y-2">
            <div className="text-cyan-300 font-mono font-bold text-xs">[UVM ENVIRONMENT ARCHITECTURE]</div>
            <div className="text-slate-300 text-xs font-mono space-y-1">
              <div>• <span className="text-amber-300">uvm_test_top</span>: Directs stimulus sequences and random seed control.</div>
              <div>• <span className="text-amber-300">axi_env</span>: Instantiates AXI Master Agent, Slave Agent, and Scoreboard.</div>
              <div>• <span className="text-amber-300">axi_sequencer & driver</span>: Generates constrained-random bursts (FIXED, INCR, WRAP).</div>
              <div>• <span className="text-amber-300">axi_monitor</span>: Passive observation on AXI channels, broadcasts via analysis ports.</div>
              <div>• <span className="text-amber-300">axi_scoreboard</span>: Golden predictor model, checks out-of-order response ordering.</div>
            </div>
          </div>
        </div>
      ),
    };
  },

  synthesis: () => {
    return {
      node: (
        <div className="space-y-3 my-2 text-xs md:text-sm font-mono">
          <div className="text-cyan-400 font-bold border-b border-cyan-500/30 pb-1 text-base">
            LOGIC SYNTHESIS REPORT (YOSYS / SYNOPSYS DC)
          </div>
          <div className="bg-black/60 p-4 rounded border border-slate-800 space-y-2 text-slate-300">
            <div className="text-slate-400">=== Synthesis Run Summary: Top Module 'spi_master' ===</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 py-2 border-y border-slate-800">
              <div><span className="text-slate-400">Target PDK:</span> <span className="text-cyan-300">sky130_fd_sc_hd</span></div>
              <div><span className="text-slate-400">Clock Target:</span> <span className="text-amber-300">150 MHz (6.66 ns)</span></div>
              <div><span className="text-slate-400">WNS (Setup):</span> <span className="text-emerald-400 font-bold">+0.42 ns (MET)</span></div>
              <div><span className="text-slate-400">Total Cells:</span> <span className="text-slate-100">18,450</span></div>
              <div><span className="text-slate-400">Sequential (DFF):</span> <span className="text-slate-100">2,140</span></div>
              <div><span className="text-slate-400">Combinational:</span> <span className="text-slate-100">16,310</span></div>
            </div>
            <div className="text-xs text-slate-400 pt-1">
              Area Breakdown: Core Area = 0.14 mm² | Total Cell Leakage = 14.2 µW | Dynamic Power @ 150MHz = 8.65 mW
            </div>
          </div>
        </div>
      ),
    };
  },

  sta: () => {
    return {
      node: (
        <div className="space-y-3 my-2 text-xs md:text-sm font-mono">
          <div className="text-emerald-400 font-bold border-b border-emerald-500/30 pb-1 text-base">
            STATIC TIMING ANALYSIS (STA) CRITICAL PATH REPORT
          </div>
          <div className="bg-black/60 p-4 rounded border border-slate-800 text-xs space-y-1 text-slate-300 whitespace-pre leading-relaxed">
{`Corner: Slow-Slow (SS) | Voltage: 1.60V | Temperature: 100°C
Target Clock: 'clk' (Period = 6.666 ns / 150.00 MHz)

Path: reg_id_ex/pc_reg -> alu_unit/adder_32/sum_reg
Type: Max Path (Setup)
--------------------------------------------------------------------------------
Pin                                       Incr       Path Delay
--------------------------------------------------------------------------------
clock clk (rise edge)                     0.0000     0.0000
clock network delay (propagated)          0.1240     0.1240
reg_id_ex/pc_reg_23/CLK (sky130_fd_sc_hd__dfxtp_1)
reg_id_ex/pc_reg_23/Q                     0.3420     0.4660 r
alu_unit/mux_operand_a/Y                  0.1850     0.6510 f
alu_unit/cla_adder_32/b_8_cla/G           1.8900     2.5410 r
alu_unit/cla_adder_32/sum_out_31          1.4200     3.9610 f
reg_ex_mem/alu_res_reg_31/D               0.1100     4.0710 f
--------------------------------------------------------------------------------
data arrival time                                    4.0710 ns

clock clk (rise edge)                     6.6660     6.6660
clock network delay (propagated)          0.0980     6.7640
clock uncertainty                        -0.2500     6.5140
library setup time (t_setup)             -0.0820     6.4320
--------------------------------------------------------------------------------
data required time                                   6.4320 ns
--------------------------------------------------------------------------------
slack (MET)                                         +2.3610 ns`}
          </div>
        </div>
      ),
    };
  },

  'physical-design': (_cmd) => {
    return {
      node: (
        <div className="space-y-3 my-2 text-xs md:text-sm">
          <div className="text-purple-400 font-bold border-b border-purple-500/30 pb-1 text-base">
            RTL-TO-GDSII PHYSICAL IMPLEMENTATION FLOW
          </div>
          <div className="bg-black/60 p-4 rounded border border-slate-800 font-mono text-xs whitespace-pre text-cyan-300 overflow-x-auto leading-relaxed">
            {ASCII_VLSI_PIPELINE}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-900/50 p-2.5 rounded border border-slate-800">
              <div className="text-amber-300 font-bold font-mono">Floorplanning</div>
              <div className="text-slate-400 text-xs">Die aspect ratio 1.0, 42.8% core utilization, PDN rings & stripes.</div>
            </div>
            <div className="bg-slate-900/50 p-2.5 rounded border border-slate-800">
              <div className="text-amber-300 font-bold font-mono">CTS & Routing</div>
              <div className="text-slate-400 text-xs">H-tree balance, max clock skew 74ps, 5 metal layer routing.</div>
            </div>
            <div className="bg-slate-900/50 p-2.5 rounded border border-slate-800">
              <div className="text-amber-300 font-bold font-mono">Signoff</div>
              <div className="text-slate-400 text-xs">Magic DRC 0 clean, Netgen LVS 100% matched, GDSII tapeout ready.</div>
            </div>
          </div>
        </div>
      ),
    };
  },

  floorplan: () => {
    return {
      node: (
        <div className="space-y-3 my-2 text-xs md:text-sm font-mono">
          <div className="text-cyan-400 font-bold border-b border-cyan-500/30 pb-1 text-base">
            FLOORPLANNING SPECIFICATION (SKY130A)
          </div>
          <div className="bg-black/60 p-4 rounded border border-slate-800 space-y-2 text-slate-300">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div><span className="text-slate-400">Die Dimensions:</span> <span className="text-emerald-400">1000 µm x 1000 µm</span></div>
              <div><span className="text-slate-400">Core Dimensions:</span> <span className="text-emerald-400">850 µm x 850 µm</span></div>
              <div><span className="text-slate-400">Core Utilization:</span> <span className="text-amber-300">42.8%</span></div>
              <div><span className="text-slate-400">Aspect Ratio:</span> <span className="text-slate-200">1.0 (Square)</span></div>
              <div><span className="text-slate-400">Core Margins:</span> <span className="text-slate-200">75 µm on all 4 boundaries</span></div>
              <div><span className="text-slate-400">Power Grid (PDN):</span> <span className="text-cyan-300">VDD/VSS on met4 & met5</span></div>
            </div>
            <div className="border-t border-slate-800 pt-2 text-xs text-slate-400">
              I/O Pins placed equidistantly around core perimeter with 2.5 µm pitch to minimize routing congestion.
            </div>
          </div>
        </div>
      ),
    };
  },

  placement: () => {
    return {
      node: (
        <div className="space-y-3 my-2 text-xs md:text-sm font-mono">
          <div className="text-yellow-400 font-bold border-b border-yellow-500/30 pb-1 text-base">
            STANDARD CELL PLACEMENT METRICS (OPENROAD)
          </div>
          <div className="bg-black/60 p-4 rounded border border-slate-800 space-y-2 text-slate-300">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div><span className="text-slate-400">Placed Instances:</span> <span className="text-slate-100">18,450 cells</span></div>
              <div><span className="text-slate-400">Total Wirelength:</span> <span className="text-cyan-300">142,500 µm</span></div>
              <div><span className="text-slate-400">Target Density:</span> <span className="text-emerald-400">0.55</span></div>
              <div><span className="text-slate-400">Overflow Metric:</span> <span className="text-emerald-400">0.00% (No Congestion)</span></div>
              <div><span className="text-slate-400">Filler Insertion:</span> <span className="text-slate-200">Complete (sky130_fd_sc_hd__fill)</span></div>
              <div><span className="text-slate-400">Timing Driven:</span> <span className="text-emerald-400">Enabled</span></div>
            </div>
          </div>
        </div>
      ),
    };
  },

  routing: () => {
    return {
      node: (
        <div className="space-y-3 my-2 text-xs md:text-sm font-mono">
          <div className="text-purple-400 font-bold border-b border-purple-500/30 pb-1 text-base">
            GLOBAL & DETAILED ROUTING (FASTROUTE & TRITONROUTE)
          </div>
          <div className="bg-black/60 p-4 rounded border border-slate-800 space-y-2 text-slate-300">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div><span className="text-slate-400">Metal Layers:</span> <span className="text-cyan-300">5 (li1, met1..met4)</span></div>
              <div><span className="text-slate-400">Total Vias:</span> <span className="text-slate-100">38,912</span></div>
              <div><span className="text-slate-400">DRC Violations:</span> <span className="text-emerald-400 font-bold">0 Clean</span></div>
              <div><span className="text-slate-400">Antenna Violations:</span> <span className="text-emerald-400 font-bold">0 Clean</span></div>
              <div><span className="text-slate-400">Shorts / Opens:</span> <span className="text-emerald-400 font-bold">0 / 0</span></div>
              <div><span className="text-slate-400">Routing Guide Match:</span> <span className="text-emerald-400">100%</span></div>
            </div>
          </div>
        </div>
      ),
    };
  },

  gds: () => {
    return {
      node: (
        <div className="space-y-3 my-2 text-xs md:text-sm font-mono">
          <div className="text-emerald-400 font-bold border-b border-emerald-500/30 pb-1 text-base">
            GDSII / OASIS BINARY LAYOUT & TAPEOUT SIGNOFF
          </div>
          <div className="bg-black/60 p-4 rounded border border-slate-800 space-y-2 text-slate-300">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div><span className="text-slate-400">Stream File:</span> <span className="text-amber-300">sky130_soc_tapeout.gds</span></div>
              <div><span className="text-slate-400">Format:</span> <span className="text-slate-100">GDSII Stream Format (v6.0)</span></div>
              <div><span className="text-slate-400">File Size:</span> <span className="text-cyan-300">48.2 MB</span></div>
              <div><span className="text-slate-400">Magic DRC Check:</span> <span className="text-emerald-400 font-bold">PASSED (0 Errors)</span></div>
              <div><span className="text-slate-400">Netgen LVS Check:</span> <span className="text-emerald-400 font-bold">PASSED (Netlists Match)</span></div>
              <div><span className="text-slate-400">Foundry Signoff:</span> <span className="text-emerald-400 font-bold">READY FOR FABRICATION</span></div>
            </div>
          </div>
        </div>
      ),
    };
  },

  tools: () => {
    return {
      node: (
        <div className="space-y-3 my-2 text-xs md:text-sm">
          <div className="text-cyan-400 font-bold border-b border-cyan-500/30 pb-1 text-base">
            ELECTRONIC DESIGN AUTOMATION (EDA) TOOLCHAIN
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PORTFOLIO_DATA.edaToolsList.map(t => (
              <div key={t.name} className="bg-slate-900/50 p-3 rounded border border-slate-800 space-y-1">
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-amber-300 font-bold">{t.name}</span>
                  <span className="text-slate-400 text-xs">v{t.version}</span>
                </div>
                <div className="text-purple-300 font-mono text-xs">{t.category} ({t.license})</div>
                <p className="text-slate-300 text-xs leading-relaxed">{t.description}</p>
                <div className="bg-black/50 p-1.5 rounded font-mono text-[11px] text-cyan-300 truncate">
                  $ {t.command}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    };
  },

  logo: () => {
    return {
      node: (
        <div className="my-2 text-cyan-400 font-mono whitespace-pre text-xs select-none">
          {ASCII_ARKA_LOGO}
        </div>
      ),
    };
  },

  die: () => {
    return {
      node: (
        <div className="my-2 text-cyan-300 font-mono whitespace-pre text-xs select-none overflow-x-auto">
          {ASCII_SILICON_DIE}
        </div>
      ),
    };
  },

  gates: () => {
    return {
      node: (
        <div className="my-2 text-emerald-300 font-mono whitespace-pre text-xs select-none overflow-x-auto">
          {ASCII_LOGIC_GATES}
        </div>
      ),
    };
  },

  fsm: () => {
    return {
      node: (
        <div className="my-2 text-purple-300 font-mono whitespace-pre text-xs select-none overflow-x-auto">
          {ASCII_FSM_DIAGRAM}
        </div>
      ),
    };
  },

  nano: (cmd, ctx) => {
    const rawArg = cmd.args[0] || 'new_design.v';
    const resolvedPath = ctx.fs.resolvePath(rawArg, ctx.cwd);

    const isProtected =
      resolvedPath.includes('/home/arka/projects/') ||
      resolvedPath.includes('/home/arka/README.md') ||
      resolvedPath.includes('/home/arka/about.txt') ||
      resolvedPath.includes('/home/arka/skills.txt') ||
      resolvedPath.includes('/home/arka/experience.txt') ||
      resolvedPath.includes('/home/arka/education.txt') ||
      resolvedPath.includes('/home/arka/certifications.txt') ||
      resolvedPath.includes('/home/arka/contact.txt') ||
      resolvedPath.includes('/home/arka/achievements.txt') ||
      resolvedPath.startsWith('/etc') ||
      resolvedPath.startsWith('/var');

    if (isProtected) {
      return {
        text: `nano: Permission denied: '${rawArg}' is a protected portfolio document.\nSystem documents are view-only and cannot be modified or overwritten.`,
        isError: true,
      };
    }

    const existingContent = ctx.fs.readFile(resolvedPath) || '';

    return {
      node: (
        <TerminalEditor
          editorType="nano"
          filename={rawArg}
          initialContent={existingContent}
          fs={ctx.fs}
          cwd={ctx.cwd}
        />
      ),
    };
  },

  vim: (cmd, ctx) => {
    const rawArg = cmd.args[0] || 'new_design.v';
    const resolvedPath = ctx.fs.resolvePath(rawArg, ctx.cwd);

    const isProtected =
      resolvedPath.includes('/home/arka/projects/') ||
      resolvedPath.includes('/home/arka/README.md') ||
      resolvedPath.includes('/home/arka/about.txt') ||
      resolvedPath.includes('/home/arka/skills.txt') ||
      resolvedPath.includes('/home/arka/experience.txt') ||
      resolvedPath.includes('/home/arka/education.txt') ||
      resolvedPath.includes('/home/arka/certifications.txt') ||
      resolvedPath.includes('/home/arka/contact.txt') ||
      resolvedPath.includes('/home/arka/achievements.txt') ||
      resolvedPath.startsWith('/etc') ||
      resolvedPath.startsWith('/var');

    if (isProtected) {
      return {
        text: `vim: Permission denied: '${rawArg}' is a protected portfolio document.\nSystem documents are view-only and cannot be modified or overwritten.`,
        isError: true,
      };
    }

    const existingContent = ctx.fs.readFile(resolvedPath) || '';

    return {
      node: (
        <TerminalEditor
          editorType="vim"
          filename={rawArg}
          initialContent={existingContent}
          fs={ctx.fs}
          cwd={ctx.cwd}
        />
      ),
    };
  },

  cowsay: (cmd) => {
    const text = cmd.args.join(' ') || 'From RTL to GDSII — Welcome to ARKA OS!';
    const len = Math.max(text.length, 12);
    const border = '-'.repeat(len + 2);

    let eyes = 'oo';
    let tongue = '  ';
    if (cmd.flags['d']) eyes = 'xx';
    else if (cmd.flags['b']) eyes = '==';
    else if (cmd.flags['g']) eyes = '$$';
    else if (cmd.flags['p']) eyes = '@@';
    else if (cmd.flags['w']) eyes = 'OO';
    else if (cmd.flags['t']) {
      eyes = '--';
      tongue = 'U ';
    }

    const cow = `
 ${'_'.repeat(len + 2)}
< ${text} >
 ${border}
        \\   ^__^
         \\  (${eyes})\\_______
            (__)\\       )\\/\\
             ${tongue} ||----w |
                ||     ||
    `.trim();

    return {
      node: (
        <div className="my-2 font-ubuntu-mono text-amber-300 text-xs whitespace-pre select-none">
          {cow}
        </div>
      ),
    };
  },

  tour: () => {
    window.dispatchEvent(new CustomEvent('open-ubuntu-tour'));
    return {
      text: 'Opening "Welcome to Ubuntu" setup & tour guide wizard...',
    };
  },

  github: () => {
    window.open('https://github.com/arkasnatapal', '_blank');
    return {
      text: 'Opening GitHub profile: https://github.com/arkasnatapal',
    };
  },

  linkedin: () => {
    window.open('https://linkedin.com/in/arkasnata-pal-6a3682276', '_blank');
    return {
      text: 'Opening LinkedIn profile: https://linkedin.com/in/arkasnata-pal-6a3682276',
    };
  },
};

// Aliases for user convenience and authentic shell behavior
COMMAND_REGISTRY['ll'] = (cmd, ctx) => COMMAND_REGISTRY['ls']({ ...cmd, flags: { ...cmd.flags, l: true } }, ctx);
COMMAND_REGISTRY['la'] = (cmd, ctx) => COMMAND_REGISTRY['ls']({ ...cmd, flags: { ...cmd.flags, la: true } }, ctx);
COMMAND_REGISTRY['cls'] = COMMAND_REGISTRY['clear'];
COMMAND_REGISTRY['dir'] = COMMAND_REGISTRY['ls'];
COMMAND_REGISTRY['naano'] = COMMAND_REGISTRY['nano'];
COMMAND_REGISTRY['vi'] = COMMAND_REGISTRY['vim'];
COMMAND_REGISTRY['gvim'] = COMMAND_REGISTRY['vim'];
COMMAND_REGISTRY['jivhim'] = COMMAND_REGISTRY['vim'];
COMMAND_REGISTRY['gedit'] = COMMAND_REGISTRY['nano'];
COMMAND_REGISTRY['welcome'] = COMMAND_REGISTRY['tour'];
COMMAND_REGISTRY['reboot'] = COMMAND_REGISTRY['exit'];
COMMAND_REGISTRY['logout'] = COMMAND_REGISTRY['exit'];
COMMAND_REGISTRY['shutdown'] = COMMAND_REGISTRY['exit'];
