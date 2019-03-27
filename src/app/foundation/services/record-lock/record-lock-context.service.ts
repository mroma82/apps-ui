import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { RecordLockService } from './record-lock.service';
import { RecordContextService } from 'src/app/common/services/record-context.service';
import { Subscription, Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordLockContextService implements OnDestroy {  

  // subscription to lock
  lockSubscription: Subscription;
  
  // new
  constructor(
    private recordContext: RecordContextService,
    private service : RecordLockService
  ) { }

  // init
  init(): void {
    
    // setup subscription
    const source = timer(100, 5000);
    this.lockSubscription = source.subscribe(x => {

      // set lock
      let record = this.recordContext.recordContext$.value;
      this.service.set(record.contextType, record.contextId);
    });
  }

  // destroy
  ngOnDestroy(): void {
    
    // clear subscription
    if(this.lockSubscription) {
      this.lockSubscription.unsubscribe();
    }

    // get the record
    let record = this.recordContext.recordContext$.value;

    // set
    this.service.clear(record.contextType, record.contextId);
  }
}
