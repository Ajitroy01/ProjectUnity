import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  createTask(taskData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/task/create`, taskData);
  }

  updateTask(taskData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/task/update`, taskData);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/task/delete/${taskId}`);
  }

  getTasksByUserId(userId: number) {
    return this.http.get<any[]>(
      `${this.apiUrl}/task/findTasksByUserId/${userId}`
    );
  }

  markTaskAsCompleted(taskId: number, status: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/task/updateTaskStatus/${taskId}/${status}`,
      null
    );
  }
}
