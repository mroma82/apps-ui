import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AppHttpClientService } from '../../common/services/app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalListsService {

  // new
  constructor(
    private http: AppHttpClientService
  ) { }


  // get users
  getUsers(): Observable<any> {
    return this.http.get("/auth/getUsers").pipe(shareReplay());
  }
}
