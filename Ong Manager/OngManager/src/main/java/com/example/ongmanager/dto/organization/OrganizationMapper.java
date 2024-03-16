package com.example.ongmanager.dto.organization;

import com.example.ongmanager.dto.account.AccountMapper;
import com.example.ongmanager.persistence.entities.organization.Organization;
import org.mapstruct.*;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        uses = {
            AccountMapper.class
        },
        injectionStrategy = InjectionStrategy.CONSTRUCTOR)
@DecoratedWith(OrganizationDelegator.class)
public interface OrganizationMapper {

    @Mapping(source = "members", target = "membersDTO")
    OrganizationDTO organizationToOrganizationDTO(Organization organization);

    void updateOrganizationFromDto(OrganizationDTO dto,@MappingTarget Organization organization);
}
