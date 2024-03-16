package com.example.ongmanager.records.organization;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record OrganizationRegistration(
        @NotBlank(message = "Name is mandatory")String name,
        String description,
        @NotBlank(message = "County is mandatory")String county,
        @NotNull(message = "districtId is mandatory") Long districtId,
        @NotNull(message = "ownerId is mandatory")Long ownerId) {
}