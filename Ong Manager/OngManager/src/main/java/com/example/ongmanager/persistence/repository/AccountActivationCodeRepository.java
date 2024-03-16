package com.example.ongmanager.persistence.repository;

import com.example.ongmanager.persistence.entities.account.AccountActivationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountActivationCodeRepository extends JpaRepository<AccountActivationCode, Long> {
    Optional<AccountActivationCode> findByCode(String code);
}
