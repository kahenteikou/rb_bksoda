package io.github.kahenteikou.quizapp.web.rb_bksoda.model;

import lombok.Data;

@Data
public class MainWebSocketMsg {
    private String command;
    private String content;
    public MainWebSocketMsg(String cmd,String cont){
        this.command=cmd;
        this.content=cont;
    }
}
