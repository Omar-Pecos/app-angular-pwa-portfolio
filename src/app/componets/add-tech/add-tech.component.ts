import { Component, OnInit } from '@angular/core';
import { Tech } from '../../models/Tech';
import { TechService } from '../../services/tech.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-tech',
  templateUrl: './add-tech.component.html',
  styleUrls: ['./add-tech.component.css']
})
export class AddTechComponent implements OnInit {
  tech : Tech = new Tech();
  types : Array<String>;
  error : string = '';

  constructor(
    private _techService : TechService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.types = [
      'backend','frontend','fullstack','desktop','hybrid','native'
    ]
  }

  saveTech(){
    this._techService.addTech(  this.tech )
      .subscribe(
        res =>{
          if (res.error){
            this.error = res.error;
          }else{
            console.log("Tech added - API", res.data.name);
            //redirect to home
            this.router.navigate(['/home']);
            //TODO - sw alert
          }
          
        },
        error =>{
          console.log(error);
          this.error = error.message;
        }
      )
  }

}
