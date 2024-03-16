package com.example.ongmanager.persistence.repository;

import com.example.ongmanager.persistence.entities.account.Account;
import com.example.ongmanager.persistence.entities.account.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    boolean existsByEmail(String email);
    Optional<Account> findByEmail(String email);
    Optional<Account> findByAccountActivationCode_Code(String code);
    Optional<Account> findById(Long id);

    @Query("SELECT member from Organization o JOIN o.members member where member.role = 'PRESIDENT' and o.id = :organizationId")
    Optional<Account> findPresidentByOrganizationId(@Param("organizationId") Long organizationId);
    List<Account> findAccountsByRole(Role role);
}