import { EntityProviderService } from "../entity-provider.service";

// base
export abstract class BaseEntityConfigurationService {
  
    // new
    constructor(
      private entityProvider: EntityProviderService
    ) {}
    
    // define root url for routing
    rootUrl: string = null;
    name: string = null;
    pluralName: string = null;
  
    // entity info
    entityTypeId : string = "";
  
    // define record description
    recordDescription(model: any) : string {
      return model.id;
    }
    
    // workflow
    workflow = {
      enabled: false,
      url: "",
      prefixText: ""
    }
  
    // forms
    createFormComponent: any;
    viewEditFormComponent: any;
  
    // options
    navigateToEditAfterCreate: boolean = false;
    showAddOnListing: boolean = true;
    
    // set entity
    setEntityType(entityTypeId: string) {
  
      // set th etype
      this.entityTypeId = entityTypeId;
  
      // get extra details from api
      this.entityProvider.getEntity(entityTypeId).subscribe(x => {
  
        // set the fields
        if(!this.rootUrl) 
          this.rootUrl = x.rootUrl;
  
        if(!this.name) 
          this.name = x.name;
  
        if(!this.pluralName) 
          this.pluralName = x.pluralName;
      });
    }
  }
  