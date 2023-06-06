package io.github.kahenteikou.quizapp.web.rb_bksoda.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Question_Set_Minimum {
    @Size(max=50)
    private String uuid;
    @NotBlank
    private String questionset_name;
    public Question_Set_Minimum() {
        super();
    }
    public Question_Set_Minimum(Question_Set qs){
        super();
        this.questionset_name=qs.getQuestionset_name();
        this.uuid=qs.getUuid();
    }
}
