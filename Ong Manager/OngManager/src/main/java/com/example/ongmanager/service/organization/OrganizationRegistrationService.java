package com.example.ongmanager.service.organization;



import com.example.ongmanager.dto.organization.OrganizationDTO;
import com.example.ongmanager.dto.organization.OrganizationRegistrationRequestDTO;
import com.example.ongmanager.dto.organization.OrganizationRegistrationRequestMapper;
import com.example.ongmanager.exceptions.organizationRegistrationRequest.MultipleOrganizationRegistrationRequestsException;
import com.example.ongmanager.persistence.entities.account.Account;
import com.example.ongmanager.persistence.entities.account.Role;
import com.example.ongmanager.persistence.entities.district.District;
import com.example.ongmanager.beans.organization.OrganizationDetails;
import com.example.ongmanager.persistence.entities.organization.Organization;
import com.example.ongmanager.persistence.entities.organization.OrganizationRegistrationRequest;
import com.example.ongmanager.persistence.repository.OrganizationRegistrationRequestRepository;
import com.example.ongmanager.records.organization.OrganizationRegistrationRequestData;
import com.example.ongmanager.service.account.AccountService;
import com.example.ongmanager.service.district.DistrictService;
import com.example.ongmanager.service.email.EmailTemplateService;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.util.List;


@Service
public class OrganizationRegistrationService {

    private static final Logger logger = LoggerFactory.getLogger(OrganizationRegistrationService.class);
    private final OrganizationRegistrationRequestRepository organizationRegistrationRequestRepository;
    private final OrganizationRegistrationRequestMapper organizationRegistrationRequestMapper;
    private final AccountService accountService;
    private final EmailTemplateService emailTemplateService;
    private final DistrictService districtService;


    public OrganizationRegistrationService(OrganizationRegistrationRequestRepository organizationRegistrationRequestRepository,
                                           OrganizationRegistrationRequestMapper organizationRegistrationRequestMapper, AccountService accountService,
                                           EmailTemplateService emailTemplateService, DistrictService districtService) {
        this.organizationRegistrationRequestRepository = organizationRegistrationRequestRepository;
        this.organizationRegistrationRequestMapper = organizationRegistrationRequestMapper;
        this.accountService = accountService;
        this.emailTemplateService = emailTemplateService;
        this.districtService = districtService;
    }


    public OrganizationRegistrationRequest findById(Long organizationRequestId) {
        return organizationRegistrationRequestRepository.findById(organizationRequestId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Organization Registration Request with the id %s doesn't exist!", organizationRequestId)));
    }

    public Page<OrganizationRegistrationRequestDTO> fetchOrganizationRegistrationList(Pageable pageable) {
        logger.info("[SERVICE] GET PAGINATED ORGANIZATIONS, PAGE: {}, COUNT: {}, SORT DIRECTION: {}", pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        return organizationRegistrationRequestRepository.findAll(pageable).map(organizationRegistrationRequestMapper::organizationRegistrationRequestToOrganizationRegistrationRequestDTO);
    }

    public Page<OrganizationRegistrationRequestDTO> fetchOrganizationListByUserId(Long userId, Pageable pageable) {
        logger.info("[SERVICE] GET PAGINATED ORGANIZATIONS, PAGE: {}, COUNT: {}, SORT DIRECTION: {}", pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        return organizationRegistrationRequestRepository.findAllByRequesterId(userId, pageable).map(organizationRegistrationRequestMapper::organizationRegistrationRequestToOrganizationRegistrationRequestDTO);
    }


    public OrganizationRegistrationRequestDTO createNewOrganizationRegistrationRequest(OrganizationRegistrationRequestData
                                                                                               organizationRegistrationRequestData) throws IOException, MultipleOrganizationRegistrationRequestsException {
        logger.info("[SERVICE] CREATING ORGANIZATION REGISTRATION REQUEST");

        if (userHasExistingRequest(organizationRegistrationRequestData.requesterId())) {
            throw new MultipleOrganizationRegistrationRequestsException();
        }

        Account user = accountService.findAccountById(organizationRegistrationRequestData.requesterId());
        List<Account> admins = accountService.findAccountsByRole(Role.ADMIN);

        OrganizationDetails organizationDetails = new OrganizationDetails(organizationRegistrationRequestData);

        District district = districtService.findDistrictById(organizationRegistrationRequestData.districtId());

        OrganizationRegistrationRequest organizationRegistrationRequest = new OrganizationRegistrationRequest(organizationRegistrationRequestData,
                accountService.findAccountById(organizationRegistrationRequestData.requesterId()), organizationDetails);
        organizationRegistrationRequestRepository.save(organizationRegistrationRequest);

        emailTemplateService.sendEmailToOrganizationCreator(user, organizationRegistrationRequestData.name());
        emailTemplateService.sendEmailToAdmins(user, admins, organizationDetails, district);
        return organizationRegistrationRequestMapper.organizationRegistrationRequestToOrganizationRegistrationRequestDTO(organizationRegistrationRequest);
    }

    public OrganizationRegistrationRequestDTO updateOrganizationRegistrationRequest(OrganizationRegistrationRequestDTO organizationRegistrationRequestDTO) {
        logger.info("[SERVICE] SAVING ORGANIZATION REGISTRATION REQUEST with id {} ", organizationRegistrationRequestDTO.getId());
        OrganizationRegistrationRequest organizationRegistrationRequestToUse = findById(organizationRegistrationRequestDTO.getId());
        organizationRegistrationRequestMapper.updateOrganizationRegistrationRequestFromDto(organizationRegistrationRequestDTO, organizationRegistrationRequestToUse);
        return organizationRegistrationRequestMapper.organizationRegistrationRequestToOrganizationRegistrationRequestDTO(organizationRegistrationRequestRepository.save(organizationRegistrationRequestToUse));
    }


    public void deleteOrganizationRegistrationRequestById(Long organizationRegistrationRequestId) {
        logger.info("[SERVICE] DELETING ORGANIZATION with id {}", organizationRegistrationRequestId);
        organizationRegistrationRequestRepository.deleteById(organizationRegistrationRequestId);
    }

    private boolean userHasExistingRequest(Long userId) {
        return organizationRegistrationRequestRepository.existsByRequesterId(userId);
    }

}
