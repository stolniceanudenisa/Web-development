package com.example.ongmanager.service.account;

import com.example.ongmanager.persistence.entities.account.AccountActivationCode;
import com.example.ongmanager.persistence.repository.AccountActivationCodeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class AccountActivationCodeService {
    private final static Logger logger = LoggerFactory.getLogger(AccountActivationCodeService.class);
    private final AccountActivationCodeRepository accountActivationCodeRepository;

    public AccountActivationCodeService(AccountActivationCodeRepository accountActivationCodeRepository){
        this.accountActivationCodeRepository = accountActivationCodeRepository;
    }

    public AccountActivationCode findByCode(String code){
        return accountActivationCodeRepository.findByCode(code)
                .orElseThrow(()-> new EntityNotFoundException(String.format("Activation code %s not found!", code)));
    }

    public void deleteAccountActivationCode(Long accountActivationCodeId){
        accountActivationCodeRepository.deleteById(accountActivationCodeId);
    }
}
