import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  currentUser: any;
  projects: any[] = [];
  managers: any[] = [];

  constructor(
    private authService: AuthService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    const currentUserJSON = localStorage.getItem('currentUser');

    if (currentUserJSON) {
      const currentUser = JSON.parse(currentUserJSON);
      if (currentUser.id) {
        this.teamService.getTeamsByUserId(this.currentUser.id).subscribe(
          (data) => {
            data.forEach((team: any) => {
              if (team.projects) {
                team.projects.forEach((project: any) => {
                  this.projects.push(project);

                  // Extract unique project managers
                  if (
                    project.projectManager &&
                    !this.managers.some(
                      (m) => m.id === project.projectManager.id
                    )
                  ) {
                    this.managers.push(project.projectManager);
                  }
                });
              }
            });

            console.log(this.projects);
            console.log(this.managers);
          },
          (error) => {
            alert('No Teams Found.');
          }
        );
      }
    }
  }

  currentComponent: string = 'Dashboard';
  toggleComponent(componentName: string): void {
    this.currentComponent = componentName;
  }
}
