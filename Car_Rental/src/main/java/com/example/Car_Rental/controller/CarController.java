package com.example.Car_Rental.controller;

import com.example.Car_Rental.dto.CarDto;
import com.example.Car_Rental.service.CarService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RestController
@RequestMapping("/api/cars")
public class CarController {
    private CarService carService;
    @PostMapping("/save")
    public CarDto save(@Valid @RequestBody CarDto carDto){
        return carService.save(carDto);
    }
    @GetMapping
    public List<CarDto> findAll(){
        return carService.findAll();
    }
    @GetMapping("/view/{carId}")
    public CarDto findById(@PathVariable(name="carId")Long carId){
        return carService.findById(carId);
    }
    @PutMapping("/{carId}")
    public CarDto update(@Valid @RequestBody CarDto carDto, @PathVariable(name="carId") Long carId){
        return carService.update(carDto, carId);
    }
    @DeleteMapping("{carId}")
    public String delete(@PathVariable(name = "carId") Long carId){
        carService.delete(carId);
        return "Car successfully deleted!";
    }
    @GetMapping("/byModel")
    public ResponseEntity<List<CarDto>> findCarsByModel(@RequestParam String model) {
        List<CarDto> cars = carService.findCarsByModel(model);
        return ResponseEntity.ok(cars);
    }
}
