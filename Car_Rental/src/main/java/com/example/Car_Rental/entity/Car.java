package com.example.Car_Rental.entity;

import com.example.Car_Rental.dto.ReservationDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty(message = "Model must not be empty")
    @Size(min = 2, max = 50, message = "Model must be between 2 and 50 characters")
    private String model;
    @NotEmpty(message = "Type must not be empty")
    @Size(min = 2, max = 50, message = "Model must be between 2 and 50 characters")
    private String type;
    private int year;
    private String fuel;

    @OneToMany(mappedBy = "car",cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<Reservation> reservations = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;
}
