package io.github.kahenteikou.quizapp.web.rb_bksoda.controller.v1;

import io.github.kahenteikou.quizapp.web.rb_bksoda.model.Question;
import io.github.kahenteikou.quizapp.web.rb_bksoda.model.Question_Set;
import io.github.kahenteikou.quizapp.web.rb_bksoda.repository.Question_Repository;
import io.github.kahenteikou.quizapp.web.rb_bksoda.repository.Question_SetRepository;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RequestMapping("api/v1/question_db")
@RequiredArgsConstructor
@RestController
public class QuestionController {
    @NotNull
    private final Question_Repository question_Repository;
    @NotNull
    private final Question_SetRepository question_setRepository;

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

    @Operation(summary = "Get all sets")
    @GetMapping("/question_set/")
    List<Question_Set> findAll_QS(){
        return question_setRepository.findAll();
    }
    @Operation(summary = "Get all sets_ex")
    @GetMapping("/question_set_ex/")
    HashMap<String,List<String>> findAll_QS_Ex(){
        HashMap<String,List<String>> exlist= new HashMap<>();
        for(Question_Set qs:question_setRepository.findAll()){
            exlist.put(qs.getUuid(),List.of(qs.getQuestion_list().split(",")));
        }
        return exlist;
    }


    @Operation(summary = "Create a new question set")
    @PostMapping("/question_set/")
    Question_Set QS_save(@RequestBody Question_Set qs){
        return question_setRepository.save(new Question_Set(qs));
    }

    @Operation(summary = "Get a question set by id")
    @GetMapping("/question_set/{id}")
    Question_Set findById_QS(@PathVariable String id){
        return question_setRepository.findById(id).get();
    }
    @Operation(summary = "Update question set")
    @PutMapping("/question_set/{id}")
    Question_Set save_QS(@RequestBody Question_Set newqs,@PathVariable String id){
        return question_setRepository.findById(id).map(qs->{
            qs.setQuestionset_name(newqs.getQuestionset_name());
            qs.setQuestion_list(newqs.getQuestion_list());
            return question_setRepository.save(qs);
        }).orElseGet(()->{
            newqs.setUuid(id);
            return question_setRepository.save(newqs);
        });
    }
    @Operation(summary = "Delete a question set by id")
    @DeleteMapping("/question_set/{id}")
    void deleteById_QS(@PathVariable String id){
        question_setRepository.deleteById(id);
    }
}
