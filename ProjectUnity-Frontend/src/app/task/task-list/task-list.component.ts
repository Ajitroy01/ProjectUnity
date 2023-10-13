import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    const currentUserJSON = localStorage.getItem('currentUser');

    if (currentUserJSON) {
      const currentUser = JSON.parse(currentUserJSON);

      if (currentUser.id) {
        const userId = currentUser.id;
        this.taskService.getTasksByUserId(userId).subscribe(
          (data) => {
            this.tasks = data;
          },
          (error) => {
            alert('No Tasks Found.');
          }
        );
      }
    }
  }

  onRemoveTask(task: any): void {
    // Send a DELETE request to remove the task
    this.taskService.deleteTask(task.id).subscribe(
      () => {
        // Remove the task from the tasks array
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
        // Handle success, e.g., show a success message
        alert('Task removed successfully.');
      },
      (error) => {
        // Handle error, e.g., display an error message to the user
        alert('Error removing task.');
      }
    );
  }

  onMarkAsCompleted(task: any): void {
    this.taskService.markTaskAsCompleted(task.id, 'completed').subscribe(
      () => {},
      (error) => {
        if (error.status === 200) {
          task.status = 'Completed';
          alert('Task marked as completed.');
        } else {
          alert('Error marking task as completed.');
        }
      }
    );
  }
}
