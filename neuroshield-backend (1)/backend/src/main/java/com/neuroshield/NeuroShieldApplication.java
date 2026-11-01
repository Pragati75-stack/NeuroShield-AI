package com.neuroshield;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class NeuroShieldApplication {

    public static void main(String[] args) {
        SpringApplication.run(NeuroShieldApplication.class, args);
    }
}
