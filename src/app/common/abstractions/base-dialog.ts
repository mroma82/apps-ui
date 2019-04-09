import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

export class BaseDialog implements OnDestroy {
    @ViewChild('content') content : any;
    
    closeResult: string;

    // modal
    modal : NgbModalRef;

    // open/close subscription
    onOpenClose$ : Subscription;
    
    // new
    constructor(
        private modalService: NgbModal
    ) { }

    // init
    init(modalService: NgbModal) {
        this.modalService = modalService;
    }
    
    // init open/close subscription
    initOpenCloseSubscription(o : Observable<boolean>) {
        this.onOpenClose$ = o.subscribe(isOpen => {            
            if(isOpen) {
                this.openDialog();
            } else {
                this.closeDialog();
            }
        })
    }

    // open dialog
    openDialog() {
        this.open(this.content);    
    }

    // close dialog
    closeDialog() {        
        if(this.modal)
            this.modal.dismiss();
    }

    private open(content) {
        this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
        this.modal.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed`;
        });
    }

    // clean up
    ngOnDestroy(): void {

        // close open.close subscription
        if(this.onOpenClose$) {
            this.onOpenClose$.unsubscribe();
        }
    }
}
