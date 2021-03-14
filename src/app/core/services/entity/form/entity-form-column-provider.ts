import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IFormColumnDefinition } from "src/app/common/models/form-column-definition";
import { IFormColumnProvider } from "src/app/common/services/form-column-provider.service";
import { EntityProviderService } from "../entity-provider.service";

@Injectable()
export class EntityFormColumnProvider implements IFormColumnProvider {
    
    // define entity type
    entityTypeId: string;

    // new
    public constructor(
        private entityProvider: EntityProviderService        
    ) {
    }

    // get column
    getColumn(name: string): Observable<IFormColumnDefinition> {        
        return this.entityProvider.getEntityColumn(this.entityTypeId, name);
    }    
}