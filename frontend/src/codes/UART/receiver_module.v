module receiver(
    input            clk, rst, rdy_clr, rx_enb, rx,
    output reg       rdy,
    output reg [7:0] data_out
);

parameter start_state    = 2'b00;
parameter data_out_state = 2'b01;
parameter stop_state     = 2'b10;

reg [3:0] sample        = 0;
reg [3:0] index         = 0;
reg [7:0] temp_register = 8'b0;
reg [1:0] state         = start_state;

// Single always block - reset, rdy_clr and FSM merged
always @(posedge clk) begin
    if (rst) begin
        rdy           <= 1'b0;
        data_out      <= 8'h0;
        sample        <= 4'h0;
        index         <= 4'h0;
        temp_register <= 8'h0;
        state         <= start_state;
    end else begin

        if (rdy_clr)
            rdy <= 1'b0;

        if (rx_enb) begin
            case (state)

                start_state:
                 begin
                    // Start counting as soon as rx goes low (start bit detected)
                    if (rx == 1'b0)
                     begin
                        sample <= sample + 1'b1;
                    end 
                    else
                     begin
                        sample <= 4'h0;  // rx went high again - false start, reset
                    end
                    // At mid-point of start bit (sample==7), confirm and move on
                    if (sample == 4'hF) begin
                        state         <= data_out_state;
                        sample        <= 4'h0;
                        index         <= 4'h0;
                        temp_register <= 8'h0;
                    end
                end

                data_out_state: begin
                    sample <= sample + 1'b1;
                    // Sample each data bit at the middle of the bit period (sample==8)
                    if (sample == 4'h8) begin
                        temp_register[index] <= rx;
                        index <= index + 1'b1;
                    end
                    // After 8 bits are received, move to stop state
                    if (sample == 4'hF && index == 4'h8) begin
                        state  <= stop_state;
                        sample <= 4'h0;
                    end
                end

                stop_state: begin
                    sample <= sample + 1'b1;
                    if (sample == 4'hF) begin
                        state    <= start_state;
                        data_out <= temp_register;
                        sample   <= 4'h0;
                        rdy      <= 1'b1;
                    end
                end

                default: begin
                    state <= start_state;
                end

            endcase
        end
    end
end

endmodule
