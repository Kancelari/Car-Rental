package com.example.Car_Rental.dto;

import com.example.Car_Rental.entity.Car;
import com.example.Car_Rental.entity.Client;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReservationDto {

    private long id;
    private LocalDate date_from;
    private LocalDate date_to;
    private double price;
}
