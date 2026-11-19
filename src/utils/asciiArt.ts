/**
 * ARKA OS — Authentic ASCII Artwork Collection
 * 
 * Original, high-impact ASCII designs for VLSI Engineering:
 * - ARKA OS System Banner
 * - Silicon Microprocessor Die Layout
 * - Digital Logic Gates
 * - FSM (Finite State Machine) State Diagram
 * - RTL-to-GDSII ASIC Flow Pipeline
 * - Neofetch Workstation Badge
 */

export const ASCII_ARKA_LOGO = `
 █████╗ ██████╗ ██╗  ██╗ █████╗      ██████╗ ███████╗
██╔══██╗██╔══██╗██║ ██╔╝██╔══██╗    ██╔═══██╗██╔════╝
███████║██████╔╝█████╔╝ ███████║    ██║   ██║███████╗
██╔══██║██╔══██╗██╔═██╗ ██╔══██║    ██║   ██║╚════██║
██║  ██║██║  ██║██║  ██╗██║  ██║    ╚██████╔╝███████║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝     ╚═════╝ ╚══════╝
`.trim();

export const ASCII_ARKA_COMPACT = `
  __ _ _ __| | ____ _    ___  ___ 
 / _\` | '__| |/ / _\` |  / _ \\/ __|
| (_| | |  |   < (_| | | (_) \\__ \\
 \\__,_|_|  |_|\\_\\__,_|  \\___/|___/
`.trim();

export const ASCII_NEOFETCH_LOGO = `
         ┌──────────────────┐
         │ ┌──────────────┐ │
   ┌─────┴─┴──────────────┴─┴─────┐
   │  ┌────────────────────────┐  │
   │  │  ╔══════════════════╗  │  │
   │  │  ║   ARKA SILICON   ║  │  │
   │  │  ║   RV32I / SKY130 ║  │  │
   │  │  ║  ┌───┐    ┌───┐  ║  │  │
   │  │  ║  │ALU│───▶│REG│  ║  │  │
   │  │  ║  └───┘    └───┘  ║  │  │
   │  │  ║  [RTL]───▶[GDS]  ║  │  │
   │  │  ╚══════════════════╝  │  │
   │  └────────────────────────┘  │
   └─────┬─┬──────────────┬─┬─────┘
         │ └──────────────┘ │
         └──────────────────┘
`;

export const ASCII_SILICON_DIE = `
+------------------[ SKY130 1.0mm x 1.0mm DIE ]------------------+
| [VDD] [IO_0] [IO_1] [IO_2] [IO_3] [IO_4] [IO_5] [IO_6] [VSS]    |
| +------------------------------------------------------------+ |
| |                    INSTRUCTION CACHE (2KB)                 | |
| |  +--------------------+  +-------------------------------+ | |
| |  | 5-STAGE RV32I CORE |  | AXI4-LITE CROSSBAR SWITCH     | | |
| |  |                    |  |                               | | |
| |  |  [IF] -> [ID]      |  |  +------------+ +----------+ | | |
| |  |    |       |       |  |  | UART_0     | | SPI_0    | | | |
| |  |  [EX] -> [MEM]     |  |  +------------+ +----------+ | | |
| |  |    |               |  |  | TIMER_32   | | GPIO_8   | | | |
| |  |  [WB]              |  |  +------------+ +----------+ | | |
| |  +--------------------+  +-------------------------------+ | |
| |                                                            | |
| |                    DATA SRAM ARRAY (4KB)                   | |
| |                   [BIST ENGINE & REDUNDANCY]               | |
| +------------------------------------------------------------+ |
| [VSS] [CLK] [RST_N] [JTAG_TCK] [TDI] [TDO] [TMS] [VSS] [VDD]   |
+----------------------------------------------------------------+
`;

export const ASCII_LOGIC_GATES = `
  1. NAND GATE (Universal):
     A ───┤‾‾╲
          │   )o─── Y = ~(A & B)
     B ───└──╱

  2. NOR GATE:
     A ───╲‾‾╲
           )  )o─── Y = ~(A | B)
     B ───╱__╱

  3. XOR GATE (Parity / Addition):
     A ─)─╲‾‾╲
           )  )──── Y = A ^ B
     B ─)─╱__╱

  4. D-FLIP FLOP (Edge-Triggered Storage):
           ┌───────────┐
     D ────┤ D       Q ├─── Q
           │           │
   CLK ───▶│ >      ~Q ├─── ~Q
           │           │
   RST ────┤ CLR       │
           └───────────┘
`;

export const ASCII_FSM_DIAGRAM = `
  FINITE STATE MACHINE (FSM) — RISC-V BUS CONTROLLER
  
      +-----------------------------------------+
      |                                         |
      v                                         |
  +--------+    start_transfer    +-----------+ | timeout /
  |  IDLE  | -------------------> | ADDR_PHASE| | bus_err
  +--------+                      +-----------+ |
      ^                                 |       |
      |          ready && valid         |       |
      |         +-----------------------+       |
      |         v                               |
  +--------+  burst_done  +-----------+         |
  | STATUS | <----------- | DATA_PHASE| --------+
  +--------+              +-----------+
      |                         ^
      +-- wait_ack              | !burst_done
            +-------------------+
`;

export const ASCII_VLSI_PIPELINE = `
================================================================================
           DIGITAL VLSI IMPLEMENTATION FLOW: FROM RTL TO GDSII
================================================================================

 [1. SPECIFICATION]      Architectural microarchitecture doc, ISA specs, AMBA protocols
        │
        ▼
 [2. RTL MODELING]       Synthesizable SystemVerilog / Verilog HDL code
        │                Verification with UVM, assertions (SVA), code coverage
        ▼
 [3. LOGIC SYNTHESIS]    Technology mapping to standard cells (Yosys / Synopsys DC)
        │                Area, gate count, timing optimization, netlist generation
        ▼
 [4. STATIC TIMING]      Setup/Hold analysis, WNS/TNS closure (OpenSTA / PrimeTime)
        │                Multi-corner PVT analysis, SDC constraint signoff
        ▼
 [5. FLOORPLANNING]      Die size, core utilization, I/O pads, macro placement
        │                Power rings, stripes, and straps (PDN synthesis)
        ▼
 [6. PLACEMENT]          Global & detailed standard cell placement (OpenROAD)
        │                Timing-driven placement, congestion minimization
        ▼
 [7. CLOCK TREE (CTS)]   Clock buffer insertion, H-tree synthesis, skew minimization
        │                Hold-slack fixing, balance clock arrival times
        ▼
 [8. ROUTING]            Global routing -> Detailed track routing (Metal 1-5)
        │                Antenna violation mitigation, via insertion
        ▼
 [9. PHYSICAL SIGNOFF]   Design Rule Check (DRC) & Layout Versus Schematic (LVS)
        │                Parasitic Extraction (SPEF/RCX), Signoff STA
        ▼
 [10. GDSII / OASIS]     Tapeout-ready binary layout streamed to foundry fab!
================================================================================
`;
