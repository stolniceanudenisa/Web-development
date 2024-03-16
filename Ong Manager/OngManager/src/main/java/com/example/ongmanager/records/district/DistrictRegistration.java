package com.example.ongmanager.records.district;

import java.util.List;

public record DistrictRegistration(String name, Integer districtNumber, List<String> countries, String description) {
}
