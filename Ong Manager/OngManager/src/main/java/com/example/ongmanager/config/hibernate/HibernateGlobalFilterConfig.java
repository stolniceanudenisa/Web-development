package com.example.ongmanager.config.hibernate;

import jakarta.persistence.EntityManager;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.hibernate.Session;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class HibernateGlobalFilterConfig {

    private final EntityManager entityManager;

    public HibernateGlobalFilterConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Around("execution(* org.springframework.data.jpa.repository.JpaRepository+.*(..))")
    public Object globalFilterSessionEnabler(ProceedingJoinPoint joinPoint) throws Throwable {
        Session session = entityManager.unwrap(Session.class);
        session.enableFilter("isEnabledFilter");
        Object result = joinPoint.proceed();
        session.disableFilter("isEnabledFilter");
        return result;
    }
}
