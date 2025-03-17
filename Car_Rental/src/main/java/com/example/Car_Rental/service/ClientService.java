package com.example.Car_Rental.service;

import com.example.Car_Rental.dto.ClientDto;
import com.example.Car_Rental.entity.Client;
import com.example.Car_Rental.mapper.ClientMapper;
import com.example.Car_Rental.repository.ClientRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.event.ListDataEvent;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class ClientService {
    private ClientRepository clientRepository;
    private ClientMapper clientMapper;

    public ClientDto save (ClientDto clientDto){
        Client client = clientMapper.mapToEntity(clientDto);
        Client savedClient = clientRepository.save(client);
        return clientMapper.mapToDto(savedClient);
    }

    public ClientDto findClientById(long clientId){
        Client foundClient = clientRepository.findById(clientId)
                .orElseThrow(()-> new RuntimeException("Client with ID: " + clientId + " was not found"));
        return clientMapper.mapToDto(foundClient);
    }

    public List<ClientDto> findAll(){
        List<Client> clients = clientRepository.findAll();
        List<ClientDto> returnClientDto = new ArrayList<>();
        for(Client client : clients){
            returnClientDto.add(clientMapper.mapToDto(client));
        }
        return returnClientDto;
    }

    public ClientDto updateById(ClientDto clientDto, long clientId){
        Client foundClient = clientRepository.findById(clientId)
                .orElseThrow(()-> new RuntimeException("Client with ID " + clientId + "was not found"));
        foundClient.setId(clientId);
        foundClient.setFirstname(clientDto.getFirstname());
        foundClient.setSurname(clientDto.getSurname());
        foundClient.setEmail(clientDto.getEmail());
        foundClient.setPhone_number(clientDto.getPhone_number());
        foundClient.setAge(clientDto.getAge());
        foundClient.setPassword(clientDto.getPassword());
        Client updatedClient = clientRepository.save(foundClient);
        return clientMapper.mapToDto(updatedClient);
    }

    public void deleteById(long clientId){
        Client foundClient = clientRepository.findById(clientId)
                .orElseThrow(()->new RuntimeException("Client with ID: "+ clientId + " was not found"));
        clientRepository.delete(foundClient);
    }
}
