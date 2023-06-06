package io.github.kahenteikou.quizapp.web.rb_bksoda.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Question_Set_Ex {

    private String uuid;
    @NotBlank
    private String questionset_name;
    @NotBlank
    private String[] question_list;
    public Question_Set_Ex() {
        super();
    }
    public Question_Set_Ex(Question_Set qs){
        super();
        this.uuid=qs.getUuid();
        this.questionset_name=qs.getQuestionset_name();
        this.question_list=qs.getQuestion_list().split(",");
    }
}
