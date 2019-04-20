import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExampleService } from './example.service';

@Injectable({
  providedIn: 'root'
})
export class ExampleCreateContextService {

  // observables
  dialogOpen$ = new BehaviorSubject<boolean>(false);

  // new
  constructor(
    private service: ExampleService
  ) { }

  // open dialog
  openDialog() {
    this.dialogOpen$.next(true);
  }

  // close dialog
  closeDialog() {
    this.dialogOpen$.next(false);
  }

  // create
  create(model: any) : Observable<any> {
    return this.service.create(model);
  };
}
