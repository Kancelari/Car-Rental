package com.example.Car_Rental.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotEmpty(message = "First name must not be empty")
    @Size(min = 3, max = 50, message = "First name must be between 3 and 50 characters")
    private String firstname;
    @NotEmpty(message = "Last name must not be empty")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    private String surname;
    @NotEmpty(message = "Email must not be empty")
    @Email(message = "Invalid email format")
    private String email;
    private String phone_number;
    private int age;
    private String password;
    @OneToMany(mappedBy = "client",cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<Car> cars; //nje klient mund te marr me shume se nje makine
}
