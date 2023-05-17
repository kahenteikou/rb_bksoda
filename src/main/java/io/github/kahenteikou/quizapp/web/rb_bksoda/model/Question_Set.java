package io.github.kahenteikou.quizapp.web.rb_bksoda.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="Question_Set")
@Getter
@Setter
public class Question_Set {
    @Id
    @GenericGenerator(name="UuidGenerator",strategy = "io.github.kahenteikou.quizapp.web.rb_bksoda.generator.UuidGenerator")
    @GeneratedValue(generator = "UuidGenerator")
    private String uuid;
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
