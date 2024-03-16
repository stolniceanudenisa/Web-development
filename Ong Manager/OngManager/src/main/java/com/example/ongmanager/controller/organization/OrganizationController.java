package com.example.ongmanager.controller.organization;

import com.example.ongmanager.controller.account.AccountController;
import com.example.ongmanager.dto.account.AccountDTO;
import com.example.ongmanager.dto.organization.OrganizationDTO;
import com.example.ongmanager.records.organization.MemberRegistration;
import com.example.ongmanager.records.organization.OrganizationRegistration;
import com.example.ongmanager.service.organization.OrganizationService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Validated
@RestController
@RequestMapping("/organization")
public class OrganizationController {

    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);
    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService){ this.organizationService = organizationService;}


    //@IsAdmin
    @GetMapping(value = "/get/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<OrganizationDTO> fetchOrganizationList(@PageableDefault(direction = Sort.Direction.ASC, sort="district_id") Pageable pageable) {
        logger.info("[REST] GET PAGINATED ORGANIZATIONS CALL at organization/get/all, PAGE: {}, COUNT: {}, SORT DIRECTION: {}", pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        return organizationService.fetchOrganizationList(pageable);
    }

    //@IsAdmin
    @GetMapping(value = "/district/{districtId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<OrganizationDTO> getOrganizationsByDistrict(
            @PathVariable Long districtId,
            @RequestParam(required = false) String nameFilter,
            @RequestParam(required = false) String countyFilter,
            @PageableDefault Pageable pageable) {
        return organizationService.getOrganizationsByDistrictWithFilters(districtId, nameFilter, countyFilter, pageable);
    }

    //@IsAdmin
    @GetMapping(value = "/{id}/members", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<AccountDTO> getMembersByOrganizationId(@PathVariable("id") Long organizationId ){
        logger.info("[REST] GET MEMBERS FROM AN ORGANIZATION WITH CALL AT organization/{id}/members");
        return organizationService.getMembersByOrganizationId(organizationId);
    }

    //@IsAdmin
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public OrganizationDTO findOrganizationById(@PathVariable("id") Long organizationId){
        logger.info("[REST] FIND ORGANIZATION CALL at /organization/{} ", organizationId);
        return organizationService.findOrganizationById(organizationId);
    }

    //@IsAdmin
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<HttpStatus> deleteOrganizationById(@PathVariable("id") Long organizationId){
        logger.info("[REST] DELETE ORGANIZATION CALL at /delete/{}", organizationService);
        organizationService.deleteOrganizationById(organizationId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping(value ="/create", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public OrganizationDTO createNewOrganization(@Valid @RequestBody OrganizationRegistration organizationRegistration){
        logger.info("[REST] CREATE ORGANIZATION CALL AT organization/create");
        return organizationService.createNewOrganization(organizationRegistration);

    }

    @PutMapping(value = "/edit",produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public OrganizationDTO editOrganizationInfo( @Valid @RequestBody OrganizationDTO organizationDTO){
        logger.info("[REST] EDIT ORGANIZATIONS INFO CALL at organization/edit");
        return organizationService.editOrganization(organizationDTO);
    }

    @PostMapping(value = "/add/member",produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public OrganizationDTO addNewOrganizationMember(@Valid @RequestBody MemberRegistration memberRegistration){
        logger.info("[REST] ADD MEMBER CALL AT organization/add/member");
        return organizationService.addNewOrganizationMember(memberRegistration);
    }

}


