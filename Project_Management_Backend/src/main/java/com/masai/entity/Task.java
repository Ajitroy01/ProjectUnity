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
public class Task {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;
	    private String title;
	    @Column(columnDefinition = "TEXT")
	    private String description;
	    private LocalDate dueDate;
	    private String priority;
	    private String status;
	    
	    @ManyToOne
	    @JoinColumn(name = "assigned_team_member_id")
	    private Users assignedTeamMember;
	    
	    @ManyToOne
	    @JoinColumn(name = "project_id")
	    private Project project;
}
