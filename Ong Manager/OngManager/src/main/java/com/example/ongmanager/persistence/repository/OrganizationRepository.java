package com.example.ongmanager.persistence.repository;

import com.example.ongmanager.persistence.entities.account.Account;
import com.example.ongmanager.persistence.entities.organization.Organization;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Range;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    boolean existsByNameIgnoreCase(String organizationName);

    @Query("SELECT o FROM Organization o WHERE" +
            " (:nameFilter IS NULL OR o.name LIKE :nameFilter) " +
            "AND (:countyFilter IS NULL OR o.county LIKE :countyFilter)" +
            "AND (:districtId IS NULL OR o.district.id = :districtId)")
    Page<Organization> findAllByDistrictIdAndNameContainingAndCountyContaining(Long districtId, String nameFilter, String countyFilter, Pageable pageable);

    @Query("SELECT a FROM Organization o JOIN o.members a WHERE o.id = :organizationId")
    List<Account> findAllMembersByOrganizationId(Long organizationId);

    Organization findByName(String name);
}
