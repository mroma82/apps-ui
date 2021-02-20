import { EntityProviderService } from './entity-provider.service';

// injection token
export const ENTITY_CONFIG = "IEntityConfigurationService";

// entity config
export interface IEntityConfigurationService {  

  // entity details
  entityTypeId : string;
  rootUrl: string;
  name: string;
  pluralName: string;

  // workflow
  workflow : {
    enabled: boolean,
    url: string,
    prefixText: string
  };

  // forms
  createFormComponent: any;
  viewEditFormComponent: any;

  // options
  navigateToEditAfterCreate: boolean;
  showAddOnListing: boolean;

  // record description
  recordDescription(model: any) : string;
}