package com.example.ongmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class OngManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(OngManagerApplication.class, args);
	}

}
