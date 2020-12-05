import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { RecordLockService } from './services/record-lock/record-lock.service';
import { Observable } from 'rxjs';
import { RecordContextService } from '../common/services/record-context.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordLockGuard implements CanActivate {

  entityTypeId: string;
  setContextType(entityTypeId: string) {
    this.entityTypeId = entityTypeId;
  }

  constructor(
    private recordLockService: RecordLockService,         
    private router: Router) {
  }

  // can activate
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    
    let id = next.paramMap.get('id');

    // check if locked
    return this.recordLockService
      .check(this.entityTypeId, id)
      .pipe(map(x => {
       
        if(!x.isLocked) {
          // todo: toast message
          console.log(`${id} is locked by ${x.lockedUser}`);
        }
        
        return !x.isLocked;
      }));
  }
}
