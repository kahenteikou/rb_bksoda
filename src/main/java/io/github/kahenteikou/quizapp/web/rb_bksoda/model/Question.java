package io.github.kahenteikou.quizapp.web.rb_bksoda.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Question")
@Getter
@Setter
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String question_name;
    @NotBlank
    private String content;
    @NotBlank
    private String answer;
    @NotBlank
    private Long question_ls_id;
    @NotBlank
    private Long order_no;
    public Question(){
        super();
    }
    public Question(Question q1){
        super();
        this.question_name=q1.question_name;
        this.content=q1.content;
        this.answer=q1.answer;
        this.question_ls_id=q1.question_ls_id;
        this.order_no=q1.order_no;
    }

}
