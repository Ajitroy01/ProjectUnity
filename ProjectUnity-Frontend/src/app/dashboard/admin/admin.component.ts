import { Component, OnInit, ElementRef } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  currentUser: any;
  currentComponent: string = 'Dashboard';
  managers: any;
  employees: any;
  projectIdToDelete: string = '';
  userDetails: any[] = [];

  darkMode = false;

  showEditAccount = false;
  showDeleteAccount = false;
  editUser: User = {
    id: 0,
    name: '',
    email: '',
    role: '',
  };
  userIdToDelete: string = '';

  showManagers = false; // Initialize the toggle state

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private projectService: ProjectService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.fetchManagers();
  }

  handleCheckboxChange(newValue: boolean) {
    this.showManagers = newValue; // Update the showManagers value
    this.fetchData(); // Call the fetchData method
  }

  toggleComponent(componentName: string): void {
    this.currentComponent = componentName;
  }

  toggleEditAccount(): void {
    this.showEditAccount = !this.showEditAccount;
  }

  toggleDeleteAccount(): void {
    this.showDeleteAccount = !this.showDeleteAccount;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  fetchData(): void {
    if (this.showManagers) {
      this.fetchEmployees();
    } else if (!this.showManagers) {
      this.fetchManagers();
    }
  }

  fetchManagers(): void {
    this.authService.getManagers().subscribe(
      (data) => {
        console.log(data);
        this.managers = data;
      },
      (error) => {
        console.error('Failed to fetch managers:', error);
      }
    );
  }

  deleteProject(): void {
    if (!this.projectIdToDelete) {
      console.error('Project ID is empty or invalid');
      return;
    }

    this.projectService.deleteProjectById(this.projectIdToDelete).subscribe(
      (response) => {
        if (
          response === 'Project deleted successfully' &&
          typeof response === 'string'
        ) {
          alert('Project deleted successfully');
          let ele =
            this.elementRef.nativeElement.querySelector('#projectIdInput');
          if (ele) {
            ele.value = '';
          }
          window.location.reload();
        } else {
          console.error('Unexpected response:', response);
        }
      },
      (error) => {
        alert('Failed to delete the project.');
        console.error('Failed to delete the project:', error);
      }
    );
  }

  updateAccount(user: User) {
    this.authService.updateAccount(user).subscribe(
      (response) => {
        alert('User account updated successfully.');
        this.editUser = {
          id: 0,
          name: '',
          email: '',
          role: '',
        };
      },
      (error) => {
        console.error('Failed to update the user account:', error);
      }
    );
  }

  deleteAccount(): void {
    this.authService.deleteAccount(this.userIdToDelete).subscribe(
      (response) => {
        console.log(response);
        if (response.status === 200) {
          alert('Account deleted successfully.');
          this.userIdToDelete = '';
        } else {
          alert('Account not deleted due to some error.');
        }
      },
      (errorResponse) => {
        if (errorResponse.status === 404) {
          alert(errorResponse.error);
          this.userIdToDelete = '';
        } else {
          alert('User Account deleted Successfully.');
          this.userIdToDelete = '';
        }
      }
    );
  }

  fetchEmployees() {
    this.authService.getEmployees().subscribe(
      (data) => {
        console.log(data);
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching Employees:', error);
      }
    );
  }
}
