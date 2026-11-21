/**
 * ARKA OS — Arkasnata Pal Portfolio Configuration
 * 
 * Sourced directly from Arkasnata Pal's Curriculum Vitae (B.Tech ECE, Jalpaiguri Government Engineering College)
 */

export interface ProjectItem {
  id: string;
  name: string;
  category: 'rtl' | 'verification' | 'synthesis' | 'physical-design';
  tagline: string;
  description: string;
  highlights: string[];
  technologies: string[];
  metrics: { [key: string]: string };
  files?: string[];
  githubUrl?: string;
}

export interface EDAToolItem {
  name: string;
  category: 'Simulation' | 'Synthesis' | 'STA' | 'Physical Design' | 'Waveform Viewer' | 'DRC/LVS' | 'RTL Simulation';
  description: string;
  version: string;
  openSource: boolean;
  command: string;
  license: string;
}

export const PORTFOLIO_DATA = {
  engineer: {
    name: "Arka",
    fullName: "Arkasnata Pal",
    handle: "arka",
    hostname: "vlsi-workstation",
    title: "Digital VLSI Enthusiast",
    tagline: "Digital VLSI Design | RTL to GDSII Flow",
    specialization: "Digital VLSI Design | RTL Design and Verification | FPGA Development | RTL to GDSII",
    email: "arka4551@gmail.com",
    phone: "+91-8250495806",
    github: "https://github.com/arkasnatapal",
    linkedin: "https://linkedin.com/in/arkasnata-pal-6a3682276",
    location: "West Bengal, India",
    status: "B.Tech ECE Undergraduate, Jalpaiguri Government Engineering College",
    summary: `Electronics and Communication Engineering student at Jalpaiguri Government Engineering College with expertise in Verilog HDL, digital logic design, and RTL implementation. Finalist at Smart India Hackathon 2024 (SIH 2024) and NPTEL Elite certified in Digital Design Using Verilog by IIT Guwahati. Experienced in designing parameterized SPI Master controllers, UART serial transceivers, PWM generators, and synchronous FIFOs using Xilinx Vivado, Icarus Verilog, and GTKWave.`,
  },

  system: {
    osName: "UBUNTU 24.04",
    kernel: "6.8.0-45-generic",
    arch: "x86_64 / FPGA",
    shell: "arka-bash v5.2.21(1)-release",
    host: "VLSI Engineering Workstation (Xilinx Vivado / Verilog HDL)",
    edaCore: "Xilinx Vivado 2023.2 / Icarus Verilog / GTKWave",
    pdk: "FPGA & ASIC RTL-to-GDSII Design Flow",
    designFlow: "RTL (Verilog) -> Logic Synthesis -> Vivado Simulation -> GTKWave Verification",
    terminal: "arka-terminal (xterm-256color)",
    uptimeStart: Date.now() - 1000 * 60 * 142,
  },

  skills: {
    hardwareDescriptionLanguages: [
      { name: "Verilog HDL", level: "Expert", usage: "Synthesizable digital logic, FSMs, parameterized modules, testbenches" },
    ],
    programmingLanguages: [
      { name: "C", level: "Advanced", usage: "Embedded C, systems programming, algorithmic hardware-software co-design" },
      { name: "C++", level: "Proficient", usage: "Object-oriented modeling, data structures, computational logic" },
      { name: "Python", level: "Proficient", usage: "Automation, waveform parsing, test vector generation" },
    ],
    coreSubjects: [
      { name: "Digital Electronics", level: "Advanced", usage: "Combinational & sequential circuit design, logic minimization, timing analysis" },
      { name: "Logic Design", level: "Advanced", usage: "Finite State Machines (FSMs), datapath architecture, control unit synthesis" },
      { name: "Electronic Devices", level: "Proficient", usage: "Semiconductor physics, MOSFET operation, CMOS characteristics" },
      { name: "Signals and Systems", level: "Proficient", usage: "LTI systems, Fourier analysis, discrete-time signal processing" },
    ],
    tools: [
      { name: "Xilinx Vivado", category: "EDA Suite", usage: "FPGA synthesis, implementation, behavioral simulation, bitstream generation" },
      { name: "Icarus Verilog", category: "Simulation", usage: "IEEE 1364 Verilog simulation and synthesis compilation" },
      { name: "GTKWave", category: "Debug", usage: "VCD waveform analysis, edge-transition debugging, timing verification" },
    ],
    relevantCoursework: [
      "Digital Electronics",
      "RTL to GDSII Flow",
      "Logic Design",
      "Electronic Devices",
      "Signals and Systems",
    ],
    areasOfInterest: [
      "Digital VLSI Design",
      "RTL Design and Verification",
      "FPGA Development",
      "Analog VLSI Design",
    ],

    // Backward-compatible properties populated with Arkasnata's real skills
    verification: [
      { name: "Verilog Testbenches", level: "Advanced", usage: "Behavioral testbenches, clock generation, stimulus driving, self-checking assertions" },
      { name: "GTKWave Simulation Debug", level: "Advanced", usage: "VCD waveform analysis, edge-transition debugging, timing verification" },
      { name: "Vivado Behavioral Simulation", level: "Advanced", usage: "Functional verification of SPI Master, UART, PWM Generator, Synchronous FIFO" },
    ],
    architectureAndProtocols: [
      { name: "SPI Protocol", level: "Expert", usage: "All 4 SPI Modes (Mode 0, 1, 2, 3), runtime CPOL/CPHA matrix, full-duplex transfer" },
      { name: "UART Protocol", level: "Advanced", usage: "Asynchronous serial communication at 9600 baud with dedicated baud rate generator" },
      { name: "PWM Waveform Architecture", level: "Advanced", usage: "Dynamically adjustable duty cycle control with push-button debouncing logic" },
      { name: "FIFO Memory Architecture", level: "Advanced", usage: "Parameterized synchronous FIFO, read/write pointer logic, full/empty flag generation" },
    ],
    edaTools: [
      { name: "Xilinx Vivado", category: "EDA Suite", usage: "FPGA synthesis, place & route, behavioral simulation, bitstream generation" },
      { name: "Icarus Verilog", category: "Simulation", usage: "Open-source IEEE 1364 Verilog compilation and simulation" },
      { name: "GTKWave", category: "Debug", usage: "Electronic waveform visualization and timing analysis" },
    ],
    scriptingAndAutomation: [
      { name: "Python", level: "Proficient", usage: "Test vector generation, simulation script automation" },
      { name: "C / C++", level: "Advanced", usage: "Firmware modeling, hardware-software interface verification" },
      { name: "Bash & Linux Shell", level: "Proficient", usage: "EDA simulation automation and Linux workstation environment" },
    ],
  },

  education: [
    {
      degree: "Bachelor of Technology (B.Tech) in Electronics and Communication Engineering",
      institution: "Jalpaiguri Government Engineering College",
      period: "2024 - 2028",
      score: "SGPA: 8.14",
      coursework: [
        "Digital Electronics",
        "RTL to GDSII Flow",
        "Logic Design",
        "Electronic Devices",
        "Signals and Systems",
      ],
    },
    {
      degree: "Class 12 (CBSE Board)",
      institution: "HemSheela Model School, Durgapur",
      period: "2024",
      score: "Percentage: 93%",
      coursework: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
    },
    {
      degree: "Class 10 (ICSE Board)",
      institution: "St. Xavier’s School, Durgapur",
      period: "2022",
      score: "Percentage: 95%",
      coursework: ["Science", "Mathematics", "Computer Applications"],
    },
  ],

  achievements: [
    {
      title: "Finalist – Smart India Hackathon 2024 (SIH 2024)",
      organization: "Ministry of Education & AICTE, Govt. of India",
      year: "2024",
      description: "Selected as a National Finalist in Smart India Hackathon 2024 for developing innovative engineering solutions.",
    },
    {
      title: "Completed NPTEL Course: Digital Design Using Verilog (IIT Guwahati) with Elite Certification",
      organization: "NPTEL / Indian Institute of Technology Guwahati",
      year: "2024",
      description: "Successfully completed advanced curriculum covering digital hardware modeling in Verilog with Elite Certification honor.",
    },
  ],

  // Compatibility aliases
  certifications: [
    {
      name: "Digital Design Using Verilog — Elite Certification",
      issuer: "NPTEL / IIT Guwahati",
      date: "2024",
      credentialId: "NPTEL-IITG-ELITE",
    },
    {
      name: "Finalist — Smart India Hackathon 2024",
      issuer: "Ministry of Education, Govt. of India",
      date: "2024",
      credentialId: "SIH-2024-FINALIST",
    },
  ],

  experience: [
    {
      role: "Undergraduate Engineering Researcher (Digital VLSI)",
      organization: "Jalpaiguri Government Engineering College",
      period: "2024 — Present",
      location: "West Bengal, India",
      highlights: [
        "National Finalist at Smart India Hackathon 2024 (SIH 2024).",
        "Completed NPTEL Course in Digital Design Using Verilog (IIT Guwahati) with Elite Certification.",
        "Designed and verified Multi-Mode Parameterized SPI Master Controller supporting all 4 SPI modes.",
        "Implemented UART Transceiver (9600 baud), PWM Generator with debouncing, and Synchronous FIFO in Verilog.",
      ],
    },
  ],

  projects: [
    {
      id: "spi-master-controller",
      name: "Multi-Mode Parameterized SPI Master Controller",
      category: "rtl" as const,
      tagline: "Fully parameterized SPI Master IP in Verilog supporting all 4 SPI modes with dynamic edge-transition logic.",
      description: "Designed a fully parameterized SPI Master IP in Verilog supporting variable word lengths and runtime-configurable clock division with dynamic CPOL/CPHA matrix.",
      highlights: [
        "Designed a fully parameterized SPI Master IP in Verilog supporting variable word lengths and runtime-configurable clock division.",
        "Engineered dynamic edge-transition logic supporting all 4 SPI modes via runtime CPOL and CPHA configuration matrix.",
        "Developed an FSM gating the clock divider strictly within active transfer windows to ensure clean, deterministic timing.",
        "Implemented integrated bidirectional shift registers to execute synchronized, full-duplex serial-to-parallel data conversion.",
        "Verified protocol compliance, state transitions, and data bus integrity across all mode configurations via Vivado simulation.",
      ],
      technologies: ["Verilog HDL", "Xilinx Vivado", "GTKWave", "FSM Design"],
      metrics: {
        "Modes Supported": "All 4 SPI Modes (Mode 0, 1, 2, 3)",
        "Configuration": "Runtime CPOL & CPHA matrix",
        "Data Transfer": "Synchronized Full-Duplex Serial-to-Parallel",
        "Simulation": "Xilinx Vivado & GTKWave Verified",
      },
      files: ["master.v", "master_adv.v", "spi_slave_model.v", "test.v"],
      githubUrl: "",
    },
    {
      id: "uart-transceiver",
      name: "UART Transmitter and Receiver using Verilog",
      category: "rtl" as const,
      tagline: "Asynchronous serial communication transmitter and receiver modules at 9600 baud rate with dedicated baud rate generator.",
      description: "Designed and implemented UART Transmitter and Receiver modules in Verilog HDL for asynchronous serial communication with dedicated baud rate generator and FSM control logic.",
      highlights: [
        "Designed and implemented UART Transmitter and Receiver modules in Verilog HDL for asynchronous serial communication.",
        "Configured communication at 9600 baud rate using a dedicated baud rate generator.",
        "Developed FSM-based control logic for serial data transmission and reception.",
        "Verified correct data transfer and protocol functionality through simulation in Xilinx Vivado.",
      ],
      technologies: ["Verilog HDL", "Xilinx Vivado", "Serial Protocols", "FSM"],
      metrics: {
        "Baud Rate": "9600 Baud",
        "Modules": "Independent Tx, Rx, and Baud Rate Generator",
        "FSM States": "IDLE, START, DATA, STOP",
        "Verification": "Xilinx Vivado Simulation",
      },
      files: ["UART.v", "transmitter_module.v", "receiver_module.v", "baudrate_generator.v"],
      githubUrl: "",
    },
    {
      id: "pwm-generator",
      name: "PWM Generator with Variable Duty Cycle Control",
      category: "rtl" as const,
      tagline: "Dynamic PWM generator in Verilog HDL with real-time push-button duty cycle modification and switch debouncing.",
      description: "Designed a PWM generator in Verilog HDL with dynamically adjustable duty cycle, push-button controls for real-time duty cycle modification, and debouncing logic.",
      highlights: [
        "Designed a PWM generator in Verilog HDL with dynamically adjustable duty cycle.",
        "Implemented increase and decrease push-button controls for real-time duty cycle modification.",
        "Integrated debouncing logic to eliminate false triggering caused by mechanical switch bounce.",
        "Verified PWM waveform generation and duty cycle variations through simulation in Xilinx Vivado.",
      ],
      technologies: ["Verilog HDL", "Xilinx Vivado", "Digital Filters", "Debouncing Logic"],
      metrics: {
        "Duty Cycle Control": "Dynamic Push-Button (Increase / Decrease)",
        "Switch Debounce": "Integrated Digital Sampling Debouncer",
        "Output": "Clean variable duty cycle PWM waveform",
        "Simulation": "Vivado Waveform Analysis",
      },
      files: ["top.v", "toptb.v", "top_prac.v"],
      githubUrl: "",
    },
    {
      id: "synchronous-fifo",
      name: "Synchronous FIFO Design using Verilog",
      category: "rtl" as const,
      tagline: "Parameterized synchronous FIFO architecture for temporary data storage, pointer management, and flag generation.",
      description: "Designed a parameterized synchronous FIFO architecture for temporary data storage and transfer with read/write pointer logic along with full and empty flag generation.",
      highlights: [
        "Designed a parameterized synchronous FIFO architecture for temporary data storage and transfer.",
        "Implemented read/write pointer logic along with full and empty flag generation.",
        "Verified FIFO operation under different read and write conditions through simulation.",
        "Analyzed waveform results to validate functionality and timing behavior.",
      ],
      technologies: ["Verilog HDL", "Xilinx Vivado", "Memory Architectures", "Pointer Logic"],
      metrics: {
        "Architecture": "Parameterized Synchronous FIFO",
        "Pointer Logic": "Binary read/write pointers with wrap-around detection",
        "Flags": "Full, Empty, Almost-Full, Almost-Empty",
        "Simulation": "Vivado Timing and Corner-case Simulation",
      },
      files: ["sync_fifo.v", "fifo_mem.v", "sync_fifo_tb.v"],
      githubUrl: "",
    },
  ],

  edaToolsList: [
    {
      name: "Xilinx Vivado",
      category: "Simulation" as const,
      description: "Industry-standard FPGA design and verification suite for Verilog HDL synthesis, place & route, and simulation.",
      version: "2023.2",
      openSource: false,
      command: "vivado -mode tcl -source run_sim.tcl",
      license: "Standard Edition",
    },
    {
      name: "Icarus Verilog",
      category: "RTL Simulation" as const,
      description: "Open-source Verilog simulation and synthesis compiler conforming to the IEEE 1364 standard.",
      version: "12.0",
      openSource: true,
      command: "iverilog -o sim.vvp tb.v dut.v && vvp sim.vvp",
      license: "GPL-2.0",
    },
    {
      name: "GTKWave",
      category: "Waveform Viewer" as const,
      description: "Electronic waveform analysis tool for inspecting VCD, FST, and LXT simulation output dumps.",
      version: "3.3.118",
      openSource: true,
      command: "gtkwave dump.vcd",
      license: "GPL-2.0",
    },
  ],
};
