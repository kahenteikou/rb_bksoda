package io.github.kahenteikou.quizapp.web.rb_bksoda.controller.v1;

import io.github.kahenteikou.quizapp.web.rb_bksoda.model.Question;
import io.github.kahenteikou.quizapp.web.rb_bksoda.model.Question_Set;
import io.github.kahenteikou.quizapp.web.rb_bksoda.repository.Question_Repository;
import io.github.kahenteikou.quizapp.web.rb_bksoda.repository.Question_SetRepository;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequestMapping("api/v1/question_db")
@RequiredArgsConstructor
@RestController
public class QuestionController {
    @NotNull
    private final Question_Repository question_Repository;

    @Operation(summary = "Get all questions")
    @GetMapping("/question/")
    List<Question> findAll(){
        return question_Repository.findAll();
    }

    @Operation(summary = "Create a new question")
    @PostMapping("/question/")
    Question save(@RequestBody Question q){
        return question_Repository.save(new Question(q));
    }

    @Operation(summary = "Get a question  by id")
    @GetMapping("/question/{id}")
    Question findById(@PathVariable String id){
        return question_Repository.findById(id).get();
    }
    @Operation(summary = "Update question")
    @PutMapping("/question/{id}")
    Question save(@RequestBody Question newq,@PathVariable String id){
        return question_Repository.findById(id).map(q->{
            q.setContent(newq.getContent());
            q.setAnswer(newq.getAnswer());
            q.setQuestion_name(newq.getQuestion_name());
            return question_Repository.save(q);
        }).orElseGet(()->{
            newq.setUuid(id);
            return question_Repository.save(newq);
        });
    }
    @Operation(summary = "Delete a question  by id")
    @DeleteMapping("/question/{id}")
    void deleteById(@PathVariable String id){
        question_Repository.deleteById(id);
    }
    
}
