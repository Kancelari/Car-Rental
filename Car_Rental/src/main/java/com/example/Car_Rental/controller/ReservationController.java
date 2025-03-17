package com.example.Car_Rental.controller;

import com.example.Car_Rental.dto.CarDto;
import com.example.Car_Rental.dto.ReservationDto;
import com.example.Car_Rental.service.CarService;
import com.example.Car_Rental.service.ReservationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    private ReservationService reservationService;
    @PostMapping ("/save/{carId}")
    public ResponseEntity<ReservationDto> save(@RequestBody ReservationDto reservationDto, @PathVariable("carId") long carId){
       return new ResponseEntity<>(reservationService.save(reservationDto, carId), HttpStatus.CREATED);
    }
    @GetMapping("/{carId}")
    public ResponseEntity<List<ReservationDto>> findAll(@PathVariable("carId")long carId){
        return new ResponseEntity<>(reservationService.findAll(carId),HttpStatus.OK);
    }
    @GetMapping("/{carId}/{reservationId}")
    public ResponseEntity<ReservationDto> findById(@PathVariable("carId") long carId, @PathVariable("reservationId")long reservationId){
        return ResponseEntity.ok(reservationService.findById(carId, reservationId));
    }
    @PutMapping("/{carId}/{reservationId}")
    public ResponseEntity<ReservationDto> update (@RequestBody ReservationDto reservationDto,
                                                  @PathVariable("carId") long carId,
                                                  @PathVariable("reservationId") long reservationId){
        return ResponseEntity.ok(reservationService.update(carId,reservationId,reservationDto));
    }
    @DeleteMapping("/{carId}/{reservationId}")
    public ResponseEntity<String> delete(@PathVariable("carId") long carId,
                                         @PathVariable("reservationId")long reservationId){
        reservationService.delete(carId, reservationId);
        return ResponseEntity.ok("Reservation successfully deleted");
    }
}
