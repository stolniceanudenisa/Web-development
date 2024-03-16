package com.example.ongmanager.persistence.repository;

import com.example.ongmanager.persistence.entities.client.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {

    boolean existsByClientId(String clientId);
    Optional<Client> findByClientId(String clientId);
}
