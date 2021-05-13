import { Injectable, Optional } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { IFormState } from "../../../../common/models/form-state";
import { IFormStateProvider } from "../../../../common/services/form-state-provider.service";
import { EntityViewEditContextService } from "../view-edit/entity-view-edit-context.service";

@Injectable()
export class EntityFormStateProvider implements IFormStateProvider {
    
    // new
    public constructor(
        @Optional() private context: EntityViewEditContextService
    ) {}

    // get state
    getState(): Observable<IFormState> {
        
        // check if a context
        if(this.context) {
            
            // map from context
            return this.context.mode$.pipe(map(mode => {
                return { 
                    mode: mode
                }
            }));
        }

        // fallback
        return of({
            mode: 'edit'
        });
    }
}