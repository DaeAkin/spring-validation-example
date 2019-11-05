package com.validation.validationdemo;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories
@ComponentScan(basePackages = "com.validation.validationdemo")
@EnableJpaAuditing
@EnableTransactionManagement
public class TestConfiguration {
}
