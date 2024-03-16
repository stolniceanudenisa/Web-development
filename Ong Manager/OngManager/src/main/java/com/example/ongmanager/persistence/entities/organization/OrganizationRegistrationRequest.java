package com.example.ongmanager.persistence.entities.organization;

import com.example.ongmanager.beans.organization.OrganizationDetails;
import com.example.ongmanager.persistence.entities.BaseEntity;
import com.example.ongmanager.persistence.entities.account.Account;
import com.example.ongmanager.records.organization.OrganizationRegistrationRequestData;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "organization_registration_requests")
public class OrganizationRegistrationRequest extends BaseEntity {

    @NotNull(message = "Requester ID is mandatory")
    private Long requesterId;

    @Embedded
    private OrganizationDetails organizationDetails;

    @OneToOne
    @NotNull(message = "Account is mandatory")
    private Account account;

    public OrganizationRegistrationRequest() {}

    public OrganizationRegistrationRequest(OrganizationRegistrationRequestData organizationRegistrationRequestData,
                                           Account account, OrganizationDetails organizationDetails)
    {
        this.requesterId = organizationRegistrationRequestData.requesterId();
        this.account = account;
        this.organizationDetails = organizationDetails;
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

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
