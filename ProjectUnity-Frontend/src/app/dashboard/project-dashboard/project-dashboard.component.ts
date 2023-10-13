import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css'],
})
export class ProjectDashboardComponent implements OnInit {
  projects: any; // Replace with your actual project data structure

  constructor() {}

  ngOnInit(): void {
    // Initialize the projects data here, e.g., by making an API call
    this.projects = [
      { id: 1, name: 'Project 1' },
      { id: 2, name: 'Project 2' },
      // Add more project objects as needed
    ];
  }
}
