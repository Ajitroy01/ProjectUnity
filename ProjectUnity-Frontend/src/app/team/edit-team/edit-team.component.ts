import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css'],
})
export class EditTeamComponent implements OnInit {
  teamId: number | undefined;
  teamName: string = '';
  selectedMemberId: number | undefined;
  availableMembers: any[] = [];
  teamMembers: any[] = [];

  selectedProjectId: number | undefined;
  availableProjects: any[] = [];
  teamProjects: any[] = [];

  deleteTeamId: number | undefined;

  constructor(
    private teamService: TeamService,
    private authService: AuthService,
    private projectService: ProjectService
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
    // Handle the form submission and send data to the backend
    const memberIds = this.teamMembers.map((member) => parseInt(member.id, 10));
    const projectIds = this.teamProjects.map((project) =>
      parseInt(project.id, 10)
    );

    if (this.teamId !== undefined) {
      this.teamService
        .updateTeam(this.teamId, this.teamName, memberIds, projectIds)
        .subscribe(
          (response) => {
            // Handle the success response from the API
            alert('Team updated successfully.');
          },
          (error) => {
            // Handle any errors from the API
            alert('Error updating team.');
          }
        );
    } else {
      alert('Please provide a valid Team ID.');
    }
  }

  onDeleteTeam(): void {
    if (this.deleteTeamId !== undefined) {
      if (confirm('Are you sure you want to delete this team?')) {
        this.teamService.deleteTeam(this.deleteTeamId).subscribe(
          (response) => {},
          (error) => {
            if (error.status === 200 && error.statusText === 'OK') {
              alert('Team deleted successfully.');
            } else {
              alert('Error deleting team.');
            }
          }
        );
      }
    } else {
      alert('Please provide a valid Team ID.');
    }
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
