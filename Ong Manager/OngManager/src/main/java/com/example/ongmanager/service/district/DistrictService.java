package com.example.ongmanager.service.district;

import com.example.ongmanager.dto.district.DistrictDTO;
import com.example.ongmanager.dto.district.DistrictMapper;

import com.example.ongmanager.persistence.entities.district.District;
import com.example.ongmanager.persistence.repository.district.DistrictRepository;
import com.example.ongmanager.records.district.DistrictRegistration;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DistrictService {

    private final DistrictRepository districtRepository;

    private final DistrictMapper districtMapper;

    private static final Logger logger = LoggerFactory.getLogger(DistrictService.class);

    public DistrictService(DistrictRepository districtRepository, DistrictMapper districtMapper) {
        this.districtRepository = districtRepository;
        this.districtMapper = districtMapper;
    }

    public Page<DistrictDTO> fetchDistrictList(Pageable pageable) {
        logger.info("[SERVICE] GET PAGINATED DISTRICTS, PAGE: {}, COUNT: {}, SORT DIRECTION: {}",
                pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort().getOrderFor("name"));
        return districtRepository.findAll(pageable).map(districtMapper::districtToDistrictDTO);
    }

    public DistrictDTO findDistrict(Long districtId) {
        logger.info("[SERVICE] FINDING DISTRICT with id {}", districtId);
        return districtRepository.findById(districtId)
                .map(districtMapper::districtToDistrictDTO)
                .orElseThrow(() -> new EntityNotFoundException(String.format("The district with the id: %d, doesn 't exist", districtId)));
    }
    public DistrictDTO createNewDistrict(DistrictRegistration districtRegistration) {
        logger.info("[SERVICE] CREATING DISTRICT");

        if (districtRepository.existsByName(districtRegistration.name())) {
            throw new EntityExistsException(String.format("District with this name: %s already exists!", districtRegistration.name()));
        } else if (!districtRepository.findCountriesByCountriesIn(districtRegistration.countries(), null).isEmpty()) {
            throw new EntityExistsException(String.format("Districts with these countries: %s already exist!",
                    districtRepository.findCountriesByCountriesIn(districtRegistration.countries(), null)));
        }

        District district = new District(districtRegistration);
        return districtMapper.districtToDistrictDTO(districtRepository.save(district));
    }

    public DistrictDTO updateDistrict(DistrictDTO districtDTO) {
        logger.info("[SERVICE] UPDATING DISTRICT with id {} ", districtDTO.getId());
        District districtToUse = findDistrictById(districtDTO.getId());

        if (!districtRepository.findCountriesByCountriesIn(districtDTO.getCountries(), districtToUse.getId()).isEmpty()) {
            throw new EntityExistsException(String.format("Districts with these countries: %s already exist!",
                    districtRepository.findCountriesByCountriesIn(districtDTO.getCountries(), districtToUse.getId())));
        }

        districtMapper.updateDistrictFromDto(districtDTO, districtToUse);
        District districtUpdated = districtRepository.save(districtToUse);

        return districtMapper.districtToDistrictDTO(districtUpdated);
    }

    public void deleteDistrict(Long districtId) {
        logger.info("[SERVICE] DELETING ACCOUNT with id {}", districtId);
        districtRepository.deleteById(districtId);
    }

    public District findDistrictById(Long districtId) {
        return districtRepository.findById(districtId)
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException(String.format("The district with the id: %d, doesn 't exist", districtId)));
    }

    public List<DistrictDTO> findDistrictByName(String districtName) {
        return this.districtRepository.findByNameContaining(districtName).stream()
                .map(this.districtMapper::districtToDistrictDTO)
                .collect(Collectors.toList());
    }
}
