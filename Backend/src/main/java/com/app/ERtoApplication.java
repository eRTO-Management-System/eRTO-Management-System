package com.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class ERtoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ERtoApplication.class, args);
	}

}
