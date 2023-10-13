import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  project: any = {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    projectManager: {
      id: 0,
    },
  };

  constructor(private router: Router, private projectService: ProjectService) {}

  ngOnInit(): void {}

  createProject(): void {
    this.projectService.createProject(this.project).subscribe(
      () => {
        // Handle success, e.g., show a success message or navigate to a different page
        alert('Project Created Successfully');
        document.querySelector('form')?.reset();
      },
      (error) => {
        console.error('Failed to create project:', error);
        // Handle error, e.g., display an error message to the user
      }
    );
  }
}
