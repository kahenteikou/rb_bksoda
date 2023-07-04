package io.github.kahenteikou.quizapp.web.rb_bksoda.controller.v1;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class Main_WSoc_Handler extends TextWebSocketHandler {
    private Map<String, WebSocketSession> session_m=new ConcurrentHashMap<>() ;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        this.session_m.put(session.getId(),session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        this.session_m.remove(session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        for(Map.Entry<String,WebSocketSession> entry:this.session_m.entrySet()){
            entry.getValue().sendMessage(message);
        }
    }
}
