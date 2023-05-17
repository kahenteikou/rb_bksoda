package io.github.kahenteikou.quizapp.web.rb_bksoda.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="Question")
@Getter
@Setter
public class Question {
    @Id
    @GenericGenerator(name="UuidGenerator",strategy = "io.github.kahenteikou.quizapp.web.rb_bksoda.generator.UuidGenerator")
    @GeneratedValue(generator = "UuidGenerator")
    @Size(max=50)
    private String uuid;

    @NotBlank
    private String question_name;
    @NotBlank
    private String content;
    @NotBlank
    private String answer;
    public Question(){
        super();
    }
    public Question(Question q1){
        super();
        this.question_name=q1.question_name;
        this.content=q1.content;
        this.answer=q1.answer;
    }

}
