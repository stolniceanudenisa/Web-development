package com.example.ongmanager.dto.account;

import com.example.ongmanager.beans.personalinfo.PersonalInformation;
import com.example.ongmanager.dto.account.PersonalInformationDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@SuppressWarnings("ALL")
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface PersonalInformationMapper {

    PersonalInformationDTO personalInformationToPersonalInformationDTO(PersonalInformation personalInformation);

    PersonalInformation personalInformationDTOtoPersonalInformation(PersonalInformationDTO personalInformationDTO);
}
