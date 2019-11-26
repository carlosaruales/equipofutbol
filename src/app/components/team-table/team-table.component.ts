import { Component, OnInit } from "@angular/core";
import { TeamService } from "./../../services/team.service";
import { Observable } from "rxjs";
import { Team } from "src/app/interfaces/team";
import { take } from "rxjs/operators";
import { Countries } from "src/app/interfaces/player";

@Component({
  selector: "app-team-table",
  templateUrl: "./team-table.component.html",
  styleUrls: ["./team-table.component.scss"]
})
export class TeamTableComponent implements OnInit {
  public teams$: Observable<Team[]>;
  displayedColumns: string[] = ["country", "name"];

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.teams$ = this.teamService.getTeams();
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe(teams => {
        if (teams.length === 0) {
          const team: Team = {
            name: "Colombia",
            country: Countries.Colombia,
            players: null
          };
          this.teamService.addTeam(team);
        }
      });
  }
}
