package com.example.Car_Rental.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Date cannot be null")
    @Temporal(TemporalType.DATE) //shto vetem daten jo oren ne kete format viti-muaji-data
    private LocalDate date_from;
    @NotNull(message = "Date cannot be null")
    @Temporal(TemporalType.DATE) //shto vetem daten jo oren ne kete format viti-muaji-data
    private LocalDate date_to;
    private double price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;
}
