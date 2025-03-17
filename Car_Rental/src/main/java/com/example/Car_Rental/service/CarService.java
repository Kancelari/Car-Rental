package com.example.Car_Rental.service;

import com.example.Car_Rental.dto.CarDto;
import com.example.Car_Rental.dto.ReservationDto;
import com.example.Car_Rental.entity.Car;
import com.example.Car_Rental.entity.Client;
import com.example.Car_Rental.entity.Reservation;
import com.example.Car_Rental.mapper.CarMapper;
import com.example.Car_Rental.mapper.ReservationMapper;
import com.example.Car_Rental.repository.CarRepository;
import com.example.Car_Rental.repository.ClientRepository;
import com.example.Car_Rental.repository.ReservationRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class CarService {
    private CarRepository carRepository;
    private CarMapper carMapper;
    private ClientRepository clientRepository;
    private ReservationMapper reservationMapper;
    private ReservationRepository reservationRepository;
    public CarDto save (CarDto carDto){
        Car car = carMapper.mapToEntity(carDto);
        Optional<Client> foundClient = clientRepository.findById(carDto.getClientId());
        if(foundClient.isPresent()){
            car.setClient(foundClient.get());
        }
        Car savedCar = carRepository.save(car);
        Set<Reservation> reservations = new HashSet<>();
        for (ReservationDto reservationDto : carDto.getReservationDtoList()){
            Reservation reservation = reservationMapper.mapToEntity(reservationDto);
            reservation.setCar(savedCar);
            reservationRepository.save(reservation);
            reservations.add(reservation);
        }
        Car existingCar = carRepository.findById(savedCar.getId())
                .orElseThrow(()-> new RuntimeException("Car with id: " + savedCar.getId() + " was not found in the database"));
        existingCar.getReservations().addAll(reservations);
        return carMapper.mapToDto(existingCar);
    }
    public List<CarDto> findAll(){
        List<Car> carList = carRepository.findAll();
        return carList.stream().map(car -> carMapper.mapToDto(car)).collect(Collectors.toList());
    }
    public CarDto findById(Long carId) {
        Car existingCar = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car with id: " + carId + " was not found in database"));
        return carMapper.mapToDto(existingCar);
    }

    public CarDto update (CarDto carDto, Long carId){
       Optional<Car> existingCar = carRepository.findById(carId);
       Client client = clientRepository.findById(carDto.getClientId())
               .orElseThrow(()-> new RuntimeException("Client with id: " + carDto.getClientId() + " not found in database"));
       if (existingCar.isPresent()){
           Car carToUpdate = existingCar.get();
           carToUpdate.setId(carId);
           carToUpdate.setModel(carDto.getModel());
           carToUpdate.setType(carDto.getType());
           carToUpdate.setYear(carDto.getYear());
           carToUpdate.setFuel(carDto.getFuel());
           carToUpdate.setClient(client);
           Car savedCar = carRepository.save(carToUpdate);
           return carMapper.mapToDto(savedCar);
       }else {throw new RuntimeException("Car not found with ID: " + carId);}
    }

    public void delete(Long carId){
        Optional<Car> existingCar = carRepository.findById(carId);
        if(existingCar.isPresent()){
            carRepository.delete(existingCar.get());
        }else{throw new RuntimeException("Car not found with ID: " + carId);}
    }
    public List<CarDto> findCarsByModel(String model) {
        List<Car> cars = carRepository.findByModel(model);
        return cars.stream()
                .map(carMapper::mapToDto)
                .collect(Collectors.toList());
    }
}
