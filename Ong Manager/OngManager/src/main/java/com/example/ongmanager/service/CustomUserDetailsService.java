package com.example.ongmanager.service;

import com.example.ongmanager.persistence.entities.account.Account;
import com.example.ongmanager.service.account.AccountService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final AccountService accountService;

    public CustomUserDetailsService(AccountService accountService) {
        this.accountService = accountService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        Account account = accountService.findAccountByEmail(email);
        return new User(email, account.getPassword(), List.of(new SimpleGrantedAuthority(account.getRole().name())));
    }
}
