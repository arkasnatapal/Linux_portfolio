module uart_tb;

reg        clk, rst, wr_enb, rdy_clr;
reg  [7:0] data_in;
wire       busy, rdy;
wire [7:0] data_out;

// Instantiate UART top module
uart u1(clk, rst, wr_enb, rdy_clr, data_in, busy, rdy, data_out);

// Initialize all signals
initial begin
    {clk, rst, wr_enb, rdy_clr, data_in} = 0;
end

// 100MHz clock (10ns period)
always #5 clk = ~clk;

// Task: send one byte
task send_byte;
    input [7:0] din;
    begin
        @(negedge clk);
        data_in = din;
        wr_enb  = 1'b1;
        @(negedge clk);
        wr_enb  = 1'b0;
    end
endtask

// Task: clear ready flag
task clear_ready;
    begin
        @(negedge clk);
        rdy_clr = 1'b1;
        @(negedge clk);
        rdy_clr = 1'b0;
    end
endtask

initial begin
    // Apply reset
    @(negedge clk);
    rst = 1'b1;
    @(negedge clk);
    rst = 1'b0;

    // --- Test 1: Send 0x41 ('A') ---
    send_byte(8'h41);
    wait(!busy);         // wait for TX to finish
    wait(rdy);           // wait for RX to signal data ready
    $display("Test 1 - Received data: %h (expected: 41)", data_out);
    clear_ready;

    // Small gap between bytes
    repeat(10) @(negedge clk);

    // --- Test 2: Send 0x55 ('U') ---
    send_byte(8'h55);
    wait(!busy);         // wait for TX to finish
    wait(rdy);           // wait for RX to signal data ready
    $display("Test 2 - Received data: %h (expected: 55)", data_out);
    clear_ready;

    // Allow time to settle before finishing
    #5000000;            // 5ms - enough for full UART frame at 9600 baud
    $display("Simulation complete.");
    $finish;
end

endmodule
