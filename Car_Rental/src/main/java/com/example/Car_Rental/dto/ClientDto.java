package com.example.Car_Rental.dto;

import com.example.Car_Rental.entity.Reservation;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class ClientDto {
    private long id;
    private String firstname;
    private String surname;
    private String email;
    private String phone_number;
    private int age;
    private String password;
}
