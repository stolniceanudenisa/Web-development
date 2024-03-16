package com.example.ongmanager.dto.organization;

import com.example.ongmanager.dto.account.AccountDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Validated
@Schema(name = "Organization")
public class OrganizationDTO {

    @NotNull(message = "Organization ID is mandatory")
    private Long id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    private String description;

    @NotNull(message = "Owner id is mandatory")
    private Long ownerId;

    @NotNull(message = "District id is mandatory")
    private Long districtId;

    //@NotEmpty(message = "Members list is mandatory")
    private List</*@Valid*/ AccountDTO> membersDTO;

    @NotBlank(message = "County is mandatory")
    private String county;

    @Schema(type = "string", format = "byte")
    private byte[] logo;

    @Schema(type = "string", format = "byte")
    private byte[] banner;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public Long getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Long districtId) {
        this.districtId = districtId;
    }

    public List<AccountDTO> getMembersDTO() {
        return membersDTO;
    }

    public void setMembersDTO(List<AccountDTO> membersDTO) {
        this.membersDTO = membersDTO;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public byte[] getLogo() {
        return logo;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public byte[] getBanner() {
        return banner;
    }

    public void setBanner(byte[] banner) {
        this.banner = banner;
    }
}
