package io.github.kahenteikou.quizapp.web.rb_bksoda.controller.v1;

import io.github.kahenteikou.quizapp.web.rb_bksoda.model.User;
import io.github.kahenteikou.quizapp.web.rb_bksoda.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/v1/users")
@RequiredArgsConstructor
@RestController
public class UserController {
    @NotNull
    private final UserRepository userRepository;
    @Operation(summary = "Get all users")
    @GetMapping("/")
    List<User> findAll(){
        return userRepository.findAll();
    }
    @Operation(summary = "Create a new user")
    @PostMapping("/")
    User save(@RequestBody User user){
        return userRepository.save(user);
    }
    

}
