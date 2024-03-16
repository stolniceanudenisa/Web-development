package com.example.ongmanager.controller.organization;


import com.example.ongmanager.controller.account.AccountController;
import com.example.ongmanager.dto.organization.OrganizationDTO;
import com.example.ongmanager.dto.organization.OrganizationRegistrationRequestDTO;
import com.example.ongmanager.exceptions.organizationRegistrationRequest.MultipleOrganizationRegistrationRequestsException;
import com.example.ongmanager.records.organization.OrganizationRegistrationRequestData;
import com.example.ongmanager.service.organization.OrganizationRegistrationService;
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

import java.io.IOException;


@Validated
@RestController
@RequestMapping("/organization/registration-request")
public class OrganizationRegistrationRequestController {

    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);
    private final OrganizationRegistrationService organizationRegistrationService;

    public OrganizationRegistrationRequestController(OrganizationRegistrationService organizationRegistrationService) {
        this.organizationRegistrationService = organizationRegistrationService;
    }

    @GetMapping(value = "/get/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<OrganizationRegistrationRequestDTO> fetchOrganizationList(@PageableDefault(direction = Sort.Direction.DESC, sort = "creationDate") Pageable pageable) {
        logger.info("[REST] GET PAGINATED ORGANIZATIONS REGISTRATION REQUESTS CALL at organisation/registration-request/get/all, PAGE: {}, COUNT: {}, SORT DIRECTION: {}",
                pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        return organizationRegistrationService.fetchOrganizationRegistrationList(pageable);
    }

    //@IsAdmin
    @GetMapping(value = "/get/all/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<OrganizationRegistrationRequestDTO> fetchOrganizationListByUserId(@PathVariable Long userId,
                                                               @PageableDefault(direction = Sort.Direction.ASC, sort="creationDate") Pageable pageable) {
        logger.info("[REST] GET PAGINATED ORGANIZATIONS CALL at organisation/registration-request/get/all{userId}, PAGE: {}, COUNT: {}, SORT DIRECTION: {}", pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        return organizationRegistrationService.fetchOrganizationListByUserId(userId, pageable);
    }


    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public OrganizationRegistrationRequestDTO createNewOrganizationRegistrationRequest(@Valid @RequestBody OrganizationRegistrationRequestData
                                                                                                   organizationRegistrationRequestData) throws IOException, MultipleOrganizationRegistrationRequestsException {
        logger.info("[REST] CREATE ORGANIZATION REGISTRATION REQUEST CALL AT /organisation/registration-request/create");
        return organizationRegistrationService.createNewOrganizationRegistrationRequest(organizationRegistrationRequestData);
    }


    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping(value = "/delete/{id}")
    public void deleteOrganizationRegistrationRequestById(@PathVariable("id") Long organizationRegistrationRequestId){
        logger.info("[REST] DELETE ORGANIZATION REGISTRATION REQUEST CALL at /delete/{}", organizationRegistrationService);
        organizationRegistrationService.deleteOrganizationRegistrationRequestById(organizationRegistrationRequestId);
    }

    @PutMapping(value = "/update",produces = MediaType.APPLICATION_JSON_VALUE, consumes  = MediaType.APPLICATION_JSON_VALUE)
    public OrganizationRegistrationRequestDTO updateOrganizationRegistration(@Valid @RequestBody OrganizationRegistrationRequestDTO organizationRegistrationRequestDTO){
        logger.info("[REST] UPDATE ORGANIZATIONS REGISTRATION REQUESTS CALL at organisation/registration-request/update");
        return organizationRegistrationService.updateOrganizationRegistrationRequest(organizationRegistrationRequestDTO);
    }

    @ExceptionHandler(MultipleOrganizationRegistrationRequestsException.class)
    public ResponseEntity<String> handleExistingRequestException(MultipleOrganizationRegistrationRequestsException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }
}
