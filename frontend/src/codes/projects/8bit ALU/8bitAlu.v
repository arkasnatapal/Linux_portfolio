
module alu8bit(a,b,sel,out);

input [7:0] a;
input [7:0] b;
input [3:0] sel;
output reg [15:0] out;

always @(*) begin
    case (sel)

        4'b0000 : out = a + b;                     // ADD
        4'b0001 : out = a - b;                     // SUB
        4'b0010 : out = a * b;                     // MUL

        4'b0011 : begin                           // DIV
                    if(b != 0)
                        out = a / b;
                    else
                        out = 16'd0;
                  end

        4'b0100 : out = a << 1;                    // LEFT SHIFT
        4'b0101 : out = a >> 1;                    // RIGHT SHIFT

        4'b0110 : out = {a[6:0],a[7]};             // ROTATE LEFT
        4'b0111 : out = {a[0],a[7:1]};             // ROTATE RIGHT

        4'b1000 : out = a & b;                     // AND
        4'b1001 : out = a | b;                     // OR
        4'b1010 : out = a ^ b;                     // XOR

        4'b1011 : out = ~(a | b);                  // NOR
        4'b1100 : out = ~(a & b);                  // NAND
        4'b1101 : out = ~(a ^ b);                  // XNOR

        4'b1110 : out = (a > b)  ? 16'd1 : 16'd0;  // GREATER THAN
        4'b1111 : out = (a == b) ? 16'd1 : 16'd0;  // EQUAL

        default : out = 16'd0;

    endcase
end
endmodule


module test;
reg [7:0] a;
reg [7:0] b;
reg [3:0] sel;
wire [15:0] out;

alu8bit al1(a,b,sel,out);

initial begin

$monitor("TIME=%0t SEL=%b A=%b B=%b OUT=%b",
          $time,sel,a,b,out);

sel=4'b0000; a=8'b11111111; b=8'b00000000; // ADD
#20;
sel=4'b0001; a=8'b11110000; b=8'b00001111; // SUB
#20;
sel=4'b0010; a=8'b00000101; b=8'b00000011; // MUL
#20;
sel=4'b0011; a=8'b00001000; b=8'b00000010; // DIV
#20;
sel=4'b0100; a=8'b00001111; b=8'b00000000; // LEFT SHIFT
#20;
sel=4'b0101; a=8'b00001111; b=8'b00000000; // RIGHT SHIFT
#20;
sel=4'b0110; a=8'b10101010; b=8'b00000000; // ROTATE LEFT
#20;
sel=4'b0111; a=8'b10101010; b=8'b00000000; // ROTATE RIGHT
#20;
sel=4'b1000; a=8'b11110000; b=8'b00001111; // AND
#20;
sel=4'b1001; a=8'b11110000; b=8'b00001111; // OR
#20;
sel=4'b1010; a=8'b11110000; b=8'b00001111; // XOR
#20;
sel=4'b1011; a=8'b11110000; b=8'b00001111; // NOR
#20;
sel=4'b1100; a=8'b11110000; b=8'b00001111; // NAND
#20;
sel=4'b1101; a=8'b11110000; b=8'b00001111; // XNOR
#20;
sel=4'b1110; a=8'b00001111; b=8'b00000011; // GREATER THAN
#20;
sel=4'b1111; a=8'b00001111; b=8'b00001111; // EQUAL
#20;
$finish;
end
endmodule