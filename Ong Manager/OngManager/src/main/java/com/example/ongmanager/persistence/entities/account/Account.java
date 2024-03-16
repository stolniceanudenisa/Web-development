package com.example.ongmanager.persistence.entities.account;

import com.example.ongmanager.beans.personalinfo.PersonalInformation;
import com.example.ongmanager.persistence.entities.BaseEntity;
import com.example.ongmanager.persistence.entities.organization.Organization;
import com.example.ongmanager.persistence.entities.organization.OrganizationRegistrationRequest;
import com.example.ongmanager.records.account.AccountRegistration;
import jakarta.persistence.*;
import org.hibernate.annotations.SQLDelete;

@Entity
@Table(name = "accounts")
@SQLDelete(sql = "UPDATE accounts SET enabled = false WHERE id=?")
public class Account extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Embedded
    private PersonalInformation personalInformation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private byte[] profilePicture;

    private String accountDescription;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    private AccountActivationCode accountActivationCode;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;


    @OneToOne(mappedBy = "account", cascade = CascadeType.REMOVE)
    private OrganizationRegistrationRequest organizationRegistrationRequest;


    public Account(){}

    public Account(AccountRegistration accountRegistration){
        this.email = accountRegistration.email();
        this.personalInformation = new PersonalInformation(accountRegistration.firstName(), accountRegistration.lastName());
        this.role = Role.NO_ROLE;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public PersonalInformation getPersonalInformation() {
        return personalInformation;
    }

    public void setPersonalInformation(PersonalInformation personalInformation) {
        this.personalInformation = personalInformation;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte[] profile_picture) {
        this.profilePicture = profile_picture;
    }

    public String getAccountDescription() {
        return accountDescription;
    }

    public void setAccountDescription(String account_description) {
        this.accountDescription = account_description;
    }

    public AccountActivationCode getAccountActivationCode() {
        return accountActivationCode;
    }

    public void setAccountActivationCode(AccountActivationCode accountActivationCode) {
        this.accountActivationCode = accountActivationCode;
    }
}
