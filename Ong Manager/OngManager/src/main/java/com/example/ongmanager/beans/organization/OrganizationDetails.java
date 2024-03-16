package com.example.ongmanager.beans.organization;


import com.example.ongmanager.records.organization.OrganizationRegistrationRequestData;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Embeddable
public class OrganizationDetails {
    @Column(nullable = false)
    @NotNull(message = "District ID is mandatory")
    private Long districtId;

    @Column(nullable = false)
    @NotBlank(message = "Name is mandatory")
    private String name;

    private String details;

    @Column(nullable = false)
    @Size(min = 3, max = 30, message = "County must be between 3 and 30 characters")
    @NotBlank(message = "County is mandatory")
    private String county;

    public OrganizationDetails() {}


    public OrganizationDetails(OrganizationRegistrationRequestData organizationRegistrationRequestData){
        this.districtId = organizationRegistrationRequestData.districtId();
        this.name = organizationRegistrationRequestData.name();
        this.details = organizationRegistrationRequestData.details();
        this.county = organizationRegistrationRequestData.county();
    }

    public Long getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Long districtId) {
        this.districtId = districtId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }
}
