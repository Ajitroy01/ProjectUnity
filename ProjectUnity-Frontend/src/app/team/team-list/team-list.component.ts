import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
})
export class TeamListComponent implements OnInit {
  teams: any[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    const currentUserJSON = localStorage.getItem('currentUser');

    if (currentUserJSON) {
      const currentUser = JSON.parse(currentUserJSON);

      if (currentUser.id) {
        const userId = currentUser.id;
        this.teamService.getTeamsByUserId(userId).subscribe(
          (data) => {
            console.log(data);
            this.teams = data;
          },
          (error) => {
            alert('No Teams Found.');
          }
        );
      }
    }
  }
}
