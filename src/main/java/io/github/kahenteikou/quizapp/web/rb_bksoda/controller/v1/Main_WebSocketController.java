package io.github.kahenteikou.quizapp.web.rb_bksoda.controller.v1;

import io.github.kahenteikou.quizapp.web.rb_bksoda.model.MainWebSocketMsg;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.util.HtmlUtils;

@Controller
public class Main_WebSocketController {
    @MessageMapping("api/v1/websocket/msg_1")
    @SendTo("api/v1/websocket/receiver/msg_1")
    public MainWebSocketMsg send(MainWebSocketMsg msg) throws Exception{
        Thread.sleep(100);
        return new MainWebSocketMsg(HtmlUtils.htmlEscape(msg.getCommand()),HtmlUtils.htmlEscape(msg.getContent()));
    }
}
