import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
})
export class CreateTeamComponent implements OnInit {
  teamName: string = '';
  selectedMemberId: number | undefined;
  availableMembers: any[] = [];
  teamMembers: any[] = [];

  selectedProjectId: number | undefined;
  availableProjects: any[] = [];
  teamProjects: any[] = [];

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.loadAvailableMembers();
    this.loadAvailableProjects();
  }

  private loadAvailableMembers(): void {
    this.authService.getAvailableMembers().subscribe((members) => {
      this.availableMembers = members;
    });
  }

  private loadAvailableProjects(): void {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      const managerId = currentUser.id;
      this.projectService
        .getManagerProjects(managerId)
        .subscribe((projects) => {
          this.availableProjects = projects;
        });
    } else {
      console.error('User not found in local storage');
    }
  }

  addMember(): void {
    if (this.selectedMemberId !== undefined) {
      const selectedMember = this.availableMembers.find(
        (member) => member.id == this.selectedMemberId
      );

      if (selectedMember) {
        this.teamMembers.push(selectedMember);
        this.availableMembers = [
          ...this.availableMembers.filter(
            (member) => member.id !== this.selectedMemberId
          ),
        ];
        this.selectedMemberId = undefined;
      }
    }
  }

  addProject(): void {
    if (this.selectedProjectId !== undefined) {
      const selectedProject = this.availableProjects.find(
        (project) => project.id == this.selectedProjectId
      );

      if (selectedProject) {
        this.teamProjects.push(selectedProject);
        this.availableProjects = this.availableProjects.filter(
          (project) => project.id !== this.selectedProjectId
        );
        this.selectedProjectId = undefined;
      }
    }
  }

  onSubmit(): void {
    const teamData: Team = {
      teamName: this.teamName,
      members: this.teamMembers.map((member) => ({ id: member.id })),
      projects: this.teamProjects.map((project) => ({ id: project.id })),
    };

    this.teamService.createTeam(teamData).subscribe(
      (response) => {
        alert('Team created successfully.');
      },
      (error) => {
        alert('Error creating team.');
      }
    );
  }

  removeMember(memberId: number): void {
    const memberIndex = this.teamMembers.findIndex(
      (member) => member.id === memberId
    );
    if (memberIndex !== -1) {
      const removedMember = this.teamMembers.splice(memberIndex, 1)[0];
      this.availableMembers.push(removedMember);
    }
  }

  removeProject(projectId: number): void {
    const projectIndex = this.teamProjects.findIndex(
      (project) => project.id === projectId
    );
    if (projectIndex !== -1) {
      const removedProject = this.teamProjects.splice(projectIndex, 1)[0];
      this.availableProjects.push(removedProject);
    }
  }
}
