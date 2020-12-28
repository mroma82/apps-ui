import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordLockGuard } from 'src/app/foundation/record-lock-guard.service';
import { EntityContainerComponent } from '../../components/entity/container/entity-container/entity-container.component';
import { EntityListingPageGenericComponent } from '../../components/entity/listing/entity-listing-page-generic/entity-listing-page-generic.component';
import { EntityViewEditPageGenericComponent } from '../../components/entity/view-edit/entity-view-edit-page-generic/entity-view-edit-page-generic.component';

export class EntityRouteModule extends RouterModule {

    // route for options
    static forOptions(options: any) : ModuleWithProviders<RouterModule> {
        return this.forChild(this.build(options));
    }
    
    // build with options
    private static build(options: any) : Routes {

        // define container
        var containerComponent = EntityContainerComponent;

        // additional routes
        var extraRoutes : Routes;        
        var parametersRoute: Routes;

        // check if any options
        if(options != null) {

            // check if extra routes
            extraRoutes = options.extraRoutes;

            // check if parameters
            if(options.parametersEntityTypeId) {
                parametersRoute = [
                    //{ path: 'edit/:id', component: EntitySin, data: { mode: "edit" }, canActivate: [RecordLockGuard] },
                ]
            }

            // container
            if(options.containerComponent)
            containerComponent = options.containerComponent;
        }

        // check nulls
        if(!extraRoutes) extraRoutes = [];
        if(!parametersRoute) parametersRoute = [];
         
        // return the template
        return [
            {
                path: '',
                component: containerComponent,
                children: [
                    { path: '', component: EntityListingPageGenericComponent },
                    { path: 'view/:id', component: EntityViewEditPageGenericComponent, data: { mode: "view" } },
                    { path: 'edit/:id', component: EntityViewEditPageGenericComponent, data: { mode: "edit" }, canActivate: [RecordLockGuard] },
                    ...parametersRoute,
                    ...extraRoutes
                ]
            }
        ]; 
    }
}
