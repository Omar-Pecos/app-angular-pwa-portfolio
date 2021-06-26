import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Location } from '@angular/common';
import { Profile } from '../../models/Profile';
import { Observable } from 'rxjs';
import { Tech } from '../../models/Tech';
import { TechService } from '../../services/tech.service';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css'],
})
export class AddProfileComponent implements OnInit, DoCheck {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  private token;
  profile: Profile = new Profile();
  error: string = '';

  Techs$: Observable<Tech[]> = null;
  techs: Tech[];

  selectedSkillID: string = '-1';
  selectedPercentage: number = 0;
  seeAddSkillForm: boolean = false;
  options: AnimationOptions = {
    path: '/assets/lotties/profile.json',
  };

  constructor(
    private location: Location,
    private router: Router,
    private _techService: TechService,
    private _profileService: ProfileService,
    private _authService: AuthService
  ) {
    this.token = this._authService.getToken();

    this.profile.intro = '';
    this.profile.about = {
      text: '',
      skills: [],
    };
    this.profile.version = 0;

    let data: any = this.location.getState();

    if (data.about) {
      this.profile = data as Profile;
    }
  }

  ngOnInit(): void {
    this.Techs$ = this._techService.getData(this.token);
    this.Techs$.subscribe((data) => (this.techs = data));
  }

  ngDoCheck() {
    this.token = this._authService.getToken();
  }

  addSkill() {
    var techData = null;
    this.techs.map((tech) => {
      if (tech._id == this.selectedSkillID) techData = tech;
    });
    var skill = {
      _id: techData._id,
      tech: techData,
      percentage: this.selectedPercentage,
    };

    this.profile.about.skills.push(skill);
    this.selectedSkillID = '-1';
  }

  deleteSkill(id) {
    this.profile.about.skills = this.profile.about.skills.filter(
      (item) => item._id != id
    );
  }

  saveProfile() {
    this.prepareToPostProfileData();

    this._profileService.addItem(this.profile, this.token).subscribe(
      (res) => {
        if (res.error) {
          this.error = res.error;
        } else {
          var host = 'API';
          if (res.local) host = 'LOCAL';

          //console.log("Profile added - " + host);

          //redirect to home
          this.router.navigate(['/home']);
          //sw alert
          Swal.fire(
            'Good job! - ' + host,
            "Profile version ''" + res.data.version + "'' added in " + host,
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

  prepareToPostProfileData() {
    this.profile.about.skills.map((skill) => {
      skill.tech = skill._id;
    });
    this.profile.version++;
  }

  filterTechs = () => {
    if (this.profile.about.skills.length) {
      if (this.techs.length) {
        return this.techs.filter(
          ({ _id }) =>
            this.profile.about.skills.findIndex(
              ({ _id: techId }) => techId === _id
            ) === -1
        );
      } else {
        return [];
      }
    } else {
      return this.techs;
    }
  };
}
