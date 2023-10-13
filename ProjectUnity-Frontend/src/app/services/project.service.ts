import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  createProject(projectData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/projects/create`, projectData, {
      headers,
    });
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/projects/${id}`);
  }

  updateProject(id: number, projectData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/projects/${id}`, projectData);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects/all-projects`);
  }

  deleteProjectById(projectId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/projects/delete/${projectId}`, {
      responseType: 'text', // Include the full response
    });
  }

  // Fetch manager projects from the server
  getManagerProjects(id: string): Observable<any[]> {
    const managerProjectsUrl = `${this.apiUrl}/projects/by-manager/${id}`; // Replace with the actual endpoint for manager projects
    return this.http.get<any[]>(managerProjectsUrl);
  }
}
