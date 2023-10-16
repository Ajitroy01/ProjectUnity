package com.masai.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.masai.entity.Project;
import com.masai.entity.Users;
import com.masai.exception.ProjectException;
import com.masai.service.ProjectService;
import com.masai.service.UserService;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final UserService userService;

    @Autowired
    public ProjectController(ProjectService projectService, UserService userService) {
        this.projectService = projectService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProject(@RequestBody Project project) {
    	Users projectManager = userService.getUserById(project.getProjectManager().getId());
    	System.out.println(projectManager.getRole());
        if (projectManager == null || !projectManager.getRole().equals("ROLE_MANAGER")) {
            return new ResponseEntity<>("Manager with this Id does not exist !.", HttpStatus.BAD_REQUEST);
        }

        LocalDate currentDate = LocalDate.now();
        if (project.getStartDate() == null || project.getEndDate() == null ||
            project.getStartDate().isBefore(currentDate) || project.getStartDate().isAfter(project.getEndDate())) {
            return new ResponseEntity<>("Invalid start date or end date", HttpStatus.BAD_REQUEST);
        }

        Project createdProject = projectService.createProject(project);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(@PathVariable int projectId, @RequestBody Project project) {
        // Check if the project with the given ID exists
        Project existingProject = projectService.getProjectById(projectId);
        if (existingProject == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        existingProject.setName(project.getName());
        existingProject.setDescription(project.getDescription());
        existingProject.setStartDate(project.getStartDate());
        existingProject.setEndDate(project.getEndDate());
        existingProject.setProjectManager(project.getProjectManager());
        Project updatedProject = projectService.updateProject(existingProject);
        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{projectId}")
    public ResponseEntity<String> deleteProject(@PathVariable int projectId) {
        try {
            projectService.deleteProject(projectId);
            return new ResponseEntity<>("Project deleted successfully", HttpStatus.OK);
        } catch (ProjectException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable int projectId) {
        Project project = projectService.getProjectById(projectId);
        if (project == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @GetMapping("/all-projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }
    
    @GetMapping("/by-manager/{managerId}")
    public ResponseEntity<List<Project>> getProjectsByManagerId(@PathVariable int managerId) {
        List<Project> projects = projectService.getProjectsByManagerId(managerId);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }
    

}

