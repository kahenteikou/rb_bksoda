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

@RequestMapping("api/v1/question")
@RequiredArgsConstructor
@RestController
public class QuestionController {
    @NotNull
    private final Question_Repository question_Repository;

    @Operation(summary = "Get all questions")
    @GetMapping("/")
    List<Question> findAll(){
        return question_Repository.findAll();
    }

    @Operation(summary = "Create a new question")
    @PostMapping("/")
    Question save(@RequestBody Question q){
        return question_Repository.save(new Question(q));
    }

    @Operation(summary = "Get a question  by id")
    @GetMapping("/{id}")
    Question findById(@PathVariable Long id){
        return question_Repository.findById(id).get();
    }
    @Operation(summary = "Update question")
    @PutMapping("/{id}")
    Question save(@RequestBody Question newq,@PathVariable Long id){
        return question_Repository.findById(id).map(q->{
            q.setQuestion_ls_id(newq.getQuestion_ls_id());
            q.setContent(newq.getContent());
            q.setAnswer(newq.getAnswer());
            q.setQuestion_name(newq.getQuestion_name());
            q.setOrder_no(newq.getOrder_no());
            return question_Repository.save(q);
        }).orElseGet(()->{
            newq.setId(id);
            return question_Repository.save(newq);
        });
    }
    @Operation(summary = "Delete a question  by id")
    @DeleteMapping("/{id}")
    void deleteById(@PathVariable Long id){
        question_Repository.deleteById(id);
    }


    @Operation(summary = "Get all questions QS")
    @GetMapping("/qs/{qs_id}")
    List<Question> findAll_QS(@PathVariable Long qs_id){
        return question_Repository.findAll().stream().filter(q->q.getQuestion_ls_id()==qs_id).toList();
    }
}
