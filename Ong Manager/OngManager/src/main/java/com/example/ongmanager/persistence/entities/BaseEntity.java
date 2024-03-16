package com.example.ongmanager.persistence.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@SuppressWarnings("unused")
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@FilterDef(name = "isEnabledFilter")
@Filter(name = "isEnabledFilter", condition = "enabled = true")
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    private LocalDateTime creationDate;

    private boolean enabled = true;

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public boolean getEnabled(){

        return this.enabled;
    }

    public void setEnabled(boolean enabled){
        this.enabled=enabled;

    }
}
