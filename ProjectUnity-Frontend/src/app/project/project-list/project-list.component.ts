import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectsService: ProjectService) {}

  ngOnInit(): void {
    // Fetch project data from your service
    this.projectsService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }
}
