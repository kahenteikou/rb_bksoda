package io.github.kahenteikou.quizapp.web.rb_bksoda;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
@Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**").allowedOrigins("http://localhost:3000")
                .allowedMethods("GET","POST","PUT","DELETE","HEAD","OPTIONS")
                .allowedHeaders("Authorization","Content-Type","Accept","Origin","Access-Control-Request-Method","Access-Control-Request-Headers");
    }
}
