# Addiong a new Sub Grid

## Add Validation Service
`ng g s apps/admin/drop-down-list/services/admin-list-item-validation --spec false`

implements IEntityValidationService


## Add the Components

* Sub Grid
`ng g c apps/admin/list-item-types/components/admin-list-item-sub-grid --spec false`

Set Html
```
<app-entity-sub-grid
  *ngIf="model$ | async as model"
  [entityTypeId]="entityTypeId"  
  [filter]="{securityRoleId: model.id}"
  [sort]="{field: 'id'}"
  [modelDefault]="{securityRoleId: model.id}"
  [columns]="subGridColumns"
  [config]="subGridConfig"
  [mode]="mode$ | async"
></app-entity-sub-grid>
```

Set Base?
inherit from BaseEntitySubGridComponent

constructor(
    context: EntityViewEditContextService
  ) {
    super(context)
  }

Set Providers
providers: [
    { provide: ENTITY_VALIDATION, useClass: AdminSecurityRolesEntityValidationService }
  ]






* Sub Grid Create
`ng g c apps/admin/list-item-types/components/admin-list-item-view-edit --spec false`

Set Base: `extends BaseEntityCreateComponent`

constructor(
    context : EntityCreateContextService
  ) { 
    super(context);
  }


* Sub Grid Edit
`ng g c apps/admin/list-item-types/components/admin-list-item-create --spec false`

Set Base: `extends BaseEntitySubGridViewEditComponent`

constructor(
    context: EntitySubGridViewEditContextService
  ) { 
    super(context)
  }

Add Create and Edit to entryComponents