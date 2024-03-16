package com.example.ongmanager.service.account;
import com.example.ongmanager.dto.account.AccountDTO;
import com.example.ongmanager.dto.account.AccountMapper;
import com.example.ongmanager.persistence.entities.account.Account;
import com.example.ongmanager.persistence.entities.account.AccountActivationCode;
import com.example.ongmanager.persistence.entities.organization.Organization;
import com.example.ongmanager.persistence.entities.account.Role;
import com.example.ongmanager.persistence.repository.AccountRepository;
import com.example.ongmanager.records.account.AccountRegistration;
import com.example.ongmanager.records.email.JoinOrganizationRequest;
import com.example.ongmanager.service.email.EmailTemplateService;
import com.example.ongmanager.service.organization.OrganizationService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;


@Service
@EnableScheduling
public class AccountService {
    private static final Logger logger = LoggerFactory.getLogger(AccountService.class);
    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;
    private final PasswordEncoder passwordEncoder;
    private final EmailTemplateService emailTemplateService;
    private final AccountActivationCodeService accountActivationCodeService;

    private final OrganizationService organizationService;

    public AccountService(AccountRepository accountRepository, AccountMapper accountMapper, PasswordEncoder passwordEncoder, EmailTemplateService emailTemplateService, AccountActivationCodeService accountActivationCodeService,@Lazy OrganizationService organizationService){
        this.accountRepository = accountRepository;
        this.accountMapper = accountMapper;
        this.passwordEncoder = passwordEncoder;
        this.emailTemplateService = emailTemplateService;
        this.accountActivationCodeService = accountActivationCodeService;
        this.organizationService =organizationService;
    }

    public AccountDTO saveAccount(AccountDTO accountDTO) {
        logger.info("[SERVICE] SAVING ACCOUNT with id {} ", accountDTO.getId());

        Account account = accountMapper.accountDTOtoAccount(accountDTO);
        account.setPassword("password");
        Account createdAccount = accountRepository.save(account);

        return accountMapper.accountToAccountDTO(createdAccount);
    }


    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    public void setNewAccountPassword(String code, String password) {
        logger.info("[SERVICE] SETTING NEW PASSWORD FOR account with activation code {}", code);
        Account account = accountRepository.findByAccountActivationCode_Code(code).
                orElseThrow(()-> new EntityNotFoundException(String.format("Account with this activation code %s not found!", code)));
        account.setPassword(passwordEncoder.encode(password));
        account.setAccountActivationCode(null);
        accountRepository.save(account);

        AccountActivationCode accountActivationCode = accountActivationCodeService.findByCode(code);
        accountActivationCodeService.deleteAccountActivationCode(accountActivationCode.getId());
    }

    public void registerNewAccount(AccountRegistration accountRegistration) throws IOException {
        logger.info("[SERVICE] SAVING ACCOUNT with email {}", accountRegistration.email());

        if (accountRepository.existsByEmail(accountRegistration.email())) {
            throw new EntityExistsException(String.format("Account with this email %s already exists!", accountRegistration.email()));
        }
        Account account = new Account(accountRegistration);
        account.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));

        AccountActivationCode accountActivationCode = new AccountActivationCode(account);
        account.setAccountActivationCode(accountActivationCode);
        accountRepository.save(account);

        emailTemplateService.sendRegistrationEmail(account, accountActivationCode);
    }

    public void updateAccount(AccountDTO accountDTO) {
        Account existingAccount = this.findAccountById(accountDTO.getId());
        if(!Objects.equals(accountDTO.getEmail(), existingAccount.getEmail()) && accountRepository.existsByEmail(accountDTO.getEmail())){
            throw new EntityExistsException(String.format("Account with this email %s already exists!", accountDTO.getEmail()));
        }
        Account account = accountMapper.accountDTOtoAccount(accountDTO);
        account.setPassword(existingAccount.getPassword());
        account.setCreationDate(existingAccount.getCreationDate());

        accountRepository.save(account);
    }

    public Page<AccountDTO> fetchAccountList(Pageable pageable) {
        logger.info("[SERVICE] GET PAGINATED ACCOUNTS, PAGE: {}, COUNT: {}, SORT DIRECTION: {}", pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        return accountRepository.findAll(pageable).map(accountMapper::accountToAccountDTO);
    }

    public void deleteAccountById(Long accountId) {
        logger.info("[SERVICE] DELETING ACCOUNT with id {}", accountId);
        accountRepository.deleteById(accountId);
    }

    public AccountDTO findAccount(Long accountId) {
        logger.info("[SERVICE] FINDING ACCOUNT with id {}",accountId);
        return accountRepository.findById(accountId)
                .map(accountMapper::accountToAccountDTO)
                .orElseThrow(() -> new EntityNotFoundException(String.format("The account with the id: %d, doesn't exist",accountId)));

    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void checkAccountActivationCodesValid(){
        logger.info("[SERVICE] CHECKING IF ACTIVATION CODES ARE VALID...");

        List<Account> accountList = accountRepository.findAll().stream()
                .filter(account -> account.getAccountActivationCode().getCreationDate()
                        .plusHours(24).isBefore(LocalDateTime.now())).toList();

        for(Account account : accountList){
            logger.info("[SERVICE] DELETING ACCOUNT with id {} and ASSOCIATED ACTIVATION CODE", account.getId());
            accountRepository.deleteById(account.getId());
        }
        logger.info("[SERVICE] CHECKING OF ACTIVATION CODES VALIDITY DONE!");
    }

    public boolean existsByEmail(String email){
        return accountRepository.existsByEmail(email);
    }

    public Account findAccountByEmail(String email) {
        return accountRepository.findByEmail(email)
                .orElseThrow(()->new EntityNotFoundException(String.format("Account with email: %s not found!", email)));
    }

    public Account findAccountById(Long ownerId) {
        return accountRepository.findById(ownerId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("The account with the id: %d, doesn't exist",ownerId)));
    }

    public void sendEmailRequest(JoinOrganizationRequest joinOrganizationRequest) throws IOException {
        Account user = accountRepository.findById(joinOrganizationRequest.accountId()).orElseThrow(() -> new EntityNotFoundException(String.format("The user with the id: %s doesn't exist", joinOrganizationRequest.accountId())));
        Account president = accountRepository.findPresidentByOrganizationId(joinOrganizationRequest.organizationId()).orElseThrow(() -> new EntityNotFoundException(String.format("The president of the organization with the id: %s doesn't exist", joinOrganizationRequest.organizationId())));

        Organization organization=organizationService.findById(joinOrganizationRequest.organizationId());

        emailTemplateService.sendEmailToAspiringMember(user, organization);
        emailTemplateService.sendEmailToPresident(user, president, organization);
    }

    public List<Account> findAccountsByRole(Role role){
        return accountRepository.findAccountsByRole(role);
    }

    public Optional<AccountDTO> findAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken))
            return accountRepository.findByEmail(authentication.getName()).map(accountMapper::accountToAccountDTO);
        else
            return Optional.empty();
    }

    public AccountDTO fetchAuthenticatedUserDetails() {
        return this.findAuthenticatedUser().orElseThrow(() -> new EntityNotFoundException("User not authenticated!"));
    }
}