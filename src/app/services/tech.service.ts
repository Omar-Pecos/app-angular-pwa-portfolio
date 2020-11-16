import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/ApiResponse';
import { Tech } from '../models/Tech';
import { OnlineOfflineService } from './online-offline.service';
import Dexie from "dexie";
import Swal from 'sweetalert2';


export interface IndexedDbItem{
  id : string,
  model : string,
  data : any
}

@Injectable({
  providedIn: 'root'
})
export class TechService {
  private APIurl = environment.APIurl;
  private myDb : Dexie;
  public reloadWarning : BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(
    private _http : HttpClient,
    private _onlineOfflineService : OnlineOfflineService,
    private router : Router
  ) { 
      this.openConnectionStatus();
      //initIndexedDB
      this.initIndexedDB();
   }

 async initIndexedDB() {
    await Dexie.delete('omarpv_db');
    this.myDb = new Dexie('omarpv_db');
    this.myDb.version(1).stores({
      additions : 'id',
      eliminations : 'id'
    })

   /* //test
    var item = {
      identificator : 'identif',
      model : 'Tech',
      data : {
        _id : 'tal',
        name : 'Cual'
      }
    }
    await this.myDb.table('additions').put(item);
    var techsLocal = await this.myDb.table('additions').toArray();
    console.log(techsLocal);*/
    
  }

  getTechs() : Observable<Tech[]>{
    return this._http.get(this.APIurl + '/api/techs')
      .pipe(
        map( (res : ApiResponse ) => res.data)
      )
  }

  public addTech(tech) : Observable<any>{
    if (this._onlineOfflineService.isOnline)
         return this.addTechAPI(tech);
    else{
      var done = this.addTechLocal(tech);
      return new Observable(observer =>{
        if (!done)
          observer.error('Error adding tech to local');
        else
          observer.next({
            status : 'success',
            local : true,
            data : {name : tech.name}
          })
      });
    }
        
  }

  private addTechAPI(tech) : Observable<ApiResponse>{
    return this._http.post<ApiResponse>(this.APIurl + '/api/techs', tech);
  }

  private async addTechLocal(tech){
    var item : IndexedDbItem = {
      id : new Date().toISOString(),
      model : 'Tech',
      data : tech
    }

    try {
      await this.myDb.table('additions').add(item);
      
      return true;
    } catch (error) {
      console.log('Error adding tech to local', error);
      return false;
    }
    
  }

  deleteTech(id) : Observable<any>{
    if (this._onlineOfflineService.isOnline)
      return this.deleteTechAPI(id);
    else{
      var done = this.deleteTechLocal(id);
      
      return new Observable(observer =>{
        if (!done)
           observer.error('Error adding tech to local');
        else
          observer.next({
            status : 'success',
            local : true
          })
      })
    }
  }

  private deleteTechAPI(id) : Observable<ApiResponse>{
    return this._http.delete<ApiResponse>(this.APIurl + '/api/techs/'+ id);
  }

  private async deleteTechLocal(id) {
    var item  : IndexedDbItem = {
      id,
      model : 'Tech',
      data : null
    }

      try {
        await this.myDb.table('eliminations').add( item )
        return true;
      } catch (error) {
        console.log('Error adding deleted tech to local', error);
        return false;
      }
   
  }

  //  Subscribe to online/offline event listener in service
  openConnectionStatus() {
    this._onlineOfflineService.connectionStatus
      .subscribe(
        online =>{
          if (online){

            console.log('>> Online again >>> Sending data to API from indexedDB');
            this.sendLocalDataToAPI();

          }else{
            console.log('>> Offline now');
          }
        }
      )
  }

  //sendLocalDataToAPI
  private async sendLocalDataToAPI(){
    var numInserted = 0;
    var numDeleted = 0;
    const addedItems = await  this.myDb.table('additions').toArray();
    const deletedItems = await  this.myDb.table('eliminations').toArray();
    
    //addedItems loop
    for (const item of addedItems){
      if (item.model == 'Tech')
        this.addTechAPI(item.data)
          .subscribe(
            res => console.log(res.status),
            error => console.log(error)
          );
      
        await this.myDb.table('additions').delete(item.id)
        //console.log(`item with id >> ${item.id} was deleted from localDB`);
        numInserted++;
    }

    //deletedItems loop
    for (const item of deletedItems){
      if (item.model == 'Tech')
        this.deleteTechAPI(item.id)
          .subscribe(
            res => console.log(res.status),
            error => console.log(error)
          );
      
        await this.myDb.table('eliminations').delete(item.id)
        //console.log(`item with id >> ${item.id} was deleted from localDB`);
        numDeleted++;
    }

    /*console.log('INSERTED '+ numInserted +' new items in the API from local data');
    console.log('DELETED '+ numDeleted +' items in the API from local data');*/
    
    this.reloadWarning.next(true);
    this.reloadWarning.next(false);
    // sw alert with inserted/deleted and a warning MAY HAVE STALE DATA - reload?
    Swal.fire("May have stale data - Reloading ...", 'INSERTED '+ numInserted +' new items in the API from local data && DELETED '+ numDeleted +' items in the API from local data', "warning");
  }
}
