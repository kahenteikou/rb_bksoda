package io.github.kahenteikou.quizapp.web.rb_bksoda.errResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.ZonedDateTime;

@RestControllerAdvice
public class Question_NotFoundExceptionHandler  extends ResponseEntityExceptionHandler {
    @ExceptionHandler(Question_NotFoundException.class)
    public ResponseEntity<Object> handleExp(Question_NotFoundException exp, WebRequest req){
        HttpHeaders headers = new HttpHeaders();
        return super.handleExceptionInternal(exp,createErrBody(exp,req),headers, HttpStatus.BAD_REQUEST,req);
    }
    private ErrResponseBody createErrBody(Question_NotFoundException exp, WebRequest req){
        ErrResponseBody errBody = new ErrResponseBody();
        int rCode= HttpStatus.BAD_REQUEST.value();
        String rErrMsg=HttpStatus.BAD_REQUEST.getReasonPhrase();
        String uri=((ServletWebRequest)req).getRequest().getRequestURI();
        errBody.setStatus(rCode);
        errBody.setExceptionTime(ZonedDateTime.now());
        errBody.setError(rErrMsg);
        errBody.setMessage(exp.getMessage());
        errBody.setPath(uri);
        errBody.setErrDetail(exp.getErrDetail());

        return errBody;
    }
}
