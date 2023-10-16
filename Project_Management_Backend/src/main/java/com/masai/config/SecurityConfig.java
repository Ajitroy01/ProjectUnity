package com.masai.config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class SecurityConfig{

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      
        http
            .authorizeHttpRequests(auth ->{
                auth
                    .requestMatchers(HttpMethod.POST,"/register").permitAll()
                    .requestMatchers(HttpMethod.GET, "/user/**").permitAll()
                    .requestMatchers(HttpMethod.PUT, "/user/**").permitAll()
                    .requestMatchers(HttpMethod.DELETE, "/user/**").permitAll()
                    .requestMatchers(HttpMethod.POST,"/projects/**").permitAll()
                    .requestMatchers(HttpMethod.GET,"/projects/**").permitAll()
                    .requestMatchers(HttpMethod.PUT,"/projects/**").permitAll()
                    .requestMatchers(HttpMethod.DELETE,"/projects/**").permitAll()
                    .requestMatchers(HttpMethod.POST,"/task/**").permitAll()
                    .requestMatchers(HttpMethod.GET,"/task/**").permitAll()
                    .requestMatchers(HttpMethod.PUT,"/task/**").permitAll()
                    .requestMatchers(HttpMethod.DELETE,"/task/**").permitAll()
                    .requestMatchers(HttpMethod.POST,"/team/**").permitAll()
                    .requestMatchers(HttpMethod.GET,"/team/**").permitAll()
                    .requestMatchers(HttpMethod.PUT,"/team/**").permitAll()
                    .requestMatchers(HttpMethod.DELETE,"/team/**").permitAll()
                    .anyRequest().authenticated();
            })
            .cors(cors -> {
                cors.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration cfg = new CorsConfiguration();
                        cfg.setAllowedOriginPatterns(Collections.singletonList("*"));
                        cfg.setAllowedMethods(Collections.singletonList("*"));
                        cfg.setAllowCredentials(true);
                        cfg.setAllowedHeaders(Collections.singletonList("*"));
                        cfg.setExposedHeaders(Arrays.asList("Authorization"));
                        return cfg;
                    }
                });
            })
            .csrf(csrf -> csrf.disable())
            .httpBasic(Customizer.withDefaults());
        
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
