package com.masai.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.masai.entity.Project;
import com.masai.exception.ProjectException;
import com.masai.repository.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    

    @Override
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public void deleteProject(int projectId) {
    	Project project = projectRepository.findById(projectId)
    	        .orElseThrow(() -> new ProjectException("Project not found with ID: " + projectId));
    	    projectRepository.delete(project);
    }

    @Override
    public Project getProjectById(int projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ProjectException("Project with this id does not exist"));
        
         return project;
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    
    @Override
    public List<Project> getProjectsByManagerId(int managerId) {
        return projectRepository.findProjectsByProjectManagerId(managerId);
    }
    
}

