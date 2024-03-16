package com.example.ongmanager.dto.organization;

import com.example.ongmanager.dto.account.AccountMapper;
import com.example.ongmanager.persistence.entities.organization.OrganizationRegistrationRequest;
import org.mapstruct.*;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        uses = {
                AccountMapper.class
        },
        injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface OrganizationRegistrationRequestMapper {

    OrganizationRegistrationRequestDTO organizationRegistrationRequestToOrganizationRegistrationRequestDTO(OrganizationRegistrationRequest organizationRegistrationRequest);

    void updateOrganizationRegistrationRequestFromDto(OrganizationRegistrationRequestDTO dto,@MappingTarget OrganizationRegistrationRequest organizationRegistrationRequest);

}



