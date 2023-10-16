package com.masai.service;

import java.util.List;

import com.masai.entity.Project;
import com.masai.exception.ProjectException;

public interface ProjectService {

    Project createProject(Project project);
    Project updateProject(Project project);
    void deleteProject(int projectId) throws ProjectException;
    Project getProjectById(int projectId);
    List<Project> getAllProjects();
    List<Project> getProjectsByManagerId(int managerId);

}
