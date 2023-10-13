import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { LoginComponent } from './authentication/login/login.component';
import { PasswordResetComponent } from './authentication/password-reset/password-reset.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { ProjectDashboardComponent } from './project/project-dashboard/project-dashboard.component';
import { ProjectAnalyticsComponent } from './project/project-analytics/project-analytics.component';
import { ProjectTaskListComponent } from './project/project-task-list/project-task-list.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskDetailComponent } from './task/task-detail/task-detail.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { TeamDashboardComponent } from './dashboard/team-dashboard/team-dashboard.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { TeamDetailComponent } from './team/team-detail/team-detail.component';
import { CreateTeamComponent } from './team/create-team/create-team.component';
import { EditTeamComponent } from './team/edit-team/edit-team.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavigationMenuComponent } from './shared/navigation-menu/navigation-menu.component';
import { TaskCardComponent } from './shared/task-card/task-card.component';
import { UserProfileComponent } from './shared/user-profile/user-profile.component';
import { ModalComponent } from './shared/modal/modal.component';
import { EmailVerificationComponent } from './authentication/email-verification/email-verification.component';
import { SubtaskListComponent } from './task/subtask-list/subtask-list.component';
import { NotificationsComponent } from './dashboard/notifications/notifications.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { ManagerComponent } from './dashboard/manager/manager.component';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    PasswordResetComponent,
    ProjectListComponent,
    CreateProjectComponent,
    EditProjectComponent,
    ProjectDashboardComponent,
    ProjectAnalyticsComponent,
    ProjectTaskListComponent,
    TaskListComponent,
    TaskDetailComponent,
    CreateTaskComponent,
    EditTaskComponent,
    TeamDashboardComponent,
    TeamListComponent,
    TeamDetailComponent,
    CreateTeamComponent,
    EditTeamComponent,
    HeaderComponent,
    FooterComponent,
    NavigationMenuComponent,
    TaskCardComponent,
    UserProfileComponent,
    ModalComponent,
    EmailVerificationComponent,
    SubtaskListComponent,
    NotificationsComponent,
    NotificationComponent,
    AdminComponent,
    ManagerComponent,
    EmployeeComponent,
    CalendarComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
