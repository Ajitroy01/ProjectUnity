import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  project: any = {
    id: null, // Initialize with null or an appropriate default value
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    projectManager: {
      id: 0,
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    // You can optionally fetch additional project details here if needed
  }

  updateProject(): void {
    // Access the projectId from the project object
    const projectId = this.project.id;

    // Ensure projectId is not null or empty
    if (projectId !== null && projectId !== '') {
      this.projectService.updateProject(projectId, this.project).subscribe(
        () => {
          // Handle success, e.g., show a success message or navigate to a different page
          alert('Project Updated Successfully');
          document.querySelector('form')?.reset();
        },
        (error) => {
          console.error('Failed to update project:', error);
          // Handle error, e.g., display an error message to the user
        }
      );
    } else {
      // Handle the case where projectId is null or empty
      // You can show an error message to the user
    }
  }
}
