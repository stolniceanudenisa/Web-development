package com.example.ongmanager.controller.account;

import com.example.ongmanager.dto.account.AccountDTO;
import com.example.ongmanager.records.account.AccountPassword;
import com.example.ongmanager.records.account.AccountRegistration;
import com.example.ongmanager.records.email.JoinOrganizationRequest;
import com.example.ongmanager.service.account.AccountService;
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
@RequestMapping("/account")
public class AccountController {

    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);
    private final AccountService accountService;

    public AccountController(AccountService accountService) {

        this.accountService = accountService;

    }

    @GetMapping(value = "/get/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<AccountDTO> fetchAccountList(@PageableDefault(page = 0, size = 10, direction = Sort.Direction.ASC, sort = "personalInformation.lastName") Pageable pageable) {
        logger.info("[REST] GET PAGINATED ACCOUNTS CALL at account/get/all, PAGE: {}, COUNT: {}, SORT DIRECTION: {}", pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        return accountService.fetchAccountList(pageable);
    }

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public AccountDTO saveAccount(@RequestBody AccountDTO accountDTO) {
        logger.info("[REST] CREATE ACCOUNT CALL at account/create");
        return accountService.saveAccount(accountDTO);
    }

    @PostMapping(value = "/registration/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> registerNewAccount(@RequestBody AccountRegistration accountRegistration) throws IOException {
        logger.info("[REST] CREATE ACCOUNT CALL AT account/registration/create");
        accountService.registerNewAccount(accountRegistration);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping(value = "/registration/activate/{activationCode}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> setNewAccountPassword(@PathVariable("activationCode") String activationCode, @RequestBody AccountPassword accountPassword) {
        logger.info("[REST] SET PASSWORD FOR NEW ACCOUNT CALL at account/registration/activate/{}", activationCode);
        accountService.setNewAccountPassword(activationCode, accountPassword.password());
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping(value = "/update", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> updateAccount(@RequestBody AccountDTO accountDTO) {
        logger.info("[REST] UPDATE ACCOUNTS CALL at account/update");
        accountService.updateAccount(accountDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public AccountDTO findAccountById(@PathVariable("id") Long accountId){
        logger.info("[REST] FIND ACCOUNT CALL at /account/{} ",accountId);
        return accountService.findAccount(accountId);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<HttpStatus> deleteAccount(@PathVariable("id") Long accountId){
        logger.info("[REST] DELETE ACCOUNT CALL at /delete/{}", accountId);
        accountService.deleteAccountById(accountId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping(value = "/sendRequest" ,consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void sendJoinRequestOrganization(@Valid @RequestBody JoinOrganizationRequest joinOrganizationRequest) throws IOException {
        logger.info("[REST] SEND JOIN REQUEST FROM ACCOUNT CALL at /sendRequest/{}/{}", joinOrganizationRequest.accountId(), joinOrganizationRequest.organizationId());
        accountService.sendEmailRequest(joinOrganizationRequest);
    }

    @GetMapping(value = "/user/details" , produces = MediaType.APPLICATION_JSON_VALUE)
    public AccountDTO fetchAuthenticatedUserDetails() {
        return accountService.fetchAuthenticatedUserDetails();
    }

}
