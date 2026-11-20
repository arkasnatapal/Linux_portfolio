`timescale 1ns/1ps

module traffic_control(x, clk, clear, hwy, cntry);

input x, clk, clear;
output reg [1:0] hwy, cntry;
reg [2:0] state, next_state;

// State definitions
parameter S0 = 3'd0,
          S1 = 3'd1,
          S2 = 3'd2,
          S3 = 3'd3,
          S4 = 3'd4;

// Light definitions
parameter RED    = 2'd0,
          YELLOW = 2'd1,
          GREEN  = 2'd2;


// State register
always @(posedge clk or posedge clear)
begin
    if(clear)
        state <= S0;
    else
        state <= next_state;
end


// Output logic
always @(*)
begin
    case(state)

        S0: begin
            hwy   = GREEN;
            cntry = RED;
        end

        S1: begin
            hwy   = YELLOW;
            cntry = RED;
        end

        S2: begin
            hwy   = RED;
            cntry = RED;
        end

        S3: begin
            hwy   = RED;
            cntry = GREEN;
        end

        S4: begin
            hwy   = RED;
            cntry = YELLOW;
        end

        default: begin
            hwy   = GREEN;
            cntry = RED;
        end

    endcase
end


// Next-state logic
always @(*)
begin
    case(state)

        S0:
            if(x) next_state = S1;
            else  next_state = S0;

        S1:
            next_state = S2;

        S2:
            next_state = S3;

        S3:
            if(~x) next_state = S4;
            else   next_state = S3;

        S4:
            next_state = S0;

        default:
            next_state = S0;

    endcase
end

endmodule
