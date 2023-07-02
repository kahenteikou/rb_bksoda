package io.github.kahenteikou.quizapp.web.rb_bksoda;

import org.springframework.boot.autoconfigure.websocket.servlet.WebSocketMessagingAutoConfiguration;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessagingAutoConfiguration {
}
