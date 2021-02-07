import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PmListsService } from 'src/app/apps/pm/services/pm-lists.service';
import { UserContextService } from 'src/app/common/services/user-context.service';

@Component({
  selector: 'app-pm-event-form',
  templateUrl: './pm-event-form.component.html',
  styleUrls: ['./pm-event-form.component.sass']
})
export class PmEventFormComponent implements OnInit {
  @Input() model : any;
  @Input() viewMode : boolean;
  
  // lists
  userList$ : Observable<any>;

  // new
  constructor(
    lists: PmListsService,
    private userContext: UserContextService
  ) { 
    
    // set the lists
    this.userList$ = lists.userList$;
  }
  

  // sets as completed
  setAsCompleted() {

    // check if completed
    if(!this.model.isCompleted) {

      // set the date
      var today = new Date();
      today.setHours(0,0,0,0);
      this.model.completedDateTime = today.toISOString();

      // set the user
      this.userContext.profile$.pipe(take(1)).subscribe(x => {
        this.model.completedUserId = x.userId;
      });
    }

    else {
      
      // clear
      this.model.completedDateTime = "1900-01-01T";
      this.model.completedUserId = "";
    }
  }

  // init
  ngOnInit(): void {
  }
}
