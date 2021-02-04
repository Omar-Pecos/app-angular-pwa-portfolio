import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl =  environment.APIurl

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(token : string) : Observable<ApiResponse>{
    let headers = new HttpHeaders({
      'Authorization' : token
    })
    
    return this.http.get<ApiResponse>(this.apiUrl + '/api/users', {headers : headers} );
  }

  editOneUser(id,body,token) : Observable<ApiResponse>{
    let headers = new HttpHeaders({
      'Authorization' : token
    })
    
    return this.http.patch<ApiResponse>(this.apiUrl + '/api/users/' + id, body, {headers : headers} );
  }

  grantOrRevoke(id,body,token) : Observable<ApiResponse>{
    let headers = new HttpHeaders({
      'Authorization' : token
    })
    
    return this.http.post<ApiResponse>(this.apiUrl + '/api/users/' + id + '/admin', body, {headers : headers} );
  }

  deleteUser(id,token) : Observable<ApiResponse>{
    let headers = new HttpHeaders({
      'Authorization' : token
    })
    
    return this.http.delete<ApiResponse>(this.apiUrl + '/api/users/' + id, {headers : headers} );
  }
}
