/**
 * ARKA OS — Digital VLSI Engineer Portfolio Configuration
 * 
 * Centralized, editable configuration for personal information,
 * professional background, projects, skills, education, and EDA tools.
 */

export interface ProjectItem {
  id: string;
  name: string;
  category: 'rtl' | 'verification' | 'synthesis' | 'physical-design';
  tagline: string;
  description: string;
  technologies: string[];
  metrics: { [key: string]: string };
  files?: string[];
  githubUrl?: string;
}

export interface EDAToolItem {
  name: string;
  category: 'RTL Simulation' | 'Synthesis' | 'STA' | 'Physical Design' | 'Waveform Viewer' | 'DRC/LVS';
  description: string;
  version: string;
  openSource: boolean;
  command: string;
  license: string;
}

export const PORTFOLIO_DATA = {
  engineer: {
    name: "Arka",
    fullName: "Arka Bhattacharya", // Editable
    handle: "arka",
    hostname: "vlsi-workstation",
    title: "Digital VLSI Engineer",
    tagline: "From RTL to GDSII.",
    specialization: "RTL Design, Functional Verification, Logic Synthesis & Physical Design",
    email: "arka.vlsi@workstation.local",
    github: "https://github.com/arka-vlsi",
    linkedin: "https://linkedin.com/in/arka-vlsi",
    location: "Bengaluru, India / Remote",
    status: "Open for High-Impact VLSI / ASIC Design Roles",
    summary: `Digital VLSI Engineer specialized in synchronous digital design, pipelined microprocessor architectures, UVM-based functional verification, and RTL-to-GDSII physical implementation flows. Passionate about computer architecture, low-power design techniques, static timing analysis (STA), and open-source EDA silicon tapeouts.`,
  },

  system: {
    osName: "ARKA OS 6.0 LTS",
    kernel: "Linux 6.8.0-45-generic-vlsi-rt",
    arch: "x86_64 / RISC-V RV64GC",
    shell: "arka-bash v5.2.21(1)-release",
    host: "VLSI Engineering Workstation (Dual AMD EPYC 9654 192T / 128GB DDR5)",
    edaCore: "OpenLane 2.1 / Synopsys & Cadence Compatible",
    pdk: "SkyWater Sky130A (130nm CMOS High-Density)",
    designFlow: "RTL -> Synthesis -> STA -> Floorplan -> Placement -> CTS -> Routing -> GDSII",
    terminal: "arka-terminal (xterm-256color)",
    uptimeStart: Date.now() - 1000 * 60 * 142, // ~2.3 hours ago
  },

  skills: {
    hardwareDescriptionLanguages: [
      { name: "SystemVerilog", level: "Expert", usage: "RTL modeling, interfaces, DPI, assertions" },
      { name: "Verilog (IEEE 1364-2005)", level: "Expert", usage: "Synthesizable digital logic, FSMs, pipelines" },
      { name: "VHDL", level: "Proficient", usage: "RTL synthesis and structural modeling" },
    ],
    verification: [
      { name: "UVM (Universal Verification Methodology)", level: "Advanced", usage: "Testbenches, sequences, scoreboards, drivers, monitors" },
      { name: "SystemVerilog Assertions (SVA)", level: "Advanced", usage: "Immediate and concurrent protocol checking" },
      { name: "Functional Coverage & Constrained Random", level: "Advanced", usage: "Covergroups, cross coverage, randc constraints" },
      { name: "Formal Verification Basics", level: "Intermediate", usage: "Property checking with SymbiYosys" },
    ],
    architectureAndProtocols: [
      { name: "RISC-V ISA (RV32I / RV64I)", level: "Expert", usage: "5-stage pipeline, hazard resolution, branch prediction" },
      { name: "AMBA Bus Protocols", level: "Advanced", usage: "AXI4, AXI-Lite, AHB5, APB4" },
      { name: "Peripheral Protocols", level: "Advanced", usage: "UART, SPI, I2C, JTAG, Wishbone" },
      { name: "Memory Architectures", level: "Advanced", usage: "Synchronous FIFO, Dual-Port SRAM, Direct-Mapped Caches" },
    ],
    edaTools: [
      { name: "Yosys", category: "Synthesis", usage: "RTL synthesis, netlist elaboration, ABC optimization" },
      { name: "OpenSTA / PrimeTime", category: "Timing Analysis", usage: "Static timing analysis, multi-corner slack, setup/hold fixing" },
      { name: "OpenROAD / Innovus", category: "Physical Design", usage: "Floorplanning, placement, CTS, detailed routing" },
      { name: "Verilator & Icarus Verilog", category: "Simulation", usage: "Cycle-accurate C++ simulation, HDL compilation" },
      { name: "GTKWave", category: "Debug", usage: "VCD/FST digital waveform analysis" },
      { name: "Magic / KLayout", category: "Layout & DRC", usage: "VLSI layout viewing, DRC/LVS physical signoff" },
    ],
    scriptingAndAutomation: [
      { name: "Tcl (Tool Command Language)", level: "Advanced", usage: "EDA tool scripting, SDC timing constraints generation" },
      { name: "Python", level: "Expert", usage: "Testbench generation, data parsing, regression automation" },
      { name: "Bash & Linux Shell", level: "Expert", usage: "EDA job pipelines, Makefiles, server environments" },
      { name: "Git & CI/CD", level: "Advanced", usage: "Hardware version control, GitHub Actions for RTL checks" },
    ],
  },

  experience: [
    {
      role: "Digital VLSI Design Engineer",
      organization: "Silicon Architecture & Hardware Systems Lab",
      period: "2024 — Present",
      location: "Bengaluru, India",
      highlights: [
        "Architected and implemented a 5-stage pipelined 32-bit RISC-V processor core with dynamic branch prediction and full hazard handling.",
        "Synthesized the core targeting SkyWater 130nm standard cell libraries, achieving zero negative slack (WNS > +0.35ns @ 125 MHz).",
        "Constructed a complete SystemVerilog UVM test environment achieving 98.6% functional coverage and 100% statement coverage.",
        "Automated the RTL-to-GDSII physical implementation pipeline using OpenLane and Tcl scripting.",
      ],
    },
    {
      role: "RTL Design & Verification Intern",
      organization: "Semiconductor Solutions Group",
      period: "2023 — 2024",
      location: "Bengaluru, India",
      highlights: [
        "Designed synthesizable AXI4-Lite slave and master peripheral bridge controllers with burst transfer support.",
        "Wrote over 120 SystemVerilog concurrent assertions (SVA) for AMBA protocol compliance verification.",
        "Performed Static Timing Analysis (STA) on multi-corner PVT corners and closed timing across setup and hold constraints.",
        "Assisted in floorplanning, power planning (power stripes & rings), and standard cell placement density optimization.",
      ],
    },
  ],

  education: [
    {
      degree: "Bachelor of Technology in Electronics & Communication Engineering",
      institution: "National Institute of Technology / Engineering University",
      period: "2020 — 2024",
      score: "CGPA: 8.9 / 10.0 (First Class with Distinction)",
      coursework: [
        "CMOS Digital Integrated Circuits",
        "Computer Architecture & Microprocessors",
        "Digital System Design using Verilog",
        "VLSI Physical Design Automation",
        "Embedded Systems & Hardware-Software Co-Design",
        "Signals, Systems & DSP Architectures",
      ],
    },
  ],

  certifications: [
    {
      name: "Comprehensive RTL to GDSII Flow with Open-Source EDA",
      issuer: "IEEE / OpenROAD Initiative",
      date: "2024",
      credentialId: "CERT-VLSI-88941",
    },
    {
      name: "Advanced Functional Verification with SystemVerilog and UVM",
      issuer: "Accellera Systems Initiative Accredited Training",
      date: "2023",
      credentialId: "CERT-UVM-55219",
    },
    {
      name: "Static Timing Analysis (STA) and SDC Constraints for Digital ICs",
      issuer: "VLSI Systems Academy",
      date: "2023",
      credentialId: "CERT-STA-33104",
    },
  ],

  projects: [
    {
      id: "riscv-rv32i",
      name: "5-Stage Pipelined RISC-V RV32I Microprocessor Core",
      category: "rtl",
      tagline: "High-performance synthesizable RV32I processor with branch prediction and forwarding.",
      description: "Designed a complete 32-bit RISC-V (RV32I) core in synthesizable SystemVerilog. Features IF, ID, EX, MEM, and WB pipeline stages, a 2-bit saturating counter branch target buffer (BTB), full data forwarding paths, and load-use hazard stall unit. Successfully verified against compliance suites and synthesized with zero timing violations at 150 MHz on Sky130.",
      technologies: ["SystemVerilog", "RISC-V ISA", "Yosys", "OpenSTA", "Sky130 PDK", "GTKWave"],
      metrics: {
        "Frequency": "150 MHz (Sky130 nm)",
        "Gate Count": "18,450 Gates",
        "Core Area": "0.14 mm²",
        "Pipeline": "5 Stages (IF/ID/EX/MEM/WB)",
        "WNS": "+0.42 ns",
      },
      files: ["core_top.sv", "pipeline_regs.sv", "hazard_unit.sv", "alu.sv", "branch_pred.sv"],
      githubUrl: "https://github.com/arka-vlsi/riscv-rv32i-core",
    },
    {
      id: "axi4-dma-controller",
      name: "Configurable AXI4 Scatter-Gather DMA Controller",
      category: "rtl",
      tagline: "High-throughput DMA controller for on-chip memory transfers with AXI4 master interface.",
      description: "Implemented a multi-channel direct memory access controller supporting 64-bit bursts, scatter-gather descriptor chaining, and programmable priority scheduling. Includes dual asynchronous FIFOs for crossing independent read/write clock domains.",
      technologies: ["Verilog HDL", "AXI4 / AXI-Lite", "Clock Domain Crossing (CDC)", "Tcl", "ModelSim"],
      metrics: {
        "Bandwidth": "3.2 GB/s peak",
        "Channels": "4 Independent Channels",
        "Clock Domains": "Separate AXI Master & System Clocks",
        "CDC Method": "Gray-coded pointer async FIFOs",
      },
      files: ["dma_top.v", "axi_master_fsm.v", "descriptor_fetch.v", "async_fifo.v"],
      githubUrl: "https://github.com/arka-vlsi/axi4-dma-engine",
    },
    {
      id: "uvm-axi-testbench",
      name: "UVM-Based Constrained-Random Verification Environment for AXI4",
      category: "verification",
      tagline: "Production-grade UVM testbench with scoreboarding and concurrent SVA assertions.",
      description: "Built an exhaustive UVM verification environment verifying an AXI4 interconnect crossbar. Developed active agents, custom sequences generating out-of-order responses, reference predictor, scoreboard with TLM analysis ports, and 95+ SystemVerilog assertions checking protocol rules (e.g. handshake rules, ID ordering).",
      technologies: ["SystemVerilog", "UVM 1.2", "SVA", "QuestaSim", "Verilator"],
      metrics: {
        "Functional Coverage": "99.4%",
        "Code Coverage": "98.8% Statement / 96.5% Branch",
        "Assertions Count": "96 Concurrent SVA Checks",
        "Test Scenarios": "45 Random & Corner-case Tests",
      },
      files: ["axi_tb_top.sv", "axi_agent.sv", "axi_scoreboard.sv", "axi_protocol_assertions.sva"],
      githubUrl: "https://github.com/arka-vlsi/uvm-axi-verification",
    },
    {
      id: "openlane-sky130-tapeout",
      name: "RTL-to-GDSII Physical Implementation of Cryptographic Accelerator",
      category: "physical-design",
      tagline: "Full ASIC physical design flow from Verilog to tapeout-ready GDSII on SkyWater 130nm.",
      description: "Executed complete physical design flow for an AES-128 cryptographic engine using the OpenLane ASIC flow. Covered synthesis, floorplanning (38% core utilization), power distribution network (PDN), placement with timing optimization, clock tree synthesis (CTS max skew < 85ps), detailed global/detailed routing, DRC, LVS, and antenna signoff.",
      technologies: ["OpenLane", "OpenROAD", "Magic VLSI", "KLayout", "Netgen", "Sky130 PDK"],
      metrics: {
        "Technology": "SkyWater 130nm CMOS (Sky130A)",
        "Die Area": "1.00 mm x 1.00 mm",
        "Core Area": "850 µm x 850 µm",
        "Utilization": "42.8%",
        "DRC Errors": "0 Clean",
        "LVS Errors": "0 Clean (Netgen Match)",
        "Max Clock Skew": "74 ps",
      },
      files: ["config.json", "pin_order.cfg", "pdn.tcl", "runs/final_tapeout.gds"],
      githubUrl: "https://github.com/arka-vlsi/sky130-aes-accelerator",
    },
  ],

  edaToolsList: [
    {
      name: "Yosys",
      category: "Synthesis",
      description: "Yosys Open SYnthesis Suite — RTL elaboration, technology mapping to standard cells, and formal verification front-end.",
      version: "0.40+54",
      openSource: true,
      command: "yosys -p 'read_verilog; synth -top core; write_verilog netlist.v'",
      license: "ISC License",
    },
    {
      name: "OpenROAD",
      category: "Physical Design",
      description: "OpenROAD Autonomous RTL-to-GDSII foundation: floorplanning, placement, CTS, global & detail routing.",
      version: "2.0-2024.03",
      openSource: true,
      command: "openroad -exit flow.tcl",
      license: "BSD-3-Clause",
    },
    {
      name: "OpenSTA",
      category: "STA",
      description: "Gate-level static timing analysis engine with multi-corner and multi-mode (MCMM) timing evaluation.",
      version: "2.6.0",
      openSource: true,
      command: "sta -f timing_analysis.tcl",
      license: "GPL-3.0",
    },
    {
      name: "Icarus Verilog",
      category: "RTL Simulation",
      description: "Verilog simulation and synthesis tool conforming to IEEE 1364 standard, generates VCD waveforms.",
      version: "12.0",
      openSource: true,
      command: "iverilog -g2012 -o sim.vvp tb.v dut.v && vvp sim.vvp",
      license: "GPL-2.0",
    },
    {
      name: "Verilator",
      category: "RTL Simulation",
      description: "Fastest free Verilog/SystemVerilog simulator that compiles synthesizable HDL into cycle-accurate multi-threaded C++.",
      version: "5.022",
      openSource: true,
      command: "verilator --cc --exe --trace dut.v sim_main.cpp",
      license: "LGPL-3.0",
    },
    {
      name: "GTKWave",
      category: "Waveform Viewer",
      description: "Interactive electronic wave viewer for viewing VCD, LXT, LXT2, VZT, and FST simulation dump files.",
      version: "3.3.118",
      openSource: true,
      command: "gtkwave dump.fst",
      license: "GPL-2.0",
    },
    {
      name: "Magic VLSI",
      category: "DRC/LVS",
      description: "Interactive VLSI layout editing, design rule checking (DRC), and hierarchical SPICE extraction tool.",
      version: "8.3.454",
      openSource: true,
      command: "magic -T sky130A.tech layout.mag",
      license: "Postcardware / BSD",
    },
    {
      name: "OpenLane",
      category: "Physical Design",
      description: "Automated RTL-to-GDSII flow combining Yosys, OpenROAD, Magic, Netgen, and KLayout for ASIC tapeouts.",
      version: "2.1.0",
      openSource: true,
      command: "flow.tcl -design . -run_tag tapeout_v1",
      license: "Apache-2.0",
    },
  ],
};
