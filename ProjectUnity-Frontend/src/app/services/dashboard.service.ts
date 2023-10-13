import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Method to fetch managers' data from the backend
  fetchManagersData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/managers`);
  }
}
