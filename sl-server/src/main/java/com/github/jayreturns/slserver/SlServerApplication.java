package com.github.jayreturns.slserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class SlServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SlServerApplication.class, args);
    }

}
