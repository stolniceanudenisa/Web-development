package com.example.ongmanager.dto.account;

import com.example.ongmanager.persistence.entities.account.Account;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        uses = {
                PersonalInformationMapper.class
        },
        injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface AccountMapper {

    @Mapping(target = "personalInformationDTO", source = "personalInformation")
    AccountDTO accountToAccountDTO(Account account);

    @Mapping(target = "personalInformation", source = "personalInformationDTO")
    Account accountDTOtoAccount(AccountDTO accountDTO);
}
