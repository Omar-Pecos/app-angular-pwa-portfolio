import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/ApiResponse';
import { Tech } from '../models/Tech';
import { OnlineOfflineService } from './online-offline.service';

@Injectable({
  providedIn: 'root'
})
export class TechService {
  private APIurl = environment.APIurl;
  
  constructor(
    private _http : HttpClient,
    private _onlineOfflineService : OnlineOfflineService
  ) { 
      this.openConnectionStatus();
   }

  getTechs() : Observable<Tech[]>{
    return this._http.get(this.APIurl + '/api/techs')
      .pipe(
        map( (res : ApiResponse ) => res.data)
      )
  }

  addTech(tech) : Observable<ApiResponse>{
    return this._http.post<ApiResponse>(this.APIurl + '/api/techs', tech);
  }

  deleteTech(id) : Observable<ApiResponse>{
    return this._http.delete<ApiResponse>(this.APIurl + '/api/techs/'+ id);
  }

  openConnectionStatus() {
    this._onlineOfflineService.connectionStatus
      .subscribe(
        online =>{
          if (online){
            console.log('>> Online again >>> Sending data to API from indexedDB');
          }else{
            console.log('>> Offline now');
          }
        }
      )
  }
}
