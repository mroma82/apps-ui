# Creating a new Entity App module

Create the module:
`ng g m apps/admin/admin-drop-down-list --spec false`

cd into directory

Add List configuration
`ng g s services/admin-workflow-group-list-configuration --spec false`

Implement
`implements IEntityListingConfigurationService`




Add Vliadation service:
`ng g s apps/admin/drop-down-list/services/admin-drop-down-list-validation --spec false`

Implement
`implements IEntityValidationService`

Forms:
Create form:
`ng g c apps/admin/list-item-types/components/admin-list-item-type-create --spec false`
 Extend
 `extends BaseEntityCreateComponent`
```
// new
  constructor(
    context: EntityCreateContextService
  ) {
    super(context);
  }
```


View/Edit Form:
`ng g c apps/admin/list-item-types/components/admin-list-item-type-view-edit --spec false`

extend
`extends BaseEntityViewEditComponent `

```
constructor(
    context : EntityViewEditContextService
  ) {
    super(context);
  }
```


Add to Entrycompennts:
 ```ts
   entryComponents: [
    AdminListItemTypeCreateComponent, 
    AdminListItemTypeViewEditComponent
  ]
 ```



Add these imports and providers to the module:
```ts
imports: [
    CommonModule,    
    AppCommonModule,
    AppsCoreModule,
    AppFoundationModule,    
    NgxDatatableModule,
    FormsModule,
    DatepickerModule,    
    EntityRouteModule.forOptions(null);
  ],
  providers: [
    EntityConfigurationService,
    { provide: ENTITY_LISTING_CONFIG, useClass: ListConfigurationService },    
    { provide: ENTITY_VALIDATION, useClass: ValidationService },
    EntityListingContextService,        
    EntityCreateContextService,    
    EntitySecurityService    
  ]
```

Configure routes if applicable


Configure module:
```ts
export class AdminSecurityRolesModule { 

  // new
  constructor(
    entityConfig: EntityConfigurationService    
  ) { 

    // entity
    entityConfig.entityTypeId = EntityTypes.SecurityRole;
    entityConfig.rootUrl = "/app/admin/security-roles";
    entityConfig.name = "Security Role";
    entityConfig.pluralName = "Security Roles";
    
    // create
    entityConfig.createFormComponent = AdminSecurityRoleCreateComponent;

    // view/edit
    entityConfig.viewEditFormComponent = AdminSecurityRoleViewEditComponent;
  }
}
```

Add route to main module
