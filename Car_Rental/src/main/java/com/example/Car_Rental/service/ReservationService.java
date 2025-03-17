package com.example.Car_Rental.service;

import com.example.Car_Rental.dto.ReservationDto;
import com.example.Car_Rental.entity.Car;
import com.example.Car_Rental.entity.Reservation;
import com.example.Car_Rental.mapper.ReservationMapper;
import com.example.Car_Rental.repository.CarRepository;
import com.example.Car_Rental.repository.ReservationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ReservationService {
    private ReservationRepository reservationRepository;
    private ReservationMapper reservationMapper;
    private CarRepository carRepository;

    public ReservationDto save (ReservationDto reservationDto, long carId){
        Car existingCar = carRepository.findById(carId)
                .orElseThrow(()-> new RuntimeException("Car with ID: " + carId + " was not found"));
        Reservation reservation = reservationMapper.mapToEntity(reservationDto);
        reservation.setCar(existingCar);
        Reservation savedReservation = reservationRepository.save(reservation);
        return reservationMapper.mapToDto(savedReservation);
    }

    public List<ReservationDto> findAll(long carId){
        List<Reservation> reservationList = reservationRepository.findByCarId(carId);
    return reservationList.stream().map(reservation -> reservationMapper.mapToDto(reservation)).collect(Collectors.toList());
    }
    public ReservationDto findById(long carId, long reservationId){
        Car existingCar = carRepository.findById(carId)
                .orElseThrow(()->new RuntimeException("Car with id: " + carId + " not found"));
        Reservation existingReservation = reservationRepository.findById(reservationId)
                .orElseThrow(()->new RuntimeException("Reservation with id: " + reservationId +" not found"));
        if(!((existingCar.getId())==(existingReservation.getCar().getId()))){
            throw new RuntimeException("Reservation with id: " + reservationId + "doesn't correspond to student with id:" + carId);
        }
        return reservationMapper.mapToDto(existingReservation);
    }

    public ReservationDto update(long carId, long reservationId, ReservationDto reservationDto){
        Car existingCar = carRepository.findById(carId)
                .orElseThrow(()->new RuntimeException("Car with id: " + carId + " not found"));
        Reservation existingReservation = reservationRepository.findById(reservationId)
                .orElseThrow(()->new RuntimeException("Reservation with id: " + reservationId + "not found"));
        if(!((existingCar.getId())==(existingReservation.getCar().getId()))){
            throw new RuntimeException("Reservation with id: " + reservationId + "doesn't correspond to car with id: " + carId);
        }
        existingReservation.setId(reservationId);
        existingReservation.setDate_from(reservationDto.getDate_from());
        existingReservation.setDate_to(reservationDto.getDate_to());
        existingReservation.setPrice(reservationDto.getPrice());
        Reservation savedReservation = reservationRepository.save(existingReservation);
        return reservationMapper.mapToDto(savedReservation);
    }
    public void delete(long carId, long reservationId){
        Car existingCar = carRepository.findById(carId)
                .orElseThrow(()->new RuntimeException("Car with id: " + carId+" not found"));
        Reservation existingReservation = reservationRepository.findById(reservationId)
                .orElseThrow(()->new RuntimeException("Reservation with is: "+reservationId+" not found"));
        if(!((existingCar.getId())==(existingReservation.getCar().getId()))){
            throw new RuntimeException("Reservation with id: "+reservationId+" doesn't correspond to car with id: "+carId);
        }
        reservationRepository.delete(existingReservation);
    }
}
