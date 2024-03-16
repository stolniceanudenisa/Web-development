package com.example.ongmanager.service;

import com.example.ongmanager.beans.personalinfo.PersonalInformation;
import com.example.ongmanager.persistence.entities.account.Account;
import com.example.ongmanager.persistence.entities.account.Role;
import com.example.ongmanager.persistence.entities.client.Client;
import com.example.ongmanager.service.account.AccountService;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DatabasePopulationService {
    private static final Logger logger = LoggerFactory.getLogger(DatabasePopulationService.class);
    private final AccountService accountService;
    private final String adminEmail;
    private final String adminPassword;
    private final PasswordEncoder passwordEncoder;
    private final ClientDetailsService clientDetailsService;
    private final String defaultClientId;
    private final String defaultSecret;
    private final String defaultScope;
    private final String defaultAuthMethod;
    private final String defaultGrantType;
    private final String defaultRedirectUri;

    public DatabasePopulationService(AccountService accountService, @Value("${admin.email}") String adminEmail, PasswordEncoder passwordEncoder, ClientDetailsService clientDetailsService, @Value("${spring.security.oauth2.client.default.client-id}") String defaultClientId, @Value("${spring.security.oauth2.client.default.secret}") String defaultSecret, @Value("${spring.security.oauth2.client.default.scope}") String defaultScope, @Value("${spring.security.oauth2.client.default.auth-method}") String defaultAuthMethod, @Value("${spring.security.oauth2.client.default.grant-type}") String defaultGrantType, @Value("${spring.security.oauth2.client.default.redirect-uri}") String defaultRedirectUri){
        this.accountService = accountService;
        this.adminEmail = adminEmail;
        this.adminPassword = "password";
        this.passwordEncoder = passwordEncoder;
        this.clientDetailsService = clientDetailsService;
        this.defaultClientId= defaultClientId;
        this.defaultSecret = defaultSecret;
        this.defaultScope = defaultScope;
        this.defaultAuthMethod = defaultAuthMethod;
        this.defaultGrantType = defaultGrantType;
        this.defaultRedirectUri = defaultRedirectUri;
    }

    @PostConstruct
    public void populateDatabase(){
        logger.info("[SERVICE] POPULATING DATABASE with default account and default client details ");
        this.saveDefaultAccount();
        this.saveDefaultClientDetails();
    }

    private void saveDefaultAccount(){
        if(!accountService.existsByEmail(adminEmail)) {
            logger.info("[SERVICE] SAVING DEFAULT ACCOUNT IN DATABASE");
            Account account = new Account();
            account.setEmail(adminEmail);
            account.setPassword(passwordEncoder.encode(adminPassword));
            account.setRole(Role.ADMIN);

            PersonalInformation personalInformation = new PersonalInformation();
            personalInformation.setFirstName("admin_first_name");
            personalInformation.setLastName("admin_last_name");
            account.setPersonalInformation(personalInformation);

            accountService.saveAccount(account);
        }
    }

    private void saveDefaultClientDetails(){
        if(!clientDetailsService.existsByClientId(defaultClientId)){
            logger.info("[SERVICE] SAVING DEFAULT CLIENT DETAILS IN DATABASE");
            Client client = new Client();
            client.setClientId(defaultClientId);
            client.setSecret(passwordEncoder.encode(defaultSecret));
            client.setScope(defaultScope);
            client.setAuthMethod(defaultAuthMethod);
            client.setGrantType(defaultGrantType);
            client.setRedirectUri(defaultRedirectUri);

            clientDetailsService.save(Client.from(client));
        }
    }
}
