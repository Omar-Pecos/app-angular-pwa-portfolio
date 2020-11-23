import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { ApiResponse } from '../models/ApiResponse';
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
export abstract class BaseService<T extends {_id : string}> {
 
  private myDb : Dexie;
  public reloadWarning : BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  protected _http : HttpClient;
  protected _onlineOfflineService : OnlineOfflineService;

  constructor(
    protected injector : Injector,
    protected model : string,
    protected APIurl : string
  ) { 
      this._http = this.injector.get(HttpClient);
      this._onlineOfflineService = this.injector.get(OnlineOfflineService);

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
  }


  getData() : Observable<T[]>{
    return this._http.get(this.APIurl)
      .pipe(
        map( (res : ApiResponse ) => res.data)
      )
  }

  getOneData() : Observable<T>{
    return this._http.get(this.APIurl)
      .pipe(
        map( (res : ApiResponse ) => res.data)
      )
  }

  public addItem(item : T) : Observable<any>{
    if (this._onlineOfflineService.isOnline)
         return this.addItemAPI(item);
    else{
      var done = this.addItemLocal(item);
      return new Observable(observer =>{
        if (!done)
          observer.error('Error adding item to local');
        else
          observer.next({
            status : 'success',
            local : true,
            data : item
          })
      });
    }
        
  }

  private addItemAPI(item : T) : Observable<ApiResponse>{
    return this._http.post<ApiResponse>(this.APIurl, item);
  }

  private async addItemLocal(item : T){
    var model = this.model;

    var element : IndexedDbItem = {
      id : new Date().toISOString(),
      model, 
      data : item 
    }

    try {
      await this.myDb.table('additions').add(element);
      
      return true;
    } catch (error) {
      //console.log('Error adding item to local', error);
      return false;
    }
    
  }

  deleteItem(item : T) : Observable<any>{
    if (this._onlineOfflineService.isOnline)
      return this.deleteItemAPI(item);
    else{
      var done = this.deleteItemLocal(item);
      
      return new Observable(observer =>{
        if (!done)
           observer.error('Error adding item to local');
        else
          observer.next({
            status : 'success',
            local : true,
            data : item
          })
      })
    }
  }

  private deleteItemAPI(item : T) : Observable<ApiResponse>{
    return this._http.delete<ApiResponse>(this.APIurl + '/'+ item._id);
  }

  private async deleteItemLocal(item : T) {
    var model = this.model;

    var element  : IndexedDbItem = {
      id : item._id,
      model,
      data : item
    }

      try {
        await this.myDb.table('eliminations').add( element )
        return true;
      } catch (error) {
          //console.log('Error adding deleted tech to local', error);
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

      if (item.model == this.model){
          this.addItemAPI(item.data)
            .subscribe(
              res => console.log(res.status),
              error => console.log(error)
            );
      
        await this.myDb.table('additions').delete(item.id)
        
        numInserted++;
      }
       
    }

    //deletedItems loop
    for (const item of deletedItems){

      if (item.model == this.model){
          this.deleteItemAPI(item.data)
              .subscribe(
                res => console.log(res.status),
                error => console.log(error)
              );
        
          await this.myDb.table('eliminations').delete(item.id)
          
          numDeleted++;
      }
    }
    
    this.reloadWarning.next(true);
    this.reloadWarning.next(false);

    // sw alert with inserted/deleted and a warning MAY HAVE STALE DATA - reload?
    Swal.fire("May have stale data - Reloading "+ this.model + "s" , 'INSERTED '+ numInserted +' new items in the API from local data && DELETED '+ numDeleted +' items in the API from local data', "warning");
  }
}
