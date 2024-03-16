package com.example.ongmanager.dto.account;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "Account")
public class AccountDTO {
    private Long id;

    private PersonalInformationDTO personalInformationDTO;

    private String email;

    private String role;

    @Schema(type="string", format="byte")
    private byte[] profilePicture;

    private String accountDescription;

    public Long getId() {
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public PersonalInformationDTO getPersonalInformationDTO() {
        return personalInformationDTO;
    }

    public void setPersonalInformationDTO(PersonalInformationDTO personalInformationDTO) {
        this.personalInformationDTO = personalInformationDTO;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getAccountDescription() {
        return accountDescription;
    }

    public void setAccountDescription(String accountDescription) {
        this.accountDescription = accountDescription;
    }

}