import { Component, DoCheck, OnInit } from '@angular/core';
import { Tech } from '../../models/Tech';
import { TechService } from '../../services/tech.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/services/auth.service';
import { types as TypesArr } from '../../utils/helpers';

@Component({
  selector: 'app-add-tech',
  templateUrl: './add-tech.component.html',
  styleUrls: ['./add-tech.component.css'],
})
export class AddTechComponent implements OnInit, DoCheck {
  private token;
  tech: Tech = new Tech();
  types: Array<String> = TypesArr;
  error: string = '';

  makeNew: boolean = false;
  options: AnimationOptions = {
    path: '/assets/lotties/techs.json',
  };

  constructor(
    private _techService: TechService,
    private _authService: AuthService,
    private router: Router
  ) {
    this.token = this._authService.getToken();
  }

  ngOnInit(): void {}

  ngDoCheck() {
    this.token = this._authService.getToken();
  }

  saveTech() {
    this._techService.addItem(this.tech, this.token).subscribe(
      (res) => {
        if (res.error) {
          this.error = res.error;
        } else {
          var host = 'API';
          if (res.local) host = 'LOCAL';

          //console.log("RES deleteItem" , res);

          //console.log("Tech added - " + host, res.data.name);

          //redirect to home
          this.router.navigate(['/home']);
          //sw alert
          Swal.fire(
            'Good job! - ' + host,
            "Tech ''" + res.data.name + "'' added in " + host,
            'success'
          );
        }
      },
      (error) => {
        //console.log(error);
        this.error = error.message;
      }
    );
  }

  pasteJson() {
    navigator.clipboard
      .readText()
      .then((text) => {
        this.tech = JSON.parse(text);
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  setMakeNew() {
    this.tech._id = null;
    this.makeNew = true;
  }
}
