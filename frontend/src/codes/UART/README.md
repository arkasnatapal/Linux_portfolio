# Loopback UART Transceiver with Baud Rate Generator

This directory contains a complete, self-contained **UART (Universal Asynchronous Receiver-Transmitter) Transceiver** module written in Verilog. Designed for loopback communication, it includes a baud rate generator, a transmitter with a status flag, and a receiver utilizing $16\times$ oversampling for noise filtering and robust data extraction.

---

## 🏗️ System Architecture

The top-level `uart` module wires the transmitter's serial output (`tx`) directly to the receiver's serial input (`rx`) using an internal signal (`tx_temp`). This loopback architecture is ideal for self-testing, system verification, and local diagnostic logic.

```mermaid
graph TD
    classDef main fill:#1e1e2e,stroke:#cba6f7,stroke-width:2px,color:#cdd6f4;
    classDef module fill:#313244,stroke:#45475a,stroke-width:1.5px,color:#cdd6f4;

    subgraph UART_Transceiver ["uart (Top-Level Wrapper)"]
        BRG["baud_rate_gen (brg)"]
        TX["transmitter (t1)"]
        RX["receiver (r1)"]
    end

    %% Inputs
    CLK((clk)) --> BRG & TX & RX
    RST((rst)) --> BRG & TX & RX
    WR_EN((wr_enb)) --> TX
    DATA_IN(("data_in [7:0]")) --> TX
    RDY_CLR((rdy_clr)) --> RX

    %% Baud Enables
    BRG -->|tx_clk_en| TX
    BRG -->|rx_clk_en| RX

    %% Serial Loopback
    TX -->|"tx_temp (Serial TX)"| RX

    %% Outputs
    TX -->|busy| BUSY((busy))
    RX -->|rdy| RDY((rdy))
    RX -->|"data_out [7:0]"| DATA_OUT(("data_out [7:0]"))

    class UART_Transceiver main;
    class BRG,TX,RX module;
```

---

## 🔌 Port Definitions & Interface

### Top-Level Module (`uart`)

| Port Name  | Direction | Bit-Width | Description                                                        |
| ---------- | --------- | --------- | ------------------------------------------------------------------ |
| `clk`      | Input     | `1`       | System Clock (Default: 50 MHz).                                    |
| `rst`      | Input     | `1`       | Asynchronous Active-High Reset.                                    |
| `wr_enb`   | Input     | `1`       | Write Enable; pulse high to load `data_in` and begin transmission. |
| `rdy_clr`  | Input     | `1`       | Ready Clear; pulse high to clear the receiver's `rdy` status flag. |
| `data_in`  | Input     | `8`       | Parallel data byte to transmit.                                    |
| `busy`     | Output    | `1`       | Active-high status flag indicating transmitter is active.          |
| `rdy`      | Output    | `1`       | Active-high status flag indicating a new byte has been received.   |
| `data_out` | Output    | `8`       | Parallel data byte received.                                       |

---

## ⚙️ Sub-Module Specifications

### 1. Baud Rate Generator (`baud_rate_gen`)

Divides the master `clk` input down to appropriate baud ticks. For a system clock of **50 MHz** and a target speed of **9600 Baud**:
- **TX Baud Tick (`tx_enb`)**: Generates an enable pulse every **5208** clock cycles.
  $$\text{TX Ticks} = \frac{50,000,000 \text{ Hz}}{9600 \text{ Baud}} \approx 5208 \text{ cycles}$$
- **RX Baud Tick (`rx_enb`)**: Generates an oversampling tick at $16\times$ the baud rate (every **325** clock cycles) to facilitate start-bit detection and midpoint data sampling.
  $$\text{RX Ticks} = \frac{50,000,000 \text{ Hz}}{9600 \text{ Baud} \times 16} \approx 325 \text{ cycles}$$

---

### 2. Transmitter (`transmitter`)

Performs parallel-to-serial conversion using a 4-state Finite State Machine (FSM):

```mermaid
stateDiagram-v2
    [*] --> idle_state : Reset (rst)
    
    idle_state --> start_state : wr_enb == 1\n(Captures data_in)
    idle_state --> idle_state : wr_enb == 0
    
    start_state --> data_state : tx_enb == 1\n(Sends start bit, logic 0)
    start_state --> start_state : tx_enb == 0
    
    data_state --> stop_state : tx_enb == 1 && index == 7\n(Sends bit 7)
    data_state --> data_state : tx_enb == 1 && index < 7\n(Increments index)
    
    stop_state --> idle_state : tx_enb == 1\n(Sends stop bit, logic 1)

    note right of idle_state : tx = 1, busy = 0
    note right of start_state : tx = 0, busy = 1
    note right of data_state : tx = data[index], busy = 1
    note right of stop_state : tx = 1, busy = 1
```

- **States**:
  - `idle_state` (`2'b00`): Drives `tx` high (`1'b1`). Transitions to `start_state` when `wr_enb` is asserted, capturing the input byte into a holding register.
  - `start_state` (`2'b01`): Drives the serial line low (`1'b0`) to signal the start bit upon the next `tx_enb` tick.
  - `data_state` (`2'b10`): Shifts out 8 data bits sequentially (LSB first) driven by `tx_enb` ticks.
  - `stop_state` (`2'b11`): Drives `tx` high (`1'b1`) to signal the stop bit.
- **Status Flag**: `busy` is asserted throughout the entire process (`state != idle_state`).

---

### 3. Receiver (`receiver`)

Extracts incoming data from the serial line using $16\times$ oversampling to locate the center of each bit period, avoiding noise and clock skew.

```mermaid
stateDiagram-v2
    [*] --> start_state : Reset (rst)
    
    start_state --> data_out_state : rx_enb == 1 && sample == 15\n(Start bit confirmed)
    start_state --> start_state : rx_enb == 1 && sample < 15
    
    data_out_state --> stop_state : rx_enb == 1 && sample == 15 && index == 8\n(All 8 bits sampled)
    data_out_state --> data_out_state : rx_enb == 1 && sample < 15
    
    stop_state --> start_state : rx_enb == 1 && sample == 15\n(Ready asserted, output updated)
```

- **FSM Operation & Oversampling Ticks**:
  - **Start Bit Verification**: In `start_state` (`2'b00`), the receiver waits for `rx` to drop to `1'b0`. If `rx` remains low, the `sample` counter increments on every `rx_enb` pulse. If it reaches `15` (equivalent to a full bit duration), the receiver confirms a valid start bit and transitions to `data_out_state`. A glitch/noise that returns `rx` to `1'b1` resets the `sample` counter.
  - **Mid-Bit Sampling**: In `data_out_state` (`2'b01`), the receiver counts 16 `rx_enb` pulses per bit. When `sample` reaches `8` (exactly the middle of the bit period), the state of `rx` is latched into `temp_register[index]`. When all 8 bits are read, it transitions to `stop_state`.
  - **Ready & Output**: In `stop_state` (`2'b10`), the receiver waits 16 oversampling ticks for the stop bit. Once verified, the received byte is loaded into `data_out` and the `rdy` output goes high.