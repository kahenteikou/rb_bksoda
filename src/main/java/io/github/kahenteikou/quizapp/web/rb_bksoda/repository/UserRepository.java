package io.github.kahenteikou.quizapp.web.rb_bksoda.repository;

import io.github.kahenteikou.quizapp.web.rb_bksoda.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {
}
