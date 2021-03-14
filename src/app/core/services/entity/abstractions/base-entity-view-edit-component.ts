import { OnInit, OnDestroy, Directive, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityViewEditContextService } from '../view-edit/entity-view-edit-context.service';

@Directive()
export abstract class BaseEntityViewEditComponent implements OnInit, OnDestroy {

    // entity type
    entityTypeId : string = this.context.entityTypeId;

    // state
    viewMode$: Observable<boolean> = this.context.mode$.pipe(map(x => x == 'view'));

    // model
    model: any = {};

    // subscriptions
    subs = new Subscription();

    // new
    constructor(
        private context: EntityViewEditContextService        
    ) {
    }

    // init
    ngOnInit() {

        // subscribe to record changes
        this.subs.add(
            this.context.entityRecord$.subscribe(x => {
                if (x) {
                    this.model = x;
                    
                    // handle model change
                    this.onModelChange(x);
                }
            })
        );
    }

    // event for on model change
    onModelChange(model: any) { }

    // destroy
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}