package io.github.kahenteikou.quizapp.web.rb_bksoda.controller.v1;

import io.github.kahenteikou.quizapp.web.rb_bksoda.model.User;
import io.github.kahenteikou.quizapp.web.rb_bksoda.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;
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
    @GetMapping({"/",""})
    List<User> findAll(HttpServletResponse hsr){

        List<User> resultval= userRepository.findAll();
        hsr.setHeader("X-Total-Count", String.valueOf(resultval.size()));
        hsr.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
        return resultval;
    }
    @Operation(summary = "Create a new user")
    @PostMapping("/")
    User save(@RequestBody User user){
        return userRepository.save(user);
    }
    @Operation(summary = "Get a user by id")
    @GetMapping("/{id}")
    User findById(@PathVariable String id){
        return userRepository.findById(id).get();
    }
    @Operation(summary = "Update User")
    @PutMapping("/{id}")
    User save(@RequestBody User newUser,@PathVariable String id){
        return userRepository.findById(id).map(user->{
            user.setUsername(newUser.getUsername());
            user.setDisplayname(newUser.getDisplayname());
            user.setDescription(newUser.getDescription());
            return userRepository.save(user);
        }).orElseGet(()->{
            newUser.setUuid(id);
            return userRepository.save(newUser);
        });
    }
    @Operation(summary = "Delete a user by id")
    @DeleteMapping("/{id}")
    void deleteById(@PathVariable String id){
        userRepository.deleteById(id);
    }

}
