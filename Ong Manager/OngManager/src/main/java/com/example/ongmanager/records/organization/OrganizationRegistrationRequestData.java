package com.example.ongmanager.records.organization;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record OrganizationRegistrationRequestData(
        @NotNull(message = "Requester ID is mandatory")Long requesterId,
        @NotNull(message = "District ID is mandatory")Long districtId,
        @NotBlank(message = "Name is mandatory")String name,
        String details,
        @NotBlank(message = "County is mandatory")String county) {
}
