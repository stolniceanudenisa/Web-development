package com.example.ongmanager.dto.district;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(name = "District")
public class DistrictDTO {

    private Long id;

    private String name;

    private String description;

    private Integer districtNumber;

    private List<String> countries;

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

    public Integer getDistrictNumber() {
        return districtNumber;
    }

    public void setDistrictNumber(Integer districtNumber) {
        this.districtNumber = districtNumber;
    }

    public List<String> getCountries() {
        return countries;
    }

    public void setCountries(List<String> countries) {
        this.countries = countries;
    }
}
