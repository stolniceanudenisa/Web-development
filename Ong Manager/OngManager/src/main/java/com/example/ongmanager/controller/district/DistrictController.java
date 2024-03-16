package com.example.ongmanager.controller.district;

import com.example.ongmanager.config.security.methods.IsAdmin;
import com.example.ongmanager.dto.district.DistrictDTO;
import com.example.ongmanager.records.district.DistrictRegistration;
import com.example.ongmanager.service.district.DistrictService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/district")
//@IsAdmin
public class DistrictController {

    private static final Logger logger = LoggerFactory.getLogger(DistrictController.class);

    private final DistrictService districtService;

    public DistrictController(DistrictService districtService) {
        this.districtService = districtService;
    }

    @GetMapping(value = "/get/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<DistrictDTO> fetchDistrictList(@PageableDefault(direction = Sort.Direction.ASC, sort = "name") Pageable pageable) {
        logger.info("[REST] GET PAGINATED DISTRICTS CALL at district/get/all");
        return districtService.fetchDistrictList(pageable);
    }

    @GetMapping(value = "/{id}")
    public DistrictDTO findDistrictById(@PathVariable("id") Long districtId) {
        logger.info("[REST] FIND DISTRICT CALL at /district/{} ", districtId);
        return districtService.findDistrict(districtId);
    }

    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<DistrictDTO> searchDistrictByName(@RequestParam String districtName) {
        logger.info("[REST] FIND DISTRICT BY NAME CALL at /district/find");
        return this.districtService.findDistrictByName(districtName);
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public DistrictDTO registerNewDistrict(@RequestBody DistrictRegistration districtRegistration) {
        logger.info("[REST] CREATE DISTRICT CALL AT district/create");
        return districtService.createNewDistrict(districtRegistration);

    }

    @PutMapping(value = "/update",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    public DistrictDTO updateDistrict(@RequestBody DistrictDTO districtDTO) {
        logger.info("[REST] UPDATE DISTRICTS CALL at district/update");
        return districtService.updateDistrict(districtDTO);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping(value = "/delete/{id}")
    public void deleteDistrict(@PathVariable("id") Long districtId) {
        logger.info("[REST] DELETE ACCOUNT CALL at /delete/{}", districtService);
        districtService.deleteDistrict(districtId);
    }


}
