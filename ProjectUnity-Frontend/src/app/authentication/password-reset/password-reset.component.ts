import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Import your AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent {
  resetData = {
    email: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.requestPasswordReset(this.resetData.email).subscribe(
      () => {
        // Redirect to a confirmation page or display a success message
        this.router.navigate(['/reset-confirmation']);
      },
      (error) => {
        // Handle password reset request errors and display error messages
        console.error('Password reset request failed:', error);
      }
    );
  }
}
