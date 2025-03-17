package com.example.Car_Rental.controller;

import com.example.Car_Rental.dto.ClientDto;
import com.example.Car_Rental.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RestController
@RequestMapping("/api/clients")
public class ClientController {
    private ClientService clientService;
    @PostMapping("saveClient")
    public ResponseEntity<ClientDto> save(@RequestBody ClientDto clientDto){
        return new ResponseEntity<>(clientService.save(clientDto), HttpStatus.CREATED);
    }
    @GetMapping("/findById/{clientId}")
    public ResponseEntity<ClientDto> findClientById(@PathVariable(name="clientId") Long clientId){
        return ResponseEntity.ok(clientService.findClientById(clientId));
    }
    @GetMapping("/findAll")
    public ResponseEntity<List<ClientDto>> findAll(){
        return ResponseEntity.ok(clientService.findAll());
    }
    @PutMapping("/update/{clientId}")
    public ResponseEntity<ClientDto> updateClientById(@RequestBody ClientDto clientDto, @PathVariable long clientId){
        return ResponseEntity.ok(clientService.updateById(clientDto, clientId));
    }
    @DeleteMapping("/deleteById/{clientId}")
    public ResponseEntity<String> deleteById(@PathVariable(name = "clientId") long clientId){
        clientService.deleteById(clientId);
        return ResponseEntity.ok("Client with id:  " + clientId + " was successfully deleted");
    }
}
