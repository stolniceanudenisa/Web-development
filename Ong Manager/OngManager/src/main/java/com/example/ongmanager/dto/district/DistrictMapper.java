package com.example.ongmanager.dto.district;

import com.example.ongmanager.persistence.entities.district.District;
import org.mapstruct.*;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, injectionStrategy = InjectionStrategy.CONSTRUCTOR )
public interface DistrictMapper {

    DistrictDTO districtToDistrictDTO(District district);

    void updateDistrictFromDto(DistrictDTO dto,@MappingTarget District district);

}
