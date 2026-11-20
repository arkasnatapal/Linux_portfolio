module baud_rate_gen(
    input  clk, rst,
    output tx_enb, rx_enb
);

reg [12:0] tx_counter;
reg [9:0]  rx_counter;

// TX baud enable - 5208 cycles for 9600 baud at 50MHz
// (50_000_000 / 9600 = 5208)
always @(posedge clk) begin
    if (rst)
        tx_counter <= 13'h0;
    else if (tx_counter == 13'd5208)
        tx_counter <= 13'h0;
    else
        tx_counter <= tx_counter + 1'b1;
end

// RX baud enable - 16x oversampling (5208 / 16 = 325)
always @(posedge clk) begin
    if (rst)
        rx_counter <= 10'h0;
    else if (rx_counter == 10'd325)
        rx_counter <= 10'h0;
    else
        rx_counter <= rx_counter + 1'b1;
end

assign tx_enb = (tx_counter == 13'd0) ? 1'b1 : 1'b0;
assign rx_enb = (rx_counter == 10'd0) ? 1'b1 : 1'b0;

endmodule
