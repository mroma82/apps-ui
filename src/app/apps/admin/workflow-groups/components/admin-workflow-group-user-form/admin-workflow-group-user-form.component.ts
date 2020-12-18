import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISelectListItem } from 'src/app/common/models/select-list-item';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { SelectListService } from 'src/app/core/services/select-list.service';

@Component({
  selector: 'app-admin-workflow-group-user-form',
  templateUrl: './admin-workflow-group-user-form.component.html',
  styleUrls: ['./admin-workflow-group-user-form.component.scss']
})
export class AdminWorkflowGroupUserFormComponent implements OnInit {
  @Input() model : any;
  
  // lists
  users$  = this.selectListService.getEntityList(EntityTypes.SystemUser, "fullName");

  // new
  constructor(
    private selectListService : SelectListService
  ) { }

  ngOnInit() {
  }

}
