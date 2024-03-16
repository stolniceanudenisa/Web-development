package com.example.ongmanager.persistence.entities.client;

import com.example.ongmanager.persistence.entities.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;

@Entity
@Table(name = "clients")
public class Client extends BaseEntity {

    private String clientId;
    private String secret;
    private String redirectUri;
    private String scope;
    private String authMethod;
    private String grantType;

    public Client() {};

    public Client(RegisteredClient registeredClient){
        this.clientId = registeredClient.getClientId();
        this.secret = registeredClient.getClientSecret();
        this.redirectUri = registeredClient.getRedirectUris().stream().findAny().get();
        this.scope = registeredClient.getScopes().stream().findAny().get();
        this.authMethod = registeredClient.getClientAuthenticationMethods().stream().findAny().get().getValue();
        this.grantType = registeredClient.getAuthorizationGrantTypes().stream().findAny().get().getValue();
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public String getRedirectUri() {
        return redirectUri;
    }

    public void setRedirectUri(String redirectUri) {
        this.redirectUri = redirectUri;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public String getAuthMethod() {
        return authMethod;
    }

    public void setAuthMethod(String authMethod) {
        this.authMethod = authMethod;
    }

    public String getGrantType() {
        return grantType;
    }

    public void setGrantType(String grantType) {
        this.grantType = grantType;
    }

    public static RegisteredClient from(Client client) {
        return RegisteredClient.withId(String.valueOf(client.getId()))
                .clientId(client.getClientId())
                .clientSecret(client.getSecret())
                .scope(client.getScope())
                .redirectUri(client.getRedirectUri())
                .clientAuthenticationMethod(new ClientAuthenticationMethod(client.getAuthMethod()))
                .authorizationGrantType(new AuthorizationGrantType(client.getGrantType()))
                .build();
    }
}
