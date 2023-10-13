import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  task: any = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'High',
    status: 'To Do',
    assignedTeamMember: { id: null },
    project: { id: null },
  };
  teamId: string = ''; // Initialize teamId as null
  managerId: string = ''; // Initialize managerId as null
  teamMembers: any[] = []; // Array to store team members
  projects: any[] = []; // Array to store projects
  showMembersSelect: boolean = false;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      this.managerId = currentUser.id;
      if (this.managerId !== null) {
        this.fetchProjects();
      }
    }
  }

  fetchProjects(): void {
    // Fetch projects based on the manager's ID (teamId)
    this.projectService.getManagerProjects(this.managerId).subscribe(
      (data) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  fetchTeamMembers(): void {
    if (this.teamId !== null) {
      // Fetch team members based on the provided teamId
      this.teamService.getTeamData(this.teamId).subscribe(
        (data) => {
          console.log(data);
          this.teamMembers = data.members;
          this.showMembersSelect = true;
        },
        (error) => {
          console.error('Error fetching team members:', error);
        }
      );
    }
  }

  onSubmit(): void {
    // Call the service method to create a task using the provided task data
    this.taskService.createTask(this.task).subscribe(
      (data) => {
        // Handle success, e.g., show a success message or navigate to a different page
        alert('Task created successfully.');
      },
      (error) => {
        // Handle error, e.g., display an error message to the user
        alert('Error creating task.');
      }
    );
  }
}
