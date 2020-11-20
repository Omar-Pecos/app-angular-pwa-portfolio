import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Tech } from 'src/app/models/Tech';
import { environment } from 'src/environments/environment';
import { TechService } from '../../services/tech.service';
import Swal from 'sweetalert2';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  loading : ViewContainerRef;
  
  Techs$ : Observable<Tech[]> = null;
  Profile$ : Observable<Profile> = null;
  seeTech : boolean = false;
  seeProfile : boolean = false;
  error : String = '';

  techDisplayed : Tech = null;
  techsDeleted : Array<String> = [];
  itemToDelete : any = null;

  password : string = '';
  seePassConfirmation : boolean = false;

  hadBeenReloaded : boolean = false;

  constructor(
    private _techService : TechService,
    private _profileService : ProfileService
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

  loadData(){
    this.loadTechData();
    this.loadProfileData();
  }

  loadTechData() {
    //techs
    this.Techs$ = this._techService.getData();
  }

  seePrivatePassConfirmation(tech : Tech){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#D9D9D9',
      confirmButtonText: 'Delete'
    })
    .then((result) => {
      if (result.isConfirmed) {
        
        this.itemToDelete = tech;
        this.seePassConfirmation = true;
    
        window.scrollTo(0, 0);
      }
    });
   
  }

  deleteTech(tech : Tech){

    if (this.password == environment.pass){
      // do the actual delete
      this._techService.deleteItem(tech)
        .subscribe(
          res =>{
            if (res.error){
              this.error = res.error;
            }else{
              this.techsDeleted.push(tech._id);
              var host = 'API';
              if (res.local)
              host = 'LOCAL';
              
              console.log("Tech deleted - " + host, res.data.name);
              this.error = '';
              this.techDisplayed = null;

              Swal.fire("Good job! - " + host, "Tech ''"+ res.data.name +"'' deleted in "+ host, "success");

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
     
    this.itemToDelete = '';
    this.seePassConfirmation = false;
    this.password = '';
    
  }

  reload(){
    if (!this.hadBeenReloaded){
      console.log('RELOAD');
      this.loadTechData();
      this.hadBeenReloaded = true;
    }
  }

  setColor(type){
    var color = 'black';
    switch(type){
      case 'backend': 
        color = 'red';
        break;
      case 'frontend': 
        color = 'green';
        break;
      case 'native': 
        color = 'brown';
        break;
      case 'desktop':
        color = 'orange';
        break;
      case 'hybrid':
        color = 'blue';
        break;
    }
    
    return color;
  }

  stringify(value){
    return JSON.stringify(value);
  }

  hideTech(){
    this.seeTech = false;
    this.techDisplayed = null;
  }

  /* PROFILE */
  prettify(json){
   return JSON.stringify(json,null,'\t')
  }
  loadProfileData(){
    this.Profile$ = this._profileService.getOneData();
  }

}
