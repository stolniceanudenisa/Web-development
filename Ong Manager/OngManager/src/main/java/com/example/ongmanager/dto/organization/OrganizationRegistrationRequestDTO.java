package com.example.ongmanager.dto.organization;

import com.example.ongmanager.beans.organization.OrganizationDetails;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.validation.annotation.Validated;

@Schema(name = "OrganizationRegistrationRequest")
public class OrganizationRegistrationRequestDTO {
    @NotNull(message = "ID is mandatory")
    private Long id;

    @NotNull(message = "Requester ID is mandatory")
    private Long requesterId;

    @NotNull(message = "Organization Details are mandatory")
    private OrganizationDetails organizationDetails;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRequesterId() {
        return requesterId;
    }

    public void setRequesterId(Long requesterId) {
        this.requesterId = requesterId;
    }

    public OrganizationDetails getOrganisationDetails() {
        return organizationDetails;
    }

    public void setOrganisationDetails(OrganizationDetails organizationDetails) {
        this.organizationDetails = organizationDetails;
    }
}
