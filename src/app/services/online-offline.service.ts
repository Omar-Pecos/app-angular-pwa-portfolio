import { Injectable } from '@angular/core';
import { Subject,Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {
  public connectionStatus$ = new Subject<boolean>();

  // set Event listeners
  constructor() {
    window.addEventListener('online', () => this.updateConnectionStatus());
    window.addEventListener('offline', () => this.updateConnectionStatus());
  }

  // return true/false 
  get isOnline() : boolean{
    return !!window.navigator.onLine;
  }

  // return the observable to subscribe in other service
  get connectionStatus() : Observable<boolean>{
    return this.connectionStatus$.asObservable();
  }

  // update the the subject with the new boolean value
  updateConnectionStatus(){
    this.connectionStatus$.next( this.isOnline );
  }
}
