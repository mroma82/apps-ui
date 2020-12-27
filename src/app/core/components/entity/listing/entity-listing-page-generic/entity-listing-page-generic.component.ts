import { Component, Inject, OnInit } from '@angular/core';
import { AppContextService } from 'src/app/app-context.service';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntitySecurityService } from 'src/app/core/services/entity/entity-security.service';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';

@Component({
  selector: 'app-entity-listing-page-generic',
  templateUrl: './entity-listing-page-generic.component.html',
  styleUrls: ['./entity-listing-page-generic.component.scss']
})
export class EntityListingPageGenericComponent implements OnInit {

  // permissions
  canAdd$ = this.entitySecurity.canAdd$;

  // new
  constructor(
    private listingContext : EntityListingContextService,
    private entitySecurity: EntitySecurityService,
    private createContext : EntityCreateContextService,
    private appContext: AppContextService
  ) { }

  ngOnInit() {

    // refresh on load
    this.refresh();

    // set the title
    this.appContext.Layout.setTitle(null);
  }

  // clear
  clear() {
    this.listingContext.clearFilter();
  }
  
  // refresh
  refresh() {
    this.listingContext.refreshData();
  }

  setPageSize(pageSize: number) {
    this.listingContext.pageSize$.next(pageSize);
  }

  // create
  openCreateDialog() {
    this.createContext.openDialog();
  }
}
