package com.example.ongmanager.service.organization;

import com.example.ongmanager.dto.account.AccountDTO;
import com.example.ongmanager.dto.account.AccountMapper;
import com.example.ongmanager.dto.organization.OrganizationDTO;
import com.example.ongmanager.dto.organization.OrganizationMapper;
import com.example.ongmanager.persistence.entities.account.Account;

import com.example.ongmanager.persistence.entities.account.Role;
import com.example.ongmanager.persistence.entities.district.District;
import com.example.ongmanager.persistence.entities.organization.Organization;
import com.example.ongmanager.persistence.repository.OrganizationRepository;
import com.example.ongmanager.records.organization.MemberRegistration;
import com.example.ongmanager.records.organization.OrganizationRegistration;
import com.example.ongmanager.service.account.AccountService;
import com.example.ongmanager.service.district.DistrictService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class OrganizationService {
    private final OrganizationRepository organizationRepository;
    private final OrganizationMapper organizationMapper;
    private final AccountMapper accountMapper;
    private final AccountService accountService;
    private final DistrictService districtService;

    private static final Logger logger = LoggerFactory.getLogger(OrganizationService.class);


    public OrganizationService(OrganizationRepository organizationRepository, OrganizationMapper organizationMapper, AccountMapper accountMapper,
                               AccountService accountService, DistrictService districtService) {
        this.organizationRepository = organizationRepository;
        this.organizationMapper = organizationMapper;
        this.accountMapper = accountMapper;
        this.accountService = accountService;
        this.districtService = districtService;
    }

    public Organization findByIdOrThrow(Long organizationId) {
        return organizationRepository.findById(organizationId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Organization with the id %s doesn't exist!", organizationId)));
    }

    public Page<OrganizationDTO> fetchOrganizationList(Pageable pageable) {
        logger.info("[SERVICE] GET PAGINATED ORGANIZATIONS, PAGE: {}, COUNT: {}, SORT DIRECTION: {}", pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        return organizationRepository.findAll(pageable).map(organizationMapper::organizationToOrganizationDTO);
    }


    public Page<OrganizationDTO> getOrganizationsByDistrictWithFilters(
            Long districtId, String nameFilter, String countyFilter, Pageable pageable) {

        return organizationRepository.findAllByDistrictIdAndNameContainingAndCountyContaining(
                districtId, nameFilter, countyFilter, pageable).map(organizationMapper::organizationToOrganizationDTO);
    }

    public List<AccountDTO> getMembersByOrganizationId (Long organizationId) {
        List<Account> members = organizationRepository.findAllMembersByOrganizationId(organizationId);
        return members.stream()
                .map(accountMapper::accountToAccountDTO)
                .collect(Collectors.toList());
    }

    public OrganizationDTO editOrganization(OrganizationDTO organizationDTO) {
        logger.info("[SERVICE] SAVING ORGANIZATION with id {} ", organizationDTO.getId());
        Organization currentOrganization = findByIdOrThrow(organizationDTO.getId());
        if (organizationDTO.getName() != null && !organizationDTO.getName().isEmpty()
                && !currentOrganization.getName().equals(organizationDTO.getName())) {
            Organization existingOrganizationWithSameName = organizationRepository.findByName(organizationDTO.getName());

            if (existingOrganizationWithSameName != null &&
                    !existingOrganizationWithSameName.getId().equals(currentOrganization.getId())) {
                throw new EntityExistsException(String.format("An organization with the name %s already exists!", organizationDTO.getName()));
            }
        }
        organizationMapper.updateOrganizationFromDto(organizationDTO, currentOrganization);
        return organizationMapper.organizationToOrganizationDTO(organizationRepository.save(currentOrganization));
    }


    public OrganizationDTO findOrganizationById(Long organizationId) {
        logger.info("[SERVICE] FINDING ORGANIZATION with id {}", organizationId);
        Organization organization = findByIdOrThrow(organizationId);
        return organizationMapper.organizationToOrganizationDTO(organization);
    }


    public OrganizationDTO addNewOrganizationMember(MemberRegistration memberRegistration) {
        logger.info("[SERVICE] SAVING A NEW MEMBER with the account id {}, organization id {}", memberRegistration.accountId(), memberRegistration.organizationId());

        Account newMember = accountService.findAccountById(memberRegistration.accountId());
        Organization organization = findByIdOrThrow(memberRegistration.organizationId());

        newMember.setRole(Role.ASPIRING_MEMBER);
        organization.addMember(newMember);
        organizationRepository.save(organization);
        return organizationMapper.organizationToOrganizationDTO(organization);
    }


    public void deleteOrganizationById(Long organizationId) {
        logger.info("[SERVICE] DELETING ORGANIZATION with id {}", organizationId);
        organizationRepository.deleteById(organizationId);
    }


    public OrganizationDTO createNewOrganization(OrganizationRegistration organizationRegistration) {
        logger.info("[SERVICE] CREATING ORGANIZATION with name {}", organizationRegistration.name());

        if(organizationRepository.existsByNameIgnoreCase(organizationRegistration.name())) {
            throw new EntityExistsException(String.format("The organization with the name %s already exists!", organizationRegistration.name()));
        }

        District district = districtService.findDistrictById(organizationRegistration.districtId());
        Account account = accountService.findAccountById(organizationRegistration.ownerId());
        Organization organization = new Organization(organizationRegistration, district, account);
        account.setRole(Role.PRESIDENT);
        organization.addMember(account);
        return organizationMapper.organizationToOrganizationDTO(organizationRepository.save(organization));
    }

    public Organization findById(Long organizationId) {
        return organizationRepository.findById(organizationId).orElseThrow(()->new EntityNotFoundException(String.format("The organization with the id: %s doesn't exist",organizationId)));
    }
}
