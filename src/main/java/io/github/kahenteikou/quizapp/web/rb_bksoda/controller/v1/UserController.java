package io.github.kahenteikou.quizapp.web.rb_bksoda.controller.v1;

import io.github.kahenteikou.quizapp.web.rb_bksoda.model.User;
import io.github.kahenteikou.quizapp.web.rb_bksoda.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("api/v1/users")
@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserRepository userRepository;
    @Operation(summary = "Get all users")
    @GetMapping("/")
    List<User> findAll(){
        return userRepository.findAll();
    }
    
}
