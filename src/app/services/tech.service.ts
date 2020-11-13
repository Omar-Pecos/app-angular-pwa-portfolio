import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/ApiResponse';
import { Tech } from '../models/Tech';

@Injectable({
  providedIn: 'root'
})
export class TechService {
  private APIurl = environment.APIurl;

  constructor(
    private _http : HttpClient
  ) { }

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
}
