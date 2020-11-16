import { Component, OnInit } from '@angular/core';
import { Tech } from '../../models/Tech';
import { TechService } from '../../services/tech.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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
            var host = 'API';
            if (res.local)
              host = 'LOCAL';
            
            console.log("Tech added - " + host, res.data.name);

            //redirect to home
            this.router.navigate(['/home']);
            //sw alert
            Swal.fire("Good job! - " + host, "Tech ''"+ res.data.name +"'' added in "+ host, "success");
          }
          
        },
        error =>{
          console.log(error);
          this.error = error.message;
        }
      )
  }

}
