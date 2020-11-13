import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tech } from 'src/app/models/Tech';
import { environment } from 'src/environments/environment';
import { TechService } from '../../services/tech.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  
  Techs$ : Observable<Tech[]> = null;
  seeTech : boolean = false;
  error : String = '';

  techsDeleted : Array<String> = [];
  idToDelete : String = '';

  password : string = '';
  seePassConfirmation : boolean = false;

  constructor(
    private _techService : TechService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    //techs
    this.Techs$ = this._techService.getTechs();
  }

  seePrivatePassConfirmation(id){
    this.idToDelete = id;
    this.seePassConfirmation = true;

    window.scrollTo(0, 0);
  }

  deleteTech(id){
    
    if (this.password == environment.pass){
        // do the actual delete
        this._techService.deleteTech(id)
        .subscribe(
          res =>{
            if (res.error){
              this.error = res.error;
            }else{
              this.techsDeleted.push(id);
              console.log("Tech deleted - API", res.data.name);
              this.error = '';
            }
          },
          error =>{
            console.log(error);
            this.error = error.message;
          }
        )
    }else{
      // the password dont match
      this.error = 'Not verified - You are not omarpv ;)'
    }

    this.idToDelete = '';
    this.seePassConfirmation = false;
    this.password = '';
    
  }

}
