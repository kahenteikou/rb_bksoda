package io.github.kahenteikou.quizapp.web.rb_bksoda.errResponse;

import lombok.Getter;

@Getter
public class Question_NotFoundException extends Error_ExceptionCls{
    public Question_NotFoundException(String msg, ErrDetail errDetail) {
        super(msg, errDetail);
    }
}
