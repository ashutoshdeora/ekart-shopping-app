import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderBookMySuffix } from 'app/shared/model/order-book-my-suffix.model';

@Component({
    selector: 'jhi-order-book-my-suffix-detail',
    templateUrl: './order-book-my-suffix-detail.component.html'
})
export class OrderBookMySuffixDetailComponent implements OnInit {
    orderBook: IOrderBookMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderBook }) => {
            this.orderBook = orderBook;
        });
    }

    previousState() {
        window.history.back();
    }
}
