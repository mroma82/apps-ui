import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

export class BaseDialog implements OnDestroy {
    @ViewChild('content', { static: true }) content : any;
    
    // define options
    protected dialogSize: 'lg' | 'sm' | 'full' | 'xl' = 'lg'

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

    // open the dialog
    private open(content) {

        // handle issue with modal component only accepting lg and sm sizes
        let modalSize = this.dialogSize;
        let windowClass = "";
        if(modalSize != 'lg' && modalSize != 'sm') {
            windowClass = `modal-size-${modalSize}`;
            modalSize = 'lg';
        }

        // open the modal
        this.modal = this.modalService.open(content, { 
            size: modalSize, 
            ariaLabelledBy: 'modal-basic-title',
            windowClass: windowClass,
            backdrop: 'static',
            keyboard: false,                            
        });
        

        // handle promise
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
