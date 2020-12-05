import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuditTrailService } from './audit-trail.service';
import { RecordContextService } from 'src/app/common/services/record-context.service';

@Injectable({
  providedIn: 'root'
})
export class AuditTrailDialogContextService {

  // observables
  list$ = new BehaviorSubject<any>([]);
  detailList$ = new BehaviorSubject<any>([]);
  dialogOpenClose$ = new BehaviorSubject<boolean>(false);

  // new
  constructor(
    private recordContextService: RecordContextService,
    private service: AuditTrailService
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

  // refresh detail list
  refreshDetailList(id: string) {

    // refresh
    this.service.getDetailsByParent(id).subscribe(x => {
      this.detailList$.next(x);
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
}
