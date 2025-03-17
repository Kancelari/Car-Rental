package com.example.Car_Rental.dto;

import com.example.Car_Rental.entity.Client;
import com.example.Car_Rental.entity.Reservation;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CarDto {
    private Long id;
    @NotEmpty(message = "Model must not be empty")
    @Size(min = 2, max = 50, message = "Model must be between 2 and 50 characters")
    private String model;
    @NotEmpty(message = "Type must not be empty")
    @Size(min = 2, max = 50, message = "Model must be between 2 and 50 characters")
    private String type;
    private int year;
    private String fuel;
    private List<ReservationDto> reservationDtoList;

    private Long clientId;

    private String clientName;
    private String clientSurname;
}
