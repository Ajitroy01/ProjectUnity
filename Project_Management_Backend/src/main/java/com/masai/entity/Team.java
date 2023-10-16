package com.masai.entity;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Team {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;
	    private String teamName;
	    
	    @ManyToMany
	    @JoinTable(
	        name = "team_members",
	        joinColumns = @JoinColumn(name = "team_id"),
	        inverseJoinColumns = @JoinColumn(name = "user_id")
	    )
	    private List<Users> members; 

	    @ManyToMany
	    @JoinTable(
	        name = "team_projects",
	        joinColumns = @JoinColumn(name = "team_id"),
	        inverseJoinColumns = @JoinColumn(name = "project_id")
	    )
	    private List<Project> projects;
}
