import { Injectable } from '@angular/core';
import { RecordContextService } from 'src/app/common/services/record-context.service';
import { NotesService } from './notes-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesListDialogContextService {

  // list observable
  list$ = new BehaviorSubject<any[]>([]);
  count$ = this.list$.pipe(map(x => x.length));
  dialogOpenClose$ = new BehaviorSubject<boolean>(false);

  // new
  constructor(
    private recordContextService: RecordContextService,
    private notesService: NotesService
  ) {        
  }

  // refresh list
  refreshList(record: any = undefined) {

    // check if no record, use the last
    if(record === undefined)
      record = this.recordContextService.record$.value;

    // refresh from api
    this.notesService.getAllByEntity(record.entityTypeId, record.entityId).subscribe(d => {      
      this.list$.next(d);
    });    
  }  

  // add
  add(model: any) : Observable<any> { 
    
    // get the record
    const record = this.recordContextService.record$.value;
      
    // add
    return this.notesService.addUpdate({      
      entityTypeId: record.entityTypeId,
      entityId: record.entityId,
      contentText: model.contentText
    }).pipe(map(x => { 

      // refresh
      this.refreshList();
      return x;
    }));
  }  

  update(model: any): Observable<any> {
    
    // update
    return this.notesService.addUpdate(model).pipe(map(x => { 

      // refresh
      this.refreshList();
      return x;
    }));          
  }

  // delete
  delete(id: string): Observable<any> {

    // delete
    return this.notesService.delete(id).pipe(map(x => {      
      this.refreshList();
    }));
  }

  // open dialog
  openDialog() {
    
    // refresh
    this.refreshList();

    // open
    this.dialogOpenClose$.next(true);
  }

  // close dialog
  closeDialog() {
    this.dialogOpenClose$.next(false);
  }

}
