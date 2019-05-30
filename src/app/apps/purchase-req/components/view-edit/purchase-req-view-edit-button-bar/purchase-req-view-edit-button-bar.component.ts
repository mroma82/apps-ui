import { Component, OnInit, Input } from '@angular/core';
import { PurchaseReqViewEditContextService } from '../../../services/purchase-req-view-edit-context.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/common/services/dialog.service';
import { DialogResultEnum } from 'src/app/common/types/dialogs/dialog-result.enum';

@Component({
  selector: 'app-purchase-req-view-edit-button-bar',
  templateUrl: './purchase-req-view-edit-button-bar.component.html',
  styleUrls: ['./purchase-req-view-edit-button-bar.component.scss']
})
export class PurchaseReqViewEditButtonBarComponent implements OnInit {
  @Input() viewMode: boolean;

  // observables
  isTemplate$: Observable<boolean>;

  // new
  constructor(
    private context: PurchaseReqViewEditContextService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  // init
  ngOnInit() {
    this.isTemplate$ = this.context.isTemplate$;
  }

  // create from template
  createFromTemplate() {

    // ask
    this.dialogService.yesNo("Purchase Requisition", "Are you sure you want to generate a purchase requisition?").subscribe(x => {
      
      if(x == DialogResultEnum.Yes) {
        this.context.createFromTemplate().subscribe(x => {
          if(x) {
            this.router.navigateByUrl(`/app/purchase-req/edit/${x}`);
          }
        });
      }
    })
    
  }
}
