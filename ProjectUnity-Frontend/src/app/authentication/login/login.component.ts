import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.loginData).subscribe(
      (user) => {
        // Check the user's role and redirect to the appropriate dashboard
        if (user && user.role) {
          if (user.role === 'ROLE_ADMIN') {
            this.router.navigate(['/admin']);
          } else if (user.role === 'ROLE_MANAGER') {
            this.router.navigate(['/manager']);
          } else if (user.role === 'ROLE_EMPLOYEE') {
            this.router.navigate(['/employee']);
          } else {
            // Handle unknown roles here, e.g., redirect to a default dashboard
            this.router.navigate(['/default-dashboard']);
          }
        }
      },
      (error) => {
        // Handle login errors and display an alert
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}
