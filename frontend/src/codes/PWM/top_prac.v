module dff(input clk,en,d,output reg q);
    always@(posedge clk)
    begin
        if(enb)
        q<=d;
    end
endmodule


module top2(input clk,increase_duty,decrease_duty,output pwm_out);
reg[3:0] duty_cycle=5;
reg[3:0] counter_pwm= 0;
reg[27:0]counter_debounce=0;
wire slow_clk_enable,duty_inc,duty_dec,tmp1,tmp2,tmp3,tmp4;

always @(posedge clk)
begin
    counter_debounce<=counter_debounce+1;
    if(counter_debounce>=1)
        counter_debounce<=0;
end
assign slow_clk_enable = (counter_debounce==1)?1:0;
dff dff1(clk,slow_clk_enable,increase_duty,tmp1);
dff dff2(clk,slow_clk_enable,tmp1,tmp2);
assign duty_inc= (tmp1)&(~tmp2)&(slow_clk_enable);

dff dff3(clk,slow_clk_enable,decrease_duty,tmp3);
dff dff4(clk,slow_clk_enable,tmp3,tmp4);
assign duty_dec= (tmp3)&(~tmp4)&(slow_clk_enable);

always@(posedge clk)begin
    if(duty_inc==1 & duty_cycle<=9)
        duty_cycle<=duty_cycle+1;
    else if (duty_dec==1 & duty_cycle>=1)
        duty_cycle <= duty_cycle-1;
end


always@(posedge clk)
begin
    counter_pwm <= counter_pwm+1;
    if(counter_pwm>=9)
        counter_pwm <=0;
end
assign pwm_out =(counter_pwm<duty_cycle)?1:0;

endmodule