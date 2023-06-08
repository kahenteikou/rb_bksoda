package io.github.kahenteikou.quizapp.web.rb_bksoda.errResponse;

import lombok.Getter;

@Getter
public class Error_ExceptionCls extends RuntimeException{
    private ErrDetail errDetail;

    public Error_ExceptionCls(String msg,ErrDetail errDetail) {
        super(msg);
        this.errDetail = errDetail;
    }
}
