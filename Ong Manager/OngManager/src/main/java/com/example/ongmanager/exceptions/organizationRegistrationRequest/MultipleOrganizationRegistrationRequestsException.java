package com.example.ongmanager.exceptions.organizationRegistrationRequest;

public class MultipleOrganizationRegistrationRequestsException extends RuntimeException {
    public MultipleOrganizationRegistrationRequestsException() {
        super("The maximum number of organization registration requests have been reached!");
    }
}
