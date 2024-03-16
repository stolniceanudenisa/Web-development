package com.example.ongmanager.service.email;

import com.example.ongmanager.persistence.entities.account.Account;
import com.example.ongmanager.persistence.entities.account.AccountActivationCode;
import com.example.ongmanager.persistence.entities.district.District;
import com.example.ongmanager.beans.organization.OrganizationDetails;
import com.example.ongmanager.persistence.entities.organization.Organization;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.ongmanager.service.email.EmailTemplate.*;

@Service
public class EmailTemplateService {
    private final EmailService emailService;

    private final Configuration fmConfiguration;

    private final String baseUrl;

    private final String clientUrl;

    private final String setPasswordPath;


    public EmailTemplateService(EmailService emailService,
                                @Qualifier("FreeMarkerConfiguration") Configuration fmConfiguration,
                                @Value("${app.base-url}") String baseUrl,
                                @Value("${app.endpoints.account.registration.set-password}") String setPasswordPath,
                                @Value("${app.client-url}") String clientUrl) {
        this.emailService = emailService;
        this.fmConfiguration = fmConfiguration;
        this.baseUrl = baseUrl;
        this.clientUrl = clientUrl;
        this.setPasswordPath = setPasswordPath;
    }

    public void sendRegistrationEmail(Account user, AccountActivationCode accountActivationCode) throws IOException {
        Map<String, Object> model = new HashMap<>();

        model.put("firstName", user.getPersonalInformation().getFirstName());
        model.put("accountActivationCode", accountActivationCode.getCode());
        model.put("clientUrl",clientUrl);
        model.put("setPasswordPath",setPasswordPath);

        String subject = REGISTRATION_TEMPLATE.getEmailSubject();
        String content = getContentFromTemplate(fmConfiguration.getTemplate(REGISTRATION_TEMPLATE.getTemplateName()), model);

        emailService.sendEmailWithTemplate(user.getEmail(), subject, content);
    }

    public void sendEmailToAspiringMember(Account user, Organization organization) throws IOException {
        Map<String, Object> model = new HashMap<>();

        model.put("firstName", user.getPersonalInformation().getFirstName());
        model.put("lastName", user.getPersonalInformation().getLastName());
        model.put("organizationName", organization.getName());

        String subject = JOIN_ORGANIZATION_TEMPLATE.getEmailSubject();
        String content = getContentFromTemplate(fmConfiguration.getTemplate(JOIN_ORGANIZATION_TEMPLATE.getTemplateName()), model);

        emailService.sendEmailWithTemplate(user.getEmail(), subject, content);
    }

    public void sendEmailToPresident(Account user, Account president, Organization organization) throws IOException {
        Map<String, Object> model = new HashMap<>();

        model.put("firstNamePresident", president.getPersonalInformation().getFirstName());
        model.put("firstNameUser", user.getPersonalInformation().getFirstName());
        model.put("lastNameUser", user.getPersonalInformation().getLastName());
        model.put("emailUser", user.getEmail());
        model.put("organizationName", organization.getName());

        String subject = PRESIDENT_TEMPLATE.getEmailSubject();
        String content = getContentFromTemplate(fmConfiguration.getTemplate(PRESIDENT_TEMPLATE.getTemplateName()), model);

        emailService.sendEmailWithTemplate(president.getEmail(), subject, content);
    }

    public void sendEmailToOrganizationCreator(Account user, String organizationName) throws IOException {
        Map<String, Object> model = new HashMap<>();

        model.put("firstName", user.getPersonalInformation().getFirstName());
        model.put("lastName", user.getPersonalInformation().getLastName());
        model.put("organizationName", organizationName);
        String subject = ORGANIZATION_CREATOR_TEMPLATE.getEmailSubject();
        String content = getContentFromTemplate(fmConfiguration.getTemplate(ORGANIZATION_CREATOR_TEMPLATE.getTemplateName()), model);
        emailService.sendEmailWithTemplate(user.getEmail(), subject, content);
    }


    public void sendEmailToAdmins(Account user, List<Account> admins, OrganizationDetails organizationDetails, District district) throws IOException {
        Map<String, Object> model = new HashMap<>();
        String subject = ORGANIZATION_REQUEST_TO_ADMINS_TEMPLATE.getEmailSubject();
        model.put("firstNameUser", user.getPersonalInformation().getFirstName());
        model.put("lastNameUser", user.getPersonalInformation().getLastName());
        model.put("emailUser", user.getEmail());
        model.put("organizationName", organizationDetails.getName());
        model.put("districtName", district.getName());
        model.put("organizationDetails", organizationDetails.getDetails());
        model.put("organizationCounty", organizationDetails.getCounty());
        model.put("baseUrl", baseUrl);
        for (Account admin : admins) {
            model.put("firstNameAdmin", admin.getPersonalInformation().getFirstName());
            String content = getContentFromTemplate(fmConfiguration.getTemplate(ORGANIZATION_REQUEST_TO_ADMINS_TEMPLATE.getTemplateName()), model);
            emailService.sendEmailWithTemplate(admin.getEmail(), subject, content);
        }
    }


    private String getContentFromTemplate(Template template, Map<String, Object> model) {
        StringBuffer content = new StringBuffer();

        try {
            content.append(FreeMarkerTemplateUtils.processTemplateIntoString(template, model));
        } catch (Exception e) {
            e.printStackTrace();
        }

        return content.toString();
    }


}
