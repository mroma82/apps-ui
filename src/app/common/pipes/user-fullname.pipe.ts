import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { shareReplay, map, tap } from 'rxjs/operators';

@Pipe({
  name: 'userFullname'
})
export class UserFullnamePipe implements PipeTransform {

  // cache
  private cache = {};

  // new
  constructor(
    private auth : AuthService
  ) {}

  // transform
  transform(value: string): Observable<string> {

    if(!this.cache[value]) {
      this.cache[value] = this.auth.getUserFullName(value).pipe(map(x => x.fullName), shareReplay());
    }

    // return
    return this.cache[value];
  }

}
