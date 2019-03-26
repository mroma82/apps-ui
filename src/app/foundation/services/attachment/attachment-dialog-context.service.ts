import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecordContextService } from 'src/app/common/services/record-context.service';
import { AttachmentService } from './attachment.service';

@Injectable({
  providedIn: 'root'
})
export class AttachmentDialogContextService {

  // observables
  list$ = new BehaviorSubject<any>([]);  
  dialogOpenClose$ = new BehaviorSubject<boolean>(false);
  dialogMode$ = new BehaviorSubject<string>("list");
  tempFile$ = new BehaviorSubject<any>({});

  // new
  constructor(
    private recordContextService: RecordContextService,
    private service: AttachmentService
  ) { 
  }

  // refresh list
  refreshList(record: any = undefined) {

    // check if no record, use the last
    if(record === undefined)
      record = this.recordContextService.recordContext$.value;

    // refresh from api
    this.service.getAllByContext(record.contextType, record.contextId).subscribe(d => {      
      this.list$.next(d);
    });    
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

  // set dialog mode
  setDialogMode(mode: string) {
    this.dialogMode$.next(mode);
  }

  // upload file
  uploadFile(file: any) {

    // upload
    this.service.uploadTempFile(file).subscribe(x => {
      this.tempFile$.next(x);
    });
  }

  // add
  add(model: any) {

    // get the record
    const record = this.recordContextService.recordContext$.value;

    // save
    return this.service.add({
      contextType: record.contextType,
      contextId: record.contextId,
      description: model.description,
      tempFileId: this.tempFile$.value.id
    });
  }

  // update
  update(model: any) {
    return this.service.update(model);    
  }
}
