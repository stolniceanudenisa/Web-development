package com.example.ongmanager.persistence.repository.district;

import com.example.ongmanager.persistence.entities.district.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DistrictRepository extends JpaRepository<District,Long> {
    boolean existsByName(String name);

    @Query("SELECT country FROM District district JOIN district.countries country WHERE (:districtId = NULL or district.id <> :districtId)  and country IN :countries ")
    List<String> findCountriesByCountriesIn(@Param("countries") List<String> countries,@Param("districtId") Long districtId);

    List<District> findByNameContaining(String name);

}