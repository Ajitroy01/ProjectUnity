import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit {
  currentComponent: string = 'dashboard';
  currentUser: any;
  showMore: boolean = false;
  projects: any[] = [];

  constructor(
    private authService: AuthService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadManagerProjects();
  }

  loadManagerProjects(): void {
    this.projectService.getManagerProjects(this.currentUser.id).subscribe(
      (data) => {
        this.projects = data.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      },
      (error) => {
        console.error('Error fetching manager projects:', error);
      }
    );
  }

  toggleShowMore(): void {
    this.showMore = !this.showMore;
  }

  toggleComponent(componentName: string): void {
    this.currentComponent = componentName;
  }
}
