import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent {
  task: any = {
    id: '',
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
  taskIdToDelete: string = '';

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

  onEditSubmit(): void {
    this.taskService.updateTask(this.task).subscribe(
      (data) => {
        alert('Task updated successfully.');
      },
      (error) => {
        alert('Error updating task.');
      }
    );
  }

  onDeleteTask(): void {
    this.taskService.deleteTask(this.taskIdToDelete).subscribe(
      () => {},
      (error) => {
        if (error.status === 200 && error.statusText === 'OK') {
          alert('Task deleted successfully.');
          this.taskIdToDelete = '';
        } else {
          alert('Error deleting task.');
        }
      }
    );
  }
}
