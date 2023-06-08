package io.github.kahenteikou.quizapp.web.rb_bksoda.errResponse;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Setter;

@Setter
public class ErrDetail {
    @JsonProperty("error_detailmsg")
    String detailMsg;
}
