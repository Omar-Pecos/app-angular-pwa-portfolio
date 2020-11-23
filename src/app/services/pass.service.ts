import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PassService {

  constructor(
    private _http : HttpClient
  ) { }

  getPass(){
    return this._http.get('/api/pass.js');
  }
}
