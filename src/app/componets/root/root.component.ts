import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Tech } from 'src/app/models/Tech';
import { environment } from 'src/environments/environment';
import { TechService } from '../../services/tech.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  loading : ViewContainerRef;
  
  Techs$ : Observable<Tech[]> = null;
  seeTech : boolean = false;
  error : String = '';

  techsDeleted : Array<String> = [];
  idToDelete : String = '';

  password : string = '';
  seePassConfirmation : boolean = false;

  hadBeenReloaded : boolean = false;

  constructor(
    private _techService : TechService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this._techService.reloadWarning
      .subscribe(
        value => {
          console.log(value);
          if (value)
            this.reload();
          else 
            this.hadBeenReloaded = false;
        }
      )
  }

  loadData() {
    //techs
    this.Techs$ = this._techService.getTechs();
  }

  seePrivatePassConfirmation(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    })
    .then((result) => {
      if (result.isConfirmed) {
        
        this.idToDelete = id;
        this.seePassConfirmation = true;
    
        window.scrollTo(0, 0);
      }
    });
   
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
            var host = 'API';
            if (res.local)
            host = 'LOCAL';
            
            console.log("Tech deleted - " + host, res.data.name);
            this.error = '';

            Swal.fire("Good job! - " + host, "Tech deleted in "+ host, "success");

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

  reload(){
    if (!this.hadBeenReloaded){
      console.log('RELOAD');
      this.loadData();
      this.hadBeenReloaded = true;
    }

  }

}
