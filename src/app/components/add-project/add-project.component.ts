import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tech } from 'src/app/models/Tech';
import { TechService } from 'src/app/services/tech.service';
import Swal from 'sweetalert2';
import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/services/auth.service';
import { types as TypesArr } from '../../utils/helpers';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit, DoCheck {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  private token;
  error: string = '';
  project: Project = new Project();

  Techs$: Observable<Tech[]> = null;
  techs: Array<Tech>;
  types: string[] = TypesArr;

  seeAddTechForm: boolean = false;
  seeAddImageForm: boolean = false;
  seeAddFileForm: boolean = false;

  selectedTechID: string = '-1';
  newImageUrl: string = '';
  newFileUrl: string = '';

  makeNew: boolean = false;
  options: AnimationOptions = {
    path: '/assets/lotties/projects.json',
  };

  constructor(
    private router: Router,
    private _techService: TechService,
    private _projectService: ProjectService,
    private _authService: AuthService
  ) {
    this.token = this._authService.getToken();
    this.project.techs = [];
    this.project.images = [];
    this.project.files = [];
    this.project.pinned = false;
  }

  ngOnInit(): void {
    this.Techs$ = this._techService.getData(this.token);
    this.Techs$.subscribe((data) => (this.techs = data));
  }

  ngDoCheck() {
    this.token = this._authService.getToken();
  }

  addTech() {
    const techFound = this.techs.find(({ _id }) => _id == this.selectedTechID);
    if (techFound) {
      this.project.techs.push(techFound);
      this.selectedTechID = '-1';
    }
  }

  deleteTech(id) {
    this.project.techs = this.project.techs.filter((item) => item._id != id);
    this.selectedTechID = '-1';
  }

  saveProject() {
    this.prepareProjectForSending();

    this._projectService.addItem(this.project, this.token).subscribe(
      (res) => {
        if (res.error) {
          this.error = res.error;
        } else {
          var host = 'API';
          if (res.local) host = 'LOCAL';

          //console.log("Project added - " + host, res.data.name);

          //redirect to home
          this.router.navigate(['/home']);
          //sw alert
          Swal.fire(
            'Good job! - ' + host,
            "Project ''" + res.data.name + "'' added in " + host,
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

  prepareProjectForSending() {
    var newTechsArray = this.project.techs.map((tech) => {
      return tech._id;
    });
    this.project.techs = newTechsArray;
  }

  addImage() {
    this.project.images.push(this.newImageUrl);
    this.newImageUrl = '';
    this.seeAddImageForm = false;
  }

  addFile() {
    this.project.files.push(this.newFileUrl);
    this.newFileUrl = '';
    this.seeAddFileForm = false;
  }

  deleteImage(image) {
    this.project.images = this.project.images.filter((id) => id != image);
  }

  deleteFile(file) {
    this.project.files = this.project.files.filter((id) => id != file);
  }

  setMakeNew() {
    this.project._id = null;
    this.makeNew = true;
  }

  receiveFromClipboard = (e) => {
    const { item } = e;

    if (item) {
      this.project = item;
    }
  };

  filterTechs = () => {
    if (this.project.techs.length) {
      if (this.techs.length) {
        return this.techs.filter(
          ({ _id }) =>
            this.project.techs.findIndex(
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
