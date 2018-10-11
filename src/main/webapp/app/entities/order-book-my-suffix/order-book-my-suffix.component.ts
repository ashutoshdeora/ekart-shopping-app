import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderBookMySuffix } from 'app/shared/model/order-book-my-suffix.model';
import { Principal } from 'app/core';
import { OrderBookMySuffixService } from './order-book-my-suffix.service';

@Component({
    selector: 'jhi-order-book-my-suffix',
    templateUrl: './order-book-my-suffix.component.html'
})
export class OrderBookMySuffixComponent implements OnInit, OnDestroy {
    orderBooks: IOrderBookMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orderBookService: OrderBookMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.orderBookService.query().subscribe(
            (res: HttpResponse<IOrderBookMySuffix[]>) => {
                this.orderBooks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderBooks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrderBookMySuffix) {
        return item.id;
    }

    registerChangeInOrderBooks() {
        this.eventSubscriber = this.eventManager.subscribe('orderBookListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
