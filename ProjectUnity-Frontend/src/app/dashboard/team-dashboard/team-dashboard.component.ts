import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css'],
})
export class TeamDashboardComponent implements OnInit {
  teams: any; // Replace with your actual team data structure

  constructor() {}

  ngOnInit(): void {
    // Initialize the teams data here, e.g., by making an API call
    this.teams = [
      { id: 1, name: 'Team A' },
      { id: 2, name: 'Team B' },
      // Add more team objects as needed
    ];
  }
}
