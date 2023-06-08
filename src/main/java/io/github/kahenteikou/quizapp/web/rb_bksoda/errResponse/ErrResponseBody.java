package io.github.kahenteikou.quizapp.web.rb_bksoda.errResponse;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Setter;

import java.time.ZonedDateTime;

@Setter
public class ErrResponseBody {
    @JsonProperty("exception_time")
    private ZonedDateTime exceptionTime;
    @JsonProperty("status_code")
    private int status;
    @JsonProperty("error")
    private String error;
    @JsonProperty("error_message")
    private String message;
    @JsonProperty("error_path")
    private String path;
    @JsonProperty("error_detail")
    private ErrDetail errDetail;
}
