package io.github.kahenteikou.quizapp.web.rb_bksoda.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Question_Set")
@Getter
@Setter
public class Question_Set {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String questionset_name;
    public Question_Set() {
        super();
    }
    public Question_Set(Question_Set qs){
        super();
        this.questionset_name=qs.questionset_name;
    }
}
