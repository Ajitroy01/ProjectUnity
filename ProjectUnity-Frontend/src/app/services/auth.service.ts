import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model'; // Define your User model

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Replace with your backend API URL

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Register a manager or employee
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Login with email and password
  login(credentials: { username: string; password: string }): Observable<any> {
    // Create basic authentication headers
    const headers = new HttpHeaders({
      Authorization:
        'Basic ' + btoa(`${credentials.username}:${credentials.password}`),
    });

    return this.http.post(`${this.apiUrl}/login`, {}, { headers }).pipe(
      map((response: any) => {
        const user = {
          id: response.id,
          username: response.username,
          name: response.name,
          email: response.email,
          profilePicture: response.profilePicture,
          role: response.role,
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  // Logout the user
  logout(): void {
    // Remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getUserProfileById(userId: number): Observable<any> {
    const userProfileUrl = `${this.apiUrl}/user/profile/${userId}`; // Replace with the actual endpoint for user profiles
    return this.http.get<any>(userProfileUrl);
  }

  // Method to update a user account
  updateAccount(user: any): Observable<any> {
    // Assuming your backend API expects a PUT request to update the user
    return this.http.put(`${this.apiUrl}/user/update/${user.id}`, user);
  }

  // Method to delete a user account by ID
  deleteAccount(userId: string): Observable<any> {
    // Assuming your backend API expects a DELETE request to delete the user by ID
    return this.http.delete(`${this.apiUrl}/user/delete/${userId}`);
  }

  // Request a password reset email
  requestPasswordReset(email: string): Observable<any> {
    const resetData = { email };
    return this.http.post(
      `${this.apiUrl}/api/password-reset-request`,
      resetData
    );
  }

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/users`);
  }

  // Fetch Managers' details from the server
  getManagers(): Observable<any[]> {
    const managersUrl = `${this.apiUrl}/user/managers`; // Replace with the actual endpoint for Managers
    return this.http.get<any[]>(managersUrl);
  }

  // Fetch Employees' details from the server
  getEmployees(): Observable<any[]> {
    const employeesUrl = `${this.apiUrl}/user/employees`; // Replace with the actual endpoint for Employees
    return this.http.get<any[]>(employeesUrl);
  }

  getAvailableMembers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/employees`);
  }
}
