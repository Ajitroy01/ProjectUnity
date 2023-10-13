import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  notifications: string[] = [];

  addNotification(message: string): void {
    this.notifications.push(message);
  }

  dismissNotification(index: number): void {
    this.notifications.splice(index, 1);
  }
}
