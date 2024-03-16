package com.example.ongmanager.records.email;

import jakarta.validation.constraints.NotNull;

public record JoinOrganizationRequest(
        @NotNull(message = "The account id should not be null") Long accountId,
        @NotNull(message = "The organization id should not be null") Long organizationId) {
}
