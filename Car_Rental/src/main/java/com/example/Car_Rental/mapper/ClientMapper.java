package com.example.Car_Rental.mapper;

import com.example.Car_Rental.dto.ClientDto;
import com.example.Car_Rental.entity.Client;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@AllArgsConstructor
@Component
public class ClientMapper {
    private ReservationMapper reservationMapper;
    public Client mapToEntity(ClientDto clientDto){
        Client client = new Client();
        //client.setId(clientDto.getId());
        client.setFirstname(clientDto.getFirstname());
        client.setSurname(clientDto.getSurname());
        client.setEmail(clientDto.getEmail());
        client.setPhone_number(clientDto.getPhone_number());
        client.setAge(clientDto.getAge());
        client.setPassword(clientDto.getPassword());
        return client;
    }
    public ClientDto mapToDto (Client client){
        ClientDto clientDto = new ClientDto();
        clientDto.setId(client.getId());
        clientDto.setFirstname(client.getFirstname());
        clientDto.setSurname(client.getSurname());
        clientDto.setEmail(client.getEmail());
        clientDto.setPhone_number(client.getPhone_number());
        clientDto.setAge(client.getAge());
        clientDto.setPassword(client.getPassword());
        return clientDto;
    }

}
