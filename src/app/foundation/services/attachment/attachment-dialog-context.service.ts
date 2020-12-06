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
      record = this.recordContextService.record$.value;

    // refresh from api
    this.service.getAllByEntity(record.entityTypeId, record.entityId).subscribe(d => {      
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

  // clear temp file
  clearTempFile() {
    this.tempFile$.next({});
  }

  // add
  add(model: any) {

    // get the record
    const record = this.recordContextService.record$.value;

    // save
    return this.service.add({
      entityTypeId: record.entityTypeId,
      entityId: record.entityId,
      description: model.description,
      tempFileId: this.tempFile$.value.id
    });
  }

  // update
  update(model: any) {
    return this.service.update(model);    
  }

  // delete
  delete(id: string) {
    return this.service.delete(id);    
  }
}
