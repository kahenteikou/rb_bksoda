package io.github.kahenteikou.quizapp.web.rb_bksoda.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

/**
 * This class represents a user.
 */
@Entity
@Table(name="QUiz_USER")
@Getter
@Setter
public class User {
    @Id
    @GenericGenerator(name="UuidGenerator",strategy = "io.github.kahenteikou.quizapp.web.rb_bksoda.generator.UuidGenerator")
    @GeneratedValue(generator = "UuidGenerator")
    @Size(max=50)
    private String uuid;
    @NotBlank
    @Size(max=255)
    private String username;
    @NotBlank
    @Size(max=255)
    private String displayname;
    @NotBlank
    private String description;


}
