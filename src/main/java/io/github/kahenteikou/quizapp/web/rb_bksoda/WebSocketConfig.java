package io.github.kahenteikou.quizapp.web.rb_bksoda;

import io.github.kahenteikou.quizapp.web.rb_bksoda.controller.v1.Main_WSoc_Handler;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new Main_WSoc_Handler(),"/wsoc_rp")
                .setAllowedOriginPatterns("*");
    }
}
