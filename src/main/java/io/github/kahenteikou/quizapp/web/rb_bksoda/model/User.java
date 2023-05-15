package io.github.kahenteikou.quizapp.web.rb_bksoda.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

/**
 * This class represents a user.
 */
@Entity
@Table(name="QUiz_USER")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue
    private Long id;
    @NotBlank
    @Size(max=255)
    private String username;
    @NotBlank
    @Size(max=255)
    private String displayname;
    @NotBlank
    private String description;


}
