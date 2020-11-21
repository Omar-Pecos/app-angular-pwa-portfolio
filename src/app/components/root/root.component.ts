import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Tech } from 'src/app/models/Tech';
import { environment } from 'src/environments/environment';
import { TechService } from '../../services/tech.service';
import Swal from 'sweetalert2';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from '../../services/profile.service';
import { Course } from 'src/app/models/Course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  loading: ViewContainerRef;

  Techs$: Observable<Tech[]> = null;
  Profile$: Observable<Profile> = null;
  Courses$: Observable<Course[]> = null;
  seeTech: boolean = false;
  seeProfile: boolean = false;
  seeCourse: boolean = false;
  error: String = '';

  techDisplayed: Tech = null;
  courseDisplayed: Course = null;
  itemsDeleted: Array<String> = [];
  itemToDelete: any = null;

  password: string = '';
  seePassConfirmation: boolean = false;

  hadBeenReloaded: boolean = false;

  constructor(
    private _techService: TechService,
    private _profileService: ProfileService,
    private _courseService: CourseService
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
    this.loadTechData();
    this.loadProfileData();
    this.loadCourseData();
  }

  loadTechData() {
    //techs
    this.Techs$ = this._techService.getData();
  }

  seePrivatePassConfirmation(item: any) {
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

          this.itemToDelete = item;
          this.seePassConfirmation = true;

          window.scrollTo(0, 0);
        }
      });

  }

  deleteItem(item: any) {
    var type = '';
    var obs: Observable<any>;

    if (item.icon) {
      type = 'Tech';
      obs = this._techService.deleteItem(item);
    }
    else if (item.done) {
      type = 'Course';
      obs = this._courseService.deleteItem(item);
    }
    else
      type = 'Project'


    if (this.password == environment.pass) {
      // do the actual delete - obs is a observable
     obs
        .subscribe(
          res => {
            if (res.error) {
              this.error = res.error;
            } else {
              this.itemsDeleted.push(item._id);
              var host = 'API';
              if (res.local)
                host = 'LOCAL';

              console.log(type + " deleted - " + host);
              this.error = '';

              this.techDisplayed = null;
              this.courseDisplayed = null;

              Swal.fire("Good job! - " + host, type + " deleted in " + host, "success");

            }
          },
          error => {
            console.log(error);
            this.error = error.message;
          }
        )
    } else {
      // the password dont match
      this.error = 'Not verified - You are not omarpv ;)'
    }

    this.itemToDelete = '';
    this.seePassConfirmation = false;
    this.password = '';

  }

  reload() {
    if (!this.hadBeenReloaded) {
      console.log('RELOAD');
      this.loadData();
      this.hadBeenReloaded = true;
    }
  }

  setColor(type) {
    var color = 'black';
    switch (type) {
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

  stringify(value) {
    return JSON.stringify(value);
  }

  hideTech() {
    this.seeTech = false;
    this.techDisplayed = null;
  }

  /* PROFILE */
  prettify(json) {
    return JSON.stringify(json, null, '\t')
  }
  loadProfileData() {
    this.Profile$ = this._profileService.getOneData();
  }

  /* COURSES */
  loadCourseData() {
    this.Courses$ = this._courseService.getData();
  }

  hideCourse() {
    this.seeCourse = false;
    this.courseDisplayed = null;
  }

}
