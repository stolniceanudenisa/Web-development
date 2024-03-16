package com.example.ongmanager.service.email;

public enum EmailTemplate {
    REGISTRATION_TEMPLATE("emailRegistration.flth","Welcome to Ong Manager App!"),
    PRESIDENT_TEMPLATE("emailPresident.flth","Application to join the Organization."),
    JOIN_ORGANIZATION_TEMPLATE("emailJoinOrganization.flth","Application to join the Organization."),
    ORGANIZATION_CREATOR_TEMPLATE("emailOrganizationCreator.flth","Request to create your organization."),
    ORGANIZATION_REQUEST_TO_ADMINS_TEMPLATE("emailToAdminsOrganizationRequest.flth","New Organization Registration Request.");


    private final String templateName;
    private final String subject;


    EmailTemplate(String templateName, String subject) {
        this.templateName=templateName;
        this.subject=subject;
    }
    public String getTemplateName() {
        return templateName;
    }
    public String getEmailSubject() {
        return subject;
    }

}
