import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminWorkflowGroupApiService } from './admin-workflow-group-api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminWorkflowGroupListContextService {

  // observables
  list$ = new BehaviorSubject<any>([]);

  // new
  constructor(
    private api : AdminWorkflowGroupApiService
  ) { }

  // refrehs
  refresh() {
    
    // get the data
    this.api.getAll().subscribe(x => this.list$.next(x));
  }
}
