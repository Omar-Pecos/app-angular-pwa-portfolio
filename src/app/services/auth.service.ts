import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl =  environment.APIurl

  constructor(
    private http: HttpClient
  ) {}

  setToken(token : string){
    localStorage.setItem('token',token);
  }

  getToken() : string{
    let token;
    token = localStorage.getItem('token');
    return token;
  }

  setIdentity(identity : object){
    localStorage.setItem('identity',JSON.stringify(identity));
  }

  getIdentity() : object{
    let identity;
    identity = localStorage.getItem('identity');
    return JSON.parse(identity);
  }

  login(body) : Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.apiUrl + '/api/auth/login',body);
  }

  register(body){
    return this.http.post(this.apiUrl + '/api/auth/register',body);
  }

  logout(){
    //or delete old credentials
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
  }

  isAuthenticated() {
    let token = this.getToken();
    let headers = new HttpHeaders({
      'Authorization' : token
    })
    
    return this.http.get(this.apiUrl + '/api/auth/isAuthenticated', {headers : headers} );
  }
}
