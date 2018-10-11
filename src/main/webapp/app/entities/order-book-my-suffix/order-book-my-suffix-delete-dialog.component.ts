import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderBookMySuffix } from 'app/shared/model/order-book-my-suffix.model';
import { OrderBookMySuffixService } from './order-book-my-suffix.service';

@Component({
    selector: 'jhi-order-book-my-suffix-delete-dialog',
    templateUrl: './order-book-my-suffix-delete-dialog.component.html'
})
export class OrderBookMySuffixDeleteDialogComponent {
    orderBook: IOrderBookMySuffix;

    constructor(
        private orderBookService: OrderBookMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderBookService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderBookListModification',
                content: 'Deleted an orderBook'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-book-my-suffix-delete-popup',
    template: ''
})
export class OrderBookMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderBook }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderBookMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.orderBook = orderBook;
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
