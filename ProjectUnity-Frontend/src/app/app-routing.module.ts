import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordResetComponent } from './authentication/password-reset/password-reset.component';
import { LoginComponent } from './authentication/login/login.component'; // Import your login component
import { RegistrationComponent } from './authentication/registration/registration.component'; // Import your registration component
import { AuthGuard } from './gaurds/auth.guard'; // Import your AuthGuard
import { EmailVerificationComponent } from './authentication/email-verification/email-verification.component';
import { NotificationsComponent } from './dashboard/notifications/notifications.component';
import { ProjectDashboardComponent } from './project/project-dashboard/project-dashboard.component';
import { TeamDashboardComponent } from './dashboard/team-dashboard/team-dashboard.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectTaskListComponent } from './project/project-task-list/project-task-list.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { ProjectAnalyticsComponent } from './project/project-analytics/project-analytics.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { ManagerComponent } from './dashboard/manager/manager.component';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { TeamDetailComponent } from './team/team-detail/team-detail.component';
import { TaskDetailComponent } from './task/task-detail/task-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'email-verify', component: EmailVerificationComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'project-dashboard/:id', component: ProjectDashboardComponent },
  { path: 'team-dashboard', component: TeamDashboardComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'edit-project', component: EditProjectComponent },
  { path: 'projects/:id/tasks', component: ProjectTaskListComponent },
  { path: 'projects/create', component: CreateProjectComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'ROLE_ADMIN' },
  },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'ROLE_MANAGER' },
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'ROLE_EMPLOYEE' },
  },
  { path: 'calendar', component: CalendarComponent },
  { path: 'projects/:id/analytics', component: ProjectAnalyticsComponent },
  { path: 'team-list', component: TeamListComponent },
  { path: 'team-details/:id', component: TeamDetailComponent },
  { path: 'projects/:id/edit', component: EditProjectComponent },
  { path: 'task-details/:id', component: TaskDetailComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: 'login' }, // Redirect to login for any other unmatched routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
