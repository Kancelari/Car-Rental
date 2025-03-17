package com.example.Car_Rental.mapper;

import com.example.Car_Rental.dto.ReservationDto;
import com.example.Car_Rental.entity.Reservation;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class ReservationMapper {
    public Reservation mapToEntity(ReservationDto reservationDto){
        Reservation reservation = new Reservation();
        //reservation.setId(reservationDto.getId());
        reservation.setDate_from(reservationDto.getDate_from());
        reservation.setDate_to(reservationDto.getDate_to());
        reservation.setPrice(reservationDto.getPrice());
        return reservation;
    }
    public ReservationDto mapToDto(Reservation reservation){
        ReservationDto reservationDto = new ReservationDto();
        reservationDto.setId(reservation.getId());
        reservationDto.setDate_from(reservation.getDate_from());
        reservationDto.setDate_to(reservation.getDate_to());
        reservationDto.setPrice(reservation.getPrice());
        return reservationDto;
    }
}
