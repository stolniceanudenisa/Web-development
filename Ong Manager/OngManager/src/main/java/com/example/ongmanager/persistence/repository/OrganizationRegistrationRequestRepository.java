package com.example.ongmanager.persistence.repository;

import com.example.ongmanager.controller.organization.OrganizationRegistrationRequestController;
import com.example.ongmanager.persistence.entities.organization.Organization;
import com.example.ongmanager.persistence.entities.organization.OrganizationRegistrationRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRegistrationRequestRepository extends JpaRepository<OrganizationRegistrationRequest, Long> {
    boolean existsByRequesterId(Long userId);
    Page<OrganizationRegistrationRequest> findAllByRequesterId(Long ownerId, Pageable pageable);
}
