package com.example.ongmanager.persistence.entities.account;

import com.example.ongmanager.persistence.entities.BaseEntity;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "account_activation_codes")
public class AccountActivationCode extends BaseEntity {
    @Column(nullable = false)
    private String code;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    public AccountActivationCode(Account account){
        this.setCode(String.valueOf(UUID.randomUUID()));
        this.setAccount(account);
        this.setCreationDate(account.getCreationDate());
    }

    public AccountActivationCode(){}

    public String getCode() { return code; }

    public void setCode(String code) {
        this.code = code;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
