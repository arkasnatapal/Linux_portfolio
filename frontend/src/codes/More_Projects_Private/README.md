# 🔒 Additional Hardware & RTL Projects (Private Repositories)

### **Arkasnata Pal — Digital VLSI & RTL Design Portfolio**
> **GitHub Profile**: [github.com/arkasnatapal](https://github.com/arkasnatapal)  
> **Repository Access**: Private & Proprietary (Available upon recruiter/interviewer verification)

---

## 📌 Private Codebases & Hardware Implementations

While **UART**, **PWM**, and **SPI** controllers are open for interactive demonstration in this workstation, additional industry-grade RTL cores and architectures are maintained in private GitHub repositories:

### 1. ⚙️ Parameterized 8-Bit Arithmetic Logic Unit (ALU)
- **Architecture**: 16 distinct arithmetic and logical operations controlled by an 8-bit opcode.
- **Features**:
  - High-speed carry-lookahead addition and subtraction.
  - Bitwise operations (AND, OR, XOR, NOR, NAND, XNOR).
  - Arithmetic and logical shifting (SHL, SHR, ROL, ROR).
  - Dedicated flag register status signals (`Zero`, `Carry`, `Overflow`, `Parity`, `Negative`).
- **Verification**: Self-checking testbench with 10,000+ randomized stimulus vectors verifying corner cases against a C reference model.

---

### 2. 🚦 Finite State Machine (FSM) Traffic Light Controller
- **Architecture**: Synchronous Mealy/Moore hybrid state machine with timing delay parameters.
- **Features**:
  - Main street vs. side street priority scheduling with emergency vehicle sensor override.
  - Pedestrian walk request latching with glitch-free output decoding.
  - Parameterized state transitions preventing conflicting green-light states under all clock conditions.
- **Verification**: Formally verified state reachability and comprehensive timing simulation in ModelSim/Questa.

---

### 3. 🔄 Synchronous & Asynchronous (Dual-Clock) FIFOs
- **Architecture**: Parameterized circular buffer with Gray-code write/read pointer synchronization.
- **Features**:
  - 2-FF synchronizer stages eliminating metastability across asynchronous clock domains (CDC).
  - Dynamic status flags: `full`, `empty`, `almost_full`, `almost_empty`.
  - Zero read latency and single-cycle write commit.

---

### 4. 🔌 AXI4-Lite Peripheral Bridge
- **Architecture**: Memory-mapped slave interface bridging standard microprocessor buses to custom RTL accelerators.
- **Features**:
  - Full handshake protocols (`AWVALID`/`AWREADY`, `WVALID`/`WREADY`, `BVALID`/`BREADY`, `ARVALID`/`ARREADY`, `RVALID`/`RREADY`).
  - Read-only and Read/Write memory-mapped control and status registers (CSRs).

---

### 5. 💻 RISC-V RV32I Processor Subsystem (In Progress)
- **Architecture**: 32-bit RISC-V integer base instruction set architecture (RV32I).
- **Features**:
  - Harvard memory architecture (separate instruction and data memories).
  - Single-cycle and 5-stage pipelined execution stages (IF, ID, EX, MEM, WB).
  - Hazard detection unit, data forwarding paths, and branch resolution logic.

---

## 📬 How to Request Source Code Access

To review the full Verilog source code, SystemVerilog verification environments, synthesis constraints, and Vivado timing reports for these private projects:

- **GitHub**: [https://github.com/arkasnatapal](https://github.com/arkasnatapal)
- **LinkedIn**: [https://linkedin.com/in/arkasnata-pal-6a3682276](https://linkedin.com/in/arkasnata-pal-6a3682276)
- **Email**: [arkasnatapal2005@gmail.com](mailto:arkasnatapal2005@gmail.com)
