package com.masai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masai.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
	List<Project> findProjectsByProjectManagerId(int managerId);
}
