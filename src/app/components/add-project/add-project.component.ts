import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tech } from 'src/app/models/Tech';
import { TechService } from 'src/app/services/tech.service';
import Swal from 'sweetalert2';
import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';
import { setColor } from './../../utils/helpers';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  error : string = '';
  project : Project = new Project();

  Techs$ : Observable<Tech[]> = null;
  techs : Array<Tech>;
  types : string[];

  seeAddTechForm : boolean = false;
  seeAddImageForm : boolean = false;
  seeAddFileForm : boolean = false;

  selectedTechID : string = '-1';
  newImageUrl : string = '';
  newFileUrl : string = '';

  makeNew : boolean = false;
  options : AnimationOptions= {
    path: '/assets/lotties/projects.json',
  };

  constructor(
    private router : Router,
    private _techService : TechService,
    private _projectService : ProjectService
  ) { 
    this.project.techs = [];
    this.project.images = [];
    this.project.files = [];
    this.project.pinned = false;

    this.types = [
      'backend','frontend','fullstack','desktop','hybrid','native','game','design'
    ]
  }

  ngOnInit(): void {
    this.Techs$ = this._techService.getData();
    this.Techs$.subscribe(
      data => this.techs = data
    )
  }

  addTech(){
    var techData = null;
    this.techs.map(tech => {
      if (tech._id == this.selectedTechID)
        techData = tech;
    })

    var newTech = {
      ...techData
    }

    this.project.techs.push( newTech );
    this.seeAddTechForm = false;
  }

  setColor = setColor;

  deleteTech(id){
    this.project.techs = this.project.techs.filter(item => item._id != id);
  }

  saveProject(){
    this.prepareProjectForSending();
    
    this._projectService.addItem( this.project ) 
    .subscribe(
      res =>{
        if (res.error){
          this.error = res.error;
        }else{
          var host = 'API';
          if (res.local)
            host = 'LOCAL';
            
          //console.log("Project added - " + host, res.data.name);

          //redirect to home
          this.router.navigate(['/home']);
          //sw alert
          Swal.fire("Good job! - " + host, "Project ''"+ res.data.name +"'' added in "+ host, "success");
        }
        
      },
      error =>{
        //console.log(error);
        this.error = error.message;
      }
    )
  }

  prepareProjectForSending() {
   var newTechsArray = this.project.techs.map( tech =>{
      return tech._id;
    });
    this.project.techs = newTechsArray;
  }

  pasteJson(){
    navigator.clipboard.readText()
      .then(text =>{
        this.project = JSON.parse( text );
      }).catch(error =>{
        //console.log(error);
      })
  }

  addImage(){
    this.project.images.push( this.newImageUrl );
    this.newImageUrl = '';
    this.seeAddImageForm = false;
  }

  addFile(){
    this.project.files.push( this.newFileUrl );
    this.newFileUrl = '';
    this.seeAddFileForm = false;
  }

  deleteImage(image){
    this.project.images = this.project.images.filter(id => id != image)
  }

  deleteFile(file){
    this.project.files = this.project.files.filter(id => id != file)
  }

  setMakeNew(){
    this.project._id = null;
    this.makeNew = true;
  }

}
