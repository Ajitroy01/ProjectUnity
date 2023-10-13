import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-task-list',
  templateUrl: './project-task-list.component.html',
  styleUrls: ['./project-task-list.component.css'],
})
export class ProjectTaskListComponent implements OnInit {
  tasks: any; // Replace with your task data structure
  projectId: any; // ID of the selected project

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {}
}
