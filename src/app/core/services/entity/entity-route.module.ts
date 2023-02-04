import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideRoutes, RouterModule, Routes } from '@angular/router';
import { RecordLockGuard } from 'src/app/foundation/record-lock-guard.service';
import { EntityContainerComponent } from '../../components/entity/container/entity-container/entity-container.component';
import { EntityListingPageGenericComponent } from '../../components/entity/listing/entity-listing-page-generic/entity-listing-page-generic.component';
import { EntityViewEditPageGenericComponent } from '../../components/entity/view-edit/entity-view-edit-page-generic/entity-view-edit-page-generic.component';

@NgModule()
export class EntityRouteModule extends RouterModule {

    // route for options
    static forOptions(options: any): ModuleWithProviders<RouterModule> {

        // define container
        var containerComponent = EntityContainerComponent;

        // additional routes
        var extraRoutes: Routes;
        var parametersRoute: Routes;
        var homeRedirect: string = "list";

        // check if any options
        if (options != null) {

            // check if extra routes
            extraRoutes = options.extraRoutes;

            // check if parameters
            if (options.parametersEntityTypeId) {
                parametersRoute = [
                    //{ path: 'edit/:id', component: EntitySin, data: { mode: "edit" }, canActivate: [RecordLockGuard] },
                ]
            }

            // container
            if (options.containerComponent)
                containerComponent = options.containerComponent;

            // home redirect
            if (options.homeRedirect)
                homeRedirect = options.homeRedirect;
        }

        // check nulls
        if (!extraRoutes) extraRoutes = [];
        if (!parametersRoute) parametersRoute = [];

        // return the template
        const routes = [
            {
                path: '',
                component: containerComponent,
                children: [
                    { path: 'list', component: EntityListingPageGenericComponent },
                    { path: 'view/:id', component: EntityViewEditPageGenericComponent, data: { mode: "view" } },
                    { path: 'edit/:id', component: EntityViewEditPageGenericComponent, data: { mode: "edit" }, canActivate: [RecordLockGuard] },
                    { path: '', redirectTo: homeRedirect },
                    ...parametersRoute,
                    ...extraRoutes
                ]
            }
        ];

        // return
        return {
            ngModule: RouterModule,
            providers: [provideRoutes(routes)]
        };
    }
}
