package com.masai.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Users {

	   @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;
	   @Column(unique = true, nullable = false)
	    private String username;
	    private String password;
	    private String name;
	    private String email;
	    private String profilePicture;
	    private String role;
	    @Column(columnDefinition = "TEXT")
	    private String about;
}
