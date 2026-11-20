/**
 * ARKA OS — Virtual Linux Filesystem (VFS)
 * 
 * Simulated hierarchical filesystem supporting realistic POSIX paths,
 * directory traversal, metadata, file reading, tree generation, and path auto-completion.
 */

import { PORTFOLIO_DATA } from '../config/portfolioData';
import { ASCII_SILICON_DIE } from '../utils/asciiArt';
import { ALL_CODE_FILES } from '../codes/codeRegistry';

export interface FSNode {
  name: string;
  type: 'file' | 'dir';
  permissions: string;
  owner: string;
  group: string;
  size: number;
  modified: string;
  content?: string;
  children?: Record<string, FSNode>;
}

// Generate the virtual filesystem hierarchy
function buildInitialFilesystem(): FSNode {
  const modDate = "Nov 19 12:00";
  const sysDate = "Nov 15 09:30";

  // Content generators for portfolio files
  const readmeContent = `# ARKA OS — Digital VLSI Workstation
Host: ${PORTFOLIO_DATA.engineer.hostname}
Engineer: ${PORTFOLIO_DATA.engineer.fullName}
Tagline: ${PORTFOLIO_DATA.engineer.tagline}

Welcome to my personal Linux engineering workstation.
This environment documents my background, designs, verification suites, and physical implementation flows.

Quick Start:
  - Run 'help' for a full list of commands.
  - Run 'neofetch' for system and VLSI specifications.
  - Run 'about', 'skills', 'experience', 'projects', or 'education'.
  - Run 'rtl --list', 'verification --show', 'synthesis --report', 'sta --report', or 'physical-design --flow'.
  - Navigate directories using 'cd', 'ls -la', 'cat', and 'tree'.
`;

  const aboutContent = `================================================================================
                    ENGINEER PROFILE: ${PORTFOLIO_DATA.engineer.fullName.toUpperCase()}
================================================================================
Title:          ${PORTFOLIO_DATA.engineer.title}
Specialization: ${PORTFOLIO_DATA.engineer.specialization}
Location:       ${PORTFOLIO_DATA.engineer.location}
Phone:          ${PORTFOLIO_DATA.engineer.phone}
Email:          ${PORTFOLIO_DATA.engineer.email}
GitHub:         ${PORTFOLIO_DATA.engineer.github}
LinkedIn:       ${PORTFOLIO_DATA.engineer.linkedin}

SUMMARY:
${PORTFOLIO_DATA.engineer.summary}

PRIMARY FOCUS AREAS:
  1. Verilog HDL Synthesizable Modeling & RTL Microarchitecture
  2. Multi-Mode Parameterized SPI Master Controller (All 4 SPI Modes)
  3. UART Serial Transceiver (9600 Baud, Dedicated Baud Generator)
  4. PWM Generator with Dynamic Push-Button Duty Cycle Control & Debouncer
  5. Synchronous FIFO Architecture (Read/Write Pointer Logic & Flags)
  6. FPGA Design & Verification Flow with Xilinx Vivado, Icarus Verilog, GTKWave
`;

  const skillsContent = `================================================================================
                    TECHNICAL SKILLS & HARDWARE EXPERTISE
================================================================================

[1] HARDWARE DESCRIPTION LANGUAGES (HDL/HVL)
${PORTFOLIO_DATA.skills.hardwareDescriptionLanguages.map(s => `  * ${s.name.padEnd(26)} [${s.level.padEnd(12)}] :: ${s.usage}`).join('\n')}

[2] VERIFICATION METHODOLOGY & ASSERTIONS
${PORTFOLIO_DATA.skills.verification.map(s => `  * ${s.name.padEnd(26)} [${s.level.padEnd(12)}] :: ${s.usage}`).join('\n')}

[3] COMPUTER ARCHITECTURE & PROTOCOLS
${PORTFOLIO_DATA.skills.architectureAndProtocols.map(s => `  * ${s.name.padEnd(26)} [${s.level.padEnd(12)}] :: ${s.usage}`).join('\n')}

[4] ELECTRONIC DESIGN AUTOMATION (EDA) TOOLS
${PORTFOLIO_DATA.skills.edaTools.map(s => `  * ${s.name.padEnd(26)} [${s.category.padEnd(16)}] :: ${s.usage}`).join('\n')}

[5] SCRIPTING, AUTOMATION & TOOLCHAINS
${PORTFOLIO_DATA.skills.scriptingAndAutomation.map(s => `  * ${s.name.padEnd(26)} [${s.level.padEnd(12)}] :: ${s.usage}`).join('\n')}
`;

  const experienceContent = `================================================================================
                           PROFESSIONAL EXPERIENCE
================================================================================
${PORTFOLIO_DATA.experience.map(exp => `
ROLE:         ${exp.role}
ORGANIZATION: ${exp.organization}
PERIOD:       ${exp.period} | LOCATION: ${exp.location}
HIGHLIGHTS:
${exp.highlights.map(h => `  • ${h}`).join('\n')}
--------------------------------------------------------------------------------`).join('')}
`;

  const educationContent = `================================================================================
                           EDUCATION & ACADEMICS
================================================================================
${PORTFOLIO_DATA.education.map(edu => `
DEGREE:      ${edu.degree}
INSTITUTION: ${edu.institution}
PERIOD:      ${edu.period}
SCORE:       ${edu.score}

KEY COURSEWORK:
${edu.coursework.map(c => `  - ${c}`).join('\n')}
`).join('')}
`;

  const certificationsContent = `================================================================================
                        CERTIFICATIONS & CREDENTIALS
================================================================================
${PORTFOLIO_DATA.certifications.map(c => `
NAME:          ${c.name}
ISSUER:        ${c.issuer}
DATE ISSUED:   ${c.date}
CREDENTIAL ID: ${c.credentialId}
--------------------------------------------------------------------------------`).join('')}
`;

  const contactContent = `================================================================================
                              CONTACT CHANNELS
================================================================================
Direct Email:   ${PORTFOLIO_DATA.engineer.email}
GitHub:         ${PORTFOLIO_DATA.engineer.github}
LinkedIn:       ${PORTFOLIO_DATA.engineer.linkedin}
Workstation IP: 192.168.1.104 (Subnet 255.255.255.0)
SSH Terminal:   ssh arka@vlsi-workstation.local
Open for:       Full-Time VLSI Positions, ASIC Design Consulting & Collaborations
`;

  const resumeText = `================================================================================
                     CURRICULUM VITAE — ARKASNATA PAL
================================================================================
+91-8250495806 | arka4551@gmail.com | github.com/arkasnatapal | linkedin.com/in/arkasnata-pal-6a3682276

EDUCATION
• Jalpaiguri Government Engineering College
  Bachelor of Technology (B.Tech) in Electronics and Communication Engineering (2024 - 2028)
  SGPA: 8.14

• HemSheela Model School, Durgapur
  Class 12 (CBSE Board) 2024 — Percentage: 93%

• St. Xavier’s School, Durgapur
  Class 10 (ICSE Board) 2022 — Percentage: 95%

TECHNICAL SKILLS
• Hardware Description Languages: Verilog HDL
• Programming Languages: C, C++, Python
• Core Subjects: Digital Electronics, Logic Design, Electronic Devices, Signals and Systems
• Tools: Xilinx Vivado, Icarus Verilog, GTKWave

PROJECTS
1. Multi-Mode Parameterized SPI Master Controller | Verilog, Xilinx Vivado
   - Designed a fully parameterized SPI Master IP in Verilog supporting variable word lengths and runtime-configurable clock division.
   - Engineered dynamic edge-transition logic supporting all 4 SPI modes via runtime CPOL and CPHA configuration matrix.
   - Developed an FSM gating the clock divider strictly within active transfer windows to ensure clean, deterministic timing.
   - Implemented integrated bidirectional shift registers to execute synchronized, full-duplex serial-to-parallel data conversion.
   - Verified protocol compliance, state transitions, and data bus integrity across all mode configurations via Vivado simulation.

2. UART Transmitter and Receiver using Verilog | Verilog HDL, Xilinx Vivado
   - Designed and implemented UART Transmitter and Receiver modules in Verilog HDL for asynchronous serial communication.
   - Configured communication at 9600 baud rate using a dedicated baud rate generator.
   - Developed FSM-based control logic for serial data transmission and reception.
   - Verified correct data transfer and protocol functionality through simulation in Xilinx Vivado.

3. PWM Generator with Variable Duty Cycle Control | Verilog HDL, Xilinx Vivado
   - Designed a PWM generator in Verilog HDL with dynamically adjustable duty cycle.
   - Implemented increase and decrease push-button controls for real-time duty cycle modification.
   - Integrated debouncing logic to eliminate false triggering caused by mechanical switch bounce.
   - Verified PWM waveform generation and duty cycle variations through simulation in Xilinx Vivado.

4. Synchronous FIFO Design using Verilog | Verilog, Xilinx Vivado
   - Designed a parameterized synchronous FIFO architecture for temporary data storage and transfer.
   - Implemented read/write pointer logic along with full and empty flag generation.
   - Verified FIFO operation under different read and write conditions through simulation.
   - Analyzed waveform results to validate functionality and timing behavior.

ACHIEVEMENTS
• Finalist – Smart India Hackathon 2024 (SIH 2024)
• Completed NPTEL Course: Digital Design Using Verilog (IIT Guwahati) with Elite Certification

RELEVANT COURSEWORK
Digital Electronics | RTL to GDSII Flow

AREAS OF INTEREST
Digital VLSI Design | RTL Design and Verification | FPGA Development | Analog VLSI design

[Type 'resume' or open Resume.pdf on the desktop to inspect the full document]
`;

  // Root directory structure
  const root: FSNode = {
    name: '/',
    type: 'dir',
    permissions: 'drwxr-xr-x',
    owner: 'root',
    group: 'root',
    size: 4096,
    modified: sysDate,
    children: {
      bin: {
        name: 'bin',
        type: 'dir',
        permissions: 'drwxr-xr-x',
        owner: 'root',
        group: 'root',
        size: 4096,
        modified: sysDate,
        children: {
          sh: { name: 'sh', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 125400, modified: sysDate },
          bash: { name: 'bash', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 1396520, modified: sysDate },
          yosys: { name: 'yosys', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 3450912, modified: sysDate },
          openroad: { name: 'openroad', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 8912400, modified: sysDate },
          sta: { name: 'sta', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 2100450, modified: sysDate },
          verilator: { name: 'verilator', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 4210098, modified: sysDate },
          gtkwave: { name: 'gtkwave', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', size: 1540900, modified: sysDate },
        },
      },
      etc: {
        name: 'etc',
        type: 'dir',
        permissions: 'drwxr-xr-x',
        owner: 'root',
        group: 'root',
        size: 4096,
        modified: sysDate,
        children: {
          'hostname': {
            name: 'hostname',
            type: 'file',
            permissions: '-rw-r--r--',
            owner: 'root',
            group: 'root',
            size: 16,
            modified: sysDate,
            content: `${PORTFOLIO_DATA.engineer.hostname}\n`,
          },
          'os-release': {
            name: 'os-release',
            type: 'file',
            permissions: '-rw-r--r--',
            owner: 'root',
            group: 'root',
            size: 280,
            modified: sysDate,
            content: `NAME="ARKA OS"\nVERSION="6.0 LTS (VLSI Workstation Edition)"\nID=arka\nID_LIKE=ubuntu\nPRETTY_NAME="ARKA OS 6.0 LTS (GNU/Linux)"\nVERSION_ID="6.0"\nHOME_URL="https://arka-vlsi.dev"\n`,
          },
        },
      },
      var: {
        name: 'var',
        type: 'dir',
        permissions: 'drwxr-xr-x',
        owner: 'root',
        group: 'root',
        size: 4096,
        modified: sysDate,
        children: {
          log: {
            name: 'log',
            type: 'dir',
            permissions: 'drwxr-xr-x',
            owner: 'root',
            group: 'root',
            size: 4096,
            modified: sysDate,
            children: {
              'boot.log': {
                name: 'boot.log',
                type: 'file',
                permissions: '-rw-r--r--',
                owner: 'root',
                group: 'root',
                size: 4096,
                modified: sysDate,
                content: `[  OK  ] Started System Logging Service.\n[  OK  ] Mounted /home Virtual Filesystem.\n[  OK  ] Started VLSI Workstation Terminal Subsystem.\n[  OK  ] Loaded Xilinx Vivado & Verilog HDL Toolchain Libraries.\n`,
              },
              'dmesg': {
                name: 'dmesg',
                type: 'file',
                permissions: '-rw-r--r--',
                owner: 'root',
                group: 'root',
                size: 8192,
                modified: sysDate,
                content: `Linux version 6.8.0-45-generic-vlsi-rt (buildd@vlsi-workstation) (gcc version 13.2.0)\nCommand line: BOOT_IMAGE=/vmlinuz-6.8.0 root=UUID=arka-vlsi ro quiet splash\nx86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'\nx86/fpu: Enabled xstate features 0x2e7, context size 2696 bytes\nMemory: 131845120K/134217728K available (16384K kernel code, 3216K rwdata)\n`,
              },
            },
          },
        },
      },
      home: {
        name: 'home',
        type: 'dir',
        permissions: 'drwxr-xr-x',
        owner: 'root',
        group: 'root',
        size: 4096,
        modified: sysDate,
        children: {
          arka: {
            name: 'arka',
            type: 'dir',
            permissions: 'drwxr-xr-x',
            owner: 'arka',
            group: 'arka',
            size: 4096,
            modified: modDate,
            children: {
              Desktop: {
                name: 'Desktop',
                type: 'dir',
                permissions: 'drwxr-xr-x',
                owner: 'arka',
                group: 'arka',
                size: 4096,
                modified: modDate,
                children: {
                  'README.md': {
                    name: 'README.md',
                    type: 'file',
                    permissions: '-rw-r--r--',
                    owner: 'arka',
                    group: 'arka',
                    size: readmeContent.length,
                    modified: modDate,
                    content: readmeContent,
                  },
                  'Resume.pdf': {
                    name: 'Resume.pdf',
                    type: 'file',
                    permissions: '-rw-r--r--',
                    owner: 'arka',
                    group: 'arka',
                    size: 121647,
                    modified: modDate,
                    content: '[PDF Document: Arkasnata Pal Resume - Click to view in Document Viewer]',
                  },
                  'spi_master.v': {
                    name: 'spi_master.v',
                    type: 'file',
                    permissions: '-rw-r--r--',
                    owner: 'arka',
                    group: 'arka',
                    size: 4850,
                    modified: modDate,
                    content: `// Multi-Mode Parameterized SPI Master Controller (Verilog HDL)
// Supports all 4 SPI Modes (CPOL 0/1, CPHA 0/1), Runtime Clock Division & Full-Duplex Transfer
module spi_master #(
    parameter DATA_WIDTH = 8,
    parameter CLK_DIV    = 4
)(
    input  wire                  clk,
    input  wire                  rst_n,
    input  wire                  cpol,
    input  wire                  cpha,
    input  wire [DATA_WIDTH-1:0] tx_data,
    input  wire                  start_tx,
    output reg  [DATA_WIDTH-1:0] rx_data,
    output reg                   busy,
    output reg                   done,
    output reg                   sclk,
    output reg                   mosi,
    input  wire                  miso,
    output reg                   cs_n
);
    // FSM States: IDLE, LOAD, TRANSFER, FINISH
    // Clock divider gating strictly within active transfer window
    // Bidirectional shift registers for full-duplex transmission
endmodule\n`,
                  },
                  'about.txt': {
                    name: 'about.txt',
                    type: 'file',
                    permissions: '-rw-r--r--',
                    owner: 'arka',
                    group: 'arka',
                    size: aboutContent.length,
                    modified: modDate,
                    content: aboutContent,
                  },
                },
              },
              Documents: {
                name: 'Documents',
                type: 'dir',
                permissions: 'drwxr-xr-x',
                owner: 'arka',
                group: 'arka',
                size: 4096,
                modified: modDate,
                children: {
                  'certifications.txt': {
                    name: 'certifications.txt',
                    type: 'file',
                    permissions: '-rw-r--r--',
                    owner: 'arka',
                    group: 'arka',
                    size: certificationsContent.length,
                    modified: modDate,
                    content: certificationsContent,
                  },
                  'education.txt': {
                    name: 'education.txt',
                    type: 'file',
                    permissions: '-rw-r--r--',
                    owner: 'arka',
                    group: 'arka',
                    size: educationContent.length,
                    modified: modDate,
                    content: educationContent,
                  },
                },
              },
              Downloads: {
                name: 'Downloads',
                type: 'dir',
                permissions: 'drwxr-xr-x',
                owner: 'arka',
                group: 'arka',
                size: 4096,
                modified: modDate,
                children: {
                  'resume.pdf': {
                    name: 'resume.pdf',
                    type: 'file',
                    permissions: '-rw-r--r--',
                    owner: 'arka',
                    group: 'arka',
                    size: resumeText.length,
                    modified: modDate,
                    content: resumeText,
                  },
                },
              },
              Pictures: {
                name: 'Pictures',
                type: 'dir',
                permissions: 'drwxr-xr-x',
                owner: 'arka',
                group: 'arka',
                size: 4096,
                modified: modDate,
                children: {
                  'silicon_die_diagram.txt': {
                    name: 'silicon_die_diagram.txt',
                    type: 'file',
                    permissions: '-rw-r--r--',
                    owner: 'arka',
                    group: 'arka',
                    size: ASCII_SILICON_DIE.length,
                    modified: modDate,
                    content: ASCII_SILICON_DIE,
                  },
                },
              },
              Music: {
                name: 'Music',
                type: 'dir',
                permissions: 'drwxr-xr-x',
                owner: 'arka',
                group: 'arka',
                size: 4096,
                modified: modDate,
                children: {},
              },
              Videos: {
                name: 'Videos',
                type: 'dir',
                permissions: 'drwxr-xr-x',
                owner: 'arka',
                group: 'arka',
                size: 4096,
                modified: modDate,
                children: {},
              },
              'README.md': {
                name: 'README.md',
                type: 'file',
                permissions: '-rw-r--r--',
                owner: 'arka',
                group: 'arka',
                size: readmeContent.length,
                modified: modDate,
                content: readmeContent,
              },
              'about.txt': {
                name: 'about.txt',
                type: 'file',
                permissions: '-rw-r--r--',
                owner: 'arka',
                group: 'arka',
                size: aboutContent.length,
                modified: modDate,
                content: aboutContent,
              },
              'skills.txt': {
                name: 'skills.txt',
                type: 'file',
                permissions: '-rw-r--r--',
                owner: 'arka',
                group: 'arka',
                size: skillsContent.length,
                modified: modDate,
                content: skillsContent,
              },
              'experience.txt': {
                name: 'experience.txt',
                type: 'file',
                permissions: '-rw-r--r--',
                owner: 'arka',
                group: 'arka',
                size: experienceContent.length,
                modified: modDate,
                content: experienceContent,
              },
              'education.txt': {
                name: 'education.txt',
                type: 'file',
                permissions: '-rw-r--r--',
                owner: 'arka',
                group: 'arka',
                size: educationContent.length,
                modified: modDate,
                content: educationContent,
              },
              'certifications.txt': {
                name: 'certifications.txt',
                type: 'file',
                permissions: '-rw-r--r--',
                owner: 'arka',
                group: 'arka',
                size: certificationsContent.length,
                modified: modDate,
                content: certificationsContent,
              },
              'resume.pdf': {
                name: 'resume.pdf',
                type: 'file',
                permissions: '-rw-r--r--',
                owner: 'arka',
                group: 'arka',
                size: resumeText.length,
                modified: modDate,
                content: resumeText,
              },
              codes: {
                name: 'codes',
                type: 'dir',
                permissions: 'drwxr-xr-x',
                owner: 'arka',
                group: 'arka',
                size: 4096,
                modified: modDate,
                children: {
                  PWM: {
                    name: 'PWM',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: Object.fromEntries(
                      ALL_CODE_FILES.filter(f => f.folder === 'PWM').map(f => [
                        f.name,
                        {
                          name: f.name,
                          type: 'file',
                          permissions: '-r--r--r--',
                          owner: 'arka',
                          group: 'arka',
                          size: f.size,
                          modified: modDate,
                          content: f.content,
                        },
                      ])
                    ),
                  },
                  SPI: {
                    name: 'SPI',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: Object.fromEntries(
                      ALL_CODE_FILES.filter(f => f.folder === 'SPI').map(f => [
                        f.name,
                        {
                          name: f.name,
                          type: 'file',
                          permissions: '-r--r--r--',
                          owner: 'arka',
                          group: 'arka',
                          size: f.size,
                          modified: modDate,
                          content: f.content,
                        },
                      ])
                    ),
                  },
                  UART: {
                    name: 'UART',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: Object.fromEntries(
                      ALL_CODE_FILES.filter(f => f.folder === 'UART').map(f => [
                        f.name,
                        {
                          name: f.name,
                          type: 'file',
                          permissions: '-r--r--r--',
                          owner: 'arka',
                          group: 'arka',
                          size: f.size,
                          modified: modDate,
                          content: f.content,
                        },
                      ])
                    ),
                  },
                  projects: {
                    name: 'projects',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: {
                      '8bit ALU': {
                        name: '8bit ALU',
                        type: 'dir',
                        permissions: 'drwxr-xr-x',
                        owner: 'arka',
                        group: 'arka',
                        size: 4096,
                        modified: modDate,
                        children: Object.fromEntries(
                          ALL_CODE_FILES.filter(f => f.folder === 'projects/8bit ALU').map(f => [
                            f.name,
                            {
                              name: f.name,
                              type: 'file',
                              permissions: '-r--r--r--',
                              owner: 'arka',
                              group: 'arka',
                              size: f.size,
                              modified: modDate,
                              content: f.content,
                            },
                          ])
                        ),
                      },
                      Traffic_Controller: {
                        name: 'Traffic_Controller',
                        type: 'dir',
                        permissions: 'drwxr-xr-x',
                        owner: 'arka',
                        group: 'arka',
                        size: 4096,
                        modified: modDate,
                        children: Object.fromEntries(
                          ALL_CODE_FILES.filter(f => f.folder === 'projects/Traffic_Controller').map(f => [
                            f.name,
                            {
                              name: f.name,
                              type: 'file',
                              permissions: '-r--r--r--',
                              owner: 'arka',
                              group: 'arka',
                              size: f.size,
                              modified: modDate,
                              content: f.content,
                            },
                          ])
                        ),
                      },
                    },
                  },
                },
              },
              projects: {
                name: 'projects',
                type: 'dir',
                permissions: 'drwxr-xr-x',
                owner: 'arka',
                group: 'arka',
                size: 4096,
                modified: modDate,
                children: {
                  rtl: {
                    name: 'rtl',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: {
                      'README.txt': {
                        name: 'README.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 380,
                        modified: modDate,
                        content: `RTL DESIGN REPOSITORY\nContains synthesizable Verilog HDL designs by Arkasnata Pal:\n1. Multi-Mode Parameterized SPI Master Controller (All 4 SPI Modes)\n2. UART Transmitter and Receiver at 9600 Baud\n3. PWM Generator with Dynamic Duty Cycle Control\n4. Synchronous FIFO Design with Flag Generation\nVerified in Xilinx Vivado and GTKWave.\n`,
                      },
                      'spi_master.v': {
                        name: 'spi_master.v',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 5120,
                        modified: modDate,
                        content: `// Multi-Mode Parameterized SPI Master Controller
// Designed and verified in Xilinx Vivado by Arkasnata Pal
module spi_master #(
    parameter DATA_WIDTH = 8,
    parameter CLK_DIV    = 4
)(
    input  wire                  clk,
    input  wire                  rst_n,
    input  wire                  cpol,
    input  wire                  cpha,
    input  wire [DATA_WIDTH-1:0] tx_data,
    input  wire                  start_tx,
    output reg  [DATA_WIDTH-1:0] rx_data,
    output reg                   busy,
    output reg                   done,
    output reg                   sclk,
    output reg                   mosi,
    input  wire                  miso,
    output reg                   cs_n
);
    // Gated clock divider & edge-transition logic supporting modes 0, 1, 2, 3
endmodule\n`,
                      },
                      'uart_tx_rx.v': {
                        name: 'uart_tx_rx.v',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 6840,
                        modified: modDate,
                        content: `// UART Transmitter and Receiver Top with 9600 Baud Generator
// Designed and simulated in Xilinx Vivado by Arkasnata Pal
module uart_top #(
    parameter CLK_FREQ  = 50000000,
    parameter BAUD_RATE = 9600
)(
    input  wire       clk,
    input  wire       rst_n,
    input  wire [7:0] tx_byte,
    input  wire       tx_start,
    output wire       tx_busy,
    output wire       tx_pin,
    input  wire       rx_pin,
    output wire [7:0] rx_byte,
    output wire       rx_ready
);
    // Dedicated baud rate generator & FSM-based serial communication
endmodule\n`,
                      },
                      'pwm_generator.v': {
                        name: 'pwm_generator.v',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 4320,
                        modified: modDate,
                        content: `// PWM Generator with Variable Duty Cycle Control & Push-Button Debouncing
// Designed and verified in Xilinx Vivado by Arkasnata Pal
module pwm_generator #(
    parameter COUNTER_WIDTH = 8
)(
    input  wire clk,
    input  wire rst_n,
    input  wire btn_inc,
    input  wire btn_dec,
    output reg  pwm_out,
    output reg [COUNTER_WIDTH-1:0] duty_val
);
    // Real-time duty cycle adjustment with switch anti-bounce filtering
endmodule\n`,
                      },
                      'sync_fifo.v': {
                        name: 'sync_fifo.v',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 5890,
                        modified: modDate,
                        content: `// Parameterized Synchronous FIFO Design
// Designed and verified in Xilinx Vivado by Arkasnata Pal
module sync_fifo #(
    parameter DEPTH      = 16,
    parameter DATA_WIDTH = 8,
    parameter ADDR_WIDTH = 4
)(
    input  wire                  clk,
    input  wire                  rst_n,
    input  wire                  wr_en,
    input  wire [DATA_WIDTH-1:0] wr_data,
    input  wire                  rd_en,
    output reg  [DATA_WIDTH-1:0] rd_data,
    output wire                  full,
    output wire                  empty
);
    // Binary read/write pointers and flag generation logic
endmodule\n`,
                      },
                    },
                  },
                  verification: {
                    name: 'verification',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: {
                      'README.txt': {
                        name: 'README.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 410,
                        modified: modDate,
                        content: `FUNCTIONAL VERIFICATION SUITE\nBuilt with UVM 1.2 and SystemVerilog Assertions (SVA).\nTarget: AXI4 Bus Crossbar, RISC-V compliance testbench.\nCoverage achieved: 99.4% Functional Coverage, 98.8% Code Coverage.\nRun 'verification --show' for the detailed report.\n`,
                      },
                      'uvm_testbench_axi.sv': {
                        name: 'uvm_testbench_axi.sv',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 16800,
                        modified: modDate,
                        content: `// UVM Testbench Environment for AMBA AXI4 Interconnect
import uvm_pkg::*;
\`include "uvm_macros.svh"

class axi_env extends uvm_env;
    \`uvm_component_utils(axi_env)
    axi_agent      m_agent;
    axi_scoreboard m_scoreboard;
    axi_coverage   m_coverage;
    // TLM connections and analysis ports
endclass\n`,
                      },
                      'assertions_sva.sv': {
                        name: 'assertions_sva.sv',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 7300,
                        modified: modDate,
                        content: `// AMBA AXI4 Protocol Assertions (Concurrent SVA)
property p_valid_hold_until_ready;
    @(posedge clk) disable iff (!rst_n)
    (valid && !ready) |=> (valid && $stable(data));
endproperty
assert property (p_valid_hold_until_ready) else $error("AXI handshake violation!");\n`,
                      },
                      'functional_coverage_report.txt': {
                        name: 'functional_coverage_report.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 3200,
                        modified: modDate,
                        content: `COVERAGE SUMMARY REPORT:
  Total Testcases:     45 Passing (0 Failed)
  Functional Coverage: 99.4% (Covergroups: Transaction size, burst mode, out-of-order responses)
  Statement Coverage:  98.8%
  Branch Coverage:     96.5%
  Toggle Coverage:     94.2%
  FSM State Coverage:  100.0%
`,
                      },
                    },
                  },
                  synthesis: {
                    name: 'synthesis',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: {
                      'README.txt': {
                        name: 'README.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 350,
                        modified: modDate,
                        content: `LOGIC SYNTHESIS AND TIMING CONSTRAINTS\nSynthesized and simulated using Xilinx Vivado and Icarus Verilog.\nRun 'synthesis --report' and 'sta --report' for full timing and simulation metrics.\n`,
                      },
                      'timing_constraints.sdc': {
                        name: 'timing_constraints.sdc',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 1450,
                        modified: modDate,
                        content: `# Synopsys Design Constraints (SDC)
create_clock -name clk -period 6.666 [get_ports clk] ;# 150 MHz Target
set_clock_uncertainty 0.25 [get_clocks clk]
set_input_delay -max 1.5 -clock clk [all_inputs]
set_output_delay -max 1.2 -clock clk [all_outputs]
set_load 0.035 [all_outputs]
`,
                      },
                      'yosys_synth_report.rpt': {
                        name: 'yosys_synth_report.rpt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 2890,
                        modified: modDate,
                        content: `YOSYS SYNTHESIS REPORT:
  Target Library: sky130_fd_sc_hd
  Number of cells: 18,450
  Sequential DFFs: 2,140
  Combinational:  16,310
  Chip Area:      0.14 mm²
  Estimated Slack: +0.42 ns @ 150 MHz
`,
                      },
                    },
                  },
                  'physical-design': {
                    name: 'physical-design',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: {
                      'README.txt': {
                        name: 'README.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 420,
                        modified: modDate,
                        content: `FPGA IMPLEMENTATION & VERIFICATION ARTIFACTS\nTarget: Xilinx Vivado 2023.2 RTL Flow\nSynthesis, Behavioral Simulation, Waveform Debugging & Resource Utilization.\nRun 'projects', 'rtl --list', and 'skills' for details.\n`,
                      },
                      'vivado_impl_summary.txt': {
                        name: 'vivado_impl_summary.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 2200,
                        modified: modDate,
                        content: `VIVADO IMPLEMENTATION SUMMARY:
  Module Top: spi_master / uart_top / pwm_generator / sync_fifo
  Core Utilization: 42.8%
  DRC Violations (Magic): 0
  LVS Verification (Netgen): 0 Errors (100% Net Match)
  Antenna Check: Clean
  Max Clock Skew: 74 ps
`,
                      },
                      'silicon_die_diagram.txt': {
                        name: 'silicon_die_diagram.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: ASCII_SILICON_DIE.length,
                        modified: modDate,
                        content: ASCII_SILICON_DIE,
                      },
                    },
                  },
                },
              },
              tools: {
                name: 'tools',
                type: 'dir',
                permissions: 'drwxr-xr-x',
                owner: 'arka',
                group: 'arka',
                size: 4096,
                modified: modDate,
                children: {
                  yosys: {
                    name: 'yosys',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: {
                      'info.txt': {
                        name: 'info.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 600,
                        modified: modDate,
                        content: `TOOL: Yosys Open SYnthesis Suite\nVersion: 0.40+54\nCategory: RTL Synthesis & Technology Mapping\nUsage: Converts Verilog/SystemVerilog RTL to gate-level netlists with ABC logic optimization.\nDocs: Run 'tools --list' for overview.\n`,
                      },
                    },
                  },
                  iverilog: {
                    name: 'iverilog',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: {
                      'info.txt': {
                        name: 'info.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 550,
                        modified: modDate,
                        content: `TOOL: Icarus Verilog (iverilog)\nVersion: 12.0\nCategory: RTL Simulation Engine\nUsage: Compiles standard Verilog IEEE 1364 code into VVP bytecode for fast simulation.\n`,
                      },
                    },
                  },
                  gtkwave: {
                    name: 'gtkwave',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: {
                      'info.txt': {
                        name: 'info.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 520,
                        modified: modDate,
                        content: `TOOL: GTKWave Electronic Waveform Viewer\nVersion: 3.3.118\nCategory: Digital Signal Debugging\nUsage: Reads and visualizes VCD, FST, and LXT2 simulation trace dumps.\n`,
                      },
                    },
                  },
                  verilator: {
                    name: 'verilator',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: {
                      'info.txt': {
                        name: 'info.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 580,
                        modified: modDate,
                        content: `TOOL: Verilator\nVersion: 5.022\nCategory: Fast Cycle-Accurate HDL Simulator\nUsage: Transpiles synthesizable SystemVerilog code into high-speed multi-threaded C++ test executables.\n`,
                      },
                    },
                  },
                  openlane: {
                    name: 'openlane',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: {
                      'info.txt': {
                        name: 'info.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 610,
                        modified: modDate,
                        content: `TOOL: OpenLane ASIC Implementation Flow\nVersion: 2.1.0\nCategory: Autonomous RTL-to-GDSII Pipeline\nUsage: Automates synthesis, floorplan, PDN, placement, CTS, routing, and signoff DRC/LVS.\n`,
                      },
                    },
                  },
                  openroad: {
                    name: 'openroad',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: {
                      'info.txt': {
                        name: 'info.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 590,
                        modified: modDate,
                        content: `TOOL: OpenROAD\nVersion: 2.0-2024.03\nCategory: Physical Design Engine\nUsage: Autonomous floorplanning, global placement, detailed placement, CTS, and detailed routing.\n`,
                      },
                    },
                  },
                  opensta: {
                    name: 'opensta',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: {
                      'info.txt': {
                        name: 'info.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 580,
                        modified: modDate,
                        content: `TOOL: OpenSTA\nVersion: 2.6.0\nCategory: Static Timing Analysis (STA)\nUsage: High-performance gate-level timing analysis, setup/hold slack computation, and SDC constraint reporting.\n`,
                      },
                    },
                  },
                  magic: {
                    name: 'magic',
                    type: 'dir',
                    permissions: 'drwxr-xr-x',
                    owner: 'arka',
                    group: 'arka',
                    size: 4096,
                    modified: modDate,
                    children: {
                      'info.txt': {
                        name: 'info.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: 'arka',
                        group: 'arka',
                        size: 570,
                        modified: modDate,
                        content: `TOOL: Magic VLSI Layout Tool\nVersion: 8.3.454\nCategory: DRC & SPICE Netlist Extraction\nUsage: Interactive VLSI layout editor, physical DRC verification, and extraction against standard cell technology files.\n`,
                      },
                    },
                  },
                },
              },
              contact: {
                name: 'contact',
                type: 'dir',
                permissions: 'drwxr-xr-x',
                owner: 'arka',
                group: 'arka',
                size: 4096,
                modified: modDate,
                children: {
                  'contact.txt': {
                    name: 'contact.txt',
                    type: 'file',
                    permissions: '-rw-r--r--',
                    owner: 'arka',
                    group: 'arka',
                    size: contactContent.length,
                    modified: modDate,
                    content: contactContent,
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return root;
}

export class VirtualFilesystem {
  private root: FSNode;
  public defaultHome: string = '/home/arka';

  constructor() {
    this.root = buildInitialFilesystem();
  }

  /**
   * Resolves a path relative to the current working directory.
   * Handles ~, ., .., and absolute paths.
   */
  public resolvePath(targetPath: string, cwd: string): string {
    let clean = targetPath.trim();
    if (!clean) return cwd;

    // Handle home directory ~
    if (clean === '~') {
      return this.defaultHome;
    }
    if (clean.startsWith('~/')) {
      clean = this.defaultHome + clean.slice(1);
    }

    // Determine starting path
    const isAbsolute = clean.startsWith('/');
    const parts = (isAbsolute ? clean : `${cwd}/${clean}`).split('/');
    const resolvedParts: string[] = [];

    for (const part of parts) {
      if (part === '' || part === '.') {
        continue;
      }
      if (part === '..') {
        if (resolvedParts.length > 0) {
          resolvedParts.pop();
        }
      } else {
        resolvedParts.push(part);
      }
    }

    return '/' + resolvedParts.join('/');
  }

  /**
   * Retrieves an FSNode by path.
   */
  public getNode(path: string, cwd: string = this.defaultHome): FSNode | null {
    const resolved = this.resolvePath(path, cwd);
    if (resolved === '/') return this.root;

    const parts = resolved.split('/').filter(Boolean);
    let current: FSNode = this.root;

    for (const part of parts) {
      if (current.type !== 'dir' || !current.children) {
        return null;
      }
      const child = current.children[part];
      if (!child) return null;
      current = child;
    }

    return current;
  }

  /**
   * Reads a file content by path.
   */
  public readFile(path: string, cwd: string = this.defaultHome): string | null {
    const node = this.getNode(path, cwd);
    if (!node) return null;
    if (node.type === 'dir') return `cat: ${path}: Is a directory`;
    return node.content || '';
  }

  /**
   * Lists the contents of a directory.
   */
  public listDir(path: string, cwd: string = this.defaultHome): { name: string; node: FSNode }[] | null {
    const node = this.getNode(path, cwd);
    if (!node) return null;
    if (node.type !== 'dir') return null;

    const results: { name: string; node: FSNode }[] = [];
    if (node.children) {
      for (const [name, child] of Object.entries(node.children)) {
        results.push({ name, node: child });
      }
    }

    // Sort alphabetically, with directories first
    return results.sort((a, b) => {
      if (a.node.type === b.node.type) {
        return a.name.localeCompare(b.name);
      }
      return a.node.type === 'dir' ? -1 : 1;
    });
  }

  /**
   * Renders a directory tree recursively.
   */
  public renderTree(path: string = '.', cwd: string = this.defaultHome, maxDepth: number = 4): string {
    const resolved = this.resolvePath(path, cwd);
    const rootNode = this.getNode(resolved);

    if (!rootNode) {
      return `tree: ${path}: No such file or directory`;
    }
    if (rootNode.type !== 'dir') {
      return `${path} [file]`;
    }

    let dirCount = 0;
    let fileCount = 0;
    const lines: string[] = [resolved === this.defaultHome ? '~' : resolved];

    const traverse = (node: FSNode, prefix: string, depth: number) => {
      if (depth > maxDepth || !node.children) return;

      const entries = Object.entries(node.children).sort(([aKey, aNode], [bKey, bNode]) => {
        if (aNode.type === bNode.type) return aKey.localeCompare(bKey);
        return aNode.type === 'dir' ? -1 : 1;
      });

      entries.forEach(([name, child], index) => {
        const isLast = index === entries.length - 1;
        const branch = isLast ? '└── ' : '├── ';
        const nextPrefix = prefix + (isLast ? '    ' : '│   ');

        if (child.type === 'dir') {
          dirCount++;
          lines.push(`${prefix}${branch}\x1b[34;1m${name}/\x1b[0m`);
          traverse(child, nextPrefix, depth + 1);
        } else {
          fileCount++;
          lines.push(`${prefix}${branch}${name}`);
        }
      });
    };

    traverse(rootNode, '', 1);
    lines.push(`\n${dirCount} directories, ${fileCount} files`);
    return lines.join('\n');
  }

  /**
   * Finds files and directories matching an optional query.
   */
  public find(path: string = '.', cwd: string = this.defaultHome, query?: string): string[] {
    const resolved = this.resolvePath(path, cwd);
    const rootNode = this.getNode(resolved);
    if (!rootNode) return [`find: '${path}': No such file or directory`];

    const results: string[] = [];

    const traverse = (node: FSNode, currentPath: string) => {
      const displayPath = currentPath;
      if (!query || node.name.toLowerCase().includes(query.toLowerCase())) {
        results.push(displayPath);
      }
      if (node.type === 'dir' && node.children) {
        for (const [name, child] of Object.entries(node.children)) {
          const childPath = currentPath === '/' ? `/${name}` : `${currentPath}/${name}`;
          traverse(child, childPath);
        }
      }
    };

    traverse(rootNode, resolved);
    return results;
  }

  /**
   * Provides autocomplete options for a given partial path.
   */
  public getCompletions(partialPath: string, cwd: string = this.defaultHome): string[] {
    let searchDir = cwd;
    let filePrefix = partialPath;

    if (partialPath.includes('/')) {
      const lastSlashIndex = partialPath.lastIndexOf('/');
      const dirPart = partialPath.substring(0, lastSlashIndex);
      filePrefix = partialPath.substring(lastSlashIndex + 1);
      searchDir = this.resolvePath(dirPart || '/', cwd);
    }

    const dirNode = this.getNode(searchDir);
    if (!dirNode || dirNode.type !== 'dir' || !dirNode.children) {
      return [];
    }

    const matches: string[] = [];
    for (const [name, node] of Object.entries(dirNode.children)) {
      if (name.startsWith(filePrefix)) {
        const trailing = node.type === 'dir' ? '/' : '';
        matches.push(name + trailing);
      }
    }

    return matches;
  }

  // Observable subscription mechanism for synchronization between Files and Terminal
  private listeners: Set<() => void> = new Set();

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public notifyListeners(): void {
    this.listeners.forEach(fn => fn());
  }

  /**
   * Creates a new directory.
   */
  public createDirectory(path: string, cwd: string = this.defaultHome): boolean {
    const resolved = this.resolvePath(path, cwd);
    const lastSlash = resolved.lastIndexOf('/');
    const parentPath = resolved.substring(0, lastSlash) || '/';
    const dirName = resolved.substring(lastSlash + 1);

    if (!dirName) return false;
    const parentNode = this.getNode(parentPath);
    if (!parentNode || parentNode.type !== 'dir' || !parentNode.children) return false;
    if (parentNode.children[dirName]) return false;

    parentNode.children[dirName] = {
      name: dirName,
      type: 'dir',
      permissions: 'drwxr-xr-x',
      owner: 'arka',
      group: 'arka',
      size: 4096,
      modified: 'Nov 19 13:10',
      children: {},
    };

    this.notifyListeners();
    return true;
  }

  /**
   * Creates or overwrites a file.
   */
  public createFile(path: string, content: string = '', cwd: string = this.defaultHome): boolean {
    const resolved = this.resolvePath(path, cwd);
    const lastSlash = resolved.lastIndexOf('/');
    const parentPath = resolved.substring(0, lastSlash) || '/';
    const fileName = resolved.substring(lastSlash + 1);

    if (!fileName) return false;
    const parentNode = this.getNode(parentPath);
    if (!parentNode || parentNode.type !== 'dir' || !parentNode.children) return false;

    parentNode.children[fileName] = {
      name: fileName,
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'arka',
      group: 'arka',
      size: content.length,
      modified: 'Nov 19 13:10',
      content,
    };

    this.notifyListeners();
    return true;
  }

  /**
   * Deletes a file or directory recursively.
   */
  public deleteNode(path: string, cwd: string = this.defaultHome): boolean {
    const resolved = this.resolvePath(path, cwd);
    if (resolved === '/' || resolved === this.defaultHome) return false; // Prevent root delete

    const lastSlash = resolved.lastIndexOf('/');
    const parentPath = resolved.substring(0, lastSlash) || '/';
    const nodeName = resolved.substring(lastSlash + 1);

    const parentNode = this.getNode(parentPath);
    if (!parentNode || parentNode.type !== 'dir' || !parentNode.children) return false;
    if (!parentNode.children[nodeName]) return false;

    delete parentNode.children[nodeName];
    this.notifyListeners();
    return true;
  }

  /**
   * Renames a file or directory.
   */
  public renameNode(oldPath: string, newName: string, cwd: string = this.defaultHome): boolean {
    const cleanNew = newName.trim();
    if (!cleanNew || cleanNew.includes('/')) return false;

    const resolved = this.resolvePath(oldPath, cwd);
    if (resolved === '/' || resolved === this.defaultHome) return false;

    const lastSlash = resolved.lastIndexOf('/');
    const parentPath = resolved.substring(0, lastSlash) || '/';
    const oldName = resolved.substring(lastSlash + 1);

    const parentNode = this.getNode(parentPath);
    if (!parentNode || parentNode.type !== 'dir' || !parentNode.children) return false;
    const targetNode = parentNode.children[oldName];
    if (!targetNode || parentNode.children[cleanNew]) return false;

    targetNode.name = cleanNew;
    delete parentNode.children[oldName];
    parentNode.children[cleanNew] = targetNode;

    this.notifyListeners();
    return true;
  }
}

export const virtualFS = new VirtualFilesystem();
