import { Component, DoCheck, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Tech } from 'src/app/models/Tech';
import { TechService } from '../../services/tech.service';
import Swal from 'sweetalert2';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from '../../services/profile.service';
import { Course } from 'src/app/models/Course';
import { CourseService } from '../../services/course.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../models/Project';
import { setColor, types as TypesArr } from '../../utils/helpers';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
})
export class RootComponent implements OnInit, DoCheck {
  public identity;
  private token;

  loading: ViewContainerRef;

  Techs$: Observable<Tech[]> = null;
  Profile$: Observable<Profile> = null;
  Courses$: Observable<Course[]> = null;
  Projects$: Observable<Project[]> = null;

  seeTech: boolean = false;
  seeProfile: boolean = false;
  seeCourse: boolean = false;
  seeProject: boolean = false;
  error: String = '';

  techDisplayed: Tech = null;
  courseDisplayed: Course = null;
  projectDisplayed: Project = null;
  itemsDeleted: Array<String> = [];

  hadBeenReloaded: boolean = false;

  types = TypesArr;

  options: AnimationOptions = {
    path: '/assets/lotties/home.json',
  };
  optionsDelete: AnimationOptions = {
    path: '/assets/lotties/delete.json',
  };

  constructor(
    private _techService: TechService,
    private _profileService: ProfileService,
    private _courseService: CourseService,
    private _projectService: ProjectService,
    private _authService: AuthService
  ) {
    this.loadCredentials();
  }

  ngOnInit(): void {
    this.loadData();
    this._techService.reloadWarning.subscribe((value) => {
      //console.log(value);
      if (value) this.reload();
      else this.hadBeenReloaded = false;
    });
  }

  ngDoCheck() {
    this.loadCredentials();
  }

  platformLogoUrl = (platform) =>
    `https://res.cloudinary.com/omarpvcloud/image/upload/v1606471573/logos/${platform.toLowerCase()}.png`;

  loadCredentials() {
    this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();
  }

  loadData() {
    this.loadTechData();
    this.loadProfileData();
    this.loadCourseData();
    this.loadProjectsData();
  }

  loadTechData() {
    //techs
    this.Techs$ = this._techService.getData(this.token);
  }

  seeDeleteConfirmation(item: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#D9D9D9',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        //call to delete
        this.deleteItem(item);
      }
    });
  }

  deleteItem(item: any) {
    var type = '';
    var obs: Observable<any>;

    if (item.icon) {
      type = 'Tech';
      obs = this._techService.deleteItem(item, this.token);
    } else if (item.done) {
      type = 'Course';
      obs = this._courseService.deleteItem(item, this.token);
    } else {
      type = 'Project';
      obs = this._projectService.deleteItem(item, this.token);
    }

    // do the actual delete - obs is a observable
    obs.subscribe(
      (res) => {
        if (res.error) {
          this.error = res.error;
        } else {
          this.itemsDeleted.push(item._id);
          var host = 'API';
          if (res.local) host = 'LOCAL';

          //console.log(type + " deleted - " + host);
          this.error = '';

          this.techDisplayed = null;
          this.courseDisplayed = null;
          this.projectDisplayed = null;

          Swal.fire(
            'Good job! - ' + host,
            type + ' deleted in ' + host,
            'success'
          );
        }
      },
      (error) => {
        //console.log(error);
        let err = error?.error;
        this.error = err?.error || 'Internal Server Error';
      }
    );
  }

  reload() {
    if (!this.hadBeenReloaded) {
      //console.log('RELOAD');
      this.loadData();
      this.hadBeenReloaded = true;
    }
  }

  setColor = setColor;

  stringify(value) {
    return JSON.stringify(value);
  }

  hideTech() {
    this.seeTech = false;
    this.techDisplayed = null;
  }

  /* PROFILE */
  prettify(json) {
    return JSON.stringify(json, null, '\t');
  }
  loadProfileData() {
    this.Profile$ = this._profileService.getOneData(this.token);
  }

  /* COURSES */
  loadCourseData() {
    this.Courses$ = this._courseService.getData(this.token);
  }

  hideCourse() {
    this.seeCourse = false;
    this.courseDisplayed = null;
  }

  /* PROJECTS */
  loadProjectsData() {
    this.Projects$ = this._projectService.getData(this.token);
  }

  hideProject() {
    this.seeProject = false;
    this.projectDisplayed = null;
  }
}
