import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExampleListsService {

  // observables
  userList$ : Observable<any>;

  // new
  constructor(
    authService : AuthService
  ) { 

    // set lists
    this.userList$ = authService.getUsers();
  }
}
