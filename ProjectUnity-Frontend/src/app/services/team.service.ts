import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private baseUrl = 'http://localhost:8080'; // Replace with your actual backend API URL

  constructor(private http: HttpClient) {}

  createTeam(teamData: Team): Observable<any> {
    return this.http.post(`${this.baseUrl}/team/create`, teamData);
  }

  updateTeam(
    teamId: number,
    teamName: string,
    memberIds: number[],
    projectIds: number[]
  ): Observable<any> {
    const teamData = {
      teamName: teamName,
      members: memberIds.map((id) => ({ id })),
      projects: projectIds.map((id) => ({ id })),
    };

    return this.http.put(`${this.baseUrl}/team/update/${teamId}`, teamData);
  }

  getTeamData(teamId: string): Observable<any> {
    const url = `${this.baseUrl}/team/by-id/${teamId}`; // Adjust the URL pattern as per your API endpoint
    return this.http.get(url);
  }

  deleteTeam(teamId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/team/delete/${teamId}`);
  }

  getTeamsByUserId(userId: number): Observable<any> {
    const url = `${this.baseUrl}/team/findTeamsByUserId/${userId}`; // Adjust the URL structure as per your API

    return this.http.get(url);
  }
}
