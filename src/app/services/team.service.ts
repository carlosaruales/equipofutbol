import { Injectable } from '@angular/core';
import { AngularFireList,AngularFireDatabase } from '@angular/fire/database';
import { Team } from '../interfaces/team';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamsDb: AngularFireList<Team>;

  constructor(private db: AngularFireDatabase) { 
    this.teamsDb = this.db.list("/teams", ref => ref.orderByChild("name"));
  }

  getTeams(): Observable<Team[]> {
    return this.teamsDb.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
      })
    );
  }

  addTeam(player:Team){
    return this.teamsDb.push(player);
  }

  deleteTeam(id:string){
    this.db.list('/teams').remove(id);
  }

  editTeam(newPlayarData){
    const $key = newPlayarData.$key;
    delete(newPlayarData.$key);
    this.db.list('/teams').update($key,newPlayarData);
  }
}
