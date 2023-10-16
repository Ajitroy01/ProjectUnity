package com.masai.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Project {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;
	    private String name;
	    @Column(columnDefinition = "TEXT")
	    private String description;
	    private LocalDate startDate;
	    private LocalDate endDate;
	    private boolean isAssigned;
	    private String imageUrl;
	    
	    @ManyToOne
	    @JoinColumn(name = "project_manager_id")
	    private Users projectManager;
}
