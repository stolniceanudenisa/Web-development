package com.example.ongmanager.dto.organization;

import com.example.ongmanager.persistence.entities.organization.Organization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public abstract class OrganizationDelegator implements OrganizationMapper {

    @Autowired
    @Qualifier("delegate")
    private OrganizationMapper delegate;

    @Override
    public OrganizationDTO organizationToOrganizationDTO(Organization organization) {
        final OrganizationDTO organizationDTO = delegate.organizationToOrganizationDTO(organization);

        if (organizationDTO != null) {
            organizationDTO.setOwnerId(organization.getOwner() != null ? organization.getOwner().getId() : null);
            organizationDTO.setDistrictId(organization.getDistrict() != null ? organization.getDistrict().getId() : null);
        }
        return organizationDTO;
    }
}

