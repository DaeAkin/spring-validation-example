package com.validation.validationdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaAuditing
@EnableAutoConfiguration
@EnableJpaRepositories
public class ValidationdemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ValidationdemoApplication.class, args);
	}

}
