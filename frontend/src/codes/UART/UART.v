module uart(input clk,rst,wr_enb,rdy_clr,input[7:0]data_in,output busy,rdy,output[7:0]data_out);
wire rx_clk_en,tx_clk_en; //this connects the BRG to Rx and Tx respectiveely
wire tx_temp; // this connnects the o/p of Tx to Rx

baud_rate_gen brg(clk,rst,tx_clk_en,rx_clk_en);
receiver r1(clk,rst,rdy_clr,rx_clk_en,tx_temp,rdy,data_out);
transmitter t1(clk,rst,tx_clk_en,wr_enb,data_in,tx_temp,busy);

endmodule