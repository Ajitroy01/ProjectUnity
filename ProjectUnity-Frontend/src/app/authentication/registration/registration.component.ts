import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Import your AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationData = {
    username: '',
    password: '',
    name: '',
    email: '',
    profilePicture: '',
    role: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.registrationData).subscribe(
      () => {
        // Display a success alert with the message
        const successMessage = `${this.registrationData.role} account created successfully`;
        alert(successMessage);
        document.querySelector('form')?.reset();
      },
      (error) => {
        // Handle registration errors and display error messages to the user
        console.error('Registration failed:', error);
      }
    );
  }
}
