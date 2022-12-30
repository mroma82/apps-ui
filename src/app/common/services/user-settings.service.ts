import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpClientService } from './app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  // new
  constructor(
    private http: AppHttpClientService
  ) { }

  // get
  get(): Observable<any> {
    return this.http.get("/userSettings/get");
  }

  // set culture
  setCulture(culture: string): Observable<any> {
    return this.http.post(`/userSettings/setCulture?cultureCode=${culture}`, null);
  }
}
