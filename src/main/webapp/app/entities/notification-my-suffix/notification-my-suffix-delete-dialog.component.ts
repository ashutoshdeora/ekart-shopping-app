import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INotificationMySuffix } from 'app/shared/model/notification-my-suffix.model';
import { NotificationMySuffixService } from './notification-my-suffix.service';

@Component({
    selector: 'jhi-notification-my-suffix-delete-dialog',
    templateUrl: './notification-my-suffix-delete-dialog.component.html'
})
export class NotificationMySuffixDeleteDialogComponent {
    notification: INotificationMySuffix;

    constructor(
        private notificationService: NotificationMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.notificationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'notificationListModification',
                content: 'Deleted an notification'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-notification-my-suffix-delete-popup',
    template: ''
})
export class NotificationMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ notification }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NotificationMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.notification = notification;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
