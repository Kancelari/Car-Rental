package com.example.Car_Rental.repository;

import com.example.Car_Rental.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByCarId(long carId);
}
