package com.example.ongmanager.records.organization;

import jakarta.validation.constraints.NotNull;

public record MemberRegistration(@NotNull(message = "accountId is mandatory") Long accountId,
                                 @NotNull(message = "organizationId is mandatory") Long organizationId) {
}
