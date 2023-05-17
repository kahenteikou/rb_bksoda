package io.github.kahenteikou.quizapp.web.rb_bksoda.repository;

import io.github.kahenteikou.quizapp.web.rb_bksoda.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Question_Repository extends JpaRepository<Question,String> {
}
