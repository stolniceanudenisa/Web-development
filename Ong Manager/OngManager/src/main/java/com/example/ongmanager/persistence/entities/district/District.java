package com.example.ongmanager.persistence.entities.district;

import com.example.ongmanager.persistence.entities.BaseEntity;
import com.example.ongmanager.persistence.entities.account.Account;
import com.example.ongmanager.persistence.entities.organization.Organization;
import com.example.ongmanager.records.district.DistrictRegistration;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.SQLDelete;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "districts")
@SQLDelete(sql = "UPDATE districts SET enabled = false WHERE id=?")
public class District extends BaseEntity {

    @Size(min = 5,max = 30)
    @Column(nullable = false,unique = true)
    private String name;

    @Size(max=1000)
    private String description;

    @Column(nullable = false)
    private Integer districtNumber;

    @OneToMany
    private List<Organization> organizations;

    @ElementCollection
    @Column(nullable = false)
    @NotEmpty
    private List<String> countries=new ArrayList<>();
    private byte[] logo;

    private byte[] banner;

    public District(){}
    public District(DistrictRegistration districtRegistration){

        BeanUtils.copyProperties(districtRegistration,this);
        this.countries.addAll(districtRegistration.countries());

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

    public Integer getDistrictNumber() {
        return districtNumber;
    }

    public void setDistrictNumber(Integer districtNumber) {
        this.districtNumber = districtNumber;
    }

    public List<Organization> getOrganizations() {
        return organizations;
    }

    public List<String> getCountries() {
        return countries;
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
