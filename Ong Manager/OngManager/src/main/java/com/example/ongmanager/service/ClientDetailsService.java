package com.example.ongmanager.service;

import com.example.ongmanager.persistence.entities.client.Client;
import com.example.ongmanager.persistence.repository.ClientRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.stereotype.Service;

@Service
public class ClientDetailsService implements RegisteredClientRepository {
    private static final Logger logger = LoggerFactory.getLogger(ClientDetailsService.class);
    private final ClientRepository clientRepository;

    public ClientDetailsService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public void save(RegisteredClient registeredClient) {
        Client client = new Client(registeredClient);
        logger.info("[SERVICE] SAVING CLIENT with id {} ", client.getId());
        clientRepository.save(client);
    }

    @Override
    public RegisteredClient findById(String id) {
        Client client = clientRepository.findById(Long.valueOf(id))
                .orElseThrow(()-> new EntityNotFoundException(String.format("Client with id: %s not found!", id)));
        return Client.from(client);
    }

    @Override
    public RegisteredClient findByClientId(String clientId) {
        Client client = clientRepository.findByClientId(clientId)
                .orElseThrow(()-> new EntityNotFoundException(String.format("Client with client id: %s not found!", clientId)));
        return Client.from(client);
    }

    public boolean existsByClientId(String clientId) {
        return clientRepository.existsByClientId(clientId);
    }
}
