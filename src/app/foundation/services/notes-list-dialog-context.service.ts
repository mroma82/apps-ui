import { Injectable } from '@angular/core';
import { RecordContextService } from 'src/app/common/services/record-context.service';
import { NotesService } from './notes-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesListDialogContextService {

  // list observable
  list$ = new BehaviorSubject<any[]>([]);
  //record$ : Observable<any>

  // new
  constructor(
    private recordContextService: RecordContextService,
    private notesService: NotesService
  ) { 

    // setup subsription on record change
    recordContextService.recordContext$.subscribe(x => {
      this.refreshList(x);
    });      
  }

  // refresh list
  refreshList(record: any = undefined) {

    // check if no record, use the last
    if(record === undefined)
      record = this.recordContextService.recordContext$.value;

    // refresh from api
    this.notesService.getAllByContext(record.contextType, record.contextId).subscribe(d => {      
      this.list$.next(d);
    });    
  }  

  // add
  add(model: any) : Observable<any> { 
    
    // get the record
    const record = this.recordContextService.recordContext$.value;
      
    // return
    return this.notesService.addUpdate({      
      contextType: record.contextType,
      contextId: record.contextId,
      contentText: model.contentText
    });
  }  
}
