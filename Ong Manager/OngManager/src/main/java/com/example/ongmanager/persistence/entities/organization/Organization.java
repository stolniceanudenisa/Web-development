package com.example.ongmanager.persistence.entities.organization;

import com.example.ongmanager.persistence.entities.BaseEntity;
import com.example.ongmanager.persistence.entities.account.Account;
import com.example.ongmanager.persistence.entities.district.District;
import com.example.ongmanager.records.organization.OrganizationRegistration;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.SQLDelete;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "organizations")
@SQLDelete(sql = "UPDATE organizations SET enabled = false WHERE id=?")
public class Organization extends BaseEntity {

    @Column(nullable = false, unique = true)
    @Size(min = 5, max = 30, message = "Name must be between 5 and 30 characters")
    @NotBlank(message = "Name is mandatory")
    private String name;

    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;

    @OneToOne(cascade =  CascadeType.MERGE)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    @NotNull(message = "Owner is mandatory")
    private Account owner;

    @ManyToOne
    @JoinColumn
    @NotNull(message = "District is mandatory")
    private District district;

    @OneToMany(cascade =  CascadeType.MERGE)
    @JoinTable(inverseJoinColumns = @JoinColumn(name="member_id"))
    //@NotEmpty(message = "Members list is mandatory")
    private List<@Valid Account> members;

    @Column(nullable = false)
    @Size(min = 3, max = 30, message = "County must be between 3 and 30 characters")
    @NotBlank(message = "County is mandatory")
    private String county;

    @Column(length = 5242880)
    private byte[] logo;

    @Column(length = 10485760)
    private byte[] banner;

    public Organization() {}

    public Organization(OrganizationRegistration organizationRegistration, District district, Account owner) {
        this.name = organizationRegistration.name();
        this.description = organizationRegistration.description();
        this.county = organizationRegistration.county();
        this.district = district;
        this.owner = owner;

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

    public Account getOwner() {
        return owner;
    }

    public void setOwner(Account owner) {
        this.owner = owner;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public List<Account> getMembers() {
        return members;
    }

    public void setMembers(List<Account> members) {
        this.members = members;
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

    public void addMember(Account account){
        if(this.members == null){
            this.members = new ArrayList<>();
        }
        this.members.add(account);
    }
}
