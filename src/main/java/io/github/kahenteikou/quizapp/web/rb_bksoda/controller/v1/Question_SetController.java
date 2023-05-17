package io.github.kahenteikou.quizapp.web.rb_bksoda.controller.v1;


import io.github.kahenteikou.quizapp.web.rb_bksoda.model.Question_Set;
import io.github.kahenteikou.quizapp.web.rb_bksoda.model.User;
import io.github.kahenteikou.quizapp.web.rb_bksoda.repository.Question_SetRepository;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/v1/question_sets")
@RequiredArgsConstructor
@RestController
public class Question_SetController {
/*    @NotNull
    private final Question_SetRepository question_setRepository;

    @Operation(summary = "Get all sets")
    @GetMapping("/")
    List<Question_Set> findAll(){
        return question_setRepository.findAll();
    }

    @Operation(summary = "Create a new question set")
    @PostMapping("/")
    Question_Set save(@RequestBody Question_Set qs){
        return question_setRepository.save(new Question_Set(qs));
    }

    @Operation(summary = "Get a question set by id")
    @GetMapping("/{id}")
    Question_Set findById(@PathVariable String id){
        return question_setRepository.findById(id).get();
    }
    @Operation(summary = "Update question set")
    @PutMapping("/{id}")
    Question_Set save(@RequestBody Question_Set newqs,@PathVariable String id){
        return question_setRepository.findById(id).map(qs->{
            qs.setQuestionset_name(newqs.getQuestionset_name());
            return question_setRepository.save(qs);
        }).orElseGet(()->{
            newqs.setUuid(id);
            return question_setRepository.save(newqs);
        });
    }
    @Operation(summary = "Delete a question set by id")
    @DeleteMapping("/{id}")
    void deleteById(@PathVariable String id){
        question_setRepository.deleteById(id);
    }*/


}
