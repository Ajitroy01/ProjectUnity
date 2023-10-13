import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css'],
})
export class ProjectDashboardComponent implements OnInit {
  projectId: any;
  project: any; // Define a model for your project

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = +params['id']; // Extract the project ID from the route parameter
      this.loadProjectDetails(this.projectId);
    });
  }

  loadProjectDetails(id: number): void {
    // Fetch project details using your service and project ID
    this.projectService.getProjectById(id).subscribe((data) => {
      this.project = data;
    });
  }
}
